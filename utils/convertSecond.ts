function convertSecond(hours: number, minutes: number, seconds: number): number {
  return seconds + minutes * 60 + hours * 60 * 60;
}

export default convertSecond