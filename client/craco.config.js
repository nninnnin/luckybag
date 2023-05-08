const cracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: "jsconfig",
        jsConfigPath: "jsconfig.paths.json",
      },
    },
  ],
};
