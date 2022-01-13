
export const PatientTabHeaders = (props) => {

    return (
        <div className="tab-container">
            <div
                className={props.selectedTab === 2 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(2)}
            >
                <i className="icofont-ui-user"></i>Personal
            </div>
            <div
                className={props.selectedTab === 1 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(1)}
            >
                <i className="icofont-tasks-alt"></i>Contact
            </div>
            <div
                className={props.selectedTab === 3 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(3)}
            >
                <i className="icofont-doctor"></i>Medical
            </div>
            <div
                className={props.selectedTab === 4 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(4)}
            >
                <i className="icofont-history"></i>History
            </div>
            <div
                className={props.selectedTab === 5 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(5)}
            >
                <i className="icofont-glass"></i>Lifestyle
            </div>
        </div>
    );
}
