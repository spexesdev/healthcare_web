import { useState } from 'react';

const ChargeSheet = props => {

    const [txtConsultationCharge, setTxtConsultationCharge] = useState('0');
    const [txtEmergencyCharge, setTxtEmergencyCharge] = useState('0');
    const [txtHomeConsultationCharge, setTxtHomeConsultationCharge] = useState('0');

    return (
        <div className="box-container">
            <h3>Charge Sheet</h3>
            <div className="form-row-2-1-1 ml-2 mb-2 border-bottom">
                <label className="amount-label">Consultation Charge</label>
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control align-right"
                        id="txtConsultationCharge"
                        value={txtConsultationCharge}
                        onChange={e => setTxtConsultationCharge(e.target.value)}
                    />
                </div>
                <label className="amount-label">USD/hr</label>
            </div>
            <div className="form-row-2-1-1 ml-2 mb-2 border-bottom">
                <label className="amount-label">Emergency Charge</label>
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control align-right"
                        id="txtEmergencyCharge"
                        value={txtEmergencyCharge}
                        onChange={e => setTxtEmergencyCharge(e.target.value)}
                    />
                </div>
                <label className="amount-label">USD/hr</label>
            </div>
            <div className="form-row-2-1-1 ml-2 mb-2 border-bottom">
                <label className="amount-label">Home Consultation</label>
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control align-right"
                        id="txtHomeConsultationCharge"
                        value={txtHomeConsultationCharge}
                        onChange={e => setTxtHomeConsultationCharge(e.target.value)}
                    />
                </div>
                <label className="amount-label">USD/hr</label>
            </div>
            <div className="form-row-2-1-1">
                <div></div><div></div>
                <div className='input-group'>
                <button className='btn-main'>
                    <i className='icofont-tick-mark' /> Update Charges
                </button>
            </div>
            </div>

        </div>
    )
}

export default ChargeSheet;
