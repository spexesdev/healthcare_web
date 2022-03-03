import { useEffect, useState } from 'react'
import { DynamicSort } from '../../assets/common/operations';
import { SlotsDialog } from '../dialogs/slots-dialog';
import { ApiSecondaryPath } from "../../assets/common/base-url";

const AvailabilitySetup = props => {

    const [onlineAvailability, setOnlineAvailability] = useState('online');
    const [txtAddressLink, setTxtAddressLink] = useState('')
    const [reminderCalls, setReminderCalls] = useState(true)
    const [txtReminderCallTime, setTxtReminderCallTime] = useState('5');
    const [cbxDayOfWeek, setCbxDayOfWeek] = useState('');
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [daysSlotsData, setDaysSlotsData] = useState([]);
    const [filterTimeSlots, setFilterTimeSlots] = useState([]);

    const [slotsDialogVisible, setSlotsDialogVisible] = useState(false)

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const weekdaysSelect = daysOfWeek.map(item => {
        return (<option value={item} key={item}>{item}</option>)
    })

    const displaySlotDialog = () => {
        //First check that the cbx is not empty...
        if (cbxDayOfWeek === "") {
            alert("Select day of week to proceed.");
            return;
        }

        //Also, get the timeSlots from the array as it concerns the edit...
        const foundData = daysSlotsData.find(item => item.dayOfWeek === cbxDayOfWeek)?.timeSlots;
        setFilterTimeSlots(foundData);

        //else, proceed...
        setSlotsDialogVisible(true)
    }

    useEffect(() => {
        //Here, we set the entire collective of the the daysSlotsData
        // to the proper value, based on the recently selected timeSlots...
        if (daysSlotsData.length === 0 && selectedTimeSlots.length !== 0) {
            //Here, just push the data...
            const newSlotObj = {
                dayOfWeek: cbxDayOfWeek,
                dayOfWeekIndex: daysOfWeek.indexOf(cbxDayOfWeek),
                timeSlots: [...selectedTimeSlots]
            }

            setDaysSlotsData([newSlotObj])

        } else {
            //Do some work before getting there...
            const remArray = daysSlotsData.filter(item => item.dayOfWeek !== cbxDayOfWeek);

            //The above array is to be replaced by the new one...
            const newSlotObj = {
                dayOfWeek: cbxDayOfWeek,
                dayOfWeekIndex: daysOfWeek.indexOf(cbxDayOfWeek),
                timeSlots: [...selectedTimeSlots]
            }

            const newArray = [...remArray, newSlotObj].sort(DynamicSort("dayOfWeekIndex"))
            setDaysSlotsData(newArray)
        }

    }, [selectedTimeSlots])

    const slotsGridItems = daysSlotsData.map((item, index) => {
        return (
            <Slots
                key={index}
                selectedSlots={item.timeSlots}
                dayOfWeek={item.dayOfWeek}
            />
        )
    })

    const updateDoctorsTimeSlots = () => {
        //Save the time losts...
        if (daysSlotsData.length === 0) {
            //not working...
            props.showToast("No selected slots to update!", "exclamation");
            return;
        }

        //Else, continue to update...
        // First, remodel the array to show data in the expected update format...
        let saveObject = {};
        const workingDays = [];

        daysSlotsData.forEach(item => {
            const obj = {
                [item.dayOfWeek.toLowerCase()]: {
                    "available_slot_details": [item.timeSlots]
                }
            }

            workingDays.push(item.dayOfWeek)

            saveObject = { ...saveObject, obj }

        })


        const data = {
            "doctorId": props.data.uidNo,
            "slots": {
                "monday": {
                    "available_slot-details": daysSlotsData.find(item => item.dayOfWeek === 'Monday')?.timeSlots,
                },
                "tuesday": {
                    "available_slot-details": daysSlotsData.find(item => item.dayOfWeek === 'Tuesday')?.timeSlots,
                },
                "wednesday": {
                    "available_slot-details": daysSlotsData.find(item => item.dayOfWeek === 'Wednesday')?.timeSlots,
                },
                "thursday": {
                    "available_slot-details": daysSlotsData.find(item => item.dayOfWeek === 'Thursday')?.timeSlots,
                },
                "friday": {
                    "available_slot-details": daysSlotsData.find(item => item.dayOfWeek === 'Friday')?.timeSlots,
                },
                "saturday": {
                    "available_slot-details": daysSlotsData.find(item => item.dayOfWeek === 'Saturday')?.timeSlots,
                },
                "sunday": {
                    "available_slot-details": daysSlotsData.find(item => item.dayOfWeek === 'Sunday')?.timeSlots,
                },

            },
            "working_day": [workingDays],
        }

        console.table(workingDays)

        const options = {
            'body': JSON.stringify(data),
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            'method': "POST",
        }

        //save Weekly record of doctor / time slots for doctor...
        fetch(ApiSecondaryPath + 'create', options)
            .then(response => (response.json()))
            .then(response => {
                if (response && response.ok) {
                    props.showToast("Time slots updated successfully!", "success");

                } else {
                    props.showToast(response.message, "exclamation");
                }
            })
            .catch(error => {
                props.showToast(error.message, "exclamation");
            })

    }

    return (
        <>
            <div className='box-container'>
                <h3>Availability</h3>
                <div className="availability-grid">
                    <div className='question-group'>
                        <p>Indicate your avaiability?</p>
                        <div className="radio-group mb-2">
                            <div className="radio-button">
                                <label>
                                    <input
                                        type='radio'
                                        className='custom-radio'
                                        name='availability'
                                        checked={onlineAvailability === 'online'}
                                        onChange={() => setOnlineAvailability('online')}
                                    />
                                    Online
                                </label>
                            </div>
                            <div className="radio-button">
                                <label>
                                    <input
                                        type='radio'
                                        className='custom-radio'
                                        name='availability'
                                        checked={onlineAvailability === 'offline'}
                                        onChange={() => setOnlineAvailability('offline')}
                                    />
                                    Offline
                                </label>
                            </div>
                            <div className="radio-button">
                                <label>
                                    <input
                                        type='radio'
                                        className='custom-radio'
                                        name='availability'
                                        checked={onlineAvailability === 'both'}
                                        onChange={() => setOnlineAvailability('both')}
                                    />
                                    Both
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Address Link (for both)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtAddressLink"
                                    value={txtAddressLink}
                                    onChange={e => setTxtAddressLink(e.target.value)}
                                    disabled={onlineAvailability !== 'both'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='question-group border-left'>
                        <p>Receive Reminder calls?</p>
                        <div className='radio-group mb-2'>
                            <div className="radio-button">
                                <label>
                                    <input
                                        type='radio'
                                        className='custom-radio'
                                        name='reminderCalls'
                                        checked={reminderCalls}
                                        onChange={() => setReminderCalls(true)}
                                    />Yes
                                </label>
                            </div>
                            <div className="radio-button">
                                <label>
                                    <input
                                        type='radio'
                                        className='custom-radio'
                                        name='reminderCalls'
                                        checked={!reminderCalls}
                                        onChange={() => setReminderCalls(false)}
                                    />No
                                </label>
                            </div>
                        </div>
                        <div className="form-row-2">
                            <div className="input-group">
                                <label>Set Reminder Time</label>
                                <input
                                    type="number"
                                    step={5}
                                    className="form-control align-right"
                                    id="txtReminderCallTime"
                                    value={txtReminderCallTime}
                                    onChange={e => setTxtReminderCallTime(e.target.value)}
                                    disabled={!reminderCalls}
                                />
                                <span className='align-right'>mins</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='box-container'>
                <h3>Time Slots</h3>
                <div className='form-row-3 pb-2 border-bottom'>
                    <div className="input-group">
                        <label>Choose Day of Week</label>
                        <select
                            className='form-control'
                            id="cbxDayOfWeek"
                            value={cbxDayOfWeek}
                            onChange={e => setCbxDayOfWeek(e.target.value)}
                        >
                            <option value="">Select</option>
                            {weekdaysSelect}
                        </select>
                    </div>
                    <div className='input-group'>
                        <button
                            className="btn-main mt-3"
                            onClick={displaySlotDialog}
                        >Choose slots...</button>
                    </div>
                </div>
                <div className="form-row mb-2">
                    <h3 className='section-header'>• Selected Slots</h3>
                    <div className="slots-grid">
                        {slotsGridItems}
                    </div>
                </div>
                <hr />
                <div className='form-row-3'>
                    <div></div>
                    <div className='input-group mb-3'>
                        <button
                            onClick={updateDoctorsTimeSlots}
                            className='btn-main d-block'
                        >
                            <i className='icofont-upload-alt' /> Update Slots
                        </button>
                    </div>
                    <div></div>
                </div>

            </div>

            {
                slotsDialogVisible && <SlotsDialog
                    selectedWeekDay={cbxDayOfWeek}
                    timeSlots={filterTimeSlots}
                    setSelectedTimeSlots={setSelectedTimeSlots}
                    hideDialog={() => setSlotsDialogVisible(false)}
                />
            }
        </>
    )
}

export default AvailabilitySetup;

const Slots = props => {

    const timeSlots = props.selectedSlots.map((item, index) => {
        return (
            <span key={index}>{item}<i className="icofont-close d-none" /></span>
        )
    })

    return (
        <>
            <div className={props.dayOfWeek !== "" ? "slot-data" : 'd-none'}>
                <h4>{props.dayOfWeek}</h4>
                <div className="slots">
                    {timeSlots}
                </div>
            </div>

        </>

    )
}