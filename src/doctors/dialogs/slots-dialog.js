import { useEffect, useState } from 'react';
import { SplitDateFromTimestamp } from '../../assets/common/split-date';

export const SlotsDialog = props => {

    const [txtTimeSlot, setTxtTimeSlot] = useState('');
    const [txtDuration, setTxtDuration] = useState('30');
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [refreshList, setRefreshList] = useState(false);
    const [outputList, setOutputList] = useState([]);

    const timeSlots = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
        "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

    const timeSlotsOptions = timeSlots.map(item => (<option value={item} key={item}>{item}</option>))

    const addTimeSlot = () => {
        //Get the present time slot and add to the list...
        const startTime = parseInt(txtTimeSlot) * 60 * 60 * 1000; //Converting to milli-seconds;
        const duration = parseInt(txtDuration) * 60 * 1000;     //Still converting to milli-seconds...
        const timeSum = SplitDateFromTimestamp(startTime + duration - (3600 * 1000));       //subtract 1 hour...

        const endTime = timeSum.timeNoSecs;

        //add this to the selected slots...
        setSelectedSlots([...selectedSlots, `${txtTimeSlot} - ${endTime}`]);
        setRefreshList(true);
    }

    const removeSelectedItem = index => {
        //Remove the selected item with index 'index' from
        //The selected slots array...
        const slots = selectedSlots;
        slots.splice(index, 1);

        setSelectedSlots(slots);
        setRefreshList(true);
    }

    const chooseSelectedSlots = () => {
        props.setSelectedTimeSlots(selectedSlots);
        props.hideDialog();
    }

    useEffect(() => {
        //On component did mount...
        if (props.timeSlots?.length > 0) {
            //Do something...
            setSelectedSlots(props.timeSlots);
            setRefreshList(true);
        }

    }, [])

    useEffect(() => {

        if (refreshList) {
            //Refetch the list...
            let output;
            output = selectedSlots?.length > 0 && selectedSlots?.map((item, index) => {
                return (
                    <span key={index}>
                        {item}<i
                            className="icofont-close"
                            onClick={() => removeSelectedItem(index)}
                        />
                    </span>
                )
            })

            setOutputList(output);

            //reset the refresList...
            setRefreshList(false);
        }

    }, [refreshList])

    return (
        <div className="dialog-background fade">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-stopwatch" /> Time Slots Select</h2>
                </div>
                <div className="dialog-body px-2 border-top">
                    <div className="special-header">
                        <h3 style={{ marginLeft: '0px' }}>Set slots for {props.selectedWeekDay}</h3>
                    </div>
                    <div className="form-row-3 mb-2 border-bottom">
                        <div className="input-group">
                            <label>Time Slot</label>
                            <select
                                type="text"
                                className="form-control"
                                id="txtTimeSlot"
                                value={txtTimeSlot}
                                onChange={e => setTxtTimeSlot(e.target.value)}
                            >
                                {timeSlotsOptions}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Duration</label>
                            <input
                                type="number"
                                step={5}
                                className="form-control align-right"
                                id="txtDuration"
                                value={txtDuration}
                                onChange={e => setTxtDuration(e.target.value)}
                            />
                            <span className='align-right'>mins</span>
                        </div>
                        <div className='input-group'>
                            <button onClick={addTimeSlot} className="btn-main mt-3">
                                <i className="icofont-plus" /> Add
                            </button>
                        </div>
                    </div>
                    <div className={selectedSlots?.length === 0 ? "d-none" : "form-row"}>
                        <legend>
                            <h4>Selected slots ({props.selectedWeekDay})</h4>
                            <div className="slots">
                                {outputList}
                            </div>
                        </legend>
                    </div>

                </div>
                <div className="dialog-footer main px-2">
                    <button
                        onClick={chooseSelectedSlots}
                        className="btn-main mr-1"
                    >
                        <i className="icofont-tick-mark" /> Choose Selection
                    </button>
                    <button
                        onClick={() => props.hideDialog()}
                        className="btn-main-outline"
                    >
                        <i className="icofont-logout" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
