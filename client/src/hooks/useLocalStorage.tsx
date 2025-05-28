import { useEffect, useState } from "react";

const PREFIX = 'whatsapp-clone'

export default function useLocalStorage(key: string) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue!== null) return JSON.parse(jsonValue)

    })
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}