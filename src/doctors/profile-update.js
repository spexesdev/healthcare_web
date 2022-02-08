import { useState } from "react";
import PhoneInput from 'react-phone-number-input'
import FileInput from "../components/file-input";


const DoctorsProfileUpdate = (props) => {

    const [profilePicture, setProfilePicture] = useState('');
    const [tempPix, setTempPix] = useState('');
    const [txtContactAddress, setTxtContactAddress] = useState('');
    const [txtClinicAddress, setTxtClinicAddress] = useState('');
    const [txtPhone, setTxtPhone] = useState(props.data?.phone);
    const [txtEmail, setTxtEmail] = useState(props.data?.email);
    const [cbxSpecialization, setCbxSpecialization] = useState('');
    const [practiceDoc, setPracticeDoc] = useState('');
    const [specializationDoc, setSpecializationDoc] = useState('');
    const [txtIssueDate, setTxtIssueDate] = useState('');
    const [txtExpiryDate, setTxtExpiryDate] = useState('');
    const [txtIssuingAuthority, setTxtIssuingAuthority] = useState('');
    const [txtIcePhone, setTxtIcePhone] = useState('');
    const [txtAvailableFrom, setTxtAvailableFrom] = useState('');
    const [txtAvailableTo, setTxtAvailableTo] = useState('');

    const qualifications = props.data?.qualifications?.map(item => (<div>Qualification Tab</div>))
    const doctorsSpecializations = ["Allergist", "Cardiologist", "Dermatologist", "Endocrinologist", "Gastroenterologist",
        "General Physician", "Geriatrician", "Nephrologist", "Neurologist", "OB/GYN", "Ophthalmologist",
        "Orthopaedist", "Pediatrician", "Psychiatrist", "Urologist"]

    const specializationOptions = doctorsSpecializations.map(item => (<option key={item} value={item}>{item}</option>));

    return (
        <div className='background'>
            <div className='grid-background'></div>
            <div className="plain-container">
                <h2 className="registration-caption"><i class="icofont-rounded-double-right"></i> Complete Your Registration</h2>
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
                                    setFileOutput={setProfilePicture}
                                    acceptFileTypes={".png, .jpg, .jpeg"}
                                />
                            </div>
                        </div>

                        <div className="details">
                            <div className="name-group">
                                <h4>Fullname</h4>
                                <p>John Doe</p>
                            </div>
                            <div className="name-group">
                                <h4>Email</h4>
                                <p>reubenogbuani@gmail.com</p>
                            </div>
                            <div className="name-group">
                                <h4>Specialization</h4>
                                <p>Dentistry</p>
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
                            <label>Contact Address</label>
                            <textarea
                                className="form-control"
                                id="txtContactAddress"
                                rows={3}
                                value={txtContactAddress}
                                onChange={e => setTxtContactAddress(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Clinic Address</label>
                            <textarea
                                className="form-control"
                                id="txtClinicAddress"
                                rows={3}
                                value={txtClinicAddress}
                                onChange={e => setTxtClinicAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form-row-2'>
                        <div className='input-group'>
                            <label>Phone</label>
                            <PhoneInput
                                placeholder="Enter mobile number"
                                value={txtPhone}
                                onChange={phone => setTxtPhone(phone)}
                                className='form-control'
                                style={{ paddingTop: 0, paddingBottom: 0 }}
                            />
                        </div>
                        <div className="input-group">
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
                </div>

                {/* Qualifications */}
                <div className="box-container">
                    <div className="doc-profile-header">
                        <h2>3</h2>
                    </div>
                    <h3>Qualifications</h3>
                    <div className="qualifications">
                        {!props.data?.qualifications
                            ? <div className='not-found'>
                                <img src='/img/svg/no-data.svg' style={{ width: '80px' }} />
                                <h4 style={{ fontSize: '15px' }}>No Qualifications added...</h4>

                            </div>
                            : <div>
                                {qualifications}
                            </div>}
                        <button

                            className="btn-main mb-2"
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
                                setFileOutput={setSpecializationDoc}
                                acceptFileTypes={".png, .jpg, .jpeg, .pdf"}
                            />
                        </div>
                    </div>
                    <div className="form-row-2">
                        <div className="input-group">
                            <label>License to practice document (upload)</label>
                            <FileInput
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
                <div className="flex-center">
                    <button className="btn-main"><i className="icofont-upload-alt" /> Update Changes</button>
                </div>
            </div>

        </div>
    );
}

export default DoctorsProfileUpdate;
