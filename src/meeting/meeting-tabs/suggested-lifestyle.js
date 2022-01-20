import React, { useState, useEffect } from 'react';

export const SuggestedLifestyle = props => {

    const { txtSmokingHabits, setTxtSmokingHabits } = props.SmokingHabits
    const { txtAlcohol, setTxtAlcohol } = props.Alcohol
    const { txtActivityLevel, setTxtActivityLevel } = props.ActivityLevel
    const { txtFoodPreference, setTxtFoodPreference } = props.FoodPreference
    const { txtPhysiotherapy, setTxtPhysiotherapy } = props.Physiotherapy
    const { txtFoodsToAvoid, setTxtFoodsToAvoid } = props.FoodsToAvoid

    const [selectedPhysio, setSelectedPhysio] = useState([])
    const [selectedFoodsToAvoid, setSelectedFoodsToAvoid] = useState([])

    useEffect(() => {
        props.setPhysiotherapy(selectedPhysio)
        props.setFoodsToAvoid(selectedFoodsToAvoid)
        props.setRecommendedFoods(txtFoodPreference?.split(","));

    }, [txtPhysiotherapy, txtFoodsToAvoid])

    return (
        <div className='tab-page-content'>
            <div className='page-body' style={{ padding: '0 10px' }}>
                <div className='form-row-2'>
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
                <div className='form-row-2'>
                    <div className='input-group'>
                        <label>Foods to avoid</label>
                        <select
                            id="txtFoodsToAvoid"
                            value={txtFoodsToAvoid}
                            className="form-control"
                            onChange={e => {
                                setTxtFoodsToAvoid(e.target.value);
                                (selectedFoodsToAvoid.indexOf(e.target.value) === -1) && setSelectedFoodsToAvoid([...selectedFoodsToAvoid, e.target.value])
                            }}
                        >
                            <option value="">Select</option>
                            <option value="Starchy">Starchy</option>
                            <option value="Animal Protein">Animal Protein</option>
                            <option value="Oily">Oily</option>
                            <option value="Alcohol">Alcohol</option>
                        </select>
                        {selectedFoodsToAvoid.length > 0 && <div className='sel-items'>{selectedFoodsToAvoid.join(", ")}</div>}
                    </div>
                    <div className='input-group'>
                        <label>Physiotherapy</label>
                        <select
                            id='txtPhysiotherapy'
                            value={txtPhysiotherapy}
                            onChange={e => {
                                setTxtPhysiotherapy(e.target.value);
                                (selectedPhysio.indexOf(e.target.value) === -1) && setSelectedPhysio([...selectedPhysio, e.target.value])
                            }}
                            className='form-control'
                        >
                            <option value="">Select</option>
                            <option value="Walking">Walking</option>
                            <option value="Stretching">Stretching</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Skipping">Skipping</option>
                            <option value="Other">Other</option>
                        </select>
                        {selectedPhysio.length > 0 && <div className='sel-items'>{selectedPhysio.join(", ")}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
