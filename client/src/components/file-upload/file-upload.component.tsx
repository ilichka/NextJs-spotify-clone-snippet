import React, {PropsWithChildren, useRef} from 'react';
import {FileUploadProps} from "@/components/file-upload/file-upload.interface";


const FileUpload: React.FC<PropsWithChildren<FileUploadProps>> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target?.files[0])
    }

    return (
        <div onClick={() => ref.current.click()}>
            <input
                type="file"
                accept={accept}
                style={{display: "none"}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;