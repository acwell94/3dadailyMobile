import { atom } from "recoil";
import uuid from "react-native-uuid";

export const userState = atom({
  key: `${uuid.v4()}`,
  default: {
    name: "",
    userId: "",
    email: "",
    profileImg: "",
  },
});
