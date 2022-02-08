import { useEffect, useState } from "react";
import { MedicalHistoryDialog } from "../others/medical-history-dialog";
import { ImageDialog } from "../../components/image-dialog";
import { MedicationRowItem } from "../../components/medication-row-item";

export const Medications = props => {

    const [medicationsArray] = useState(() => JSON.parse(sessionStorage.getItem('patient')).currentMedications)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [medicationsExist, setMedicationsExist] = useState(false);
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
        medicationsArray.length === 0
            ? setMedicationsExist(false)
            : setMedicationsExist(true);

    }, [medicationsArray])


    //Set the array of medications to show...
    const currentMeds = medicationsArray.map((item, index) => {
        return (
            <MedicationRowItem
                key={index}
                item={item}
                showImageDialog={showImageDialog}
                nameField={item.name}
            />
        )
    })

    return (
        <>
            {
                medicationsExist
                    ? <div className='medications'>
                        <h3>Medications</h3>
                        {currentMeds}
                    </div>
                    : <div className='not-found'>
                        <img src='/img/svg/no-data.svg' style={{ width: '80px' }} />
                        <h4 style={{ fontSize: '15px' }}>No Medications record...</h4>
                    </div>
            }
            <button
                className="btn-main medication"
                onClick={addMedication}
                id='btnShowDialog'
            >
                <i className="icofont-plus" /> Add medication
            </button>

            {dialogVisible && <MedicalHistoryDialog
                showDialog={dialogVisible}
                hideDialog={() => setDialogVisible(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setResetData={props.setResetData}
                medicalData={JSON.parse(sessionStorage.getItem('patient')).currentMedications}
                updateField={'currentMedications'}
                questionString={"Are you taking any medicines at the moment?"}
                title={"Medication"}
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
