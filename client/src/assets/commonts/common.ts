export const getTodayDate = () => {
  const dateNow = new Date();
  console.log(dateNow);
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, '0');
  const day = String(dateNow.getDate()).padStart(2, '0');
  const hour = String(dateNow.getHours()).padStart(2, '0');
  const minute = String(dateNow.getMinutes()).padStart(2, '0');
  const today = `${year}-${month}-${day}T${hour}:${minute}`;
  return today;
};
