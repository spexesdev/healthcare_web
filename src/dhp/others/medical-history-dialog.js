import { useEffect, useState } from 'react'
import { ApiPath } from '../../assets/common/base-url'
import { constants } from '../../assets/common/constants'
import { fileToBase64 } from '../../assets/common/file-to-base64'

export const MedicalHistoryDialog = props => {
    const [txtCurrentMedications, setTxtCurrentMedications] = useState('')
    const [txtAddMedication, setTxtAddMedication] = useState('')
    const [cbxIsOnMedications, setCbxIsOnMedications] = useState('')
    const [txtMedicationDescription, setTxtMedicationDescription] = useState('')

    const [medicationsData, setMedicationsData] = useState([]);

    useEffect(() => {
        setMedicationsData(props.medicalData)
    }, [])

    const updateMedicalHistoryDetails = () => {

        props.setIsLoaderVisible(true)

        const data = {
            [props.updateField]: [...medicationsData, {
                type: cbxIsOnMedications,
                name: txtAddMedication,
                description: txtMedicationDescription,
                records: [txtCurrentMedications]
            }]
        }

        const options = { ...constants.putOptions, 'body': JSON.stringify(data) }

        //Then update just this data...
        fetch(ApiPath + "patient/profileUpdate", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                if (response && response.statusCode === 200) {
                    props.showToast(`Update Successful! Will be fully effected in about 5 secs`, 'success');
                    props.hideDialog();

                    //Remember to refresh the fetched data after this..
                    props.setResetData(true);

                } else {
                    props.showToast(response.message, 'exclamation');
                }
            })
            .catch(error => {
                props.setIsLoaderVisible(false);
                props.showToast(error.message, 'exclamation');
            })
    }

    const saveImageToBase64 = (val) => {

        let fileUpload;

        if (val === "curr") {
            fileUpload = document.querySelector("#txtCurrentMedications")
        }

        if (fileUpload?.files[0]?.size > 500152) {
            props.showToast("File size cannot be more than 500kb!", "exclamation")
            fileUpload.files = null;
            return;
        }

        if (fileUpload?.files[0]) {
            //Ensuring that there is a file to convert
            fileToBase64(fileUpload?.files[0])
                .then(response => {
                    setTxtCurrentMedications(response.toString());
                })
                .catch(err => {
                    props.showToast(err);
                })

        } else {
            setTxtCurrentMedications("");
        }
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
                                <label>Add Medication</label>
                                <input
                                    id="txtAddMedication"
                                    value={txtAddMedication}
                                    className="form-control"
                                    onChange={e => setTxtAddMedication(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div className="input-group">
                                <label>Select File (optional)</label>
                                <input
                                    id="txtCurrentMedications"
                                    onChange={() => saveImageToBase64("curr")}
                                    className="form-control"
                                    accept="image/*,.pdf"
                                    type="file"
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
