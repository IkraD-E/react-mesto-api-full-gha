import React from "react";

export function useForm(inputValue) {
    const [values, setValues] = React.useState(inputValue);
    function handleChange(event) {
        const {value} = event.target;
        setValues(value);
    }

    return {values, handleChange, setValues};
}