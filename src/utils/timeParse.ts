export const timeParce = (timeStr: string) => {
  const msUTC = Date.parse(timeStr);
  const date = new Date(msUTC);
  const minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${date.getHours()}: ${minutes}`;
};
