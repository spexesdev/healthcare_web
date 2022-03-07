export const Day = props => {
    const { day, onClick } = props;
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''} ${day.event !== null ? 'event' : ''}`;
    const eventTitle = day.event?.status ? day.event.status : '';

    return (
        <div onClick={onClick} className={className} title={eventTitle}>
            <h6>{day.value === 'padding' ? '' : day.value}</h6>
        </div>
    )

}
