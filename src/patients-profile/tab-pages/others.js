import { useEffect, useState } from "react"
import { ApiPath } from "../../assets/common/base-url";

export const Others = props => {

    const [cbxDate, setCbxDate] = useState('');
    const [chkNotSure, setChkNotSure] = useState(false);
    const [wasHospitalized, setWasHospitalized] = useState(false);
    const [cbxDateFrom, setCbxDateFrom] = useState('');
    const [cbxDateTo, setCbxDateTo] = useState('');
    const [hasFamilyMedicalHistory, setHasFamilyMedicalHistory] = useState(false);
    const [cbxDateOfMedicalHistory, setCbxDateOfMedicalHistory] = useState('');
    const [chkNotSureMedicalHistory, setChkNotSureMedicalHistory] = useState(false);
    const [hadSurgeries, setHadSurgeries] = useState(false);

    useEffect(() => {
        //Use effect on form load to set the variables....
        const othersData = props.data.others;

        if (othersData.length > 0) {
            //First item...
            const upperBound = othersData.length - 1;

            if (othersData[upperBound - 3].answer === "Not sure") {
                setChkNotSure(!chkNotSure)
            } else if (othersData[upperBound - 3].answer !== "") {
                //A date was set...
                setCbxDate(othersData[upperBound - 3].answer)
            }

            //Second item...
            if (othersData[upperBound - 2].answer === "No") {
                //set the radio buttons...
                setWasHospitalized(false);
            } else {
                setWasHospitalized(true);
                //Date exists so split...
                const splitDate = othersData[upperBound - 2].answer.split("to");
                setCbxDateFrom(splitDate[0].trim())
                setCbxDateTo(splitDate[1].trim())
            }

            //The third item...
            if (othersData[upperBound - 1].answer === "No") {
                //Disable the checkbox...
                setHasFamilyMedicalHistory(false);
            } else {
                setHasFamilyMedicalHistory(true);
                if (othersData[upperBound - 1].answer === "Not sure") {
                    setChkNotSureMedicalHistory(true);
                } else {
                    //The date...
                    setCbxDateOfMedicalHistory(othersData[upperBound - 1].answer);
                }
            }

            //The last item...
            if (othersData[upperBound].answer === "No") {
                //Disable the checkbox...
                setHadSurgeries(false);
            } else {
                setHasFamilyMedicalHistory(true);
            }
        }

    }, [])

    const updateRecords = () => {

        props.setIsLoaderVisible(true)

        const questions = [];

        //First question
        let obj = {}
        if (cbxDate === "") {
            if (chkNotSure) {
                obj = { question: "When did you first encounter a health concern?", answer: "Not sure" }
            } else {
                obj = { question: "When did you first encounter a health concern?", answer: "" }
            }
        } else {
            obj = { question: "When did you first encounter a health concern?", answer: cbxDate }
        }

        questions.push(obj);

        //Second question
        let obj2 = {};
        if (wasHospitalized) {
            if (cbxDateFrom === "" || cbxDateTo === "") {
                props.showToast("Enter the period of hospitalization before you proceed.", 'exclamation');
                props.setIsLoaderVisible(false)
                return;
            }

            //end of validation, thus proceed...
            else {
                obj2 = { question: "Have you ever been hospitalised for a long period?", answer: cbxDateFrom + " to " + cbxDateTo }
            }
        } else {
            obj2 = { question: "Have you ever been hospitalised for a long period?", answer: "No" }
        }

        questions.push(obj2);


        //Third question
        let obj3 = {};
        if (hasFamilyMedicalHistory) {
            //Has a family medical history, thus should have date...
            if (cbxDateOfMedicalHistory === "" && !chkNotSureMedicalHistory) {
                //Conflicting...
                props.showToast("Choose a date or family medical history. If not sure, select the option 'Not sure'.", 'exclamation');
                props.setIsLoaderVisible(false)

                return;
            } else {
                //Proceed... All is fine...
                if (chkNotSureMedicalHistory) {
                    obj3 = { question: "Do you have any family medical history?", answer: "Not sure" }
                } else {
                    obj3 = { question: "Do you have any family medical history?", answer: cbxDateOfMedicalHistory }
                }
            }
        } else {
            obj3 = { question: "Do you have any family medical history?", answer: "No" }
        }

        questions.push(obj3);

        //Forth question
        const obj4Answer = hadSurgeries ? "Yes" : "No";
        const obj4 = { question: "Have you undergone any surgeries?", answer: obj4Answer };
        questions.push(obj4);

        const data = {
            "others": [...questions]
        }

        const options = {
            'body': JSON.stringify(data),
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            'method': "PUT",
        }

        //Then update just this data...
        fetch(ApiPath + "patient/profileUpdate", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                if (response && response.statusCode === 200) {

                    props.showToast(`Update Successful!`, 'success');

                    //Remember to refresh the fetched data after this..
                    props.setPatientsData(response.data.data);
                    sessionStorage.setItem('patient', JSON.stringify(response.data.data));

                } else {
                    props.showToast(response.message, 'exclamation');
                }
            })
            .catch(error => {
                props.setIsLoaderVisible(false);
                props.showToast(error.message, 'exclamation');
            })
    }

    return (
        <>
            <div className='tab-page-content'>
                <div className="page-header">
                    <h2>Other details</h2>
                </div>
                <div className='page-body'>
                    <div className='questions'>
                        <div className='question'>
                            <p><span>Q1</span>When did you first encounter a health concern?</p>
                        </div>
                        <div className='answer'>
                            <div className='input-group'>
                                <input
                                    className='form-control'
                                    id='cbxDate'
                                    value={cbxDate}
                                    onChange={e => setCbxDate(e.target.value)}
                                    type='date'
                                    disabled={chkNotSure}
                                />
                            </div>
                            <div className='check-box'>
                                <label>
                                    <input
                                        className='custom-checkbox'
                                        id='chkNotSure'
                                        value={chkNotSure}
                                        onChange={e => setChkNotSure(!chkNotSure)}
                                        type='checkbox'
                                    /> Not sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className='questions'>
                        <div className='question'>
                            <p><span>Q2</span>Have you ever been hospitalised for a long period?</p>
                            <div className="radio-group">
                                <div className="radio-button">
                                    <label>
                                        <input
                                            type='radio'
                                            className='custom-radio'
                                            name='hospitalized'
                                            checked={wasHospitalized}
                                            onChange={() => setWasHospitalized(true)}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <label>
                                        <input
                                            type='radio'
                                            className='custom-radio'
                                            name='hospitalized'
                                            checked={!wasHospitalized}
                                            onChange={() => setWasHospitalized(false)}
                                        />
                                        No
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className='answer'>
                            <div className='form-row-2'>
                                <div className='input-group'>
                                    <label>From</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        id='cbxDateFrom'
                                        value={cbxDateFrom}
                                        onChange={e => setCbxDateFrom(e.target.value)}
                                        disabled={!wasHospitalized}
                                    />
                                </div>
                                <div className='input-group'>
                                    <label>To</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        id='cbxDateTo'
                                        value={cbxDateTo}
                                        onChange={e => setCbxDateTo(e.target.value)}
                                        disabled={!wasHospitalized}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='questions'>
                        <div className='question'>
                            <p><span>Q3</span>Do you have any family medical history
                                (Does anyone in your family have diabetes/thyroid/heart/liver/kidney etc issues)?</p>
                            <div className="radio-group">
                                <div className="radio-button">
                                    <label>
                                        <input
                                            type='radio'
                                            className='custom-radio'
                                            name='medicalHistory'
                                            checked={hasFamilyMedicalHistory}
                                            onChange={() => setHasFamilyMedicalHistory(true)}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <label>
                                        <input
                                            type='radio'
                                            className='custom-radio'
                                            name='medicalHistory'
                                            checked={!hasFamilyMedicalHistory}
                                            onChange={() => setHasFamilyMedicalHistory(false)}
                                        />
                                        No
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className='answer'>
                            <div className='form-row-2'>
                                <div className='input-group'>
                                    <label>When were first symptoms noticed?</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        id='cbxDateofMedicalHistory'
                                        value={cbxDateOfMedicalHistory}
                                        onChange={e => setCbxDateOfMedicalHistory(e.target.value)}
                                        disabled={!hasFamilyMedicalHistory || chkNotSureMedicalHistory}

                                    />
                                </div>
                            </div>
                            <div className='check-box'>
                                <label>
                                    <input
                                        className='custom-checkbox'
                                        id='chkNotSure'
                                        value={chkNotSureMedicalHistory}
                                        onChange={e => setChkNotSureMedicalHistory(!chkNotSureMedicalHistory)}
                                        type='checkbox'
                                        disabled={!hasFamilyMedicalHistory}
                                    /> Not sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className='questions pb-2'>
                        <div className='question'>
                            <p><span>Q4</span>Have you undergone any surgeries?</p>
                            <div className="radio-group">
                                <div className="radio-button">
                                    <label>
                                        <input
                                            type='radio'
                                            className='custom-radio'
                                            name='hadSurgeries'
                                            checked={hadSurgeries}
                                            onChange={() => setHadSurgeries(true)}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div className="radio-button">
                                    <label>
                                        <input
                                            type='radio'
                                            className='custom-radio'
                                            name='hadSurgeries'
                                            checked={!hadSurgeries}
                                            onChange={() => setHadSurgeries(false)}
                                        />
                                        No
                                    </label>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='others-botton-container'>
                        <button
                            className='btn-main'
                            onClick={updateRecords}>
                            <i className='icofont-upload-alt' /> Update Records</button>
                    </div>
                </div>
            </div>
        </>
    )
}
