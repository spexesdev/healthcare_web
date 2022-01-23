export const SideBarItem = props => {

    const { headerText, contentText, selectedIndex, setSelectedIndex, index } = props;
    const isActive = selectedIndex === index ? true : false;
    
    return (
        <div
            className={isActive ? 'side-bar-item active' : 'side-bar-item'}
            onClick={() => setSelectedIndex(index)}
        >
            <div>
                <h2>{headerText}</h2>
                <p>{contentText}</p>
            </div>
            <i className='icofont-rounded-right'></i>
        </div>
    )
}
