export const reminderToReadableFormat = (time) => {
  const isTimestamp = /^\d*$/.test(time);

  return isTimestamp
    ? timestampToReadableFormat(time)
    : cronToReadableFormat(time);
};

export const dateToDailyCron = (date) =>
  `${date.getUTCMinutes()} ${date.getUTCHours()} * * *`;

export const dateToWeeklyCron = (date) =>
  `${date.getUTCMinutes()} ${date.getUTCHours()} * * ${date.getUTCDay()}`;

export const dateToMonthlyCron = (date) =>
  `${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} * *`;

const getFormattedTime = (minutesUTC, hoursUTC) => {
  const time = new Date();

  time.setUTCMinutes(minutesUTC);
  time.setUTCHours(hoursUTC);

  const timeFromat = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return timeFromat.format(time);
};

const getFormattedWeekday = (dayOfWeek) => {
  const date = new Date();

  date.setUTCDate(dayOfWeek);

  const timeFromat = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  });

  return timeFromat.format(date);
};

const timestampToReadableFormat = (timestamp) => {
  const timestampFromat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return timestampFromat.format(new Date(parseInt(timestamp, 10)));
};

const cronToReadableFormat = (cron) => {
  //NOSONAR
  const cronRegex = /^([*\d]*) ([*\d]*) ([*\d]*) ([*\d]*) ([*\d]*)$/;
  const match = cron.match(cronRegex);

  if (!match) {
    return null;
  }

  const minutesUTC = match[1];
  const hoursUTC = match[2];
  const dayOfMonth = match[3];
  const dayOfWeek = match[5];

  let every;
  if (dayOfWeek !== '*') {
    every = `${getFormattedWeekday(dayOfWeek)}`;
  } else if (dayOfMonth !== '*') {
    every = `${dayOfMonth} day of month`;
  } else {
    every = 'day';
  }

  return `every ${every} at ${getFormattedTime(minutesUTC, hoursUTC)}`;
};
