import { withActions } from '@storybook/addon-actions/decorator'
import AnaClock from '../../dist/ana-clock.mjs'

export default {
  title: 'Components/AnaClock',
  component: AnaClock,

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
<ana-clock></ana-clock>
`
}

export const TwelveMarkers = {
  render: () => `
<ana-clock markers=twelve></ana-clock>
`,
  name: 'Twelve Markers'
}

export const FourMarkers = {
  render: () => `
<ana-clock markers=four></ana-clock>
`,
  name: 'Four Markers'
}

export const NoMarkers = {
  render: () => `
<ana-clock markers=none></ana-clock>
`,
  name: 'No Markers'
}

export const NoSecondHand = {
  render: () => `
<ana-clock secondhand=false></ana-clock>
`,
  name: 'No Second Hand'
}

export const UseCetTz = {
  render: () => `
<ana-clock offset=60></ana-clock>
`,
  name: 'Use CET TZ'
}

export const Configurable = {
  render: ({ secondhand, markers, offset }) => `
  <ana-clock secondhand=${secondhand} markers=${markers} offset=${offset}></ana-clock>
`,
  name: 'Configurable',

  argTypes: {
    secondhand: {
      description: 'disables the second hand',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: true
        }
      }
    },

    markers: {
      description: 'chooses the density of markers',
      control: 'radio',
      options: [
        'sixty', 'twelve,', 'four', 'none'
      ],
      table: {
        defaultValue: {
          summary: 'sixty'
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
    secondhand: true,
    markers: 'sixty',
    offset: 0
  },

  parameters: {
    controls: {
      disable: false
    }
  }
}
