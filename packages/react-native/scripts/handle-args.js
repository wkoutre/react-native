function getArguments() {
  const { program } = require('commander');

  program
    .description('Generator for the storybook.requires file used in react native storybook')
    .option(
      '-c, --config-path <path>',
      'The path to your config folder relative to your project-dir',
      './.storybook'
    )
    .option('-js, --use-js', 'Use a js file for storybook.requires')
    .option('-a, --absolute', 'Use absolute paths for story imports');

  program.parse();

  return program.opts();
}

module.exports = { getArguments };
