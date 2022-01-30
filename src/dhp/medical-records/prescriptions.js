import { useEffect, useState } from "react";
import { MedicalHistoryDialog } from "../others/medical-history-dialog";
import { ImageDialog } from "../../components/image-dialog";
import { MedicationRowItem } from "../../components/medication-row-item";

export const Prescriptions = props => {

    const [prescriptionsArray] = useState(() => JSON.parse(sessionStorage.getItem('patient')).pastPrescriptions)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [prescriptionsExist, setPrescriptionsExist] = useState(false);
    const [imageLink, setImageLink] = useState('')
    const [imageDialogVisible, setImageDialogVisible] = useState(false)

    const addMedication = () => {
        //Show the medication dialog...
        setDialogVisible(true);
    }

    const showImageDialog = imgLink => {
        setImageLink(imgLink)
        setImageDialogVisible(true);
    }

    useEffect(() => {
        prescriptionsArray.length === 0
            ? setPrescriptionsExist(false)
            : setPrescriptionsExist(true);

    }, [prescriptionsArray])


    //Set the array of prescriptions to show...
    const currentMeds = prescriptionsArray.map((item, index) => {
        return (
            <MedicationRowItem
                key={index}
                item={item}
                showImageDialog={showImageDialog}
            />
        )
    })

    return (
        <>
            {
                prescriptionsExist
                    ? <div className='medications'>
                        <h3>Past Prescriptions</h3>
                        {currentMeds}
                    </div>
                    : <div className='not-found'>
                        <img src='/img/svg/no-data.svg' style={{ width: '80px' }} />
                        <h4 style={{ fontSize: '15px' }}>No Past Prescription...</h4>
                    </div>
            }
            <button
                className="btn-main medication d-none"
                onClick={addMedication}
                id='btnShowDialog'
            >
                <i className="icofont-plus" /> Add prescription
            </button>

            {dialogVisible && <MedicalHistoryDialog
                showDialog={dialogVisible}
                hideDialog={() => setDialogVisible(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setResetData={props.setResetData}
                medicalData={JSON.parse(sessionStorage.getItem('patient')).pastPrescriptions}
                updateField={'pastPrescriptions'}
                questionString={"Have you taken any medicines in past?"}
                title={"Prescription"}
            />}

            {imageDialogVisible && <ImageDialog
                src={imageLink}
                setImageDisplay={showImageDialog}
                hideImageDialog={() => setImageDialogVisible(false)}
            />
            }

        </>


    );
}
