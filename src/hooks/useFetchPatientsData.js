import { useEffect } from 'react';
import { ApiPath } from '../assets/common/base-url';
import { constants } from '../assets/common/constants';

const useFetchPatientsData = (resetData, setResetData) => {

    let error = "";
    const idValue = sessionStorage.getItem("id_val")
    const params = constants.getOptions;

    useEffect(() => {
        //Fetch the patients data...
        fetch(ApiPath + "query/search/" + idValue, params)
            ?.then(response => (response.json()))
            .then(res => {

                if (res.statusCode === 200) {
                    //Save this for future use...
                    sessionStorage.setItem('patient', JSON.stringify(res.data));
                    localStorage.setItem('patient', JSON.stringify(res.data));

                } else {
                    error = res.message;
                }

            })
            .catch(err => {
                error = err.message;
            })

        //Reset this always..
        setResetData(false);



    }, [resetData])

    return ({ error });

}

export default useFetchPatientsData;
