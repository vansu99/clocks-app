export default function formatTimer(s: number) {
  const milliseconds = s % 1000;
  s = (s - milliseconds) / 1000;
  const seconds = s % 60;
  s = (s - seconds) / 60;
  const minutes = s % 60;
  const hours = (s - minutes) / 60;

  return {
    hours,
    minutes,
    seconds,
    millisecond: milliseconds,
  };
}
