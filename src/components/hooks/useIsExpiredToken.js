import { BACK_API } from "react-native-dotenv";
import axios from "axios";

const useIsExpiredToken = async (token) => {
  try {
    await axios.post(
      `${BACK_API}users/token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return false;
  } catch (err) {
    return true;
  }
};

export default useIsExpiredToken;
