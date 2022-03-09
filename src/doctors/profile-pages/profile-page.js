import { useState } from "react";
import PhoneInput from 'react-phone-number-input'
import FileInput from "../../components/file-input";
import CountrySelect from "../../components/country-select";
import { AddQualificationDialog } from "../dialogs/add-qualification-dialog";
import { ApiPath } from "../../assets/common/base-url";
import { QualificationsItem } from "../lists-objects/qualifications-item"
import { ImageDialog } from "../../components/image-dialog";
import { useHistory } from "react-router-dom"

export const ProfilePage = (props) => {

    const { data } = props;

    const homeAddy = data?.address[0];
    const officeAddy = data?.address[1];

    const [profilePicture, setProfilePicture] = useState(data.photo);
    const [txtContactAddress, setTxtContactAddress] = useState(homeAddy?.street);
    const [txtContactCity, setTxtContactCity] = useState(homeAddy?.city);
    const [txtContactState, setTxtContactState] = useState(homeAddy?.state);
    const [txtContactCountry, setTxtContactCountry] = useState(homeAddy?.country);
    const [txtClinicAddress, setTxtClinicAddress] = useState(officeAddy?.street);
    const [txtClinicCity, setTxtClinicCity] = useState(officeAddy?.city);
    const [txtClinicState, setTxtClinicState] = useState(officeAddy?.state);
    const [txtClinicCountry, setTxtClinicCountry] = useState(officeAddy?.country);
    const [txtPhone, setTxtPhone] = useState(data?.phoneNumber);
    const [txtEmail, setTxtEmail] = useState(data?.emailId);
    const [chkProfileConsent, setChkProfileConsent] = useState(data.profileConsent === "true" ? true : false);
    const [cbxSpecialization, setCbxSpecialization] = useState(data.specialization.type);
    const [practiceDoc, setPracticeDoc] = useState(data?.license?.certification);
    const [specializationDoc, setSpecializationDoc] = useState(data.specialization?.certification);
    const [txtIssueDate, setTxtIssueDate] = useState(data.license?.issueDate);
    const [txtExpiryDate, setTxtExpiryDate] = useState(data.license?.expireDate);
    const [txtIssuingAuthority, setTxtIssuingAuthority] = useState(data.license?.issuer);
    const [txtIcePhone, setTxtIcePhone] = useState(data.emergencyContact?.call.value);
    const [txtAvailableFrom, setTxtAvailableFrom] = useState(data.emergencyContact?.call.period.start);
    const [txtAvailableTo, setTxtAvailableTo] = useState(data.emergencyContact?.call.period.end);
    const [proofOfClinicDocument, setProofOfClinicDocument] = useState(data.proofOfClinic.document)
    const [txtProofFrom, setTxtProofFrom] = useState(data.proofOfClinic.period?.start);
    const [txtProofTo, setTxtProofTo] = useState(data.proofOfClinic.period?.end);
    const [selfOwned, setSelfOwned] = useState(data.proofOfClinic.type === "self-owned" ? true : false);
    const [chkAgree, setChkAgree] = useState(true)
    const [txtClinicOwner, setTxtClinicOwner] = useState(data.proofOfClinic.renter?.name)
    const [txtClinicPhone, setTxtClinicPhone] = useState(data.proofOfClinic.renter?.phone)
    const [txtClinicEmail, setTxtClinicEmail] = useState(data.proofOfClinic.renter?.emailId)

    const [imageDialogVisible, setImageDialogVisible] = useState(false)
    const [imageURL, setImageURL] = useState("");
    const [editQualificationIndex, setEditQualificationIndex] = useState(0);

    const [showQualificationDialog, setShowQualificationDialog] = useState(false);
    const [qualificationsList, setQualificationsList] = useState(data.qualification)


    const doctorsSpecializations = ["Allergist", "Cardiologist", "Dermatologist", "Endocrinologist", "Gastroenterologist",
        "General Physician", "Geriatrician", "Nephrologist", "Neurologist", "OB/GYN", "Ophthalmologist",
        "Orthopaedist", "Pediatrician", "Psychiatrist", "Urologist"]

    const specializationOptions = doctorsSpecializations.map(item => (<option key={item} value={item}>{item}</option>));

    const qualifications = qualificationsList.map((item, index) => {
        return (<QualificationsItem
            key={index}
            itemIndex={index}
            period={item.period}
            code={item.code}
            document={item.document}
            issuer={item.issuer}
            showImageDialog={() => setImageDialogVisible(true)}
            setImageURL={setImageURL}
            dataList={qualificationsList}
            setQualificationsList={setQualificationsList}
            setEditIndex={value => setEditQualificationIndex(value)}
            showQualDialog={() => setShowQualificationDialog(true)}

        />)
    })

    const [fullname] = useState(data.name)
    const [email] = useState(data.emailId);

    const updateDoctorsData = () => {
        //Set the contact data...
        //Validate first...
        if (txtContactAddress === "" || txtContactCity === "" || txtContactState === "") {
            props.showToast("Ensure all personal contact data is supplied before proceeding.", "exclamation");
            return;
        }

        const homeContact = {
            "type": "Home",
            "houseNumber": "",
            "street": txtContactAddress,
            "city": txtContactCity,
            "district": "",
            "state": txtContactState,
            "postalCode": "",
            "country": txtContactCountry,
            "period": {
                "start": "",
                "end": ""
            }
        }

        //Validate clinic contact
        if (txtClinicAddress === "" || txtClinicCity === "" || txtClinicState === "") {
            props.showToast("Ensure all clinic contact data is supplied before proceeding.", "exclamation");
            return;
        }

        const clinicContact = {
            "type": "Clinic",
            "houseNumber": "",
            "street": txtClinicAddress,
            "city": txtClinicCity,
            "district": "",
            "state": txtClinicState,
            "postalCode": "",
            "country": txtClinicCountry,
            "period": {
                "start": "",
                "end": ""
            }
        }

        //Specialization...
        if (cbxSpecialization === "" || specializationDoc === "" || practiceDoc === "" || txtIssueDate === "" || txtExpiryDate === ""
            || txtIssuingAuthority === "") {
            props.showToast("Specialization fields are all required.", "exclamation");
            return;
        }

        //Else add..
        const specialization = {
            "type": cbxSpecialization,
            "cerfification": specializationDoc,
        }

        const license = {
            "certification": practiceDoc,
            "expireDate": txtExpiryDate,
            "issueDate": txtIssueDate,
            "issuer": txtIssuingAuthority,
            "issuerID": ""
        }

        //In Case of Emergency
        if (txtIcePhone === "" || txtAvailableFrom === "" || txtAvailableTo === "") {
            props.showToast("Provide complete information for the I.C.E. fields before proceeding.", "exclamation");
            return;
        }

        const ice = {
            "call": {
                "period": {
                    "start": txtAvailableFrom,
                    "end": txtAvailableTo
                },
                "value": txtIcePhone
            },
            "sms": {
                "period": {
                    "start": txtAvailableFrom,
                    "end": txtAvailableTo
                },
                "value": txtIcePhone
            }
        }

        //Proof of clinic...
        if (proofOfClinicDocument === "") {
            props.showToast("Upload document of proof of clinic / address before proceeding.", "exclamation");
            return;
        } else if (!selfOwned) {
            if (txtClinicOwner === "" || txtClinicPhone === "" || txtClinicEmail === "") {
                props.showToast("Enter renter's details before proceeding.", "exclamation");
                return;
            }
        }


        const proofOfClinic = {
            "document": proofOfClinicDocument,
            "type": selfOwned ? "self-owned" : "rented",
            "renter": {
                "name": txtClinicOwner,
                "phone": txtClinicPhone,
                "email": txtClinicEmail
            },
            "period": {
                "start": txtProofFrom,
                "end": txtProofTo
            }
        }

        //Check if the agree to terms box is checked...
        if (!chkAgree) {
            props.showToast("You must agree to undertaking to proceed.", "exclamation");
            return;
        }

        const updateData = {
            'address': [homeContact, clinicContact],
            'photo': profilePicture,
            'profileConsent': chkProfileConsent.toString(),
            'qualification': qualificationsList,
            'license': license,
            'specialization': specialization,
            'ice': ice,
            'proofOfClinic': proofOfClinic,
        }

        const options = {
            'body': JSON.stringify(updateData),
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            'method': "PUT",
        }

        props.setIsLoaderVisible(true)
        props.showToast("This might take a while, as there's a lot of information to upload... Please be patient.", 'information');

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

                    //update doctor's data
                    sessionStorage.setItem('doctor', JSON.stringify(response.data));


                } else {
                    props.showToast(response.message, 'exclamation');
                }
            })
            .catch(error => {
                props.setIsLoaderVisible(false);
                props.showToast(error.message, 'exclamation');
            })
    }

    const rentedClass = selfOwned ? "form-row-3 d-none" : "form-row-3";

    return (
        <>
            {/* Personal details... */}
            <div className='box-container'>
                <div className="doc-profile-header">
                    <h2>1</h2>
                </div>
                <h3>Personal Details</h3>
                <div className='doc-profile'>
                    <div className="flex-center" style={{ marginBottom: 0, marginRight: '30px' }}>
                        <div className='image-box'>
                            <img src={profilePicture || '/portfolio/avatar.png'} alt='' />
                        </div>
                        <div className="input-group">
                            <FileInput
                                inputFile={profilePicture}
                                setFileOutput={setProfilePicture}
                                acceptFileTypes={".png, .jpg, .jpeg"}
                            />
                        </div>
                    </div>
                    <div className="details">
                        <div className="name-group">
                            <h4>Fullname</h4>
                            <p>{fullname}</p>
                        </div>
                        <div className="name-group">
                            <h4>Email</h4>
                            <p>{email}</p>
                        </div>
                        <div className="name-group">
                            <h4>Specialization</h4>
                            <p>{cbxSpecialization}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="box-container">
                <div className="doc-profile-header">
                    <h2>2</h2>
                </div>
                <h3>Contact Details</h3>
                <div className="form-row-2">
                    <div className="input-group">
                        <textarea
                            required
                            className="form-control"
                            id="txtContactAddress"
                            rows={3}
                            value={txtContactAddress}
                            onChange={e => setTxtContactAddress(e.target.value)}
                        />
                        <label>Contact Address</label>

                    </div>
                    <div className="input-group">
                        <textarea
                            required
                            className="form-control"
                            id="txtClinicAddress"
                            rows={3}
                            value={txtClinicAddress}
                            onChange={e => setTxtClinicAddress(e.target.value)}
                        />
                        <label>Clinic Address</label>
                    </div>
                </div>
                <div className="form-row-2">
                    <div className="form-row-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                required
                                id="txtContactCity"
                                value={txtContactCity}
                                onChange={e => setTxtContactCity(e.target.value)}
                            />
                            <label>Contact City</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                required
                                id="txtContactState"
                                value={txtContactState}
                                onChange={e => setTxtContactState(e.target.value)}
                            />
                            <label>Contact State</label>
                        </div>
                    </div>
                    <div className="form-row-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                required
                                id="txtClinicCity"
                                value={txtClinicCity}
                                onChange={e => setTxtClinicCity(e.target.value)}
                            />
                            <label>Clinic City</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                required
                                id="txtClinicState"
                                value={txtClinicState}
                                onChange={e => setTxtClinicState(e.target.value)}
                            />
                            <label>Clinic State</label>
                        </div>
                    </div>
                </div>
                {/* Country row */}
                <div className="form-row-2 mb-2">
                    <div className="form-row-2-1">
                        <CountrySelect
                            label={"Contact Country"}
                            id="txtContactCountry"
                            value={txtContactCountry}
                            onChange={e => setTxtContactCountry(e.target.value)}
                        />
                    </div>
                    <div className="form-row-2-1">
                        <CountrySelect
                            label={"Clinic Country"}
                            id="txtClinicCountry"
                            value={txtClinicCountry}
                            onChange={(val) => setTxtClinicCountry(val.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className='form-row-2'>
                    <div className='input-group'>
                        <PhoneInput
                            placeholder=""
                            value={txtPhone}
                            onChange={phone => setTxtPhone(phone)}
                            className='form-control'
                            style={{ paddingTop: 0, paddingBottom: 0 }}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="email"
                            id="txtEmail"
                            value={txtEmail}
                            onChange={e => setTxtEmail(e.target.value)}
                            style={{ paddingTop: '12px', paddingBottom: '12px' }}
                            required
                        />
                        <label>Email</label>
                    </div>
                </div>
                <hr />
                <div className="form-row">
                    <div className="check-box">
                        <label>
                            <input
                                checked={chkProfileConsent}
                                type="checkbox"
                                className="custom-checkbox"
                                id="chkProfileConsent"
                                onChange={() => setChkProfileConsent(!chkProfileConsent)}

                            />  Allow patient to view profile
                        </label>
                    </div>
                </div>
            </div>

            {/* Qualifications */}
            <div className="box-container">
                <div className="doc-profile-header">
                    <h2>3</h2>
                </div>
                <h3>Qualifications</h3>
                <div className="qualifications">
                    {qualificationsList.length === 0
                        ? <div className='not-found'>
                            <img src='/img/svg/no-data.svg' style={{ width: '80px' }} />
                            <h4 style={{ fontSize: '15px' }}>No Qualifications added...</h4>

                        </div>
                        :
                        <>
                            {qualifications}
                        </>}
                    <button
                        className="btn-main mb-2"
                        onClick={() => setShowQualificationDialog(true)}
                    >
                        Add qualification...
                    </button>
                </div>
            </div>

            {/* Specialization */}
            <div className="box-container">
                <div className="doc-profile-header">
                    <h2>4</h2>
                </div>
                <h3>Specialization</h3>
                <div className="form-row-2">
                    <div className="input-group">
                        <label>Specialization</label>
                        <select
                            className="form-control"
                            id="cbxSpecialization"
                            value={cbxSpecialization}
                            onChange={e => setCbxSpecialization(e.target.value)}
                        >
                            <option value="">Select</option>
                            {specializationOptions}
                        </select>
                    </div>
                </div>
                <div className="form-row-2 mb-1">
                    <div className="input-group">
                        <label>Specialization document (upload)</label>
                        <FileInput
                            inputFile={specializationDoc}
                            setFileOutput={setSpecializationDoc}
                            acceptFileTypes={".png, .jpg, .jpeg, .pdf"}
                        />
                    </div>
                </div>
                <div className="form-row-2">
                    <div className="input-group">
                        <label>License to practice document (upload)</label>
                        <FileInput
                            inputFile={practiceDoc}
                            setFileOutput={setPracticeDoc}
                            acceptFileTypes={".png, .jpg, .jpeg, .pdf"}
                        />
                    </div>
                </div>
                <div className="form-row-2">
                    <div className="input-group">
                        <label>Issue date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="txtIssueDate"
                            value={txtIssueDate}
                            onChange={e => setTxtIssueDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Expiry date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="txtExpiryDate"
                            value={txtExpiryDate}
                            onChange={e => setTxtExpiryDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <label>Issuing Authority</label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtIssuingAuthority"
                            value={txtIssuingAuthority}
                            onChange={e => setTxtIssuingAuthority(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* ICE - In Case of Emergency */}
            <div className="box-container">
                <div className="doc-profile-header">
                    <h2>5</h2>
                </div>
                <h3>ICE - (<b>I</b>n <b>C</b>ase of <b>E</b>mergency)</h3>
                <div className="form-row-2">
                    <div className="input-group">
                        <label>Phone (&amp; SMS)</label>
                        <PhoneInput
                            placeholder="Enter mobile number"
                            value={txtIcePhone}
                            onChange={phone => setTxtIcePhone(phone)}
                            className='form-control'
                            style={{ paddingTop: 0, paddingBottom: 0 }}
                        />
                    </div>
                </div>
                <div className="form-row-2">
                    <div className="input-group">
                        <label>Availability - From</label>
                        <input
                            type="time"
                            className="form-control"
                            id="txtAvailableFrom"
                            value={txtAvailableFrom}
                            onChange={e => setTxtAvailableFrom(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>To</label>
                        <input
                            type="time"
                            className="form-control"
                            id="txtAvailableTo"
                            value={txtAvailableTo}
                            onChange={e => setTxtAvailableTo(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Others */}
            <div className="box-container">
                <div className="doc-profile-header">
                    <h2>6</h2>
                </div>
                <h3>Proof of Clinic / Address</h3>

                <div className="form-row-2-1-1 mb-1">
                    <div className="input-group">
                        <label>Upload document</label>
                        <FileInput
                            inputFile={proofOfClinicDocument}
                            setFileOutput={setProofOfClinicDocument}
                            acceptFileTypes={".png, .jpg, .jpeg, .pdf"}
                        />
                    </div>
                    <div className="input-group">
                        <label>Occupation Period</label>
                        <input
                            type="date"
                            className="form-control"
                            id="txtProofFrom"
                            value={txtProofFrom}
                            onChange={e => setTxtProofFrom(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>To</label>
                        <input
                            type="date"
                            className="form-control"
                            id="txtProofTo"
                            value={txtProofTo}
                            onChange={e => setTxtProofTo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="questions">
                    <div className='question mb-1'>
                        <p style={{ color: '#888' }}>What kind of operation do you run?</p>
                        <div className="radio-group">
                            <div className="radio-button">
                                <label>
                                    <input
                                        type='radio'
                                        className='custom-radio'
                                        name='operationType'
                                        checked={selfOwned}
                                        onChange={() => setSelfOwned(true)}
                                    />Self Owned
                                </label>
                            </div>
                            <div className="radio-button">
                                <label>
                                    <input
                                        type='radio'
                                        className='custom-radio'
                                        name='operationType'
                                        checked={!selfOwned}
                                        onChange={() => setSelfOwned(false)}
                                    />Rented
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={rentedClass}>
                    <div className="input-group">
                        <label>Owner Name</label>
                        <input
                            className="form-control"
                            id="txtClinicOwner"
                            value={txtClinicOwner}
                            onChange={e => setTxtClinicOwner(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Phone</label>
                        <PhoneInput
                            placeholder=""
                            value={txtClinicPhone}
                            onChange={phone => setTxtClinicPhone(phone)}
                            className='form-control'
                            style={{ paddingTop: 0, paddingBottom: 0 }}
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="txtClinicEmail"
                            value={txtClinicEmail}
                            onChange={e => setTxtClinicEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-row-2 mb-2">
                    <div className="information-box">
                        <i className="icofont-info-circle" />
                        <p><b>Exit guidelines:</b> in case the doctor changes clinic there is a mandate
                            to update clinic proof in order to continue access. See undertaking in link
                            below
                        </p>
                    </div>

                </div>
                <div className="form-row mb-2">
                    <div className="check-box">
                        <label>
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                                id="chkAgree"
                                value={chkAgree}
                                checked={chkAgree}
                                onChange={() => setChkAgree(!chkAgree)}
                            /> I agree to <a href="#"> undertaking</a>
                        </label>
                    </div>
                </div>


            </div>
            <div className="flex-center">
                <button
                    className="btn-main"
                    onClick={updateDoctorsData}
                ><i className="icofont-upload-alt" /> Update Changes</button>
            </div>

            <AddQualificationDialog
                dataIndex={editQualificationIndex}
                showDialog={showQualificationDialog}
                hideDialog={() => setShowQualificationDialog(false)}
                setQualificationsList={setQualificationsList}
                qualificationsList={qualificationsList}
                showToast={props.showToast}
            />

            {imageDialogVisible && <ImageDialog
                src={imageURL}
                setImageDisplay={imageDialogVisible}
                hideImageDialog={setImageDialogVisible}
            />
            }
        </>
    );
}
