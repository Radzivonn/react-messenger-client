export const getTime = (date: string) =>
  `${new Date(date).getHours()}:${new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()}`;
