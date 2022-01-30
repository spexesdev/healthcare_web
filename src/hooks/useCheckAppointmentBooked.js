import { useEffect, useState } from "react";
import { CryptoApiPath } from "../assets/common/base-url";
import { constants } from "../assets/common/constants";

const useCheckAppointmentBooked = (uidNo, setAppointmentBooked, appointmentBooked) => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [doctorsData, setDoctorsData] = useState({});
    const [pastAppointments, setPastAppointments] = useState([]);

    useEffect(() => {
        //Remember, that this should be for
        // year, month, day, hour, minute, second
        const timeValueOfToday = new Date('2022-01-01').getTime();      //Remove date in parenthesis later....
        const timeValueOf3MonthsTime = new Date().getTime() + (60 * 60 * 24 * 90);

        //Set other parameters...
        const input1 = `starttime=${timeValueOfToday}&endtime=${timeValueOf3MonthsTime}`;
        const options = constants.getOptions;

        setIsLoading(true);

        fetch(`${CryptoApiPath}getMeetingList?${input1}`, options)
            .then(response => (response.json()))
            .then(response => {
                setIsLoading(false);
                if (response.status === 200) {
                    //Retrieve the result...
                    const result = response.result?.filter(item => item.patient_id === uidNo)

                    //Set other parameters...
                    setDoctorsData(result[result.length - 1]);
                    setPastAppointments(result)

                    console.log(result[result.length]);

                    if (result.length > 0) {
                        //Fiter generated result thus...
                        setAppointmentBooked(true);
                    } else {
                        setAppointmentBooked(false);
                    }


                } else {
                    setError('Failed to fetch data. Please try again after some time.', 'exclamation');
                }
            })

            .catch(err => {
                setIsLoading(false);
                setError(err, "exclamation");
            })

    }, [])

    return ({ error, isLoading, doctorsData, pastAppointments });
}

export default useCheckAppointmentBooked;
