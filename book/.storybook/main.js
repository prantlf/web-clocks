export default {
  stories: [
    '../stories'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/html-vite'
  },
  docs: {
    autodocs: false,
    defaultName: 'Documentation'
  }
}
