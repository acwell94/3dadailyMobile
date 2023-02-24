import { Feeling, Weather, What, WithWhom } from "../../utils/contents";

const useDetailIcon = (feel, weather, who, what) => {
  const feelImg = Feeling.find((el) => String(el.id) === feel);
  const weatherImg = Weather.find((el) => String(el.id) === weather);
  const whoImg = WithWhom.find((el) => String(el.id) === who);
  const whatImg = What.find((el) => String(el.id) === what);

  return { feelImg, weatherImg, whoImg, whatImg };
};

export default useDetailIcon;
