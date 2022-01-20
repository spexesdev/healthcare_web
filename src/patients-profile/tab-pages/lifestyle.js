import React, { useState } from 'react';
import { ApiPath } from '../../assets/common/base-url';

export const Lifestyle = props => {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="tab-page-content">
            <div className="page-header">
                <h2>Lifestyle</h2>
            </div>
            <div className="page-body">
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Smoking Habit</td>
                            <td>{props.data?.lifeStyle?.smokingHabbit}</td>
                            <td onClick={() => setShowDialog(true)}><i className="icofont-ui-edit"></i> edit</td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Alcohol Consumption</td>
                            <td>{props.data?.lifeStyle?.alcoholConsumption}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Activity Level</td>
                            <td>{props.data?.lifeStyle?.activityLevel}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span style={{color:'red'}}>*</span>Food Preference</td>
                            <td>{props.data?.lifeStyle?.foodPreference}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <LifestyleDialog
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

const LifestyleDialog = props => {

    const [txtSmokingHabits, setTxtSmokingHabits] = useState(props.data.lifeStyle?.smokingHabbit)
    const [txtAlcohol, setTxtAlcohol] = useState(props.data.lifeStyle?.alcoholConsumption)
    const [txtActivityLevel, setTxtActivityLevel] = useState(props.data.lifeStyle?.activityLevel)
    const [txtFoodPreference, setTxtFoodPreference] = useState(props.data.lifeStyle?.foodPreference)

    const updateLifestyleDetails = () => {
        const data = {
            lifeStyle: {
                "smokingHabbit": txtSmokingHabits,
                "alcoholConsumption": txtAlcohol,
                "activityLevel": txtActivityLevel,
                "foodPreference": txtFoodPreference
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
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-ui-edit"></i> Edit Medical History</h2>
                </div>
                <div className="dialog-body" style={{ marginBottom: '20px' }}>
                    <div className="form-row-2">
                        <div className='input-group'>
                            <label>Smoking Habits</label>
                            <select
                                id="txtSmokingHabits"
                                value={txtSmokingHabits}
                                className="form-control"
                                onChange={e => setTxtSmokingHabits(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="I don't smoke">I don't smoke</option>
                                <option value="I used to, but I quit">I used to, but I quit</option>
                                <option value="1-2/day">1-2/day</option>
                                <option value="3-5/day">3-5/day</option>
                                <option value="5-10/day">5-10/day</option>
                                <option value="> 10/day">{'> 10/day'}</option>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Alcohol Consumption</label>
                            <select
                                id="txtAlcohol"
                                value={txtAlcohol}
                                className="form-control"
                                onChange={e => setTxtAlcohol(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Non-Drinker">Non-Drinker</option>
                                <option value="Rare">Rare</option>
                                <option value="Social">Social</option>
                                <option value="Regular">Regular</option>
                                <option value="Heavy">Heavy</option>

                            </select>
                        </div>

                    </div>
                    <div className="form-row-2-1">
                        <div className='input-group'>
                            <label>Activity Level</label>
                            <select
                                id="txtActivityLevel"
                                value={txtActivityLevel}
                                className="form-control"
                                onChange={e => setTxtActivityLevel(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Sedentary (Low)">Sedentary (Low)</option>
                                <option value="Moderately Active (Normal)">Moderately Active (Normal)</option>
                                <option value="Active (High)">Active (High)</option>
                                <option value="Athletic (Very High)">Athletic (Very High)</option>

                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Food Preference</label>
                            <select
                                id="txtFoodPreference"
                                value={txtFoodPreference}
                                className="form-control"
                                onChange={e => setTxtFoodPreference(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                                <option value="Eggetarian">Eggetarian</option>
                                <option value="Vegan">Vegan</option>

                            </select>
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
