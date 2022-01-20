import React, { useState } from 'react';
import { ApiPath } from '../../assets/common/base-url';
import { countriesList } from '../../assets/common/countries';

export const Contact = props => {

    const [showDialog, setShowDialog] = useState(false);
    const address = props.data?.address;
    const houseNumber = address[0]?.houseNumber ? address[0]?.houseNumber + ", " : "";
    const street = address[0]?.street ? address[0]?.street + ", " : "";
    const city = address[0]?.city ? address[0]?.city + ", " : "";
    const state = address[0]?.state ? address[0]?.state + ", " : "";
    const district = address[0]?.district ? address[0]?.district + ", " : "";
    const postalCode = address[0]?.postalCode ? address[0]?.postalCode + " - " : "";


    const showPhone = props.data?.contactPerson.length > 0 ? "icofont-phone" : "";
    const contactDetails = props.data?.contactPerson.length > 0
        && `${props.data?.contactPerson && props.data?.contactPerson[0]?.name} (${props.data?.contactPerson && props.data?.contactPerson[0]?.relationship})`

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
                                <td><span style={{color:'red'}}>*</span>Phone</td>
                                <td>{props.data?.phoneNumber}</td>
                                <td onClick={() => setShowDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                            </tr>
                            <tr>
                                <td><span style={{color:'red'}}>*</span>Address</td>
                                <td>{address && address === []
                                    ? ""
                                    : `${houseNumber}${street}${city}${district}${state}${postalCode}`}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><span style={{color:'red'}}>*</span>Country</td>
                                <td>{address ? address[0]?.country : "-"}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><span style={{color:'red'}}>*</span>E-mail</td>
                                <td>{props.data.emailId}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><span style={{color:'red'}}>*</span>Contact Person</td>
                                <td>
                                    { contactDetails }<br />
                                    <i className={showPhone}></i>{props.data?.contactPerson && props.data?.contactPerson[0]?.contact?.value}
                                </td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <ContactDialog
                showDialog={showDialog}
                hideDialog={() => setShowDialog(false)}
                data={props.data}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setResetData={props.setResetData}
            />
        </>
    );
}

const ContactDialog = props => {

    const addressData = props.data.address[0] || {};
    const contactPerson = props.data.contactPerson[0] || {};

    const [txtPhone, setTxtPhone] = useState(props.data.phoneNumber);
    const [addressType, setAddressType] = useState(addressData?.type);
    const [txtHouseNo, setTxtHouseNo] = useState(addressData?.houseNumber);
    const [txtStreet, setTxtStreet] = useState(addressData?.street);
    const [txtCity, setTxtCity] = useState(addressData?.city);
    const [txtDistrict, setTxtDistrict] = useState(addressData?.district);
    const [txtState, setTxtState] = useState(addressData?.state);
    const [txtPostalCode, setTxtPostalCode] = useState(addressData.postalCode);
    const [txtCountry, setTxtCountry] = useState(addressData?.country);
    const [txtEmail, setTxtEmail] = useState(props.data?.emailId);
    const [txtContactPerson, setTxtContactPerson] = useState(contactPerson?.name);
    const [txtRelationship, setTxtRelationship] = useState(contactPerson?.relationship)
    const [txtContactPhone, setTxtContactPhone] = useState(contactPerson?.contact?.value)

    const updateContactDetails = () => {
        //update just the personal details contained here...
        const data = {
            emailId: txtEmail,
            address: [{
                "type": addressType,
                "houseNumber": txtHouseNo,
                "street": txtStreet,
                "city": txtCity,
                "district": txtDistrict,
                "state": txtState,
                "postalCode": txtPostalCode,
            }],
            contactPerson: [{
                "relationship": txtRelationship,
                "name": txtContactPerson,
                "contact": {
                    "system": "Phone",
                    "value": txtContactPhone,
                }
            }],
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
    const countryList =  countriesList.map((item, index) => {
        return (<option key={index} value={item.name}>{item.name} ({item.code})</option>)
    })

    return (
        <div className={displayDialog}>
            <div className="dialog-container" style={{ width: '800px' }}>
                <div className="dialog-header">
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-contacts"></i> Edit Contact Details</h2>
                </div>
                <div className="dialog-body">
                    <div className="form-row-3">
                        <div className='input-group'>
                            <label>Phone</label>
                            <input
                                className="form-control"
                                id="txtPhone"
                                value={txtPhone}
                                onChange={e => setTxtPhone(e.target.value)}
                            />
                        </div>
                        <div className='input-group'>
                            <label>Type</label>
                            <select
                                id="addressType"
                                value={addressType}
                                onChange={e => setAddressType(e.target.value)}
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Office">Office</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>House Number</label>
                            <input
                                className="form-control"
                                id="txtHouseNo"
                                value={txtHouseNo}
                                onChange={e => setTxtHouseNo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row-2-1">
                        <div className="input-group">
                            <label>Street</label>
                            <textarea
                                rows={2}
                                className="form-control"
                                id="txtStreet"
                                value={txtStreet}
                                onChange={e => setTxtStreet(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>City <span style={{color: 'red'}}>*</span></label>
                            <input
                                className="form-control"
                                id="txtCity"
                                value={txtCity}
                                onChange={e => setTxtCity(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="form-row-3">
                        <div className="input-group">
                            <label>District</label>
                            <input
                                className="form-control"
                                id="txtDistrict"
                                value={txtDistrict}
                                onChange={e => setTxtDistrict(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>State</label>
                            <input
                                className="form-control"
                                id="txtState"
                                value={txtState}
                                onChange={e => setTxtState(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Postal Code</label>
                            <input
                                className="form-control"
                                id="txtPostalCode"
                                value={txtPostalCode}
                                onChange={e => setTxtPostalCode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row-2">
                        <div className="input-group">
                            <label>Country <span style={{color: 'red'}}>*</span></label>
                            <select
                                className="form-control"
                                id="txtCountry"
                                value={txtCountry}
                                onChange={e => setTxtCountry(e.target.value)}
                            >
                                {countryList}
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Email</label>
                            <input
                                className="form-control"
                                type="email"
                                id="txtEmail"
                                value={txtEmail}
                                onChange={e => setTxtEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className='input-group'>
                            <label>Contact Person (Name)</label>
                            <input
                                className="form-control"
                                type="tel"
                                id="txtContactPerson"
                                value={txtContactPerson}
                                onChange={e => setTxtContactPerson(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row-2">
                        <div className='input-group'>
                            <label>Relationship</label>
                            <input
                                className="form-control"
                                type="tel"
                                id="txtRelationship"
                                value={txtRelationship}
                                onChange={e => setTxtRelationship(e.target.value)}
                            />
                        </div>
                        <div className='input-group'>
                            <label>Phone</label>
                            <input
                                className="form-control"
                                type="tel"
                                id="txtContactPhone"
                                value={txtContactPhone}
                                onChange={e => setTxtContactPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="dialog-footer main">
                    <button
                        id="btnUpdate"
                        className="btn-main mr-1"
                        onClick={updateContactDetails}
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
