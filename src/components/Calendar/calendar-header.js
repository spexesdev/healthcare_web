export const CalendarHeader = props => {

    const { onNext, onBack, dateDisplay } = props;

    const setNewPeriod = () => {
        alert("This will eventually set a new date, selected from a modal, containing a month and year picker.");
    }

    return (
        <div id="header">
            <div className='calendar-header'>
                <button
                    onClick={onBack}
                    id="backButton"
                >
                    <i className='icofont-rounded-left' />
                </button>
                <div
                    className="month-display"
                    onClick={setNewPeriod}
                >{dateDisplay}
                </div>
                <button
                    onClick={onNext}
                    id="nextButton"
                >
                    <i className='icofont-rounded-right' />
                </button>
            </div>
        </div>
    )
}
