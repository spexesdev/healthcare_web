import React, { useState } from 'react';
import { ApiPath } from '../../assets/common/base-url';

export const Portfolio = (props) => {

    const [showDialog, setShowDialog] = useState(false);
    const specialization = props.data.specialization.certification
        ? `${props.data?.specialization?.certification}, ${props.data?.specialization?.type}`
        : "";

    const license = props.data.license.certification
        ? `${props.data?.license?.certification} - ${props.data?.license?.issueDate}`
        : "";

    return (
        <div className="tab-page-content">
            <div className="page-header">
                <h2>Qualifications and Specializations</h2>
            </div>
            <div className="page-body">
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td>Qualification</td>
                            <td>{props.data?.qualification && [...props.data?.qualification]}</td>
                            <td onClick={() => setShowDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                        </tr>
                        <tr>
                            <td>Specialization</td>
                            <td>{specialization}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>License</td>
                            <td>{license}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <PortfolioDialog
                showDialog={showDialog}
                hideDialog={() => setShowDialog(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                data={props.data}
                setResetData={props.setResetData}
            />
        </div>
    );
}

const PortfolioDialog = props => {
    const [txtQualification, setTxtQualification] = useState(props.data.qualification ? [...props.data?.qualification] : '')
    const [txtSpecialization, setTxtSpecialization] = useState(props.data?.specialization?.certification)
    const [txtSpecializationType, setTxtSpecializationType] = useState(props.data?.specialization?.type)
    const [txtLicense, setTxtLicense] = useState(props.data?.license?.certification)
    const [txtLicenseIssueDate, setTxtLicenseIssueDate] = useState(props.data?.license?.issueDate)

    const updateLifestyleDetails = () => {
        const data = {
            qualification: [txtQualification],
            license: {
                certification: txtLicense,
                issueDate: txtLicenseIssueDate
            },
            specialization: {
                certification: txtSpecialization,
                type: txtSpecializationType
            }
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
        fetch(ApiPath + "doctor/profileUpdate", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                props.setIsLoaderVisible(false);
                if (response && response.statusCode === 200) {
                    props.showToast("Update successful!", 'success');
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
                    <h2 className="nully main"><i className="icofont-ui-edit"></i> Edit Portfolio</h2>
                </div>
                <div className="dialog-body main">

                    <div className="form-row">
                        <div className='input-group'>
                            <label>Qualification</label>
                            <textarea
                                id="txtQualification"
                                value={txtQualification}
                                onChange={e => setTxtQualification(e.target.value)}
                                className="form-control"
                                rows={3}
                            />

                        </div>

                    </div>
                    <div className="form-row-2-1">
                        <div className='input-group'>
                            <label>Specialization</label>
                            <textarea
                                id="txtSpecialization"
                                value={txtSpecialization}
                                onChange={e => setTxtSpecialization(e.target.value)}
                                className="form-control"
                                rows={3}
                            />
                        </div>
                        <div className='input-group'>
                            <label>Specialization - Type</label>
                            <input
                                id="txtSpecializationType"
                                value={txtSpecializationType}
                                onChange={e => setTxtSpecializationType(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-row-2-1">
                        <div className='input-group'>
                            <label>License</label>
                            <input
                                type="text"
                                id="txtLicense"
                                value={txtLicense}
                                onChange={e => setTxtLicense(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className='input-group'>
                            <label>Issue Date</label>
                            <input
                                id="txtLicenseIssueDate"
                                value={txtLicenseIssueDate}
                                onChange={e => setTxtLicenseIssueDate(e.target.value)}
                                className="form-control"
                                type="date"
                            />
                        </div>
                    </div>
                </div>
                <div className="dialog-footer main">
                    <button
                        id="btnUpdate"
                        className="btn-main mr-1"
                        onClick={updateLifestyleDetails}
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
