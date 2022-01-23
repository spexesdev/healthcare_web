import React, { useState } from 'react';
import { ApiPath } from '../../../assets/common/base-url';
import { fileToBase64 } from '../../../assets/common/file-to-base64';

export const DiseasesDialog = props => {

    const [txtDiseases, setTxtDiseases] = useState('');
    const [chkDiseases, setChkDiseases] = useState(false);
    const [txtDiseaseImage, setTxtDiseaseImage] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].records[0] : '')
    const [txtDiseaseDescription, setTxtDiseaseDescription] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].description : '')

    const [selectedDiseases, setSelectedDiseases] = useState([])
    const diseasesList = ['Diabetes', 'Hypertension', 'PCOS', 'Hypothyroidism', 'COPD',
        'Asthma', 'Heart disease', 'Arthritis', 'Mental illness/depression',
        'Fertility issues', 'Other']

    const diseasesMap = diseasesList.map((item, index) => {
        return (<option key={index} value={item}>{item}</option>)
    })

    const addDiseasesToList = selItem => {
        //Ensure that the selected item is not in the list...
        if (selectedDiseases.indexOf(selItem) === -1) {
            //Item is not found in the list...
            setSelectedDiseases([...selectedDiseases, selItem])

            //Also, remove this item from the original list.
            diseasesList.splice(diseasesList.indexOf(selItem), 1)

        }
    }

    const updateChronicDiseases = () => {

        const data = {
            chronicDiseases: [{
                type: "-",
                name: [...selectedDiseases],
                records: [txtDiseaseImage],
                description: txtDiseaseDescription,
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

        const fileUpload = document.querySelector("#txtDiseaseImage")

        if (fileUpload?.files[0]?.size > 500152) {
            props.showToast("File size cannot be more than 500kb!", "exclamation")
            fileUpload.files = null;
            return;
        }

        if (fileUpload?.files[0]) {
            //Ensuring that there is a file to convert
            fileToBase64(fileUpload?.files[0])
                .then(response => {
                    setTxtDiseaseImage(response.toString());
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
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-ui-edit"></i> Add/Edit Chronic Diseases</h2>
                </div>
                <div className="dialog-body" style={{ marginBottom: '20px' }}>
                    <div
                        className="form-row"
                        style={{ border: '1px solid #efefef', borderRadius: '5px', padding: '20px' }}>
                        <label
                            style={{ transform: 'translateY(-10px)', color: '#999' }}>
                            <i className="icofont-drug"></i> Chronic Diseases
                        </label>
                        <div className="form-row">
                            <div className='input-group'>
                                <label>
                                    <input
                                        type='checkbox'
                                        id='chkDiseases'
                                        value={chkDiseases}
                                        onChange={() => setChkDiseases(!chkDiseases)}
                                    /> I have a/some chronic disease(s)?
                                </label>
                                <select
                                    id="txtDiseases"
                                    className={chkDiseases ? "form-control mb-1" : 'd-none'}
                                    value={txtDiseases}
                                    onChange={e => {
                                        setTxtDiseases(e.target.value)
                                        addDiseasesToList(e.target.value);
                                    }}
                                >
                                    {diseasesMap}
                                </select>
                                {selectedDiseases.length > 0 && chkDiseases &&
                                    <div className='sel-items'>
                                        {selectedDiseases.join(", ")}
                                        <button onClick={() => setSelectedDiseases([])} className='btn-grey' style={{ float: 'right' }}>Clear</button>
                                    </div>
                                }
                            </div>

                        </div>
                        <div className={chkDiseases ? "form-row" : 'd-none'}>
                            <div className='input-group'>
                                <label>Upload File (.pdf) (optional)</label>
                                <input
                                    id="txtDiseaseImage"
                                    onChange={() => saveImageToBase64()}
                                    className="form-control"
                                    accept=".pdf"
                                    type="file"
                                />
                            </div>
                        </div>
                        <div className={chkDiseases ? "form-row" : "d-none"}>
                            <div className="input-group">
                                <label>Description (optional)</label>
                                <textarea
                                    id="txtDiseaseDescription"
                                    value={txtDiseaseDescription}
                                    className="form-control"
                                    onChange={e => setTxtDiseaseDescription(e.target.value)}
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
                        onClick={updateChronicDiseases}
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
