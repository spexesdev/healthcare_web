
const Toast = (props) => {

    const visStatus = (props.toastVisibility) ? "toast" : "toast d-none";
    const message = props.toastMessage === "Failed to fetch" ? "Failed to retrieve data. Check your internet connection and try again." : props.toastMessage;

    function closeToast() {
        props.setToastVisibility(false)
    }

    if (props.toastVisibility) {
        setTimeout(() => {
            props.setToastVisibility(false)
        }, 8000)
    }

    let iconSrc = ""
    const contentStyle = {}
    const headerStyle = {}

    switch (props.msgBoxType) {
        case "success":
            iconSrc = "/success.png";
            contentStyle.borderLeft = "2px solid var(--main-green)"

            headerStyle.color = "var(--main-green)"
            headerStyle.innerText = "Success"

            break;

        case "information":
            iconSrc = "/info.png";
            contentStyle.borderLeft = "2px solid var(--bluish)";

            headerStyle.color = "var(--bluish)"
            headerStyle.innerText = "Information"

            break;

        case "exclamation":
            iconSrc = "/warning.png";
            contentStyle.borderLeft = "2px solid var(--golden-rod)";

            headerStyle.color = "var(--golden-rod)"
            headerStyle.innerText = "Error"

            break;
        default:
            break;
    }

    return (
        // This returns the basic
        //Frame setup for the custom message box
        // and based on the above props
        // the state values can be changed
        // depending on the values
        // of the
        // 1. Message
        // 2. Box style (information, exclamation or success)
        // 3. The message box visibility (true or false)
        <div className={visStatus}>
            <div className="logo">
                <img id="toastIcon" src={iconSrc} alt="" />
            </div>
            <div className="content" style={contentStyle}>
                <div className="content-header">
                    <h4 id="headerText" style={headerStyle}>MAH Health Care</h4>
                    <span id="close_toast" onClick={closeToast}>&times;</span>
                </div>
                <p id="toast_message">{(message === "Unauthenticated user" || message === "No user found") ? "Access Denied!" : message}</p>
            </div>
        </div>
    )
}

export default Toast;
