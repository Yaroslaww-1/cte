import { DateTime } from 'luxon';

const dateAndTime = (): string => {
  const date = DateTime.now().toLocaleString(DateTime.DATE_FULL);
  const time = DateTime.now().toLocaleString({
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  return `${date} ${time}`;
};

export default dateAndTime;
