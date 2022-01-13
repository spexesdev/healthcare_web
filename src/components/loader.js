const Loader = ({ isVisible }) => {

    const displayClass = !isVisible ? "d-none" : "new-loader-bg";

    return (
        <div className={displayClass}>
            <div className="new-loader-container">
                <span style={{ '--i': 0 }}></span>
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
                <span style={{ '--i': 4 }}></span>
            </div>
        </div>
    );
}

export default Loader;