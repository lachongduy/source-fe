import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function RHFTextFieldNumber({ name, helperText, control, ...other }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    value={typeof field.value === 'number' && field.value === 0 ? 0 : field.value}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}