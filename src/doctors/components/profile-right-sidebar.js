export const DoctorsProfileRightSidebar = props => {

    return (
        <div className='right-sidebar'>
            <div className="special-header">
                <h3>Specialists in area</h3>
            </div>

            <RightSideBarSpecialistDoctors />
            <RightSideBarSpecialistDoctors />
        </div>
    )
}

const RightSideBarSpecialistDoctors = props => {
    return (
        <div className='right-sidebar-profile'>
            <div className='image'>
                <img src='/portfolio/team-1.jpg' alt='' />
            </div>
            <div className='text'>
                <h5>Dr. Singh Amoduh</h5>
                <p>Dermatologist</p>
                <span><i className='icofont-location-pin' /> Heathrow</span>
            </div>
        </div>
    )
}
