import { GOOGLE_API_KEY } from "react-native-dotenv";

import * as dotenv from "dotenv";

dotenv.config();
module.exports = {
  name: "삼다일기",
  slug: "3dadaily",
  version: "1.0.2",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/logoSplash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  android: {
    package: "com.store.dailyleminyoung",
    versionCode: 4,
    permissions: [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",
    ],
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_API_KEY,
      },
    },
  },
  extra: {
    eas: {
      projectId: "501a3c8a-3e27-4209-9dcb-a34b2f7610d9",
    },
  },
};
