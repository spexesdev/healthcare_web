export const MedicalRecordsTabHeaders = props => {
    return (
        <div className="tab-container">
            <div
                className={props.selectedTab === 1 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(1)}
            >
                <i className="icofont-drug"></i>Prescriptions
            </div>
            <div
                className={props.selectedTab === 2 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(2)}
            >
                <i className="icofont-surgeon-alt"></i>Visits
            </div>
            <div
                className={props.selectedTab === 3 ? "tab active" : "tab"}
                onClick={() => props.setSelectedTab(3)}
            >
                <i className="icofont-prescription"></i>Lab Reports
            </div>

        </div>
    )
}
