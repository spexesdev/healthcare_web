import React, { useState } from 'react';
import { ApiPath } from '../../../assets/common/base-url';
import { fileToBase64 } from '../../../assets/common/file-to-base64';

export const SurgeriesDialog = props => {

    const [txtSurgeries, setTxtSurgeries] = useState('');
    const [chkSurgeries, setChkSurgeries] = useState(false);
    const [txtSurgeryImage, setTxtSurgeryImage] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].records[0] : '')
    const [txtSurgeryDescription, setTxtSurgeryDescription] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].description : '')

    const [selectedSurgeries, setSelectedSurgeries] = useState([])
    const surgeriesList = ['Burns', 'Spinal cord surgery', 'Spinal fracture', 'Rib fracture',
        'Jaw fracture', 'Concussion', 'Amputation', 'Traumatic brain surgery', 'Facial trauma',
        'Acoustic trauma', 'Other']

    const surgeriesMap = surgeriesList.map((item, index) => {
        return (<option key={index} value={item}>{item}</option>)
    })

    const addSurgeriesToList = selItem => {
        //Ensure that the selected item is not in the list...
        if (selectedSurgeries.indexOf(selItem) === -1) {
            //Item is not found in the list...
            setSelectedSurgeries([...selectedSurgeries, selItem])

            //Also, remove this item from the original list.
            surgeriesList.splice(surgeriesList.indexOf(selItem), 1)

        }
    }

    const updateSurgeries = () => {

        const data = {
            surgeries: [{
                type: "-",
                name: [...selectedSurgeries],
                records: [txtSurgeryImage],
                description: txtSurgeryDescription,
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

        const fileUpload = document.querySelector("#txtSurgeryImage")

        if (fileUpload?.files[0]?.size > 500152) {
            props.showToast("File size cannot be more than 500kb!", "exclamation")
            fileUpload.files = null;
            return;
        }

        if (fileUpload?.files[0]) {
            //Ensuring that there is a file to convert
            fileToBase64(fileUpload?.files[0])
                .then(response => {
                    setTxtSurgeryImage(response.toString());
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
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-ui-edit"></i> Add/Edit Surgeries</h2>
                </div>
                <div className="dialog-body" style={{ marginBottom: '20px' }}>
                    <div
                        className="form-row"
                        style={{ border: '1px solid #efefef', borderRadius: '5px', padding: '20px' }}>
                        <label
                            style={{ transform: 'translateY(-10px)', color: '#999' }}>
                            <i className="icofont-drug"></i> Surgeries
                        </label>
                        <div className="form-row">
                            <div className='input-group'>
                                <label>
                                    <input
                                        type='checkbox'
                                        id='chkSurgeries'
                                        value={chkSurgeries}
                                        onChange={() => setChkSurgeries(!chkSurgeries)}
                                    /> I have a/some surgery/surgeries?
                                </label>
                                <select
                                    id="txtSurgeries"
                                    className={chkSurgeries ? "form-control mb-1" : 'd-none'}
                                    value={txtSurgeries}
                                    onChange={e => {
                                        setTxtSurgeries(e.target.value)
                                        addSurgeriesToList(e.target.value);
                                    }}
                                >
                                    {surgeriesMap}
                                </select>
                                {selectedSurgeries.length > 0 && chkSurgeries &&
                                    <div className='sel-items'>
                                        {selectedSurgeries.join(", ")}
                                        <button onClick={() => setSelectedSurgeries([])} className='btn-grey' style={{ float: 'right' }}>Clear</button>
                                    </div>
                                }
                            </div>

                        </div>
                        <div className={chkSurgeries ? "form-row" : 'd-none'}>
                            <div className='input-group'>
                                <label>Upload File (.pdf) (optional)</label>
                                <input
                                    id="txtSurgeryImage"
                                    onChange={() => saveImageToBase64()}
                                    className="form-control"
                                    accept=".pdf"
                                    type="file"
                                />
                            </div>
                        </div>
                        <div className={chkSurgeries ? "form-row" : "d-none"}>
                            <div className="input-group">
                                <label>Description (optional)</label>
                                <textarea
                                    id="txtSurgeryDescription"
                                    value={txtSurgeryDescription}
                                    className="form-control"
                                    onChange={e => setTxtSurgeryDescription(e.target.value)}
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
                        onClick={updateSurgeries}
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
