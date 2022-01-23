import { Link, useHistory } from "react-router-dom"

export const NavBar = props => {

    const { picture } = props;
    const history = useHistory();
    
    return (
        <div className='nav-bar'>
            <Link to='/patients/digital-health-passport' className='logo'>
                <img src='/mah-logo.png' alt='' />
            </Link>
            <div className='links'>
                <Link className={props.activeLink === 1 && 'active'} to='/patients/digital-health-passport'>Home</Link>
                <Link className={props.activeLink === 2 && 'active'} to='/patients/profile'>Profile</Link>
                <Link className={props.activeLink === 3 && 'active'} to='/patients/appointments'>Appointments</Link>
                <Link className={props.activeLink === 4 && 'active'} to='/patients/prescriptions'>Prescriptions</Link>
                <Link className={props.activeLink === 5 && 'active'} to='/patients/payments-and-wallets'>Payments &amp; wallets</Link>
            </div>
            <img
                className='profile-img'
                src={picture || '/portfolio/avatar.png'}
                alt=''
                onClick={() => history.push("/")}
            />
        </div>
    )
}
