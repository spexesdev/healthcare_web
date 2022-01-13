const DateToLocal = (dateValue) => {
    const myArbitraryDate = "2020-01-01";               //This is just for testing sake... I wouldnt call this function without a valid date!
    const dateSplit  = dateValue ? dateValue?.split("-") : myArbitraryDate.split("-");

    return ( `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}` );
}

export default DateToLocal
