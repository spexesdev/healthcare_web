export const MedicationRowItem = props => {
    return (
        <div className='medications-container'>
            <div>
                <h3>Name</h3>
                <p>{props.item.name}</p>
            </div>
            <div>
                <h3>Description</h3>
                <p>{props.item.description}</p>
            </div>
            <div>
                {(props.item.records[0] === "")
                    ? <p>No attachments</p>
                    : <button
                        className='btn-main'
                        onClick={() => props.showImageDialog(props.item.records[0])}>
                        Preview
                    </button>}
            </div>
        </div>
    )
}
