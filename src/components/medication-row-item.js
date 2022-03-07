import { shortDateString } from "../assets/common/operations";

export const MedicationRowItem = props => {

    const rowItem = props.item.records;
    const dateValue = props.item.timeStamp ? ` - (${shortDateString(props.item.timeStamp)})` : '';

    return (
        // // <div className='medications-container'>
        // //     <div>
        // //         <h3>Name</h3>
        // //         <p>{props.item.name}</p>
        // //     </div>
        // //     <div>
        // //         <h3>Date</h3>
        // //         <p>{props.item.timeStamp}</p>
        // //     </div>
        // //     <div>
        // //         <h3>Description</h3>
        // //         <p>{props.item.description}</p>
        // //     </div>
        // //     <div>
        // //         {(props.item.records[0] === "")
        // //             ? <p>No attachments</p>
        // //             : <>
        // //                 <h3>Attachment</h3>
        // //                 <button
        // //                     className='attachment-preview'
        // //                     onClick={() => props.showImageDialog(props.item.records[0])}>
        // //                     Preview...
        // //                 </button>
        // //             </>}
        // //     </div>
        // // </div>
        <div className='medications-container'>
            <div className='container-header'>
                <h3>{props.nameField}{dateValue}</h3>
            </div>
            <div className="container-body">
                <div>
                    <p>{props.item.description}</p>
                </div>
                <div>
                    <p>{props.item.doctorName}</p>
                </div>
                <div>
                    {(!rowItem)
                        ? <p>No attachments</p>
                        : <>
                            <button
                                className='attachment-preview'
                                onClick={() => props.showImageDialog(props.item.records)}>          ////This was formerly props.item.records[0]
                                Attachment
                            </button>
                        </>}
                </div>
            </div>

        </div>
    )
}
