import { NavBar } from "../components/nav-bar";
import { PatientTabHeaders } from "./tab-pages/patient-tab-headers";
import React, { useState, useEffect } from 'react';
import { Contact } from "./tab-pages/contact";
import { Personal } from "./tab-pages/personal"
import { Medical } from "./tab-pages/medical";
import { Lifestyle } from "./tab-pages/lifestyle";
import { Others } from "./tab-pages/others";
import { ApiPath } from "../assets/common/base-url";
import { fileToBase64 } from "../assets/common/file-to-base64";
import { DiagnosisReport } from "../dhp/medical-records/diagnosis-report";

const Patients = props => {

    const [patientsData, setPatientsData] = useState(() => JSON.parse(sessionStorage.getItem('patient')));
    const [selectedTab, setSelectedTab] = useState(2);
    const [outputText, setOutputText] = useState("");
    const [picture, setPicture] = useState(() => JSON.parse(sessionStorage.getItem('patient')).photo);

    const [tempPix, setTempPix] = useState('');

    const handleChange = e => {
        const file = e.target.files[0];

        fileToBase64(file)
            .then(response => {
                setTempPix(response.toString());
                setOutputText(file.name);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const removeFile = () => {
        setTempPix('');
        const uploadFile = document.querySelector('#uploadFile');
        uploadFile.value = '';
    }

    useEffect(() => {
        const dropZone = document.querySelector('.upload-file-area');
        const fileInput = document.getElementById('uploadFile');

        dropZone.addEventListener('dragover', e => {
            // we must preventDefault() to let the drop event fire
            e.preventDefault();
        });

        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            // drag/drop files are in event.dataTransfer
            let files = e.dataTransfer.files;
            fileInput.files = files;
            const file = fileInput.files[0];

            fileToBase64(file)
                .then(response => {
                    setPicture(response.toString());
                    setOutputText(file.name);
                })
                .catch(err => {
                    props.showToast(err, "exclamation");
                })

        });

        return () => {

            dropZone.removeEventListener('dragover', e => {
                // we must preventDefault() to let the drop event fire
                e.preventDefault();
            });

            dropZone.removeEventListener('drop', e => {
                e.preventDefault();
                // drag/drop files are in event.dataTransfer
                let files = e.dataTransfer.files;
                fileInput.files = files;
                console.log(`added ${files.length} files`);
            });

        }

    }, [])

    const updatePicture = () => {
        //Update the picture...
        //update just the personal details contained here...
        const data = {
            'photo': tempPix,
        }

        const options = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            'method': 'PUT',
            'body': JSON.stringify(data)
        };

        props.setIsLoaderVisible(true)

        //Then update just this data...
        fetch(ApiPath + "patient/profileUpdate", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                props.setIsLoaderVisible(false);
                if (response && response.statusCode === 200) {
                    props.showToast(`Update Successful!`, 'success');

                    //Remember to refresh the fetched data after this..
                    setPatientsData(response.data.data);
                    sessionStorage.setItem('patient', JSON.stringify(response.data.data));

                } else {
                    props.showToast(response.message, 'exclamation');
                }
            })
            .catch(err => {
                props.setIsLoaderVisible(false);
                props.showToast(err.message, 'exclamation');
            })
    }

    return (
        <div>
            <NavBar
                activeLink={2}
                picture={picture}
                data={patientsData}
            />
            <div className="body-container">
                <div className="left-container">
                    <div className="profile-image">
                        <img
                            src={tempPix ? tempPix : (picture || "/portfolio/avatar.png")}
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <div className="line-container">
                        <h4><i className="icofont-double-right"></i>Patient</h4>
                    </div>
                    <div className="lower-left upload-file-area mb-2">
                        <div className={tempPix ? 'd-none' : ''}>
                            <i className='icofont-cloud-upload' />
                            <label>Drop files to upload or </label>
                            <button className="btn-upload">
                                <input
                                    type="file"
                                    name="uploadFile"
                                    id="uploadFile"
                                    accept={".png, .jpg, .jpeg"}
                                    onChange={handleChange}
                                />
                                browse
                            </button>
                        </div>
                        <label className={tempPix ? '' : 'd-none'}><span>Attached File: </span>{outputText}<button className='btn-upload' onClick={removeFile}>remove</button></label>
                    </div>
                    <div className="lower-left">
                        <button
                            className={tempPix ? "btn-main mb-2" : "d-none"}
                            id="btnUploadPix"
                            style={{ fontSize: '12px', width: '100%' }}
                            onClick={updatePicture}>
                            <i className="icofont-upload-alt"></i> Update Profile Picture
                        </button>

                    </div>

                </div>
                <div className="right-container">
                    <div className="title">
                        <h2>{patientsData.name}</h2>
                    </div>
                    {/* <div className='box'>
                        <h4>Profile Status</h4>
                        <div className="percent">
                            <svg>
                                <circle cx='70' cy='70' r='70'></circle>
                                <circle id='secondCircle' cx='70' cy='70' r='70'></circle>
                            </svg>
                            <div className="number">
                                <h2>{percentComplete}<span>%</span></h2>
                            </div>
                            <h2 className='text'>Complete</h2>
                        </div>
                    </div> */}
                    <div className="upcoming-appointment">
                        <div className="line-container">
                            <h4><i className="icofont-double-right"></i>Update Profile</h4>
                        </div>
                    </div>

                    <PatientTabHeaders
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />

                    {selectedTab === 1 && <Contact
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 2 && <Personal
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 3 && <Medical
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 4 && <Lifestyle
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 5 && <DiagnosisReport
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 6 && <Others
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                </div>
            </div>

        </div>
    );
}

export default Patients;
