import { useEffect, useState } from "react";
import { constants } from "../../assets/common/constants";
import { CryptoApiPath } from "../../assets/common/base-url";

export const useEventsAndNav = (nav, setIsLoaderVisible, showToast) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Get the starttime and endtime in milliseconds
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        setIsLoaderVisible(true);

        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const startTime = firstDayOfMonth.getTime() / 1000;         //In secs for now
        const endTime = startTime + (60 * 60 * 24 * daysInMonth)    //Also in seconds for now...

        fetch(`${CryptoApiPath}getMeetinglist?starttime=${startTime}&endtime=${endTime}`, constants.getOptions)
            .then(response => (response.json()))
            .then(response => {
                setIsLoaderVisible(false)
                if (response.statusText === "OK") {
                    setEvents(response.result)
                } else {
                    setIsLoaderVisible(response?.message, "exclamation")
                    setEvents([])
                }
            })
            .catch(error => {
                setIsLoaderVisible(false)
                showToast(error.message, "exclamation")
            })

    }, [nav])

    return events;
}
