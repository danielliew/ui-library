export const subtractMonths = (d: Date, months: number): Date => {
  const newDate = new Date(d);
  newDate.setDate(1);
  newDate.setMonth(d.getMonth() - months);
  return newDate;
};

export const addMonths = (d: Date, months: number): Date => {
  const newDate = new Date(d);
  newDate.setDate(1);
  newDate.setMonth(d.getMonth() + months);
  return newDate;
};

export const getMonth = (
  d: Date,
  type: "default" | "short" = "default"
): string => {
  let m = "";
  switch (d.getMonth()) {
    case 0:
      m = "January";
      break;
    case 1:
      m = "February";
      break;
    case 2:
      m = "March";
      break;
    case 3:
      m = "April";
      break;
    case 4:
      m = "May";
      break;
    case 5:
      m = "June";
      break;
    case 6:
      m = "July";
      break;
    case 7:
      m = "August";
      break;
    case 8:
      m = "September";
      break;
    case 9:
      m = "October";
      break;
    case 10:
      m = "November";
      break;
    case 11:
      m = "December";
      break;
    default:
      return "";
  }
  if (type === "short") {
    return m.slice(0, 3);
  }
  return m;
};

export const getDateOrdinal = (d: Date): string => {
  switch (d.getDate() % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const isSameDate = (d1: Date, d2: Date): boolean => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const isBeforeDate = (d1: Date, d2: Date): boolean => {
  const newD1 = new Date(
    d1.getFullYear(),
    d1.getMonth(),
    d1.getDate(),
    0,
    0,
    0,
    0
  );
  const newD2 = new Date(
    d2.getFullYear(),
    d2.getMonth(),
    d2.getDate(),
    0,
    0,
    0,
    0
  );
  return newD1.getTime() < newD2.getTime();
};

export const isSameOrBefore = (d1: Date, d2: Date): boolean => {
  return isSameDate(d1, d2) || isBeforeDate(d1, d2);
};

export const setDate = (d: Date, date: number): Date => {
  const newDate = new Date(d);
  newDate.setDate(date);
  return newDate;
};

export const subtractDays = (d: Date, days: number): Date => {
  const newDate = new Date(d);
  newDate.setDate(d.getDate() - days);
  return newDate;
};

export const addDays = (d: Date, days: number): Date => {
  const newDate = new Date(d);
  newDate.setDate(d.getDate() + days);
  return newDate;
};
