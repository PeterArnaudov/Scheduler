import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { Option } from "../../models/items/option";

export const isMultiValue = <T>(arg: MultiValue<T> | SingleValue<T>): arg is MultiValue<T> => {
    return Array.isArray(arg);
};

export const handleSelectInputChange = <T>(
    newValue: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
    setRequestData: React.Dispatch<React.SetStateAction<T>>): void => {
    if (isMultiValue(newValue)) {
        const selectedValues = newValue.map(option => option.value);
        setRequestData((prevRequestData) => ({
            ...prevRequestData,
            [actionMeta.name as string]: selectedValues,
        }));
    } else {
        setRequestData((prevRequestData) => ({
            ...prevRequestData,
            [actionMeta.name as string]: newValue?.value,
        }));
    }
};