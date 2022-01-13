export const ImageDialog = props => {

    const imageSource = props.src;

    //Find the image components...
    const imageExtension = imageSource.toString().indexOf("pdf") > -1 ? "pdf" : "other";

    const dialogClass = props.setImageDisplay
        ? "dialog-background image-dialog fade"
        : "dialog-background image-dialog";


    const extension = imageExtension;
    let imageContainerDisplay;
    let embedContainer;

    if (extension === "pdf") {
        embedContainer = "embed-container";
        imageContainerDisplay = "image-container d-none";

    } else {
        embedContainer = "embed-container d-none";
        imageContainerDisplay = "image-container";
    }

    const closeMe = () => {
        props.hideImageDialog(false);
    }

    return (
        <div className={dialogClass}>
            <div className={imageContainerDisplay}>
                <div className="image-viewer">
                    <span className="close">&times;</span>
                    <img
                        id="full-image"
                        alt=""
                        src={imageSource}
                    />
                </div>
            </div>
            <div className={embedContainer}>
                <embed
                    src={imageSource}
                    width="100%"
                    height="95%"
                />
            </div>
            <br />
            <div className="form-row-3-1">
                <div></div>
                <button
                    className="btn-main"
                    id="btnClose"
                    onClick={closeMe}
                    style={{ width: 300 }}
                >Close</button>
            </div>
        </div>
    );
}
