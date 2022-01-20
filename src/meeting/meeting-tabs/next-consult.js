import React, { useEffect } from 'react';

export const NextConsult = props => {

    const { cbxRevisit, setCbxRevisit } = props.Revisit;
    const { cbxRevisitDate, setCbxRevisitDate } = props.RevisitDate;
    const { txtDescription, setTxtDescription } = props.Description;

    useEffect(() => {
        props.setRevisitData({
            "revisitRequired": cbxRevisit,
            "revisitDate": cbxRevisitDate,
            "revisitDescription": txtDescription
        })

    }, [cbxRevisit, cbxRevisitDate, txtDescription])

    return (
        <div className='tab-page-content'>
            <div className='page-body' style={{ padding: '0 10px' }}>
                <div className='form-row-2-1'>
                    <div className='input-group'>
                        <label>Revisit required?</label>
                        <select
                            className='form-control'
                            id='cbxRevisit'
                            value={cbxRevisit}
                            onChange={e => setCbxRevisit(e.target.value)}
                        >
                            <option value='No'>No</option>
                            <option value='Yes'>Yes</option>
                        </select>
                    </div>
                    <div className={cbxRevisit === "Yes" ? 'input-group' : 'd-none'}>
                        <label>Revisit Date?</label>
                        <input
                            className='form-control'
                            id='cbxRevisitDate'
                            value={cbxRevisitDate}
                            onChange={e => setCbxRevisitDate(e.target.value)}
                            type='datetime-local'
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className={cbxRevisit === "Yes" ? 'input-group' : 'd-none'}>
                        <label>Description</label>
                        <textarea
                            className='form-control'
                            id='txtDescription'
                            value={txtDescription}
                            onChange={e => setTxtDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
