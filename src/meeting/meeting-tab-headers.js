
export const MeetingTabHeaders = (props) => {

    return (
        <div className="tab-container">
            <div
                className={props.selectedTab === 1 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(1)}
            >
                <i className="icofont-check"></i> Complaints
            </div>
            <div
                className={props.selectedTab === 2 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(2)}
            >
                <i className="icofont-glass"></i>Lifestyle
            </div>
            <div
                className={props.selectedTab === 3 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(3)}
            >
                <i className="icofont-medicine"></i>Prescriptions
            </div>
            <div
                className={props.selectedTab === 4 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(4)}
            >
                <i className="icofont-laboratory"></i>Labs
            </div>
            <div
                className={props.selectedTab === 5 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(5)}
            >
                <i className="icofont-double-right"></i>Next.Consult
            </div>
        </div>
    );
}
