import { Link, useHistory } from "react-router-dom"
import cities from 'cities.json'
import { useEffect, useState } from "react";

export const NavBar = props => {

    const history = useHistory();
    const [myLocation, setMyLocation] = useState({});

    const signOut = () => {
        //Sign out
        localStorage.setItem("token", null);
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("id_val", null);
        sessionStorage.setItem('patient', null);

        history.push("/")
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    const showPosition = (position) => {

        //First, get the lattitude and longitude...
        const locLat = position.coords.latitude;
        const locLong = position.coords.longitude;

        console.log("Latitude is " + locLat);
        console.log("Converted latitude is " + parseFloat(locLat).toFixed(5))

        console.log("Longitude is " + locLong)
        console.log("Converted longitude is " + parseFloat(locLong).toFixed(5))

        console.log("Some latitude converted is " + parseFloat(cities[0].lat).toFixed(5));
        console.log("Some longitude converted is " + parseFloat(cities[0].lng).toFixed(5));

        //The, filter the object to determine the exact location...
        const currentLocationObject = cities.filter(item => parseFloat(item.lat).toFixed(5) == parseFloat(locLat).toFixed(5) && parseFloat(item.lng).toFixed(5) == parseFloat(locLong).toFixed(5));
        setMyLocation(currentLocationObject[currentLocationObject.length - 1]);

        console.log(currentLocationObject);
    }

    useEffect(() => getLocation(), [])

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
                {/* <h5><i className='icofont-location-pin'></i> {props.data.address[0]?.city}{props.data.address[0].country && `, ${props.data.address[0].country}`}</h5> */}
                <h5><i className='icofont-location-pin'></i> {`${myLocation && myLocation?.name}, ${myLocation && myLocation?.country}`}</h5>
                <div className='img-container'>
                    <img
                        className='profile-img'
                        src={props.data.photo || '/portfolio/avatar.png'}
                        alt=''
                        onClick={signOut}
                    />
                </div>

            </div>

            <div className="img-flyout d-none">
                <Link to="/patients/profile"><i className='icofont-ui-user' />My Profile</Link>
                <Link to="/" onClick={signOut}><i className='icofont-sign-out' />Sign out</Link>
            </div>
        </div>
    )
}
