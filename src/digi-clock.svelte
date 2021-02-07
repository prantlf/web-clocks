<svelte:options tag="digi-clock" immutable={true} />

<script>
  import { createEventDispatcher, onMount, tick } from 'svelte'
  import getNow from './util/get-now'
  import pad from './util/pad'

  export let seconds = 'true'
  export let offset = ''

  const now = () => getNow(offset)
  const dispatch = createEventDispatcher()

  let time = now()
  $: hours = time.getHours()
  $: mins = time.getMinutes()
  $: secs = time.getSeconds()

  let stopped
  export function stop() { stopped = true }
  export function restart() { stopped = false }

  function update() {
    time = now()
    dispatch('tick', time)
  }

  onMount(async () => {
    await tick()
    update()
    let counter = 0
    const interval = setInterval(() => {
      if (stopped) return
      if (seconds !== 'true') {
        if (++counter < 60) return
        counter = 0
      }
      update()
    }, 1000)
    return () => clearInterval(interval)
  })
</script>

{pad(hours)}<span>:</span>{pad(mins)}{#if seconds === 'true'}<span>:</span>{pad(secs)}{/if}
