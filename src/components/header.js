import { Link, useHistory } from "react-router-dom";

export const Header = () => {

    const history = useHistory();
    const buttonStyle = {
        display: 'block',
        background: 'transparent',
        color: 'white',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'Poppins',
        marginRight: '40px',
    }

    const signOut = () => {
        //Reset the other variables....
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("id_val", null);

        history.push("/");
    }

    return (
        <div className="header-bar">
            <div className="header-bar-image">
                <Link to="/patients/profile" ><img src="/mah-logo.png" width="60" />MAH Health Care</Link>
            </div>
            <button style={buttonStyle} onClick={signOut}>Sign Out</button>
        </div>
    );
}
