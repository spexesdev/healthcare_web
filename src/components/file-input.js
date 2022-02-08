import { useEffect, useState } from 'react';
import { fileToBase64 } from '../assets/common/file-to-base64';

const FileInput = (props) => {
    /**
     * My Custom file input, which accepts
     * a few props like setFileOutput function, returning
     * the object to base64 format, and the acceptFileTypes,
     * which specifies the expected file input types...
     */
    const [tempPix, setTempPix] = useState('');
    const [outputText, setOutputText] = useState('');

    const handleChange = e => {
        const file = e.target.files[0];

        fileToBase64(file)
            .then(response => {
                setTempPix(response.toString());
                setOutputText(file.name);

                //Also, set the props input value...
                props.setFileOutput(response.toString());

            })
            .catch(err => {
                console.log(err);
            })
    }

    const removeFile = () => {
        setTempPix('');
        const uploadFile = document.querySelector('#uploadFile');
        uploadFile.value = '';
        props.setFileOutput('');
    }

    useEffect(() => {
        const dropZone = document.querySelector('.upload-file-area');
        const fileInput = document.getElementById('uploadFile');

        dropZone.addEventListener('dragover', e => {
            // we must preventDefault() to let the drop event fire
            e.preventDefault();
        });

        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            // drag/drop files are in event.dataTransfer
            let files = e.dataTransfer.files;
            fileInput.files = files;
            const file = fileInput.files[0];

            fileToBase64(file)
                .then(response => {
                    setPicture(response.toString());
                    setOutputText(file.name);
                })
                .catch(err => {
                    props.showToast(err, "exclamation");
                })

        });

        return () => {

            dropZone.removeEventListener('dragover', e => {
                // we must preventDefault() to let the drop event fire
                e.preventDefault();
            });

            dropZone.removeEventListener('drop', e => {
                e.preventDefault();
                // drag/drop files are in event.dataTransfer
                let files = e.dataTransfer.files;
                fileInput.files = files;
                console.log(`added ${files.length} files`);
            });

        }

    }, [])

    const bgColor = tempPix ? 'var(--success-bg)' : '';

    return (
        <div className="upload-file-area" style={{ background: bgColor }}>
            <div className={tempPix ? 'd-none' : ''}>
                <i className='icofont-cloud-upload' />
                <label>Drop files to upload or </label>
                <button className="btn-upload">
                    <input
                        type="file"
                        name="uploadFile"
                        id="uploadFile"
                        accept={props.acceptFileTypes}
                        onChange={handleChange}
                    />
                    browse
                </button>
            </div>
            <label className={tempPix ? '' : 'd-none'}><span>Attached File: </span>
                {outputText} <button className='btn-upload' onClick={removeFile}>
                    remove</button>
            </label>
        </div>
    );
}

export default FileInput;
