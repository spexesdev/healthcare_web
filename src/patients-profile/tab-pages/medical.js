import React, { useState, useEffect } from 'react';
import { ApiPath } from '../../assets/common/base-url'

export const Medical = props => {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="tab-page-content">
            <div className="page-header">
                <h2>Medical Details</h2>
            </div>
            <div className="page-body">
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td>Allergies</td>
                            <td>{Object.keys(props.data?.allergies).length > 0 ? props.data?.allergies?.value.join(", ") : ''}</td>
                            <td onClick={() => setShowDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                        </tr>
                        <tr className='d-none'>
                            <td><span style={{ color: 'red' }}>*</span>Managing Organization (Hospital)</td>
                            <td>{props.data.managingOrganization}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'red' }}>*</span>Blood Group</td>
                            <td>{props.data.general?.bloodGroup}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'red' }}>*</span>Height</td>
                            <td>{props.data.general?.height} cm</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'red' }}>*</span>Weight</td>
                            <td>{props.data.general?.weight} kg</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'red' }}>*</span>BMI</td>
                            <td>{props.data.general?.bmi}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'red' }}>*</span>Chest Expansion</td>
                            <td>{props.data.general?.chestExpansion} cm</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Vision</td>
                            <td>{props.data.general?.vision}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>BP</td>
                            <td>{props.data.general?.bp}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'red' }}>*</span>Pulse</td>
                            <td>{props.data.general?.pulse} BPM</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'red' }}>*</span>Oxygen Saturation</td>
                            <td>{props.data.general?.oxygenSaturation} %</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <MedicalDialog
                showDialog={showDialog}
                hideDialog={() => setShowDialog(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                data={props.data}
                setPatientsData={props.setPatientsData}
            />
        </div>
    );
}

