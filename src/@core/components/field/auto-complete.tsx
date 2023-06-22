import React from 'react';
import { TextField, Typography, Autocomplete, AutocompleteProps, AutocompleteRenderInputParams, InputLabelProps } from '@mui/material';

interface AutocompleteComponentProps extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> {
    customInputLabelProps?: InputLabelProps;
    label?: string;
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const AutocompleteComponent: React.FC<AutocompleteComponentProps> = ({
    customInputLabelProps,
    label,
    renderInput,
    ...props
}) => {
    const defaultRenderInput = (params: AutocompleteRenderInputParams) => {
        const { InputProps, InputLabelProps, ...rest } = params;
        const style = (InputProps as any).style;

        return (
            <TextField
                {...rest}
                InputProps={{
                    ...InputProps,
                    style: { fontSize: 11, ...(style as React.CSSProperties) },
                }}
                InputLabelProps={{
                    ...InputLabelProps,
                    style: { fontSize: 11, ...InputLabelProps?.style },
                    ...customInputLabelProps,
                }}
                label={label}
            />
        );
    };

    return (
        <Autocomplete
            {...props}
            renderInput={renderInput || defaultRenderInput}
        />
    );
};

export default AutocompleteComponent;
