import { useEffect, useState } from "react";

const PREFIX = "whatsapp-clone";

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const prefixedKey = PREFIX + key;
  console.log('key', key, prefixedKey)
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    console.log("jsonValue", jsonValue);
    if (jsonValue !== null && jsonValue !== undefined && jsonValue !== "undefined")
      return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage value:", error);
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
