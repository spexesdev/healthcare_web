export const toTimestamp = (year,month,day,hour,minute,second) => {
    var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
    return datum.getTime()/1000;
}