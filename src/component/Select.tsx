import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface CustomSelectProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: { value: string | number; label: string }[];
  container?: object;
  height?: string;
  [key: string]: unknown;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options = [],
  container = {},
  height,
  ...props
}) => {
  return (
    <Grid {...container} item >
    <FormControl fullWidth variant="outlined">
      <Select
        {...props}
        style={{color:'black',...(props.style||{})}}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        value={options.find(v=>v.value===value)?.label}
        onChange={(e) => {
          const selectedOption = options.find(v => v.label === e.target.value);
          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
        renderValue={(selected) => (
          <Typography
            sx={{
              color:'black'
            }}
          >
            {selected || label}
          </Typography>
        )}
        sx={{
          borderRadius: "8px",
          color:'#00000099',
          // fontWeight: 600,
          // backgroundColor: "#fff",
          border: "1px solid #0000003B",
          height: height || '36px',
          boxShadow: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            // border: "1.5px solid #7A50FF",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              px: 1,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.label}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              justifyContent: "center",
              my: 0.5,
              color: value === option.value ? "#7A50FF" : "#000",
              backgroundColor: value === option.value ? "#7060FF29" : "transparent",
              "&:hover": {
                backgroundColor: "#7060FF29",
                color: "#3D28FF",
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Grid>
  );
};

export default CustomSelect;
