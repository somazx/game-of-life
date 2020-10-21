module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'svelte'],
  "roots": [
    "<rootDir>",
  ],
  "modulePaths": [
    "<rootDir>",
    "<rootDir>/src"
  ],
  "moduleDirectories": [
    "node_modules"
  ],
}
