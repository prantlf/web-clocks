
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
function noop() { }
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function empty() {
    return text('');
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.1' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}

function dispatchTick(element, detail) {
  const event = new CustomEvent('tick',
    { detail, bubbles: true, cancelable: true, composed: true });
  element.dispatchEvent(event);
}

const local = -new Date().getTimezoneOffset();

function getNow(offset) {
  if (offset.length === 0) offset = local;
  return new Date(Date.now() + (+offset - local) * 60000)
}

/* src/ana-clock.svelte generated by Svelte v3.32.1 */
const file = "src/ana-clock.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (98:2) {#if markers !== 'none'}
function create_if_block_1(ctx) {
	let each_1_anchor;
	let each_value = /*steps*/ ctx[6];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*steps, markers*/ 66) {
				each_value = /*steps*/ ctx[6];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(98:2) {#if markers !== 'none'}",
		ctx
	});

	return block;
}

// (107:6) {#if markers === 'sixty'}
function create_if_block_2(ctx) {
	let each_1_anchor;
	let each_value_1 = [1, 2, 3, 4];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < 4; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < 4; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*steps*/ 64) {
				each_value_1 = [1, 2, 3, 4];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks[i].d(1);
				}
			}
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(107:6) {#if markers === 'sixty'}",
		ctx
	});

	return block;
}

