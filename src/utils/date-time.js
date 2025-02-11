export const convertDate = (date) => {
  if (!date) {
    return "";
  }

  const newDate = new Date(date);
  const isDateValid = !isNaN(newDate);
  if (!isDateValid) {
    return "";
  }

  const dateTime = newDate.toLocaleTimeString();
  const [time, meridiem] = dateTime.split(" ");
  const [hour, min] = time.split(":");
  const localDate = newDate.toLocaleDateString();
  return `${hour}:${min} ${meridiem} | ${localDate}`;
};
