const numberFormat = (number, width) => {
  return new Array(width + 1 - (number + '').length).join('0') + number;
};

export default function secondsToTime(secs)
{
  secs = Math.round(secs);
  const hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  const obj = {
    "h": hours,
    "m": minutes,
    "s": seconds
  };

  return numberFormat(minutes,2)+" : " +numberFormat(seconds,2);
}
