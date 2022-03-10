function padTime(time: number, z?: number, x?: number) {
  z = z || 2;
  let num = ('00' + time).slice(-z);
  if (x) {
    num = num.slice(0, x);
  }
  return num;
}

export default padTime;
