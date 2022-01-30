import { Link, useHistory } from "react-router-dom"

export const NavBar = props => {

    const { picture } = props;
    const history = useHistory();

    const signOut = () => {
        //Sign out
        localStorage.setItem("token", null);
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("id_val", null);
        sessionStorage.setItem('patient', null);

        history.push("/")
    }

    return (
        <div className='nav-bar'>
            <Link to='/patients/digital-health-passport' className='logo'>
                <img src='/mah-logo.png' alt='' />
            </Link>
            <div className='links'>
                <Link className={props.activeLink === 1 ? 'active' : ''} to='/patients/digital-health-passport'>Home</Link>
                <Link className={props.activeLink === 2 ? 'active' : ''} to='/patients/profile'>Profile</Link>
                <Link className={props.activeLink === 3 ? 'active' : ''} to='/patients/appointments'>Appointments</Link>

            </div>
            <div className='image'>
                <h5><i className='icofont-location-pin'></i> {JSON.parse(sessionStorage.getItem('patient')).address[0]?.city}</h5>
                <img
                    className='profile-img'
                    src={picture || '/portfolio/avatar.png'}
                    alt=''
                    onClick={signOut}
                />
            </div>

            <div className="img-flyout d-none">
                <Link to="/patients/profile"><i className='icofont-ui-user' />My Profile</Link>
                <Link to="/" onClick={signOut}><i className='icofont-sign-out' />Sign out</Link>
            </div>
        </div>
    )
}
