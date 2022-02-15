import { Link } from "react-router-dom";

const ProfileUpdateSuccessful = (props) => {
    return (
        <div className="background">
            <div className="plain-container">
                <div className="box-container profile-successful">
                    <h2>Profile Updated Successfully!</h2>
                    <i className="icofont-thumbs-up" />
                    <p>
                    Data accepted! You will be contacted via email/SMS on the status of your authentication, after which
                        you will be providd with a unique id for platform access.
                    </p>
                    <div className="buttons">
                        <Link to="/doctors/login" className="btn-main">
                            <i className="icofont-login" /> Login Page
                        </Link>
                        <Link to="https://mah-com/" className="btn-main-outline">
                            <i className="icofont-home" /> Home Page
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileUpdateSuccessful;
