import { useEffect, useState } from "react"

export const DHPHeader = ({ barcodeLink }) => {

    const [qrc, setQrc] = useState('');

    useEffect(() => {
        window.addEventListener("load", () => {
            const output = new QRCode(document.getElementById("qrcode"), barcodeLink)
            setQrc(output)
        });

        return () => {
            window.removeEventListener("load", () => {
                const output = new QRCode(document.getElementById("qrcode"), barcodeLink)
                setQrc(output)
            });
        }

    }, [])

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
                <div className="qrcode">{qrc}</div>
                <a href={barcodeLink} target='_blank'><img src='/QR_code.png' alt='' /></a>
            </div>
        </div>
    )
}
