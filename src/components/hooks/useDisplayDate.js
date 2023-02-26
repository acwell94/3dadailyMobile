const useDisplayDate = (data) => {
  if (!data) return;

  const year = String(data?.getFullYear());
  const month = String(data?.getMonth() + 1).padStart(2, "0");
  const date = String(data?.getDate()).padStart(2, "0");

  const weekday = new Array(7);
  weekday[0] = "일";
  weekday[1] = "월";
  weekday[2] = "화";
  weekday[3] = "수";
  weekday[4] = "목";
  weekday[5] = "금";
  weekday[6] = "토";

  const day = weekday[data?.getDay()];

  const selectedDate = `${year}년 ${month}월 ${date}일 ${day}요일`;

  return selectedDate;
};

export default useDisplayDate;
