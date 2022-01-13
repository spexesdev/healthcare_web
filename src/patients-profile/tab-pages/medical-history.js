import React, { useState } from 'react';
import { ImageDialog } from "../../components/image-dialog"
import { fileToBase64 } from '../../assets/common/file-to-base64';
import { ApiPath } from '../../assets/common/base-url';
import { PastPrescriptionsDialog } from './others/past-prescriptions-dialog';

export const MedicalHistory = (props) => {

    const [showDialog, setShowDialog] = useState(false);
    const [showPrescriptionsDialog, setShowPrescriptionsDialog] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageSource, setImageSource] = useState('');

    return (
        <div className="tab-page-content">
            <div className="page-header">
                <h2>Medical History</h2>
            </div>
            <div className="page-body">
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td>Current Medications</td>
                            <td>{(props.data.currentMedications.length > 0 && <button
                                className="btn-main"
                                onClick={() => {
                                    setImageSource(props.data.currentMedications[0].records[0])
                                    setShowImageDialog(true)
                                }}
                            >Preview</button>) || '-'}</td>
                            <td onClick={() => setShowDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                        </tr>
                        <tr>
                            <td>Diagnosis Reports</td>
                            <td>{(props.data.diagnosisReport.length > 0 && <button
                                className="btn-main"
                                onClick={() => {
                                    setImageSource(props.data.diagnosisReport[0].records[0])
                                    setShowImageDialog(true)
                                }}
                            >Preview</button>) || '-'}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Past prescriptions</td>
                            <td>{(props.data.pastPrescriptions.length > 0 && <button
                                className="btn-main"
                                onClick={() => {
                                    setImageSource(props.data.pastPrescriptions[0].records[3])
                                    setShowImageDialog(true)
                                }}
                            >Preview</button>) || '-'}</td>
                            <td onClick={() => setShowPrescriptionsDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <MedicalHistoryDialog
                showDialog={showDialog}
                hideDialog={() => setShowDialog(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                data={props.data}
                setImageSource={setImageSource}
                setResetData={props.setResetData}
                setShowImageDialog={setShowImageDialog}
            />

            <PastPrescriptionsDialog
                showDialog={showPrescriptionsDialog}
                hideDialog={() => setShowPrescriptionsDialog(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                data={props.data}
                setImageSource={setImageSource}
                setResetData={props.setResetData}
                setShowImageDialog={setShowImageDialog}
            />

            {showImageDialog &&
                <ImageDialog
                    mandateExtension="pdf"
                    src={imageSource}
                    setImageDisplay={showImageDialog}
                    isURL={true}
                    hideImageDialog={() => setShowImageDialog(false)}
                />
            }
        </div>
    );
}

const MedicalHistoryDialog = props => {
    const [txtCurrentMedications, setTxtCurrentMedications] = useState(props.data.currentMedications?.length > 1 ? props.data.currentMedications[0].records[0] : '')
    const [txtDiagnosisReport, setTxtDiagnosisReport] = useState(props.data.diagnosisReport?.length > 1 ? props.data?.diagnosisReport[0].records[0] : '')

    const [txtAddMedication, setTxtAddMedication] = useState(props.data.currentMedications.length > 1 ? props.data?.currentMedications[0].name : '');
    const [cbxIsOnMedications, setCbxIsOnMedications] = useState(props.data.currentMedications.length > 1 ? props.data?.currentMedications[0].type : 'No');
    const [txtMedicationDescription, setTxtMedicationDescription] = useState(props.data.currentMedications.length > 1 ? props.data?.currentMedications[0].description : '');

    const updateMedicalHistoryDetails = () => {

        const data = {
            currentMedications: [{
                type: cbxIsOnMedications,
                name: txtAddMedication,
                description: txtMedicationDescription,
                records: [txtCurrentMedications]
            }],
            diagnosisReport: [{
                type: cbxIsOnMedications,
                name: txtAddMedication,
                description: txtMedicationDescription,
                records: [txtDiagnosisReport]
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
        } else if (val === "pp") {
            fileUpload = document.querySelector("#txtPastPrescriptions")
        } else {
            fileUpload = document.querySelector("#txtDiagnosisReport")
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
                    switch (val) {
                        case "curr":
                            setTxtCurrentMedications(response.toString());
                            break;
                        case "pp":
                            setTxtPastPrescriptions(response.toString());
                            break;
                        default:
                            setTxtDiagnosisReport(response.toString());
                            break;
                    }
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
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-ui-edit"></i> Edit Medical History</h2>
                </div>
                <div className="dialog-body" style={{ marginBottom: '20px' }}>

                    <div className="form-row" style={{ border: '1px solid #efefef', borderRadius: '5px', padding: '20px' }}>
                        <label style={{ transform: 'translateY(-10px)', color: '#999' }}><i className="icofont-drug"></i> Current Medications</label>
                        <div className="form-row-2-1">
                            <div className='input-group'>
                                <label>Are you taking any medicines at the moment?</label>
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
                                    accept=".pdf"
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

                    <div className="form-row mt-2">
                        <div className='input-group'>
                            <label>Diagnosis Report (.pdf)</label>
                            <input
                                id="txtDiagnosisReport"
                                onChange={() => saveImageToBase64("diag")}
                                className="form-control"
                                accept=".pdf"
                                type="file"
                            />

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
