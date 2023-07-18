export const getTodayDate = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = String(dateNow.getMonth() + 1).padStart(2, '0');
  const day = String(dateNow.getDate()).padStart(2, '0');
  const hour = String(dateNow.getHours()).padStart(2, '0');
  const minute = String(dateNow.getMinutes()).padStart(2, '0');
  const today = `${year}-${month}-${day}T${hour}:${minute}`;
  return today;
};

export const getDate = (date: string) => {
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.substring(8, date.indexOf('T'));
  const hour = date.substring(11, date.indexOf(':'));
  const minute = date.substring(14, 16);
  const today = `${year}년 ${month}월 ${day}일 ${hour}시${minute}분`;
  return today;
};
