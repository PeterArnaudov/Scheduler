export const handleInputChange = <TData, TErrors>(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    setRequestData: React.Dispatch<React.SetStateAction<TData>>,
    setErrors: React.Dispatch<React.SetStateAction<TErrors>>) => {
    if (e.target.type === "checkbox") {
        setRequestData((prevRequestData) => ({
            ...prevRequestData,
            [key]: e.target.checked,
        }));
    }
    else {
        setRequestData((prevRequestData) => ({
            ...prevRequestData,
            [key]: e.target.value,
        }));
    }

    // Clear validation error when user starts typing.
    setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
    }));
};