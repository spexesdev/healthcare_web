import { useEffect, useState } from "react";
import { MedicationRowItem } from "../../components/medication-row-item";
import { SurgeriesDialog } from "../others/sugeries-dialog";
import { ImageDialog } from "../../components/image-dialog";

export const ChronicDiseases = props => {

    const [medicationsArray] = useState(() => JSON.parse(sessionStorage.getItem('patient')).chronicDiseases)
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
            />
        )
    })

    return (
        <>
            {
                medicationsExist
                    ? <div className='medications'>
                        <h3>Chronic Diseases</h3>
                        {currentMeds}
                    </div>
                    : <div className='not-found'>
                        <img src='/img/svg/no-data.svg' style={{ width: '80px' }} />
                        <h4 style={{ fontSize: '15px' }}>No Chronic Diseases...</h4>
                    </div>
            }
            <button
                className="btn-main medication"
                onClick={addMedication}
                id='btnShowDialog'
            >
                <i className="icofont-plus" /> Add chronic disease
            </button>

            {/* Other parts of the page */}


            {dialogVisible && <SurgeriesDialog
                showDialog={dialogVisible}
                hideDialog={() => setDialogVisible(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setResetData={props.setResetData}
                medicalData={JSON.parse(sessionStorage.getItem('patient')).chronicDiseases}
                updateField={'chronicDiseases'}
                questionString={"Do you have any chronic disease?"}
                title={"Chronic Disease"}
                inputArray={['Diabetes', 'Hypertension', 'PCOS', 'Hypothyroidism', 'COPD',
                    'Asthma', 'Heart disease', 'Arthritis', 'Mental illness/depression',
                    'Fertility issues', 'Other']}
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
