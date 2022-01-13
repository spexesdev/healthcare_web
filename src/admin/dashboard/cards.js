export const Cards = (props) => {
    return (
        <div className="s-card">
            <div>
                <div className="numbers">{props.numbers}</div>
                <div className="cardName">{props.totalCases}</div>
            </div>
            <div className="iconBox">
                <i className={props.icofontClass} aria-hidden="true"></i>
                <span>{props.lastUpdatedTime}</span>
            </div>
        </div>
    )
}
