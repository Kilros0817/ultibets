export const getEllipsisTxt = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return '';
};

// format example: "", "-"
export const getFormattedDateString = (date: Date, format: string) => {
  const yyyy: any = date.getFullYear();
  let mm: any = addZero(date.getMonth() + 1); // Months start at 0!
  let dd: any = addZero(date.getDate());
  const formattedDate = yyyy + format + mm + format + dd;

  return formattedDate;
}

export const getFormattedTime = (date: Date) => {
  let hh = addZero(date.getHours());
  let mm = addZero(date.getMinutes());
  let ss = addZero(date.getSeconds());
  let formattedTime = hh + ":" + mm + ":" + ss;

  return formattedTime;
}

function addZero(i: any) {
  if (i < 10) { i = "0" + i }
  return i;
}
