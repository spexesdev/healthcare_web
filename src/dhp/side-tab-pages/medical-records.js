import { useState } from "react"
import { MedicalRecordsTabHeaders } from "../medical-records/medical-records-tab-headers"
import { Prescriptions } from "../medical-records/prescriptions"

export const MedicalRecords = props => {

    const [selectedTab, setSelectedTab] = useState(1)

    return (
        <div className='appointment'>
            <h2 style={{ marginBottom: '30px' }}><i className='icofont-double-right'></i> Medical Records</h2>
            <MedicalRecordsTabHeaders
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            {selectedTab === 1 &&
                <Prescriptions
                    data={props.data}
                    medicationsExist={false}
                    showToast={props.showToast}
                    setIsLoaderVisible={props.setIsLoaderVisible}
                    setResetData={props.setResetData}

                />
            }


        </div>
    )
}
