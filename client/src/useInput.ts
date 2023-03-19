import React, {useState} from "react";


export const useInput = <T>(initialValue: T) => {
    const [value, setValue] = useState<T>(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
        value, onChange
    }
}