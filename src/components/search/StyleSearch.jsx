import { OutlinedInput } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
export const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 320,
  height: 36,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));