import { useEffect, useState } from 'react';

export const useDate = (events, nav) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  const eventForDate = date => {
    //First, fitler the date by getting the time component...
    let dateEvent;

    //The starttime comes in milliseconds... Thus,
    // get the first and last hour/time in this
    // day in order to know whether it falls into
    // the range...
    const dateInMilliseconds = new Date(date).getTime() / 1000;
    const dateEndInMilliseconds = dateInMilliseconds + (60 * 60 * 24)

    dateEvent = (events.length > 0)
      ? events?.find(e => e?.starttime >= dateInMilliseconds && e?.starttime <= dateEndInMilliseconds)
      : {};

    return dateEvent;

  };

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const d = i - paddingDays > 9 ? i - paddingDays : "0" + (i - paddingDays);
      const mnt = (month + 1) > 9 ? month + 1 - month : "0" + (month + 1)
      const dayString = `${d}/${mnt}/${year}`;

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString) === {} ? null : eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: '',
        });
      }
    }

    setDays(daysArr);
  }, [events, nav]);

  return {
    days,
    dateDisplay,
  };
};
