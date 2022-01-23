
export const LoginHeaders = props => {

    return (
        <div className="tab-container" style={{ ...props.style }}>
            <div
                className={props.selectedTab === 1 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(1)}
            >
                <i className="icofont-phone"></i>Phone and OTP
            </div>
            <div
                className={props.selectedTab === 2 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(2)}
            >
                <i className="icofont-id-card"></i>Passport ID
            </div>

        </div>
    );
}
