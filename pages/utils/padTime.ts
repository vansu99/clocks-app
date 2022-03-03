function padTime(time: number) {
  return ("00" + time).slice(-2)
}

export default padTime