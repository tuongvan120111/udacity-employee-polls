export const convertDate = (date) => {
  if (!date) {
    return "";
  }

  const newDate = new Date(date);
  const dateTime = newDate.toLocaleTimeString();
  const [time, meridiem] = dateTime.split(" ");
  const [hour, min, second] = time.split(":");
  const localDate = newDate.toLocaleDateString();
  return `${hour}:${min} ${meridiem} | ${localDate}`;
};
