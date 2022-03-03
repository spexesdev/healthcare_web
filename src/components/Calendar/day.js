export const Day = props => {
    const { day, onClick } = props;
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
    const eventTitle = day.event?.title ? day.event.title : '';

    return (
        <div onClick={onClick} className={className} title={eventTitle}>
            <h6>{day.value === 'padding' ? '' : day.value}</h6>
        </div>
    )

}
