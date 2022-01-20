import React, { useState } from 'react'

export const Prescriptions = props => {

    const { cbxName, setCbxName } = props.Name;


    const [cbxFormulation, setCbxFormulation] = useState('')
    const [cbxUnits, setCbxUnits] = useState('')
    const [cbxDosage, setCbxDosage] = useState('')
    const [cbxFrequency, setCbxFrequency] = useState('')
    const [cbxDuration, setCbxDuration] = useState('')
    const [cbxHowToTake, setCbxHowToTake] = useState('')
    const [txtRemarks, setTxtRemarks] = useState('')

    return (
        <div className='tab-page-content'>
            <div className='page-body' style={{ padding: '0 10px', marginTop: '-20px' }}>
                <div className='form-row'>
                    <div className='input-group'>
                        <label>Drug</label>
                        <select
                            className='form-control'
                            id='cbxName'
                            value={cbxName}
                            onChange={e => setCbxName(e.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='Maldox'>Maldox</option>
                            <option value='Augmentin'>Augmentin</option>
                            <option value='Penicillin'>Penicillin</option>
                        </select>
                    </div>
                </div>
                <div className='form-row-3'>
                    <div className='input-group'>
                        <label>Formulation</label>
                        <select
                            className='form-control'
                            id='cbxFormulation'
                            value={cbxFormulation}
                            onChange={e => setCbxFormulation(e.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='Tablet'>Tablet</option>
                            <option value='Capsule'>Capsule</option>
                            <option value='Syrup'>Syrup</option>
                            <option value='Injection'>Injection</option>
                            <option value='Powder'>Powder</option>
                            <option value='Serum'>Serum</option>
                            <option value='Oil'>Oil</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                    <div className='input-group'>
                        <label>Units (uom)</label>
                        <select
                            className='form-control'
                            id='cbxUnits'
                            value={cbxUnits}
                            onChange={e => setCbxUnits(e.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='tbsp'>tbsp</option>
                            <option value='tablet'>tablet</option>
                            <option value='ml'>ml</option>
                            <option value='mg'>mg</option>
                            <option value='unit'>unit</option>
                        </select>
                    </div>
                    <div className='input-group'>
                        <label>Dosage</label>
                        <select
                            className='form-control'
                            id='cbxDosage'
                            value={cbxDosage}
                            onChange={e => setCbxDosage(e.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='1 uom'>1 uom</option>
                            <option value='2 uom'>2 uom</option>
                            <option value='3 uom'>3 uom</option>
                            <option value='4 uom'>4 uom</option>
                        </select>
                    </div>
                </div>
                <div className='form-row-3'>
                    <div className='input-group'>
                        <label>Frequency</label>
                        <select
                            className='form-control'
                            id='cbxFrequency'
                            value={cbxFrequency}
                            onChange={e => setCbxFrequency(e.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='Once a day'>Once a day</option>
                            <option value='Twice a day'>Twice a day</option>
                            <option value='Thrice a day'>Thrice a day</option>
                            <option value='Once a week'>Once a week</option>
                            <option value='Once a month'>Once a month</option>
                            <option value='Twice a month'>Twice a month</option>
                        </select>
                    </div>
                    <div className='input-group'>
                        <label>Duration</label>
                        <select
                            className='form-control'
                            id='cbxDuration'
                            value={cbxDuration}
                            onChange={e => setCbxDuration(e.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='1 day'>1 day</option>
                            <option value='2 days'>2 days</option>
                            <option value='3 days'>3 days</option>
                            <option value='1 week'>1 week</option>
                            <option value='2 weeks'>2 weeks</option>
                            <option value='1 month'>1 month</option>
                            <option value='1 year'>1 year</option>
                        </select>
                    </div>
                    <div className='input-group'>
                        <label>How to take</label>
                        <select
                            className='form-control'
                            id='cbxHowToTake'
                            value={cbxHowToTake}
                            onChange={e => setCbxHowToTake(e.target.value)}
                        >
                            <option value=''>Select</option>
                            <option value='od'>od</option>
                            <option value='bd'>bd</option>
                            <option value='tds'>tds</option>
                        </select>
                    </div>
                </div>
                <div className='form-row-2-1'>
                    <div className='input-group'>
                        <label>Remarks</label>
                        <textarea
                            className='form-control'
                            id='txtRemarks'
                            value={txtRemarks}
                            onChange={e => setTxtRemarks(e.target.value)}
                            rows={2}

                        />
                    </div>
                    <div className='input-group'>
                        <label style={{ opacity: 0 }}>1</label>
                        <button
                            className='btn-main-outline'
                            id='btnAdd'
                            onClick={() => props.showToast('This will eventually add this to a list/array of prescriptions, to be updated with the update click.', 'exclamation')}
                        >
                            Add <i className='icofont-plus' />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
