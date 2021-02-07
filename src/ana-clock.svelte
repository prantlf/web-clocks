<svelte:options tag="ana-clock" immutable={true} />

<script>
  import { onMount, tick } from 'svelte'
  import { get_current_component } from 'svelte/internal'
  import dispatchTick from './util/dispatch-tick'
  import getNow from './util/get-now'

  export let secondhand = 'true'
  export let markers = 'sixty'
  export let offset = ''

  const host = get_current_component()
  const now = () => getNow(offset)
  let time = now()

  $: tick().then(() => host.setAttribute('secondhand', secondhand))
  $: tick().then(() => host.setAttribute('markers', markers))
  $: tick().then(() => host.setAttribute('offset', offset))

  $: hours = time.getHours()
  $: mins = time.getMinutes()
  $: secs = time.getSeconds()
  $: steps = markers === 'four' ? [0, 15, 30, 45] :
    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

  let stopped
  export function stop() { stopped = true }
  export function restart() { stopped = false }

  function update() {
    time = now()
    dispatchTick(host, time)
  }

  onMount(async () => {
    await tick()
    update()
    let counter = 0
    const interval = setInterval(() => {
      if (stopped) return
      if (secondhand !== 'true') {
        if (++counter < 60) return
        counter = 0
      }
      update()
    }, 1000)
    return () => clearInterval(interval)
  })
</script>

<style>
  :host {
    display: block;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  .clock-face {
    stroke: #333;
    fill: white;
  }

  .minor {
    stroke: #999;
    stroke-width: 0.5;
  }

  .major {
    stroke: #333;
    stroke-width: 1;
  }

  .hour {
    stroke: #333;
  }

  .minute {
    stroke: #666;
  }

  .second, .second-counterweight {
    stroke: rgb(180,0,0);
  }

  .second-counterweight {
    stroke-width: 3;
  }
</style>

<svg viewBox='-50 -50 100 100'>
  <circle class='clock-face' r='48'/>

  <!-- markers -->
  {#if markers !== 'none'}
    {#each steps as minute}
      <line
        class='major'
        y1='35'
        y2='45'
        transform='rotate({30 * minute})'
      />

      {#if markers === 'sixty'}
        {#each [1, 2, 3, 4] as offset}
          <line
            class='minor'
            y1='42'
            y2='45'
            transform='rotate({6 * (minute + offset)})'
          />
        {/each}
      {/if}
    {/each}
  {/if}

  <!-- hour hand -->
  <line
    class='hour'
    y1='2'
    y2='-20'
    transform='rotate({30 * hours + mins / 2})'
  />

  <!-- minute hand -->
  <line
    class='minute'
    y1='4'
    y2='-30'
    transform='rotate({6 * mins + secs / 10})'
  />

  <!-- second hand -->
  {#if secondhand === 'true'}
    <g transform='rotate({6 * secs})'>
      <line class='second' y1='10' y2='-38'/>
      <line class='second-counterweight' y1='10' y2='2'/>
    </g>
  {/if}
</svg>
