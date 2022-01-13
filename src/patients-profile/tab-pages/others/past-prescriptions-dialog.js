import React, { useEffect, useState } from 'react';
import { ApiPath } from '../../../assets/common/base-url';
import { fileToBase64 } from '../../../assets/common/file-to-base64';

export const PastPrescriptionsDialog = props => {

    const [txtPastPrescriptions, setTxtPastPrescriptions] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].records[0] : '')
    const [cbxMedicines, setCbxMedicines] = useState(props.data.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].type : 'No')
    const [txtAddMedication, setTxtAddMedication] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].name : '');
    const [txtMedicationDescription, setTxtMedicationDescription] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].description : '')

    const updatePastPrescriptions = () => {

        const data = {
            pastPrescriptions: [{
                type: cbxMedicines,
                name: txtAddMedication,
                records: [txtPastPrescriptions],
                description: txtMedicationDescription,
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

        props.setIsLoaderVisible(true)

        //Then update just this data...
        fetch(ApiPath + "patient/profileUpdate", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                if (response && response.statusCode === 200) {
                    props.showToast(`Update Successful! Changes will be fully effected in about 5 secs`, 'success');
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

    const saveImageToBase64 = () => {

        const fileUpload = document.querySelector("#txtPastPrescriptions")

        if (fileUpload?.files[0]?.size > 500152) {
            props.showToast("File size cannot be more than 500kb!", "exclamation")
            fileUpload.files = null;
            return;
        }

        if (fileUpload?.files[0]) {
            //Ensuring that there is a file to convert
            fileToBase64(fileUpload?.files[0])
                .then(response => {
                    setTxtPastPrescriptions(response.toString());
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
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-ui-edit"></i> Add/Edit Past Prescriptions</h2>
                </div>
                <div className="dialog-body" style={{ marginBottom: '20px' }}>

                    <div
                        className="form-row"
                        style={{ border: '1px solid #efefef', borderRadius: '5px', padding: '20px' }}>
                        <label
                            style={{ transform: 'translateY(-10px)', color: '#999' }}>
                            <i className="icofont-drug"></i> Past Prescriptions / Medications
                        </label>
                        <div className="form-row-2-1">
                            <div className='input-group'>
                                <label>Have you taken any medicines in past?</label>
                                <select
                                    id="cbxMedicines"
                                    value={cbxMedicines}
                                    className="form-control"
                                    onChange={e => setCbxMedicines(e.target.value)}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>

                        </div>
                        <div className={cbxMedicines === "Yes" ? "form-row-2" : "d-none"}>
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
                                <label>Upload File (.pdf) (optional)</label>
                                <input
                                    id="txtPastPrescriptions"
                                    onChange={() => saveImageToBase64()}
                                    className="form-control"
                                    accept=".pdf"
                                    type="file"
                                />
                            </div>
                        </div>
                        <div className={cbxMedicines === "Yes" ? "form-row" : "d-none"}>
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
                        onClick={updatePastPrescriptions}
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
