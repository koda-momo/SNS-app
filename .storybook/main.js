module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
    '@storybook/addon-interactions',
  ],
  staticDirs: ['../public'], // Storybookで使用する静的ファイルを指定
  framework: "@storybook/react",
};
