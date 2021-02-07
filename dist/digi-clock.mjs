
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
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function empty() {
    return text('');
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
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
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

function pad(value) {
  return value < 10 ? `0${value}` : value
}

/* src/digi-clock.svelte generated by Svelte v3.32.1 */
const file = "src/digi-clock.svelte";

// (49:37) {#if seconds === 'true'}
function create_if_block(ctx) {
	let span;
	let t1_value = pad(/*secs*/ ctx[3]) + "";
	let t1;

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = ":";
			t1 = text(t1_value);
			add_location(span, file, 48, 61, 1207);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			insert_dev(target, t1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*secs*/ 8 && t1_value !== (t1_value = pad(/*secs*/ ctx[3]) + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (detaching) detach_dev(t1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(49:37) {#if seconds === 'true'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0_value = pad(/*hours*/ ctx[1]) + "";
	let t0;
	let span;
	let t2_value = pad(/*mins*/ ctx[2]) + "";
	let t2;
	let if_block_anchor;
	let if_block = /*seconds*/ ctx[0] === "true" && create_if_block(ctx);

	const block = {
		c: function create() {
			t0 = text(t0_value);
			span = element("span");
			span.textContent = ":";
			t2 = text(t2_value);
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.c = noop;
			add_location(span, file, 48, 12, 1158);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, span, anchor);
			insert_dev(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*hours*/ 2 && t0_value !== (t0_value = pad(/*hours*/ ctx[1]) + "")) set_data_dev(t0, t0_value);
			if (dirty & /*mins*/ 4 && t2_value !== (t2_value = pad(/*mins*/ ctx[2]) + "")) set_data_dev(t2, t2_value);

			if (/*seconds*/ ctx[0] === "true") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(span);
			if (detaching) detach_dev(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("digi-clock", slots, []);
	let { seconds = "true" } = $$props;
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
		$$invalidate(7, time = now());
		dispatchTick(host, time);
	}

	onMount(async () => {
		await tick();
		update();
		let counter = 0;

		const interval = setInterval(
			() => {
				if (stopped) return;

				if (seconds !== "true") {
					if (++counter < 60) return;
					counter = 0;
				}

				update();
			},
			1000
		);

		return () => clearInterval(interval);
	});

	const writable_props = ["seconds", "offset"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<digi-clock> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("seconds" in $$props) $$invalidate(0, seconds = $$props.seconds);
		if ("offset" in $$props) $$invalidate(4, offset = $$props.offset);
	};

	$$self.$capture_state = () => ({
		onMount,
		tick,
		get_current_component,
		dispatchTick,
		getNow,
		pad,
		seconds,
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
		secs
	});

	$$self.$inject_state = $$props => {
		if ("seconds" in $$props) $$invalidate(0, seconds = $$props.seconds);
		if ("offset" in $$props) $$invalidate(4, offset = $$props.offset);
		if ("time" in $$props) $$invalidate(7, time = $$props.time);
		if ("stopped" in $$props) stopped = $$props.stopped;
		if ("hours" in $$props) $$invalidate(1, hours = $$props.hours);
		if ("mins" in $$props) $$invalidate(2, mins = $$props.mins);
		if ("secs" in $$props) $$invalidate(3, secs = $$props.secs);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*seconds*/ 1) {
			tick().then(() => host.setAttribute("seconds", seconds));
		}

		if ($$self.$$.dirty & /*offset*/ 16) {
			tick().then(() => host.setAttribute("offset", offset));
		}

		if ($$self.$$.dirty & /*time*/ 128) {
			$$invalidate(1, hours = time.getHours());
		}

		if ($$self.$$.dirty & /*time*/ 128) {
			$$invalidate(2, mins = time.getMinutes());
		}

		if ($$self.$$.dirty & /*time*/ 128) {
			$$invalidate(3, secs = time.getSeconds());
		}
	};

	return [seconds, hours, mins, secs, offset, stop, restart, time];
}

class Digi_clock extends SvelteElement {
	constructor(options) {
		super();

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
				seconds: 0,
				offset: 4,
				stop: 5,
				restart: 6
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
		return ["seconds", "offset", "stop", "restart"];
	}

	get seconds() {
		return this.$$.ctx[0];
	}

	set seconds(seconds) {
		this.$set({ seconds });
		flush();
	}

	get offset() {
		return this.$$.ctx[4];
	}

	set offset(offset) {
		this.$set({ offset });
		flush();
	}

	get stop() {
		return this.$$.ctx[5];
	}

	set stop(value) {
		throw new Error("<digi-clock>: Cannot set read-only property 'stop'");
	}

	get restart() {
		return this.$$.ctx[6];
	}

	set restart(value) {
		throw new Error("<digi-clock>: Cannot set read-only property 'restart'");
	}
}

customElements.define("digi-clock", Digi_clock);

export default Digi_clock;
//# sourceMappingURL=digi-clock.mjs.map
