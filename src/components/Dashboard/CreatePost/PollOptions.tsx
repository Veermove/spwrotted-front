import { useCallback, useState } from "react";
import type { FC } from "react";
import { Button, Form } from "react-bootstrap";

export const PollOptions: FC<{
    values: [number, string][];
    updateOptions: (values: [number, string][]) => void;
}> = ({ updateOptions, values }) => {

    const removeOption = useCallback((option: number) => {
        updateOptions(values.filter(v => v[0] !== option));
    }, [updateOptions, values]);

    const addOption = useCallback((option: string) => {
        updateOptions([
            ...values, [values.length, option]
        ]);
    }, [updateOptions, values]);

    return (<>
        {values.map((opt) => (
            <Option
                key={opt[1]}
                value={opt}
                onClick={removeOption}
            />
        ))}
        <CreateOptionBox onClick={addOption} />
    </>);
};

export const Option: FC<{
    value: [number, string];
    onClick?: (val: number) => void;
}> = ({ value, onClick }) => {
    return (
    <div
        style={{
            display:"flex",
            flexDirection:"row"
        }}
    >
        <Form.Control
            style={{
                display:"flex"
            }}
            disabled
            value={value[1]}
        />
        <Button
            style={{
                display:"flex"
            }}
            onClick={(e) => { if (onClick) onClick(value[0]); }}
        >
            Remove
        </Button>
    </div>);
}


export const CreateOptionBox: FC<{
    onClick: (value: string) => void;
}> = ({ onClick }) => {

    const [newOption, setNewOption] = useState("");
    return (
    <div
        style={{
            display:"flex",
            flexDirection:"row"
        }}
    >
        <Form.Control
            style={{
                display:"flex"
            }}
            placeholder="Add another option?"
            onChange={(e) => setNewOption(e.target.value)}
            value={newOption}
        />
        <Button
            style={{
                display:"flex"
            }}
            onClick={(e) => {
                if (newOption !== ""){
                    onClick(newOption);
                    setNewOption("");
                }
            }}
        >
            Add
        </Button>
    </div>);
}
