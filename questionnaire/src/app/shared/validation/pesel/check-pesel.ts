export function checkSum(pesel: any[]) {
  let sum = 1 * pesel[0] +
    3 * pesel[1] +
    7 * pesel[2] +
    9 * pesel[3] +
    1 * pesel[4] +
    3 * pesel[5] +
    7 * pesel[6] +
    9 * pesel[7] +
    1 * pesel[8] +
    3 * pesel[9];
  sum %= 10;
  sum = 10 - sum;
  sum %= 10;

  if (sum.toString() === pesel[10]) {
    return true;
  } else {
    return false;
  }
}

function getBirthMonth(pesel: any[]) {
  let month;
  month = 10 * +pesel[2];
  month += +pesel[3];
  if (month > 80 && month < 93) {
    month -= 80;
  } else if (month > 20 && month < 33) {
    month -= 20;
  } else if (month > 40 && month < 53) {
    month -= 40;
  } else if (month > 60 && month < 73) {
    month -= 60;
  }
  return month;
}

function getBirthDay(pesel: any[]) {
  let day;
  day = 10 * +pesel[4];
  day += +pesel[5];
  return day;
}

export function checkMonth(pesel: any[]) {
  const month = getBirthMonth(pesel);
  if (month > 0 && month < 13) {
    return true;
  } else {
    return false;
  }
}

function getBirthYear(pesel: any[]) {
  let year;
  year = 10 * +pesel[0];
  year += +pesel[1];
  const month = getBirthMonth(pesel);
  if (month > 80 && month < 93) {
    year += 1800;
  } else if (month > 0 && month < 13) {
    year += 1900;
  } else if (month > 20 && month < 33) {
    year += 2000;
  } else if (month > 40 && month < 53) {
    year += 2100;
  } else if (month > 60 && month < 73) {
    year += 2200;
  }
  return year;
}

function leapYear(year) {
  if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
    return true;
  } else {
    return false;
  }
}

export function checkDay(pesel: any[]) {
  const year = getBirthYear(pesel);
  const month = getBirthMonth(pesel);
  const day = getBirthDay(pesel);
  if ((day > 0 && day < 32) &&
    (month === 1 || month === 3 || month === 5 ||
      month === 7 || month === 8 || month === 10 ||
      month === 12)) {
    return true;
  } else if ((day > 0 && day < 31) &&
    (month === 4 || month === 6 || month === 9 ||
      month === 11)) {
    return true;
  } else if ((day > 0 && day < 30 && leapYear(year)) ||
    (day > 0 && day < 29 && !leapYear(year))) {
    return true;
  } else {
    return false;
  }
}
