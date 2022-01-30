import { useEffect, useState } from "react"

export const HealthProfileBar = () => {

    const [percentage, setPercentage] = useState(0);
    const [patientsData, setPatientsData] = useState(() => JSON.parse(sessionStorage.getItem('patient')));

    useEffect(() => {
        //Check every 30 secs...
        setInterval(() => {
            //First, fetch the patients data
            setPatientsData(() => JSON.parse(sessionStorage.getItem('patient')));
        }, 30000);

        checkCircleSector()
        const progressStatus = document.querySelector(".progress-status");

        if (percentage < 50) {
            progressStatus.style.background = 'var(--light-golden-rod)';
        } else if (percentage > 50 && percentage < 70) {
            progressStatus.style.background = 'var(--bluish)';
        } else if (percentage > 69) {
            progressStatus.style.background = 'var(--main-green)';
        }

        progressStatus.style.width = `${percentage}%`;

    }, [percentage])

    const checkCircleSector = () => {
        //Returns a value based on the percentage completion of
        //the patient's data..
        //First, get all the relative values required...
        const pix = patientsData.photo === "" ? 0 : 5;
        const lifeStyle1 = (patientsData.lifeStyle?.activityLevel && patientsData.lifeStyle?.activityLevel === "") ? 0 : 3;
        const lifeStyle2 = patientsData.lifeStyle?.alcoholConsumption === "" ? 0 : 3;
        const lifeStyle3 = patientsData.lifeStyle?.foodPreference === "" ? 0 : 3;
        const lifeStyle4 = patientsData.lifeStyle?.smokingHabbit === "" ? 0 : 3;

        //general
        const general1 = patientsData.general?.bloodGroup === "" ? 0 : 2;
        const general2 = patientsData.general?.bmi === "" ? 0 : 2;
        const general3 = patientsData.general?.bp === "" ? 0 : 2;
        const general4 = patientsData.general?.chestExpansion === "" ? 0 : 2;
        const general5 = patientsData.general?.height === "" ? 0 : 2;
        const general6 = patientsData.general?.oxygenSaturation === "" ? 0 : 2;
        const general7 = patientsData.general?.pulse === "" ? 0 : 2;
        const general8 = patientsData.general?.vision === "" ? 0 : 2;
        const general9 = patientsData.general?.weight === "" ? 0 : 2;

        const general = general1 + general2 + general3 + general4 + general5 + general6 + general7 + general8 + general9;

        //Name and phone
        const fullName = patientsData.name === "" ? 0 : 10;
        const phoneNo = patientsData.phoneNumber === "" ? 0 : 10;
        const gender = patientsData.gender === "" ? 0 : 5;
        const birthDate = patientsData.birthDate === "" ? 0 : 5;
        const email = patientsData.emailId === "" ? 0 : 5;
        const maritalStatus = patientsData.maritalStatus === "" ? 0 : 5;
        const pastPrescriptions = patientsData.pastPrescriptions?.length === 0 ? 0 : 5;
        const currentMedications = patientsData.currentMedications?.length === 0 ? 0 : 5;
        const diagnosisReport = patientsData.diagnosisReport?.length === 0 ? 0 : 5;
        const address = patientsData.address?.length === 0 || Object.keys(patientsData.address[0]).length === 0 ? 0 : 5;
        const contactPerson = patientsData.contactPerson?.length === 0 ? 0 : 5;

        const totalValue = pix + lifeStyle1 + lifeStyle2 + lifeStyle3 + lifeStyle4 + general +
            fullName + phoneNo + gender + email + maritalStatus + pastPrescriptions +
            currentMedications + diagnosisReport + address + contactPerson + birthDate;

        //Set the variable...
        setPercentage(totalValue);

        // //const circle2 = document.getElementById('secondCircle');
        // //circle2.style.strokeDashoffset = `calc(440 - (440 * ${totalValue}) / 100)`;


        //
        // // if (totalValue < 50) {
        // //     circle2.style.stroke = 'var(--light-golden-rod)';
        // // } else if (totalValue > 50 && totalValue < 70) {
        // //     circle2.style.stroke = 'var(--bluish)';
        // // } else if (totalValue > 69) {
        // //     circle2.style.stroke = 'var(--main-green)';
        // // }
    }

    return (
        <div className='health-status'>
            <h2>Your Health Profile</h2>
            <div>
                <span className='progress-bar'></span>
                <span className='progress-status'></span>
            </div>

            <h4>{percentage}% Complete</h4>
        </div>
    )
}
