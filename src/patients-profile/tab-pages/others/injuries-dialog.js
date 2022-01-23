import React, { useState } from 'react';
import { ApiPath } from '../../../assets/common/base-url';
import { fileToBase64 } from '../../../assets/common/file-to-base64';

export const InjuriesDialog = props => {

    const [txtInjuries, setTxtInjuries] = useState('');
    const [chkInjuries, setChkInjuries] = useState(false);
    const [txtInjuryImage, setTxtInjuryImage] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].records[0] : '')
    const [txtInjuryDescription, setTxtInjuryDescription] = useState(props.data?.pastPrescriptions.length > 1 ? props.data?.pastPrescriptions[0].description : '')

    const [selectedInjuries, setSelectedInjuries] = useState([])
    const injuriesList = ['Burns', 'Spinal cord injury', 'Spinal fracture', 'Rib fracture',
        'Jaw fracture', 'Concussion', 'Amputation', 'Traumatic brain injury', 'Facial trauma',
        'Acoustic trauma', 'Other']

    const injuriesMap = injuriesList.map((item, index) => {
        return (<option key={index} value={item}>{item}</option>)
    })

    const addInjuriesToList = selItem => {
        //Ensure that the selected item is not in the list...
        if (selectedInjuries.indexOf(selItem) === -1) {
            //Item is not found in the list...
            setSelectedInjuries([...selectedInjuries, selItem])

            //Also, remove this item from the original list.
            injuriesList.splice(injuriesList.indexOf(selItem), 1)

        }
    }

    const updateInjuries = () => {

        const data = {
            injuries: [{
                type: "-",
                name: [...selectedInjuries],
                records: [txtInjuryImage],
                description: txtInjuryDescription,
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

        const fileUpload = document.querySelector("#txtInjuryImage")

        if (fileUpload?.files[0]?.size > 500152) {
            props.showToast("File size cannot be more than 500kb!", "exclamation")
            fileUpload.files = null;
            return;
        }

        if (fileUpload?.files[0]) {
            //Ensuring that there is a file to convert
            fileToBase64(fileUpload?.files[0])
                .then(response => {
                    setTxtInjuryImage(response.toString());
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
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-ui-edit"></i> Add/Edit Injuries</h2>
                </div>
                <div className="dialog-body" style={{ marginBottom: '20px' }}>
                    <div
                        className="form-row"
                        style={{ border: '1px solid #efefef', borderRadius: '5px', padding: '20px' }}>
                        <label
                            style={{ transform: 'translateY(-10px)', color: '#999' }}>
                            <i className="icofont-drug"></i> Injuries
                        </label>
                        <div className="form-row">
                            <div className='input-group'>
                                <label>
                                    <input
                                        type='checkbox'
                                        id='chkInjuries'
                                        value={chkInjuries}
                                        onChange={() => setChkInjuries(!chkInjuries)}
                                    /> I have a/some injury/injuries?
                                </label>
                                <select
                                    id="txtInjuries"
                                    className={chkInjuries ? "form-control mb-1" : 'd-none'}
                                    value={txtInjuries}
                                    onChange={e => {
                                        setTxtInjuries(e.target.value)
                                        addInjuriesToList(e.target.value);
                                    }}
                                >
                                    {injuriesMap}
                                </select>
                                {selectedInjuries.length > 0 && chkInjuries &&
                                    <div className='sel-items'>
                                        {selectedInjuries.join(", ")}
                                        <button onClick={() => setSelectedInjuries([])} className='btn-grey' style={{ float: 'right' }}>Clear</button>
                                    </div>
                                }
                            </div>

                        </div>
                        <div className={chkInjuries ? "form-row" : 'd-none'}>
                            <div className='input-group'>
                                <label>Upload File (.pdf) (optional)</label>
                                <input
                                    id="txtInjuryImage"
                                    onChange={() => saveImageToBase64()}
                                    className="form-control"
                                    accept=".pdf"
                                    type="file"
                                />
                            </div>
                        </div>
                        <div className={chkInjuries ? "form-row" : "d-none"}>
                            <div className="input-group">
                                <label>Description (optional)</label>
                                <textarea
                                    id="txtInjuryDescription"
                                    value={txtInjuryDescription}
                                    className="form-control"
                                    onChange={e => setTxtInjuryDescription(e.target.value)}
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
                        onClick={updateInjuries}
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
