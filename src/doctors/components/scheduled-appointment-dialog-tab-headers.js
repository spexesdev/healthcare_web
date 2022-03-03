export const ScheduledAppointmentDialogTabHeaders = props => {
    return (
        <div className="tab-container">
        <div
            className={props.selectedTab === 1 ? "tab active" : "tab"}
            onClick={() => props.setSelectedTab(1)}
        >
            <i className="icofont-drug"></i>Medications
        </div>
        <div
            className={props.selectedTab === 2 ? "tab active" : "tab"}
            onClick={() => props.setSelectedTab(2)}
        >
            <i className="icofont-notepad"></i>Notes
        </div>
    </div>
    )
}
