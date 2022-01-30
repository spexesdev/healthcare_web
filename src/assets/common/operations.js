export const toTimestamp = (year,month,day,hour,minute,second) => {
    var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
    return datum.getTime()/1000;
}

export const DynamicSort = (property, sortType = "asc") => {
    const sortOrder = sortType === "asc" ? 1 : -1;

    return function (a, b) {
        const secVal = (a[property] > b[property]) ? 1 : 0;
        const result = (a[property] < b[property])
            ? -1
            : secVal;

        return result * sortOrder;
    }
}

export const shortDateString = dateValue => {
    const fullDate = new Date(dateValue);

    return (fullDate.getDate().length > 9 ? "0" : "") + fullDate.getDate() + " " + monthToShortString(fullDate.getMonth()) + " " + fullDate.getFullYear();
}

const monthToShortString = intMonthVal => {

    let retMonth;

    switch (intMonthVal) {
        case 1:
            retMonth = 'Jan';
            break;
        case 2:
            retMonth = 'Feb';
            break;
        default:
            retMonth = 'Dec'
            break;
    }

    return retMonth;

}
