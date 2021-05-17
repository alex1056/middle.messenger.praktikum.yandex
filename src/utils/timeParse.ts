export const timeParce = (timeStr: string) => {
  const msUTC = Date.parse(timeStr);
  const date = new Date(msUTC);
  return `${date.getHours()}: ${date.getMinutes()}`;
};
