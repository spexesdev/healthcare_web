import { useState } from "react";
import { ScheduledAppointmentDialogTabHeaders } from "../components/scheduled-appointment-dialog-tab-headers";
import { Medications } from "../tab-pages/medications";
import { Notes } from "../tab-pages/notes";

const ScheduledAppointmentDialog = (props) => {

    const [selectedTab, setSelectedTab] = useState(1);
    const [txtNotes, setTxtNotes] = useState('');

    return (
        <div className="modal show fade">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="nully">
                            <i className="icofont-calendar" /> Scheduled Appointments</h2>
                    </div>
                    <div className="modal-body">
                        <div className="date-caption">
                            <i className="icofont-clock-time" />
                            <h4>{props.selectedEventDate}</h4>
                        </div>
                        <div className="display-group">
                            <div className="display-group-lhs">
                                <div className="display-title">
                                    <h4>Appointments</h4>
                                </div>
                                <div className="appt-group">
                                    <div className="appt selected">
                                        <div className="appt-main">
                                            <img src="/portfolio/team-3.jpg" alt="" />
                                            <div className="name-and-define">
                                                <h5>Sergio Fernandez</h5>
                                                <span>Male • 40yrs</span>
                                            </div>
                                        </div>
                                        <div className="others">
                                            <i className="icofont-ui-delete" />
                                            <span className="period"><i className="icofont-stopwatch" /> {'10:00 - 10:50'}</span>
                                        </div>
                                        <i className="icofont-rounded-right" />
                                    </div>
                                    <div className="appt">
                                        <div className="appt-main">
                                            <img src="/portfolio/team-2.jpg" alt="" />
                                            <div className="name-and-define">
                                                <h5>Luchiano Ferez</h5>
                                                <span>Male • 33yrs</span>
                                            </div>
                                        </div>
                                        <div className="others">
                                            <i className="icofont-ui-delete" />
                                            <span className="period"><i className="icofont-stopwatch" /> {'10:00 - 10:50'}</span>
                                        </div>
                                    </div>
                                    <div className="appt">
                                        <div className="appt-main">
                                            <img src="/portfolio/team-4.jpg" alt="" />
                                            <div className="name-and-define">
                                                <h5>Cherrie Marks</h5>
                                                <span>Female • 52yrs</span>
                                            </div>
                                        </div>
                                        <div className="others">
                                            <i className="icofont-ui-delete" />
                                            <span className="period"><i className="icofont-stopwatch" /> {'10:00 - 10:50'}</span>
                                        </div>
                                    </div>
                                    <div className="appt">
                                        <div className="appt-main">
                                            <img src="/portfolio/team-1.jpg" alt="" />
                                            <div className="name-and-define">
                                                <h5>Antonio Gu</h5>
                                                <span>Male • 30yrs</span>
                                            </div>
                                        </div>
                                        <div className="others">
                                            <i className="icofont-ui-delete" />
                                            <span className="period"><i className="icofont-stopwatch" /> {'10:00 - 10:50'}</span>
                                        </div>
                                    </div>
                                    <div className="appt">
                                        <div className="appt-main">
                                            <img src="/portfolio/team-1.jpg" alt="" />
                                            <div className="name-and-define">
                                                <h5>Antonio Gu</h5>
                                                <span>Male • 25yrs</span>
                                            </div>
                                        </div>
                                        <div className="others">
                                            <i className="icofont-ui-delete" />
                                            <span className="period"><i className="icofont-stopwatch" /> {'10:00 - 10:50'}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="display-group-rhs">
                                <div className="patient-data">
                                    <div className="patient-header">
                                        <img src="/portfolio/team-3.jpg" alt="" />
                                        <h3>Sergio Fernandez</h3>
                                        <span>Male • 40yrs</span>
                                    </div>
                                    <div className="patient-details">
                                        {/* We should have some medical history data here... */}
                                        {/* MEDICAL HISTORY GROUP / TABS */}
                                        <ScheduledAppointmentDialogTabHeaders
                                            selectedTab={selectedTab}
                                            setSelectedTab={setSelectedTab}
                                        />
                                        {
                                            selectedTab === 1 && <Medications />
                                        }
                                        {selectedTab === 2 && <Notes
                                            setInput={setTxtNotes}
                                            inputValue={txtNotes}
                                        />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-main mr-1">
                            <i className="icofont-retweet" /> Reschedule</button>
                        <button
                            className="btn-main-outline"
                            onClick={() => props.hideDialog()}
                        ><i className="icofont-logout" /> Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduledAppointmentDialog;
