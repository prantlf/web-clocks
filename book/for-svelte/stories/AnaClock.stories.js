import AnaClock from '../../../src/ana-clock.svelte'

export default {
  title: 'Example/AnaClock',
  component: AnaClock,
  argTypes: {
    secondhand: { control: 'boolean' },
    onTick: { action: 'onTick' }
  }
}

const Template = ({ onTick, ...args }) => ({
  Component: AnaClock,
  props: args,
  on: { tick: onTick }
})

export const Default = Template.bind({})
Default.args = {}

export const NoSecondHand = Template.bind({})
NoSeconds.args = { secondhand: 'false' }
