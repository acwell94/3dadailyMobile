import { GOOGLE_API_KEY } from "react-native-dotenv";

import * as dotenv from "dotenv";

dotenv.config();
module.exports = {
  android: {
    package: "com.store.dailyleminyoung",
    versionCode: 2,
    permissions: [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",
    ],
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
