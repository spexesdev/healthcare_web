import { useState } from 'react'
import { ApiPath } from '../../assets/common/base-url'
import FileInput from '../../components/file-input'

export const MedicalHistoryDialog = props => {
    const [txtCurrentMedications, setTxtCurrentMedications] = useState('')
    const [txtAddMedication, setTxtAddMedication] = useState('')
    const [cbxIsOnMedications, setCbxIsOnMedications] = useState('')
    const [txtMedicationDescription, setTxtMedicationDescription] = useState('')
    const [txtDate, setTxtDate] = useState('');
    const [txtDoctor, setTxtDoctor] = useState('');

    // // const [medicationsData, setMedicationsData] = useState([]);

    // // useEffect(() => {
    // //     setMedicationsData(props.medicalData)
    // // }, [])

    const updateMedicalHistoryDetails = () => {

        props.setIsLoaderVisible(true)

        const data = (txtCurrentMedications) ? {
            [props.updateField]: [{
                type: cbxIsOnMedications,
                name: txtAddMedication,
                description: txtMedicationDescription,
                records: txtCurrentMedications,
                timeStamp: txtDate,
                doctorName: txtDoctor
            }]
        }
            :
            {
                [props.updateField]: [{
                    type: cbxIsOnMedications,
                    name: txtAddMedication,
                    description: txtMedicationDescription,
                    timeStamp: txtDate,
                    doctorName: txtDoctor
                }]
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
                    props.hideDialog();

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

    const displayDialog = props.showDialog ? "dialog-background fade" : "dialog-background";

    return (
        <div className={displayDialog}>
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-drug"></i> Add {props.title}</h2>
                </div>
                <div className="dialog-body" style={{ marginBottom: '20px' }}>

                    <div className="form-row" style={{ border: '1px solid #efefef', borderRadius: '5px', padding: '20px' }}>
                        <label style={{ transform: 'translateY(-10px)', color: '#999' }}><i className="icofont-drug"></i> {props.title}</label>
                        <div className="form-row-2-1">
                            <div className='input-group'>
                                <label>{props.questionString}</label>
                                <select
                                    id="cbxIsOnMedications"
                                    value={cbxIsOnMedications}
                                    className="form-control"
                                    onChange={e => setCbxIsOnMedications(e.target.value)}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>

                        </div>
                        <div className={cbxIsOnMedications === "Yes" ? "form-row-2" : "d-none"}>
                            <div className="input-group">
                                <label>Add {props.title}</label>
                                <input
                                    id="txtAddMedication"
                                    value={txtAddMedication}
                                    className="form-control"
                                    onChange={e => setTxtAddMedication(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div className="input-group">
                                <label>Date of {props.title}</label>
                                <input
                                    id="txtDate"
                                    value={txtDate}
                                    onChange={e => setTxtDate(e.target.value)}
                                    className="form-control"
                                    type="date"
                                />
                            </div>
                        </div>
                        <div className={cbxIsOnMedications === "Yes" ? 'form-row' : 'd-none'}>
                            <div className="input-group">
                                <label>Select File (optional)</label>
                                <FileInput
                                    setFileOutput={setTxtCurrentMedications}
                                    acceptFileTypes={".png, .jpg, .jpeg, .pdf"}
                                />
                            </div>
                        </div>
                        <div className={cbxIsOnMedications === "Yes" ? "form-row" : "d-none"}>
                            <div className="input-group">
                                <label>Description (optional)</label>
                                <textarea
                                    id="txtMedicationDescription"
                                    value={txtMedicationDescription}
                                    className="form-control"
                                    onChange={e => setTxtMedicationDescription(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className={(cbxIsOnMedications === "Yes" && props.title === 'Prescription') ? "form-row" : "d-none"}>
                            <div className="input-group">
                                <label>Doctor's Name</label>
                                <input
                                    id="txtDoctor"
                                    value={txtDoctor}
                                    className="form-control"
                                    onChange={e => setTxtDoctor(e.target.value)}
                                    type="text"
                                />
                            </div>
                        </div>

                    </div>

                </div>
                <div className="dialog-footer main">
                    <button
                        id="btnUpdate"
                        className="btn-main mr-1"
                        onClick={updateMedicalHistoryDetails}
                    >Update
                    </button>
                    <button
                        id="btnCancel"
                        className="btn-main-outline"
                        onClick={() => props.hideDialog()}
                    >Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
