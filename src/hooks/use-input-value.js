import { useCallback, useState } from "react";

export default function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  const handler = useCallback((e) => {
    const newName = e.target.value;
    const isInputValid = !!newName.trim();
    setError(!isInputValid);
    setValue(newName);
  }, []);

  return [value, error, handler, setValue, setError];
}
