import { withActions } from '@storybook/addon-actions/decorator'
import DigiClock from '../../dist/digi-clock.mjs'

export default {
  title: 'Components/DigiClock',
  component: DigiClock,

  parameters: {
    actions: {
      handles: ['tick']
    },

    controls: {
      disable: true,
      expanded: true,
      hideNoControlsWarning: true
    }
  },

  decorators: [withActions]
}

export const Default = {
  args: {
    name: 'Default',
    primary: true
  },
  // parameters: {
  //   docs: {
  //     story: { inline: true },
  //     canvas: { sourceState: 'shown' },
  //     source: { type: 'code' }
  //   }
  // },
  render: () => `
<digi-clock></digi-clock>
`
}

export const NoSeconds = {
  render: () => `
<digi-clock seconds=false></digi-clock>
`,
  name: 'No Seconds'
}

export const UseEstTz = {
  render: () => `
<digi-clock offset=-300></digi-clock>
`,
  name: 'Use EST TZ'
}

export const Configurable = {
  render: ({ seconds, offset }) => `
<digi-clock seconds=${seconds} offset=${offset}></digi-clock>
`,
  name: 'Configurable',

  argTypes: {
    seconds: {
      description: 'disables the second part',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true
        }
      }
    },

    offset: {
      description: 'adds the offset in minutes to UTC',
      control: {
        type: 'number',
        min: -720,
        max: 720,
        step: 30
      },
      table: {
        defaultValue: {
          summary: 0
        }
      }
    },

    onTick: {
      description: 'when the second or the minute hand moves',
      action: 'tick'
    }
  },

  args: {
    seconds: true,
    offset: 0,
  },

  parameters: {
    controls: {
      disable: false
    }
  },
}
