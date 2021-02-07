<svelte:options tag="digi-clock" immutable={true} />

<script>
  import { onMount, tick } from 'svelte'
  import { get_current_component } from 'svelte/internal'
  import getNow from './util/get-now'
  import pad from './util/pad'
  import dispatchTick from './util/dispatch-tick'

  export let seconds = 'true'
  export let offset = ''

  const now = () => getNow(offset)
  const notify = () => dispatchTick(host, time)

  const host = get_current_component()
  let time = now()
  $: hours = time.getHours()
  $: mins = time.getMinutes()
  $: secs = time.getSeconds()

  onMount(async () => {
    await tick();
    time = now();
    notify()
    let counter = 0
    const interval = setInterval(() => {
      if (seconds !== 'true') {
        if (++counter < 60) return
        counter = 0
      }
      time = now()
      notify()
    }, 1000)
    return () => clearInterval(interval)
  })
</script>

{pad(hours)}<span>:</span>{pad(mins)}{#if seconds === 'true'}<span>:</span>{pad(secs)}{/if}
