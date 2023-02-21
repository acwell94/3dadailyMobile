module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
