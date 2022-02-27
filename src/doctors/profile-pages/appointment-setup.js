import { useState } from 'react';

const AppointmentSetupPage = () => {

    const [availability, setAvailability] = useState('available');

    return (
        <div className='box-container'>
            <h3>Apointment Availability</h3>
            <div className="availability-grid mb-2">
                <div className='question-group'>
                    <p>Indicate your current avaiability status</p>
                    <div className="radio-group mb-2">
                        <div className="radio-button">
                            <label>
                                <input
                                    type='radio'
                                    className='custom-radio'
                                    name='status'
                                    checked={availability === 'available'}
                                    onChange={() => setAvailability('available')}
                                />
                                Available
                            </label>
                        </div>
                        <div className="radio-button">
                            <label>
                                <input
                                    type='radio'
                                    className='custom-radio'
                                    name='status'
                                    checked={availability === 'busy'}
                                    onChange={() => setAvailability('busy')}
                                />
                                Busy
                            </label>
                        </div>
                        <div className="radio-button">
                            <label>
                                <input
                                    type='radio'
                                    className='custom-radio'
                                    name='status'
                                    checked={availability === 'out-of-office'}
                                    onChange={() => setAvailability('out-of-office')}
                                />
                                Out of office
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row-2-1-1">
                <div></div><div></div>
                <div className='input-group'>
                    <button className='btn-main'>
                        <i className='icofont-tick-mark' /> Update Changes
                    </button>
                </div>
            </div>
        </div>

    );
}

export default AppointmentSetupPage;
