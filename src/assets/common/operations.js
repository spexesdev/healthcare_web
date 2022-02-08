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
    if (!dateValue) return "-"
    return (fullDate.getDate() < 10 ? "0" : "") + fullDate.getDate() + "-" + monthToShortString(fullDate.getMonth()) + "-" + fullDate.getFullYear();
}

const monthToShortString = intMonthVal => {

    let retMonth;

    switch (intMonthVal) {
        case 0:
            retMonth = 'Jan';
            break;
        case 1:
            retMonth = 'Feb';
            break;
        case 2:
            retMonth = 'Mar';
            break;
        case 3:
            retMonth = 'Apr';
            break;
        case 4:
            retMonth = 'May';
            break;
        case 5:
            retMonth = 'Jun';
            break;
        case 6:
            retMonth = 'Jul';
            break;
        case 7:
            retMonth = 'Aug';
            break;
        case 8:
            retMonth = 'Sep';
            break;
        case 9:
            retMonth = 'Oct';
            break;
        case 10:
            retMonth = 'Nov';
            break;
        default:
            retMonth = 'Dec'
            break;
    }

    return retMonth;

}
