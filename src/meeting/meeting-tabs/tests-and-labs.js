import React, { useEffect } from 'react';

export const TestsAndLabs = props => {

    const { cbxTests, setCbxTests } = props.Tests;
    const { selectedTests, setSelectedTests } = props.SelectedTests;

    const tests = ['PCV', 'Malaria Parasite', 'Widal', 'FBC', 'FBS', 'RBS', 'Stool M/C/C']
    const testsObj = tests.map((item, index) => {
        return (<option key={index} value={item}>{item}</option>)
    })

    const addItemToList = (selItem) => {
        //Ensure that the selected item is not in the list...
        if (selectedTests.indexOf(selItem) === -1) {
            //Item is not found in the list...
            setSelectedTests([...selectedTests, selItem])

            //Also, remove this item from the original list.
            tests.splice(tests.indexOf(selItem), 1)

        }
    }

    useEffect(() => {
        props.setRecommendedTests(selectedTests);
    }, [selectedTests])

    return (
        <div className='tab-page-content'>
            <div className='page-body' style={{ padding: '0 10px' }}>
                <div className='form-row'>
                    <div className='input-group'>
                        <label>Recommended tests/laboratories</label>
                        <select
                            className='form-control'
                            id='cbxTests'
                            value={cbxTests}
                            onChange={e => {
                                setCbxTests(e.target.value)
                                addItemToList(e.target.value)
                            }}
                        >
                            <option value='' style={{ background: '#efefef01' }}>Select</option>
                            { testsObj }
                        </select>
                    </div>
                    {selectedTests.length > 0 && <div className='sel-items'>{selectedTests.join(", ")}</div>}
                </div>
            </div>
        </div>
    )
}
