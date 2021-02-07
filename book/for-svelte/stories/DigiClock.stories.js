import DigiClock from '../../../src/digi-clock.svelte'

export default {
  title: 'Example/DigiClock',
  component: DigiClock,
  argTypes: {
    seconds: { control: 'boolean' },
    onTick: { action: 'onTick' }
  }
}

const Template = ({ onTick, ...args }) => ({
  Component: DigiClock,
  props: args,
  on: { tick: onTick }
})

export const Default = Template.bind({})
Default.args = {}

export const NoSeconds = Template.bind({})
NoSeconds.args = { seconds: 'false' }
