import { useEffect, useState } from "react";
import { MedicalHistoryDialog } from "../others/medical-history-dialog";
import { ImageDialog } from "../../components/image-dialog";
import { MedicationRowItem } from "../../components/medication-row-item";
import { Surgeries } from "./surgeries";
import { Injuries } from "./injuries";
import { ChronicDiseases } from "./chronic-diseases";
import { PastPrescriptions } from "./past-prescriptions";

export const DiagnosisReport = props => {

    const [medicationsArray, setMedicationsArray] = useState(props.data.diagnosisReport)
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
        setMedicationsArray(props.data.diagnosisReport)
    }, [props.data])

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
        <div className='appointment'>
            {/* <h2><i className='icofont-double-right'></i> Medical History</h2> */}
            {
                medicationsExist
                    ? <div className='medications'>
                        <h3>Diagnosis Report</h3>
                        {currentMeds}
                    </div>
                    : <div className='not-found'>
                        <img src='/img/svg/no-data.svg' style={{ width: '80px' }} />
                        <h4 style={{ fontSize: '15px' }}>No Diagnosis Report...</h4>
                    </div>
            }
            <button
                className="btn-main medication"
                onClick={addMedication}
                id='btnShowDialog'
            >
                <i className="icofont-plus" /> Add diagnosis report
            </button>

            {/* Other parts of the page */}
            <PastPrescriptions
                data={props.data}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setPatientsData={props.setPatientsData}
                setImageLink={setImageLink}
                showImageDialog={showImageDialog}
                hideImageDialog={() => setImageDialogVisible(false)}
            />
            <Surgeries
                data={props.data}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setPatientsData={props.setPatientsData}
                setImageLink={setImageLink}
                showImageDialog={showImageDialog}
                hideImageDialog={() => setImageDialogVisible(false)}
            />
            <Injuries
                data={props.data}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setPatientsData={props.setPatientsData}
                setImageLink={setImageLink}
                showImageDialog={showImageDialog}
                hideImageDialog={() => setImageDialogVisible(false)}
            />
            <ChronicDiseases
                data={props.data}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setPatientsData={props.setPatientsData}
                setImageLink={setImageLink}
                showImageDialog={showImageDialog}
                hideImageDialog={() => setImageDialogVisible(false)}
            />

            {dialogVisible && <MedicalHistoryDialog
                data={props.data}
                showDialog={dialogVisible}
                hideDialog={() => setDialogVisible(false)}
                setIsLoaderVisible={props.setIsLoaderVisible}
                showToast={props.showToast}
                setPatientsData={props.setPatientsData}
                medicalData={JSON.parse(sessionStorage.getItem('patient')).diagnosisReport}
                updateField={'diagnosisReport'}
                questionString={"Include a diagnosis report?"}
                title={"Diagnosis Report"}
            />}

            {imageDialogVisible && <ImageDialog
                src={imageLink}
                setImageDisplay={showImageDialog}
                hideImageDialog={() => setImageDialogVisible(false)}
            />
            }

        </div>


    );
}
