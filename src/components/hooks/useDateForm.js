const useDateForm = (dateForm) => {
  if (dateForm === "") {
    return { year: "2023", month: "01", date: "01", day: "SAT" };
  }
  const splitDate = dateForm.split("-");

  let month;
  const day = splitDate[3].toUpperCase();

  switch (splitDate[1]) {
    case "01": {
      month = "JAN";
      break;
    }
    case "02": {
      month = "FEB";
      break;
    }
    case "03": {
      month = "MAR";
      break;
    }
    case "04": {
      month = "APR";
      break;
    }
    case "05": {
      month = "MAY";
      break;
    }
    case "06": {
      month = "JUN";
      break;
    }
    case "07": {
      month = "JUL";
      break;
    }
    case "08": {
      month = "AUG";
      break;
    }
    case "09": {
      month = "SEP";
      break;
    }
    case "10": {
      month = "OCT";
      break;
    }
    case "11": {
      month = "NOV";
      break;
    }
    case "12": {
      month = "DEC";
      break;
    }
    default: {
      console.log("error");
    }
  }

  return { year: splitDate[0], month, date: splitDate[2], day };
};
export default useDateForm;
