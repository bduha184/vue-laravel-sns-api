const getDays = (day) => {
  const date = new Date(day);
  const y = date.getFullYear();
  const m = ("0"+(date.getMonth()+1));
  const d = ("0"+date.getDate());
  const h = ("0"+date.getHours());
  const i = ("0"+date.getMinutes());
  return `${y}/${m}/${d} ${h}:${i}`;
}


export {getDays};
