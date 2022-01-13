
export const DoctorsTabHeaders = (props) => {

    return (
        <div className="tab-container">
            <div
                className={props.selectedTab === 2 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(2)}
            >
                <i className="icofont-doctor"></i>Personal
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
                <i className="icofont-karate"></i>Portfolio
            </div>

        </div>
    );
}
