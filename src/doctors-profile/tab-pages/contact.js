import React, { useState } from 'react';
import { ApiPath } from '../../assets/common/base-url';

export const Contact = (props) => {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <div className="tab-page-content">
                <div className="page-header">
                    <h2>Contact Information</h2>
                </div>
                <div className="page-body">
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td>Phone</td>
                                <td>{props.data?.phoneNumber}</td>
                                <td onClick={() => setShowDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{props.data.address}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>{props.data.emailAddress}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <ContactDialog
                showDialog={showDialog}
                hideDialog={() => setShowDialog(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                data={props.data}
                setResetData={props.setResetData}
            />
        </>
    );
}

const ContactDialog = props => {

    const [txtPhone, setTxtPhone] = useState(props.data.phoneNumber);
    const [txtAddress, setTxtAddress] = useState(props.data.address ? [...props.data.address] : "");
    const [txtEmail, setTxtEmail] = useState(props.data?.emailAddress);

    const updateContact = () => {
        const data = {
            address: [txtAddress],
            emailAddress: txtEmail,
            phoneNumber: txtPhone,
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
                    <h2 className="nully main"><i className="icofont-contacts"></i> Edit Contact Details</h2>
                </div>
                <div className="dialog-body main">
                    <div className="form-row">
                        <div className='input-group'>
                            <label>Phone</label>
                            <input
                                id="txtPhone"
                                value={txtPhone}
                                onChange={e => setTxtPhone(e.target.value)}
                                className="form-control"
                                type="tel"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='input-group'>
                            <label>Address</label>
                            <textarea
                                id="txtAddress"
                                value={txtAddress}
                                onChange={e => setTxtAddress(e.target.value)}
                                rows={3}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='input-group'>
                            <label>Email</label>
                            <input
                                id="txtEmail"
                                value={txtEmail}
                                onChange={e => setTxtEmail(e.target.value)}
                                className="form-control"
                                type="email"
                            />
                        </div>
                    </div>

                </div>
                <div className="dialog-footer main">
                    <button
                        id="btnUpdate"
                        className="btn-main mr-1"
                        onClick={() => updateContact()}
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
