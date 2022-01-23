import React, { useEffect, useState } from 'react';
import { ApiPath } from '../../assets/common/base-url';

export const Personal = props => {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="tab-page-content">
            <div className="page-header">
                <h2>Personal Information</h2>
            </div>
            <div className="page-body">
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Name</td>
                            <td>{props.data?.name}</td>
                            <td onClick={() => setShowDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Gender</td>
                            <td>{props.data?.gender}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Marital Status</td>
                            <td>{props.data?.maritalStatus}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Date of Birth</td>
                            <td>{props.data?.birthDate}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Pref. Language</td>
                            <td>{props.data?.communicationLang?.languagePref}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Is Deceased?</td>
                            <td>{props.data?.deceased?.deceasedBoolean || "No"}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Deceased Date</td>
                            <td>{props.data?.deceased?.deceasedDateTime || "-"}</td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <PersonalDialog
                showDialog={showDialog}
                hideDialog={() => setShowDialog(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setResetData={props.setResetData}
                data={props.data}

            />
        </div>
    );
}

const PersonalDialog = props => {

    const [showDeceased, setShowDeceased] = useState('none');
    const [cbxDeceased, setCbxDeceased] = useState(props.data.deceased?.deceasedBoolean)

    const [fullName, setFullName] = useState(props.data?.name);
    const [cbxGender, setCbxGender] = useState(props.data.gender)
    const [cbxMaritalStatus, setCbxMaritalStatus] = useState(props.data.maritalStatus)
    const [txtBirthDate, setTxtBirthDate] = useState(props.data.birthDate)
    const [txtLanguage, setTxtLanguage] = useState(props.data?.communicationLang?.languagePref)
    const [txtDeceasedDate, setTxtDeceasedDate] = useState(props.data?.deceased?.deceasedDateTime);

    useEffect(() => {
        if (cbxDeceased === "Yes") {
            setShowDeceased('block')
        } else {
            setShowDeceased('none');
        }
    }, [cbxDeceased])

    const updatePersonalDetails = () => {
        //update just the personal details contained here...
        const data = {
            name: fullName,
            birthDate: txtBirthDate,
            gender: cbxGender,
            communicationLang: {
                "languageCode": "101",
                "languagePref": txtLanguage,
            },
            "deceased": {
                deceasedBoolean: cbxDeceased === "Yes" ? true : false,
                deceasedDateTime: txtDeceasedDate,
            },
            maritalStatus: cbxMaritalStatus,
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

    const displayDialog = props.showDialog ? "dialog-background fade" : "dialog-background";

    return (
        <div className={displayDialog}>
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2 className="nully" style={{ color: 'var(--bluish)'}}><i className="icofont-ui-edit"></i> Edit Personal Information</h2>
                </div>
                <div className="dialog-body">
                    <div className="form-row">
                        <div className="input-group">
                        <label>Fullname</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-row-2">
                        <div className='input-group'>
                            <label>Gender</label>
                            <select
                                className="form-control"
                                id="cbxGender"
                                value={cbxGender}
                                onChange={e => setCbxGender(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className='input-group'>
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                id="txtBirthDate"
                                value={txtBirthDate}
                                onChange={e => setTxtBirthDate(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-row-2">
                        <div className='input-group'>
                            <label>Marital Status</label>
                            <select
                                className="form-control"
                                id="cbxMaritalStatus"
                                value={cbxMaritalStatus}
                                onChange={e => setCbxMaritalStatus(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Single">Single</option>
                                <option value="Maried">Maried</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Do not wish to disclose">Do not wish to disclose</option>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Preferred Language</label>
                            <select
                                className="form-control"
                                id="txtLanguage"
                                value={txtLanguage}
                                onChange={e => setTxtLanguage(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row-2">
                        <div className='input-group'>
                            <label>Is Deceased?</label>
                            <select
                                className="form-control"
                                id="cbxIsDeceased"
                                value={cbxDeceased}
                                onChange={e => setCbxDeceased(e.target.value)}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className='input-group' style={{ display: showDeceased }}>
                            <label>Deceased Date</label>
                            <input
                                type="date"
                                id="txtDeceasedDate"
                                value={txtDeceasedDate}
                                onChange={e => setTxtDeceasedDate(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="dialog-footer main">
                    <button
                        id="btnUpdate"
                        className="btn-main mr-1"
                        onClick={updatePersonalDetails}
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
