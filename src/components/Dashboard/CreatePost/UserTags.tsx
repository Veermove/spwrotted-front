import { useCallback } from "react";
import type { FC, ReactNode } from "react";

export const UserTag: FC<{
    value: string;
    onClick?: (val: string) => void;
}> = ({ value, onClick }) => {

    return (
        <div
            style={{
                display: "flex",
                border: "1px solid #003377",
                padding: "5px",
                color: "white",
                fontWeight: 700,
                backgroundColor: "#0066EE",
                width: "auto",
                lineHeight: "18px",
                borderRadius: "5px",
            }}
        >
            <div style={{ display: "inline-block"}}>{ value }</div>
            <div
                style={{
                    display: "inline-block",
                    backgroundColor: "#0099FF",
                    color: "#0033AA",
                    borderRadius: "20px",
                    width: "16px",
                    height: "16px",
                    marginLeft: "5px",
                    textAlign: "center",
                    cursor: "pointer",
                }}
                onClick={() => { if (onClick) onClick(value); }}
            >
                X
            </div>
        </div>
    );
};


export const UserTagContainer: FC<{ children: ReactNode; }> = ({ children }) => {

    return (
        <div style={{
            display: "flex",
            padding: "5px",
            gap: "10px",
            flexDirection: "row",
        }}>
            { children }
        </div>
    );
};


export const UserAddedTags: FC<{
    values: string[];
    onChange?: (values: string[]) => void;
}> = ({ onChange, values }) => {

    const onTagClick = useCallback((word: string) => {
        if (onChange) {
            onChange(values.filter((v) => v !== word));
        }
    }, [onChange, values])


    return (
        <UserTagContainer>
            { values.map((value) => (
                <UserTag
                    key={value}
                    value={value}
                    onClick={onTagClick}
                />
            ))}
        </UserTagContainer>
    );
};
