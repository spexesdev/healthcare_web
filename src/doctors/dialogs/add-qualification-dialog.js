import { useState } from 'react';
import FileInput from '../../components/file-input';

export const AddQualificationDialog = (props) => {

    const [txtCode, setTxtCode] = useState(props.qualifications?.count > 0 ? props?.qualifications[props.dataIndex]?.code : '');
    const [txtDocument, setTxtDocument] = useState('');
    const [txtStartDate, setTxtStartDate] = useState('')
    const [txtEndDate, setTxtEndDate] = useState('')
    const [txtIssuer, setTxtIssuer] = useState('')

    const updateQualification = () => {
        //Add the qualification to a list...
        //First, set the object....
        if (txtCode === "") {
            props.showToast("Enter proper qualification to proceed.", "exclamation");
            return;
        }

        if (txtStartDate === "" || txtEndDate === "") {
            props.showToast("Enter appropriate start date and end date", "exclamation");
            return;
        }

        if (txtIssuer === "") {
            props.showToast("Enter Issuing authority to proceed.", "exclamation");
            return;
        }

        const qualifications = {
            "code": txtCode,
            "document": txtDocument,
            "period": {
                "start": txtStartDate,
                "end": txtEndDate
            },
            "issuer": txtIssuer,
            "issuerId": props.qualificationsList?.length,
        }

        props.setQualificationsList([...props.qualificationsList, qualifications])

        console.log([...props.qualificationsList, JSON.stringify(qualifications)]);

        //Done? then close window...
        props.showToast("Qualification added!", "success");
        props.hideDialog();

    }

    const displayDialog = props.showDialog ? "dialog-background fade" : "dialog-background";

    return (
        <div className={displayDialog}>
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}>
                        <i className="icofont-plus" /> Add Qualification
                    </h2>
                </div>
                <div className="dialog-body">
                    <div className="form-row">
                        <div className="input-group">
                            <label><span>*</span>Qualification</label>
                            <input
                                className='form-control'
                                id="txtCode"
                                value={txtCode}
                                onChange={e => setTxtCode(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label>Attach Cerfiticate</label>
                            <FileInput
                                setFileOutput={setTxtDocument}
                                acceptFileTypes={".png, .jpg, .jpeg, .pdf"}
                            />
                        </div>
                    </div>
                    <div className='form-row-2'>
                        <div className='input-group'>
                            <label><span>*</span>Select Period - From</label>
                            <input
                                className='form-control'
                                id="txtStartDate"
                                value={txtStartDate}
                                onChange={e => setTxtStartDate(e.target.value)}
                                type="date"
                            />
                        </div>
                        <div className='input-group'>
                            <label><span>*</span>To</label>
                            <input
                                className='form-control'
                                id="txtEndDate"
                                value={txtEndDate}
                                onChange={e => setTxtEndDate(e.target.value)}
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className='input-group'>
                            <label><span>*</span>Issuing Authority</label>
                            <input
                                className="form-control"
                                id="txtIssuer"
                                value={txtIssuer}
                                onChange={e => setTxtIssuer(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div className="dialog-footer main">
                    <button
                        className="btn-main mr-1"
                        onClick={updateQualification}>
                        <i className="icofont-plus" /> Add
                    </button>
                    <button
                        className="btn-main-outline"
                        onClick={() => props.hideDialog()}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
