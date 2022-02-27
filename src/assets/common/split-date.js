export const SplitDate = (longDate) => {
    const dateParts = longDate ? longDate?.toString().split("T") : ["-", "-"];
    const dateSplit = dateParts[0].split("-");

    const waDate = longDate
        ? `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`
        : "-";
    const shortCodedDate = (longDate)
        ? `${dateSplit[2]}${dateSplit[1]}${dateSplit[0].substring(2)}`
        : "-";

    return ({
        "date": waDate,
        "time": waDate !== "-" ? waDate.substring(0, 8) : "",
        "dateTime": longDate ? `${waDate} ${dateParts[1].substring(0, 8)}` : waDate,
        "codedDate": shortCodedDate,
    });
}

export const ShortDateToCoded = (shortDate) => {
    /**
     * Converts the date
     * to a 6-digit
     * short format
     */
    const splitDate = shortDate ? shortDate.split("-") : ["-", "-"]
    return (
        splitDate[2] + splitDate[1] + splitDate[0].substring(2)
    )
}

function formatDate(val) {
    if (val < 10) {
        return `0${val}`
    } else {
        return `${val}`
    }
}

export const SplitDateFromTimestamp = timeStamp => {
    const longDate = new Date(parseInt(timeStamp));

    const waDate = formatDate(longDate.getDate()) +
          "/" + formatDate(longDate.getMonth() + 1) +
          "/2022" + //longDate.getFullYear() +
          " " + formatDate(longDate.getHours()) +
          ":" + formatDate(longDate.getMinutes()) +
          ":" + formatDate(longDate.getSeconds())

    return ({
        "date": waDate.split(" ")[0],
        "time": waDate.split(" ")[1],
        "timeNoSecs": waDate.split(" ")[1].substring(0, 5),
        "dateTime": waDate,

    });
}
