import { useState } from "react"

export const Notes = ({ setInput, inputValue }) => {

    const [txtInput, setTxtInput] = useState(inputValue)

    const handleChange = e => {
        setInput(e.target.value);
        setTxtInput(e.target.value);
    }

    return (
        <div className="form-row py-2">
            <div className="input-group">
                <textarea
                    className="form-control"
                    id="txtInput"
                    name="txtInput"
                    value={txtInput}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Enter consultation notes here..."
                />
            </div>
        </div>
    )
}
