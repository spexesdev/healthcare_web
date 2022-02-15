import { shortDateString } from "../../assets/common/operations";

export const QualificationsItem = props => {
    return (
        <div className="qual-container">

            <i className="icofont-graduate" />
            <div className="qual-header">
                <h3>{props.issuer}</h3>
                <div className="icons">
                     {props.document !== "" && <i
                        className="icofont-attachment mr-1"
                        title="Preview Attachment"
                        onClick={() => {
                            props.setImageURL(props.document)
                            props.showImageDialog();
                        }}
                    />}
                   <i
                        className="icofont-edit-alt d-none"
                        title="Edit"
                        onClick={() => {
                            //Edit the item by setting the parameters necessary...
                            props.setEditIndex(props.itemIndex);
                            props.showQualDialog()
                        }}
                    />
                   <i
                        className="icofont-close-circled"
                        title="Remove"
                        onClick={() => {
                            //Remove the item from the list...
                            props.dataList.splice(props.itemIndex, 1)
                            props.setQualificationsList(props.dataList)
                        }}
                    />

                </div>
            </div>
            <div className="qual-main">
                <div className="text">
                    <h4>• {props.code}</h4>
                    <p><span>{shortDateString(props.period?.start)}</span> - <span>{shortDateString(props.period?.end)}</span></p>
                </div>

            </div>

        </div>
    )
}
