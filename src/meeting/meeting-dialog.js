import React, { useEffect, useRef, useState } from 'react'
import { MeetingTabHeaders } from './meeting-tab-headers'
import { Complaints } from './meeting-tabs/complaints'
import { NextConsult } from './meeting-tabs/next-consult'
import { Prescriptions } from './meeting-tabs/prescriptions'
import { SuggestedLifestyle } from './meeting-tabs/suggested-lifestyle'
import { TestsAndLabs } from './meeting-tabs/tests-and-labs'
import { ApiPath } from '../assets/common/base-url'

export const MeetingDialog = (props) => {

    const patientData = useRef(JSON.parse(localStorage.getItem('patient')))
    const [age, setAge] = useState('')
    const [selectedTab, setSelectedTab] = useState(1)

    const [complaints, setComplaints] = useState({ "symptoms": "", "remarks": "" })
    const [physiotherapy, setPhysiotherapy] = useState([])
    const [foodsToAvoid, setFoodsToAvoid] = useState([])
    const [recommendedFoods, setRecommendedFoods] = useState([])
    const [recommendedTests, setRecommendedTests] = useState([])
    const [revisitData, setRevisitData] = useState({ "revisitRequired": "", "revisitDate": "", "revisitDescription": "" })
    const [obs, setObs] = useState({ "earlySigns": "", "remarks": "" })


    //Complaints...
    const [cbxComplaints, setCbxComplaints] = useState('')
    const [txtRemarks, setTxtRemarks] = useState('')
    const [txtObservations, setTxtObservations] = useState('')
    const [selectedSymptoms, setSelectedSymptoms] = useState([])

    //Suggested Lifestyle...
    const [txtSmokingHabits, setTxtSmokingHabits] = useState(patientData.lifeStyle?.smokingHabbit)
    const [txtAlcohol, setTxtAlcohol] = useState(patientData.lifeStyle?.alcoholConsumption)
    const [txtActivityLevel, setTxtActivityLevel] = useState(patientData.lifeStyle?.activityLevel)
    const [txtFoodPreference, setTxtFoodPreference] = useState(patientData.lifeStyle?.foodPreference)
    const [txtPhysiotherapy, setTxtPhysiotherapy] = useState('')
    const [txtFoodsToAvoid, setTxtFoodsToAvoid] = useState('')


    //Prescriptions part...
    const [cbxName, setCbxName] = useState('')

    //Labs and Tests
    const [cbxTests, setCbxTests] = useState('')
    const [selectedTests, setSelectedTests] = useState([])

    //Next consultation
    const [cbxRevisit, setCbxRevisit] = useState('')
    const [cbxRevisitDate, setCbxRevisitDate] = useState('')
    const [txtDescription, setTxtDescription] = useState('')


    useEffect(() => {
        //fetch the required data fro the patient...
        const dateDiff = new Date().getFullYear() - new Date(patientData.current.birthDate).getFullYear();
        setAge(dateDiff);

    }, [])

    const updatePrescriptions = () => {
        //Update all requirements...
        const updateData = {
            complaints: complaints,
            physiotherapy: physiotherapy,
            foodToAvoid: foodsToAvoid,
            recommendedFood: recommendedFoods,
            recommendedTests: recommendedTests,
            revisit: revisitData,
            observations: obs,
            medicinesPrescribed: [cbxName]

        }

        //Proceed to update...
        const params = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            'method': 'POST',
            'body': JSON.stringify(updateData),
        }


        props.setIsLoaderVisible(true);

        fetch(ApiPath + "appointment/addPrescription", params)
            ?.then(response => (response.json()))
            .then(res => {
                props.setIsLoaderVisible(false)

                if (res.statusCode === 200) {
                    props.showToast("Prescription updated successfully!", 'success');

                } else {
                    props.showToast(res.message, 'exclamation');
                }

            })
            .catch(err => {
                props.setIsLoaderVisible(false);
                props.showToast(err.message, 'exclamation');
            })

    }

    return (
        <div className='dialog-background fade'>
            <div className='dialog-container' style={{ minWidth: '900px' }}>
                <div className='dialog-header'>
                    <h2 className='nully' style={{ color: 'var(--bluish)' }}>
                        <i className='icofont-stethoscope'></i> {'In-Call Consultation'}
                    </h2>
                </div>
                <div className='dialog-body mb-2'>
                    <div className='span-in-span'>
                        <span><i className='icofont-user-alt-7' /> {patientData.current.name} ({age}): <span> {patientData.current.uidNo} - <i className='icofont-location-pin'></i> {patientData.current.address[0]?.city}</span></span>
                        <span><i className='icofont-doctor' /> Consulting Doctor: <span>{props.doctorId}</span></span>
                    </div>
                    <div className='form-row-1-2'>
                        <div className='left' style={{ minHeight: '400px', background: '#efefef', padding: 20 }}>
                            <button className='link-main' onClick={() => alert('This to be added later!')}>Past Prescriptions...</button>
                            <button className='link-main mb-2' onClick={() => alert('This to be added later!')}>Current Medications...</button>

                            <div>
                                <table className='dialog-left-panel'>
                                    <tbody>
                                        <tr>
                                            <td>Bld Grp</td>
                                            <td>{patientData.current.general.bloodGroup}</td>
                                        </tr>
                                        <tr>
                                            <td>Height</td>
                                            <td>{patientData.current.general.height}</td>
                                        </tr>
                                        <tr>
                                            <td>Weight</td>
                                            <td>{patientData.current.general.weight}</td>
                                        </tr>
                                        <tr>
                                            <td>BMI</td>
                                            <td>{patientData.current.general.bmi}</td>
                                        </tr>
                                        <tr>
                                            <td>Chest Exp.</td>
                                            <td>{patientData.current.general.chestExpansion}</td>
                                        </tr>
                                        <tr>
                                            <td>Vision</td>
                                            <td>{patientData.current.general.vision}</td>
                                        </tr>
                                        <tr>
                                            <td>BP</td>
                                            <td>{patientData.current.general.bp}</td>
                                        </tr>
                                        <tr>
                                            <td>Pulse</td>
                                            <td>{patientData.current.general.pulse}</td>
                                        </tr>
                                        <tr>
                                            <td>Oxy. Sat</td>
                                            <td>{patientData.current.general.oxygenSaturation}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='right' style={{ height: '400px' }}>
                            <MeetingTabHeaders
                                selectedTab={selectedTab}
                                setSelectedTab={value => setSelectedTab(value)}
                            />
                            {/* The tab pages... */}
                            {selectedTab === 1 && <Complaints
                                data={patientData}
                                showToast={props.showToast}
                                setIsLoaderVisible={props.setIsLoaderVisible}
                                setComplaints={setComplaints}
                                setObs={setObs}

                                Complaints={{ cbxComplaints, setCbxComplaints }}
                                Remarks={{ txtRemarks, setTxtRemarks }}
                                Observations={{ txtObservations, setTxtObservations }}
                                SelectedSymptoms={{ selectedSymptoms, setSelectedSymptoms }}
                            />}

                            {selectedTab === 2 && <SuggestedLifestyle
                                data={patientData}
                                showToast={props.showToast}
                                setIsLoaderVisible={props.setIsLoaderVisible}
                                setPhysiotherapy={setPhysiotherapy}
                                setFoodsToAvoid={setFoodsToAvoid}
                                setRecommendedFoods={setRecommendedFoods}

                                SmokingHabits={{ txtSmokingHabits, setTxtSmokingHabits }}
                                Alcohol={{ txtAlcohol, setTxtAlcohol }}
                                ActivityLevel={{ txtActivityLevel, setTxtActivityLevel }}
                                FoodPreference={{ txtFoodPreference, setTxtFoodPreference }}
                                Physiotherapy={{ txtPhysiotherapy, setTxtPhysiotherapy }}
                                FoodsToAvoid={{ txtFoodsToAvoid, setTxtFoodsToAvoid }}
                            />}

                            {selectedTab === 3 && <Prescriptions
                                data={patientData}
                                showToast={props.showToast}
                                setIsLoaderVisible={props.setIsLoaderVisible}
                                Name={{cbxName, setCbxName}}
                            />}

                            {selectedTab === 4 && <TestsAndLabs
                                data={patientData}
                                setRecommendedTests={setRecommendedTests}
                                showToast={props.showToast}
                                setIsLoaderVisible={props.setIsLoaderVisible}

                                Tests={{ cbxTests, setCbxTests }}
                                SelectedTests={{ selectedTests, setSelectedTests }}
                            />}

                            {selectedTab === 5 && <NextConsult
                                data={patientData}
                                showToast={props.showToast}
                                setIsLoaderVisible={props.setIsLoaderVisible}
                                setRevisitData={setRevisitData}

                                Revisit={{ cbxRevisit, setCbxRevisit }}
                                RevisitDate={{ cbxRevisitDate, setCbxRevisitDate }}
                                Description={{ txtDescription, setTxtDescription }}
                            />}
                        </div>

                    </div>

                </div>
                <div className='dialog-footer main'>
                    <button className='btn-main mr-1' onClick={() => updatePrescriptions()}>Update</button>
                    <button className='btn-main-outline' onClick={() => props.hideDialog()}>Cancel</button>
                </div>
            </div>

        </div>
    )
}