// (108:8) {#each [1, 2, 3, 4] as offset}
function create_each_block_1(ctx) {
	let line;
	let line_transform_value;

	const block = {
		c: function create() {
			line = svg_element("line");
			attr_dev(line, "class", "minor");
			attr_dev(line, "y1", "42");
			attr_dev(line, "y2", "45");
			attr_dev(line, "transform", line_transform_value = "rotate(" + 6 * (/*minute*/ ctx[14] + /*offset*/ ctx[2]) + ")");
			add_location(line, file, 108, 10, 2120);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*steps*/ 64 && line_transform_value !== (line_transform_value = "rotate(" + 6 * (/*minute*/ ctx[14] + /*offset*/ ctx[2]) + ")")) {
				attr_dev(line, "transform", line_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(108:8) {#each [1, 2, 3, 4] as offset}",
		ctx
	});

	return block;
}

// (99:4) {#each steps as minute}
function create_each_block(ctx) {
	let line;
	let line_transform_value;
	let if_block_anchor;
	let if_block = /*markers*/ ctx[1] === "sixty" && create_if_block_2(ctx);

	const block = {
		c: function create() {
			line = svg_element("line");
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr_dev(line, "class", "major");
			attr_dev(line, "y1", "35");
			attr_dev(line, "y2", "45");
			attr_dev(line, "transform", line_transform_value = "rotate(" + 30 * /*minute*/ ctx[14] + ")");
			add_location(line, file, 99, 6, 1927);
		},
		m: function mount(target, anchor) {
			insert_dev(target, line, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*steps*/ 64 && line_transform_value !== (line_transform_value = "rotate(" + 30 * /*minute*/ ctx[14] + ")")) {
				attr_dev(line, "transform", line_transform_value);
			}

			if (/*markers*/ ctx[1] === "sixty") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(line);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(99:4) {#each steps as minute}",
		ctx
	});

	return block;
}

// (137:2) {#if secondhand === 'true'}
function create_if_block(ctx) {
	let g;
	let line0;
	let line1;
	let g_transform_value;

	const block = {
		c: function create() {
			g = svg_element("g");
			line0 = svg_element("line");
			line1 = svg_element("line");
			attr_dev(line0, "class", "second");
			attr_dev(line0, "y1", "10");
			attr_dev(line0, "y2", "-38");
			add_location(line0, file, 138, 6, 2659);
			attr_dev(line1, "class", "second-counterweight");
			attr_dev(line1, "y1", "10");
			attr_dev(line1, "y2", "2");
			add_location(line1, file, 139, 6, 2705);
			attr_dev(g, "transform", g_transform_value = "rotate(" + 6 * /*secs*/ ctx[5] + ")");
			add_location(g, file, 137, 4, 2618);
		},
		m: function mount(target, anchor) {
			insert_dev(target, g, anchor);
			append_dev(g, line0);
			append_dev(g, line1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*secs*/ 32 && g_transform_value !== (g_transform_value = "rotate(" + 6 * /*secs*/ ctx[5] + ")")) {
				attr_dev(g, "transform", g_transform_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(g);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(137:2) {#if secondhand === 'true'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let svg;
	let circle;
	let line0;
	let line0_transform_value;
	let line1;
	let line1_transform_value;
	let if_block0 = /*markers*/ ctx[1] !== "none" && create_if_block_1(ctx);
	let if_block1 = /*secondhand*/ ctx[0] === "true" && create_if_block(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			circle = svg_element("circle");
			if (if_block0) if_block0.c();
			line0 = svg_element("line");
			line1 = svg_element("line");
			if (if_block1) if_block1.c();
			this.c = noop;
			attr_dev(circle, "class", "clock-face");
			attr_dev(circle, "r", "48");
			add_location(circle, file, 94, 2, 1810);
			attr_dev(line0, "class", "hour");
			attr_dev(line0, "y1", "2");
			attr_dev(line0, "y2", "-20");
			attr_dev(line0, "transform", line0_transform_value = "rotate(" + (30 * /*hours*/ ctx[3] + /*mins*/ ctx[4] / 2) + ")");
			add_location(line0, file, 120, 2, 2333);
			attr_dev(line1, "class", "minute");
			attr_dev(line1, "y1", "4");
			attr_dev(line1, "y2", "-30");
			attr_dev(line1, "transform", line1_transform_value = "rotate(" + (6 * /*mins*/ ctx[4] + /*secs*/ ctx[5] / 10) + ")");
			add_location(line1, file, 128, 2, 2459);
			attr_dev(svg, "viewBox", "-50 -50 100 100");
			add_location(svg, file, 93, 0, 1776);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, circle);
			if (if_block0) if_block0.m(svg, null);
			append_dev(svg, line0);
			append_dev(svg, line1);
			if (if_block1) if_block1.m(svg, null);
		},
		p: function update(ctx, [dirty]) {
			if (/*markers*/ ctx[1] !== "none") {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(svg, line0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*hours, mins*/ 24 && line0_transform_value !== (line0_transform_value = "rotate(" + (30 * /*hours*/ ctx[3] + /*mins*/ ctx[4] / 2) + ")")) {
				attr_dev(line0, "transform", line0_transform_value);
			}

			if (dirty & /*mins, secs*/ 48 && line1_transform_value !== (line1_transform_value = "rotate(" + (6 * /*mins*/ ctx[4] + /*secs*/ ctx[5] / 10) + ")")) {
				attr_dev(line1, "transform", line1_transform_value);
			}

			if (/*secondhand*/ ctx[0] === "true") {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(svg, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let hours;
	let mins;
	let secs;
	let steps;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ana-clock", slots, []);
	let { secondhand = "true" } = $$props;
	let { markers = "sixty" } = $$props;
	let { offset = "" } = $$props;
	const host = get_current_component();
	const now = () => getNow(offset);
	let time = now();
	let stopped;

	function stop() {
		stopped = true;
	}

	function restart() {
		stopped = false;
	}

	function update() {
		$$invalidate(9, time = now());
		dispatchTick(host, time);
	}

	onMount(async () => {
		await tick();
		update();
		let counter = 0;

		const interval = setInterval(
			() => {
				if (stopped) return;

				if (secondhand !== "true") {
					if (++counter < 60) return;
					counter = 0;
				}

				update();
			},
			1000
		);

		return () => clearInterval(interval);
	});

	const writable_props = ["secondhand", "markers", "offset"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ana-clock> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("secondhand" in $$props) $$invalidate(0, secondhand = $$props.secondhand);
		if ("markers" in $$props) $$invalidate(1, markers = $$props.markers);
		if ("offset" in $$props) $$invalidate(2, offset = $$props.offset);
	};

	$$self.$capture_state = () => ({
		onMount,
		tick,
		get_current_component,
		dispatchTick,
		getNow,
		secondhand,
		markers,
		offset,
		host,
		now,
		time,
		stopped,
		stop,
		restart,
		update,
		hours,
		mins,
		secs,
		steps
	});

	$$self.$inject_state = $$props => {
		if ("secondhand" in $$props) $$invalidate(0, secondhand = $$props.secondhand);
		if ("markers" in $$props) $$invalidate(1, markers = $$props.markers);
		if ("offset" in $$props) $$invalidate(2, offset = $$props.offset);
		if ("time" in $$props) $$invalidate(9, time = $$props.time);
		if ("stopped" in $$props) stopped = $$props.stopped;
		if ("hours" in $$props) $$invalidate(3, hours = $$props.hours);
		if ("mins" in $$props) $$invalidate(4, mins = $$props.mins);
		if ("secs" in $$props) $$invalidate(5, secs = $$props.secs);
		if ("steps" in $$props) $$invalidate(6, steps = $$props.steps);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*secondhand*/ 1) {
			tick().then(() => host.setAttribute("secondhand", secondhand));
		}

		if ($$self.$$.dirty & /*markers*/ 2) {
			tick().then(() => host.setAttribute("markers", markers));
		}

		if ($$self.$$.dirty & /*offset*/ 4) {
			tick().then(() => host.setAttribute("offset", offset));
		}

		if ($$self.$$.dirty & /*time*/ 512) {
			$$invalidate(3, hours = time.getHours());
		}

		if ($$self.$$.dirty & /*time*/ 512) {
			$$invalidate(4, mins = time.getMinutes());
		}

		if ($$self.$$.dirty & /*time*/ 512) {
			$$invalidate(5, secs = time.getSeconds());
		}

		if ($$self.$$.dirty & /*markers*/ 2) {
			$$invalidate(6, steps = markers === "four"
			? [0, 15, 30, 45]
			: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
		}
	};

	return [secondhand, markers, offset, hours, mins, secs, steps, stop, restart, time];
}

class Ana_clock extends SvelteElement {
	constructor(options) {
		super();
		this.shadowRoot.innerHTML = `<style>:host{display:block}svg{width:100%;height:100%}.clock-face{stroke:#333;fill:white}.minor{stroke:#999;stroke-width:0.5}.major{stroke:#333;stroke-width:1}.hour{stroke:#333}.minute{stroke:#666}.second,.second-counterweight{stroke:rgb(180,0,0)}.second-counterweight{stroke-width:3}</style>`;

		init(
			this,
			{
				target: this.shadowRoot,
				props: attribute_to_object(this.attributes)
			},
			instance,
			create_fragment,
			not_equal,
			{
				secondhand: 0,
				markers: 1,
				offset: 2,
				stop: 7,
				restart: 8
			}
		);

		if (options) {
			if (options.target) {
				insert_dev(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["secondhand", "markers", "offset", "stop", "restart"];
	}

	get secondhand() {
		return this.$$.ctx[0];
	}

	set secondhand(secondhand) {
		this.$set({ secondhand });
		flush();
	}

	get markers() {
		return this.$$.ctx[1];
	}

	set markers(markers) {
		this.$set({ markers });
		flush();
	}

	get offset() {
		return this.$$.ctx[2];
	}

	set offset(offset) {
		this.$set({ offset });
		flush();
	}

	get stop() {
		return this.$$.ctx[7];
	}

	set stop(value) {
		throw new Error("<ana-clock>: Cannot set read-only property 'stop'");
	}

	get restart() {
		return this.$$.ctx[8];
	}

	set restart(value) {
		throw new Error("<ana-clock>: Cannot set read-only property 'restart'");
	}
}

customElements.define("ana-clock", Ana_clock);

export default Ana_clock;
//# sourceMappingURL=ana-clock.mjs.map
