export const getMeanDate = (minDate: string, maxDate: string) => {
  return new Date(
    new Date(minDate).getTime() +
      (new Date(maxDate).getTime() - new Date(minDate).getTime()) / 2
  );
};

export const getDateInInterval = (startDate: string | Date, endDate: string | Date) => {
  let resultDate: Date[] = [];
  let start = new Date(startDate);
  let end = new Date(endDate);

  while (start < end) {
    resultDate.push(start);
    start = new Date(
      start.getFullYear() + 1,
      start.getMonth(),
      start.getDate()
    );
  }
  
  return resultDate;
  // if(!startDate) return []
};
