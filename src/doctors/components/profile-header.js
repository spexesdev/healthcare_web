export const DoctorsProfileHeader = ({ doctorsData }) => {

    return (
        <div className='doctor-header'>
            <div className='header-title'>
                <h4>Profile</h4>
            </div>
            <div className='mah-image'>
                <img src='/mah-logo.png' alt='' />
            </div>
            <div className='doctors-data'>
                <img src={doctorsData.photo} alt='' />
                <h5>Dr. {doctorsData.name}</h5>
            </div>
        </div>
    )
}
