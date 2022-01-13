export const DoctorsListItem = props => {
    return (
        <div
            className={props.selectedDoctor === props.id ? "d-list-item active" : "d-list-item"}
            onClick={() => props.setItem(props.id)}
        >
            <div className="image-part">
                <img src={props.src || "../portfolio/avatar.png"} alt="" />
                <p><span>♥</span>{props.rating}</p>
            </div>
            <div className="name-part">
                <h3>{props.name}</h3>
                <h4>{props.specialization}</h4>
                <span className={props.status?.toLowerCase()}>
                    {props.status}
                </span>
            </div>
        </div>
    )
}