const MedicalDialog = props => {

    const [txtAllergies, setTxtAllergies] = useState('')
    const [chkAllergies, setChkAllergies] = useState(props.data?.general.allergies?.length !== 0 ? false : true);
    const [txtManagingOrg, setTxtManagingOrg] = useState(props.data.managingOrganization)

    const [bloodGroup, setBloodGroup] = useState(props.data?.general?.bloodGroup);
    const [height, setHeight] = useState(props.data?.general?.height);
    const [weight, setWeight] = useState(props.data?.general?.weight);
    const [vision, setVision] = useState(props.data?.general?.vision);
    const [chestExpansion, setChestExpansion] = useState(props.data?.general?.chestExpansion);
    const [bloodPressure, setBloodPressure] = useState(props.data?.general?.bp);
    const [pulse, setPulse] = useState(props.data?.general?.pulse);
    const [oxygenSaturation, setOxygenSaturation] = useState(props.data?.general?.oxygenSaturation);
    const [bmi, setBmi] = useState(props.data?.general?.bmi);

    const [selectedAllergies, setSelectedAllergies] = useState(Object.keys(props.data?.allergies).length > 0 ? [...props.data?.allergies?.value] : []);
    const allergiesList = ['Lactose', 'Soy', 'Seafood', 'Nuts', 'Eggs', 'Fish', 'Mushroom', 'Gluten', 'Penicillin', 'Sulpha drugs', 'Local anaesthesia',
        'Aspirin', 'Insulin', 'X-Ray dye', 'Pollen', 'Mould', 'Pets', 'Other']

    const allergiesMap = allergiesList.map((item, index) => {
        return (<option key={index} value={item}>{item}</option>)
    })

    const addAllergiesToList = selItem => {
        //Ensure that the selected item is not in the list...
        if (selectedAllergies.indexOf(selItem) === -1) {
            //Item is not found in the list...
            setSelectedAllergies([...selectedAllergies, selItem])

            //Also, remove this item from the original list.
            allergiesList.splice(allergiesList.indexOf(selItem), 1)

        }
    }

    useEffect(() => {
        if (parseInt(height) === 0 || parseInt(weight) === 0) {
            //Avoid NaN
            setBmi(0);
        } else {
            setBmi((parseInt(height) / parseInt(weight)).toString().substring(0, 4))
        }

    }, [height, weight])

    const handleBlur = (minValue, maxValue, inputValue, item) => {
        //Check for split values in blood pressure and vision
        if (item === 'bloodPressure' || item === 'vision') {
            //Proceed to do the rest...
            const splitValue = inputValue.split("/");
            if (splitValue[1] > maxValue || splitValue[0] < minValue) {
                //Doesnt work...
                props.showToast('Acceptable range of values for ' + item + ' is between ' + minValue + ' and ' + maxValue + '.', 'exclamation');
                const itemElt = document.getElementById(item)
                itemElt.classList.add('error-border')
                itemElt.focus();
            }

            return;
        }

        if (inputValue > maxValue || inputValue < minValue) {
            //Beyond range
            props.showToast('Acceptable range of values for ' + item + ' is between ' + minValue + ' and ' + maxValue + '.', 'exclamation');
            const itemElt = document.getElementById(item)
            itemElt.classList.add('error-border')
            itemElt.focus();
        }
    }

    const updateMedicalDetails = () => {
        //update just the personal details contained here...
        if (height === "" || height < 0 || height > 500) {
            props.showToast("Enter proper value for height to proceed.", 'exclamation');
            return;
        }
        if (weight === "" || weight < 0 || weight > 200) {
            props.showToast("Enter proper value for weight to proceed.", 'exclamation');
            return;
        }
        if (chestExpansion === "" || chestExpansion < 2 || chestExpansion > 5) {
            props.showToast("Enter proper value for Chest Expansion to proceed.", 'exclamation');
            return;
        }
        if (vision === "") {
            props.showToast("Enter proper value for Chest Expansion to proceed.", 'exclamation');
            return;
        }
        if (bloodPressure === "") {
            props.showToast("Enter proper value for Blood pressure to proceed.", 'exclamation');
            return;
        }
        if (pulse === "" || pulse < 0 || pulse > 200) {
            props.showToast("Enter proper value for pulse to proceed.", 'exclamation');
            return;
        }
        if (oxygenSaturation === "" || oxygenSaturation < 0 || oxygenSaturation > 100) {
            props.showToast("Enter proper value for oxygen saturation to proceed.", 'exclamation');
            return;
        }

        const data = {
            allergies: { value: [...selectedAllergies] },
            general: {
                "bloodGroup": bloodGroup,
                "height": height,
                "weight": weight,
                "bmi": bmi,
                "chestExpansion": chestExpansion,
                "vision": vision,
                "bp": bloodPressure,
                "pulse": pulse,
                "oxygenSaturation": oxygenSaturation
            },
            managingOrganization: txtManagingOrg
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

                    props.showToast(`Update Successful!`, 'success');
                    props.hideDialog();

                    //Remember to refresh the fetched data after this..
                    props.setPatientsData(response.data.data);
                    sessionStorage.setItem('patient', JSON.stringify(response.data.data));

                } else {
                    props.showToast(response?.message, 'exclamation');
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
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-ui-edit"></i> Edit Medical Details</h2>
                </div>
                <div className="dialog-body">
                    <div className="form-row">
                        <div className='input-group'>
                            <div className='check-box'>
                                <label>
                                <input
                                    type='checkbox'
                                    id='chkAllergies'
                                    value={chkAllergies}
                                    onChange={e => setChkAllergies(!chkAllergies)}
                                    className='custom-checkbox'
                                    /> Allergies
                            </label>
                            </div>

                            <select
                                id="txtAllergies"
                                className={chkAllergies ? "form-control mb-1" : 'd-none'}
                                value={txtAllergies}
                                onChange={e => {
                                    setTxtAllergies(e.target.value)
                                    addAllergiesToList(e.target.value);
                                }}
                            >
                                <option value="">Select</option>
                                {allergiesMap}
                            </select>
                            {selectedAllergies.length > 0 && chkAllergies &&
                                <div className='sel-items'>
                                    {selectedAllergies.join(", ")}
                                    <button onClick={() => setSelectedAllergies([])} className='btn-grey' style={{ float: 'right' }}>Clear</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-row d-none">
                        <div className='input-group'>
                            <label>Managing Organization</label>
                            <select
                                className="form-control"
                                id="txtManagingOrg"
                                value={txtManagingOrg}
                                onChange={e => setTxtManagingOrg(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="ABC Healthcare">ABC Healthcare</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row-3">
                        <div className="input-group">
                            <label>Blood Group</label>
                            <select
                                id="bloodGroup"
                                className="form-control"
                                value={bloodGroup}
                                onChange={e => setBloodGroup(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Height (cm)</label>
                            <input
                                id="height"
                                className="form-control"
                                value={height}
                                onChange={e => {
                                    setHeight(e.target.value)
                                    document.getElementById(e.target.id).classList.remove('error-border')
                                }}
                                type='number'
                                onBlur={() => handleBlur(0, 500, height, 'height')}
                            />
                        </div>
                        <div className="input-group">
                            <label>Weight (kg)</label>
                            <input
                                id="weight"
                                className="form-control"
                                value={weight}
                                onChange={e => {
                                    setWeight(e.target.value)
                                    document.getElementById(e.target.id).classList.remove('error-border')
                                }}
                                type='number'
                                onBlur={() => handleBlur(0, 300, weight, 'weight')}
                            />
                        </div>
                    </div>
                    <div className="form-row-3">
                        <div className="input-group">
                            <label>BMI</label>
                            <input
                                id="bmi"
                                className="form-control"
                                value={bmi}
                                onChange={e => setBmi(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="input-group">
                            <label>Chest Expansion (cm)</label>
                            <input
                                id="chestExpansion"
                                className="form-control"
                                value={chestExpansion}
                                onChange={e => {
                                    setChestExpansion(e.target.value)
                                    document.getElementById(e.target.id).classList.remove('error-border');
                                }}
                                type='number'
                                onBlur={() => handleBlur(2, 5, chestExpansion, 'chestExpansion')}
                            />
                        </div>
                        <div className="input-group">
                            <label>Vision (a/b)</label>
                            <input
                                id="vision"
                                className="form-control"
                                value={vision}
                                onChange={e => {
                                    setVision(e.target.value)
                                    document.getElementById(e.target.id).classList.remove('error-border');
                                }}
                                onBlur={() => handleBlur(0, 6, vision, 'vision')}
                            />
                        </div>
                    </div>
                    <div className="form-row-3">
                        <div className="input-group">
                            <label>BP (SYs/DIas)</label>
                            <input
                                id="bloodPressure"
                                className="form-control"
                                value={bloodPressure}
                                onChange={e => {
                                    setBloodPressure(e.target.value)
                                    document.getElementById(e.target.id).classList.remove('error-border');
                                }}
                                onBlur={() => handleBlur(10, 250, bloodPressure, 'bloodPressure')}
                            />
                        </div>
                        <div className="input-group">
                            <label>Pulse (BPM)</label>
                            <input
                                id="pulse"
                                className="form-control"
                                value={pulse}
                                onChange={e => {
                                    setPulse(e.target.value)
                                    document.getElementById(e.target.id).classList.remove('error-border');
                                }}
                                type='number'
                                onBlur={() => handleBlur(0, 200, pulse, 'pulse')}
                            />
                        </div>
                        <div className="input-group">
                            <label>Oxygen Saturation (%)</label>
                            <input
                                id="oxygenSaturation"
                                className="form-control"
                                value={oxygenSaturation}
                                onChange={e => {
                                    setOxygenSaturation(e.target.value)
                                    document.getElementById(e.target.id).classList.remove('error-border');
                                }}
                                type='number'
                                onBlur={() => handleBlur(1, 100, oxygenSaturation, 'oxygenSaturation')}

                            />
                        </div>
                    </div>
                </div>
                <div className="dialog-footer main">
                    <button
                        id="btnUpdate"
                        className="btn-main mr-1"
                        onClick={updateMedicalDetails}
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
