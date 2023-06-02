
const getDays = (day) => {
  const date = new Date(day);
  const y = date.getFullYear();
  const m = ("0"+(date.getMonth()+1));
  const d = ("0"+date.getDate()).slice(-2);
  const h = ("0"+date.getHours()).slice(-2);
  const i = ("0"+date.getMinutes()).slice(-2);
  return `${y}/${m}/${d} ${h}:${i}`;
}

export {getDays};
