export const DoctorsProfileSubHeader = props => {

    const toggleMenu = () => {
        props.setMenuActive(!props.menuActive);
    }

    return (
        <div className='doctors-sub-header'>
            <div className='nav-menu' onClick={toggleMenu}>
                <i className='icofont-navigation-menu' />
            </div>
            <h6><i className='icofont-bell-alt' /> Upcoming Appointment</h6>
        </div>
    )
}
