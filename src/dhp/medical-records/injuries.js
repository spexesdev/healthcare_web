import { useEffect, useState } from "react";
import { ImageDialog } from "../../components/image-dialog";
import { MedicationRowItem } from "../../components/medication-row-item";
import { SurgeriesDialog } from "../others/sugeries-dialog";

export const Injuries = props => {

    const [medicationsArray, setMedicationsArray] = useState(props.data.injuries)
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
    useEffect(() => setMedicationsArray(props.data.injuries), [props.data])

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
                nameField={item.name || item.injuries}
            />
        )
    })

    return (
        <>
            {
                medicationsExist
                    ? <div className='medications'>
                        <h3>Injuries</h3>
                        {currentMeds}
                    </div>
                    : <div className='not-found'>
                        <img src='/img/svg/no-data.svg' style={{ width: '80px' }} />
                        <h4 style={{ fontSize: '15px' }}>No injuries...</h4>
                    </div>
            }
            <button
                className="btn-main medication"
                onClick={addMedication}
                id='btnShowDialog'
            >
                <i className="icofont-plus" /> Add injury
            </button>

            {/* Other parts of the page */}


            {dialogVisible && <SurgeriesDialog
                showDialog={dialogVisible}
                hideDialog={() => setDialogVisible(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setPatientsData={props.setPatientsData}
                medicalData={JSON.parse(sessionStorage.getItem('patient')).injuries}
                updateField={'injuries'}
                questionString={"Have you had an injury before?"}
                title={"Injury"}
                inputArray={['Burns', 'Spinal cord injury', 'Spinal fracture', 'Rib fracture',
                    'Jaw fracture', 'Concussion', 'Amputation', 'Traumatic brain injury', 'Facial trauma',
                    'Acoustic trauma', 'Other']}
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
