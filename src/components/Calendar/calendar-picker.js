import { CalendarHeader } from './calendar-header';
import { Day } from './day';
import { useState } from 'react';
import { useDate } from './useDate'
import { useEventsAndNav } from './useEventsAndNav';

const CalendarPicker = props => {
    const [nav, setNav] = useState(0);
    const events = useEventsAndNav(nav, props.setIsLoaderVisible, props.showToast)

    const setDayValue = (input) => {
        if (input.value !== 'padding') {
            props.setSelectedEventDate(input.date);
            props.showDialog()
        }
    }

    const { days, dateDisplay } = useDate(events, nav);

    return (
        <>
            <div className='calendar-container'>
                <CalendarHeader
                    dateDisplay={dateDisplay}
                    onNext={() => setNav(nav + 1)}
                    onBack={() => setNav(nav - 1)}
                />
                <div id='weekdays' title='weekdays'>
                    <div title="Sunday">S</div>
                    <div title="Monday">M</div>
                    <div title="Tuesday">T</div>
                    <div title="Wednesday">W</div>
                    <div title="Thursday">T</div>
                    <div title="Friday">F</div>
                    <div title="Saturday">S</div>
                </div>
                <div className="calendar-body" title="Calendar">
                    {days && days.map((item, index) => {
                        return (
                            <Day
                                key={index}
                                day={item}
                                onClick={() => setDayValue(item)}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CalendarPicker;
