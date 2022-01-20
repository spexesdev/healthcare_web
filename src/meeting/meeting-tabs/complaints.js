import React, { useEffect } from 'react'

export const Complaints = props => {

    const { cbxComplaints, setCbxComplaints } = props.Complaints;
    const { txtRemarks, setTxtRemarks } = props.Remarks;
    const { txtObservations, setTxtObservations } = props.Observations
    const { selectedSymptoms, setSelectedSymptoms } = props.SelectedSymptoms

    const symptoms = ["Cough", "Cold", "Cattargh", "Fever", "Headaches", "Sneezing"]
    const symptomsObj = symptoms.map((item, index) => {
        return (<option key={index} value={item}>{item}</option>)
    })

    useEffect(() => {
        //As the variables in the dependency array change,
        //Proceed to updat the props...
        props.setComplaints({
            "symptoms": selectedSymptoms.join(", "),
            "remarks": txtRemarks
        })

        props.setObs({
            "earlySigns": txtObservations,
            "remarks": txtRemarks
        })

    }, [cbxComplaints, txtRemarks, txtObservations])

    const addItemToList = (selItem) => {
        //Ensure that the selected item is not in the list...
        if (selectedSymptoms.indexOf(selItem) === -1) {
            //Item is not found in the list...
            setSelectedSymptoms([...selectedSymptoms, selItem])

            //Also, remove this item from the original list.
            symptoms.splice(symptoms.indexOf(selItem), 1);

        }
    }

    return (
        <div className='tab-page-content'>
            <div className='page-body' style={{ padding: '0 10px' }}>
                <div className='form-row'>
                    <div className="input-group">
                        <label>Complaints / Discomforts / Symptoms</label>
                        <select
                            className='form-control'
                            id='cbxComplaints'
                            value={cbxComplaints}
                            onChange={e => {
                                setCbxComplaints(e.target.value)
                                addItemToList(e.target.value)
                            }}
                        >
                            {symptomsObj}
                        </select>
                    </div>
                    {selectedSymptoms.length > 0 && <div className='sel-items'>{selectedSymptoms.join(", ")}</div>}
                </div>
                <div className='form-row-2'>
                    <div className='input-group'>
                        <label>Remarks</label>
                        <textarea
                            className='form-control'
                            rows={3}
                            id='txtRemarks'
                            value={txtRemarks}
                            onChange={e => setTxtRemarks(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <label>Observations by Doctor</label>
                        <textarea
                            className='form-control'
                            rows={3}
                            id='txtObservations'
                            value={txtObservations}
                            onChange={e => setTxtObservations(e.target.value)}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}