export const DHPHeader = () => {

    return (
        <div className='dhp-header'>
            <div className='header-text'>
                <h2>Digital Health Passport</h2>
                <p>The pandemic of Corona Virus infection in 2020 has triggered the importance
                    of fast response to health issues
                </p>
                <button className='btn-main' onClick={() => alert('Confirm Passort Status')}>Confirm Passport Status</button>
            </div>
            <div className='bar-code'>
                <img src='/QR_code.png' alt='' />
            </div>
        </div>
    )
}
