import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function OptionSelector({ handleVizButton }) {
  const [option, setOption] = React.useState("RELEVANCE");

  const handleChange = (event) => {
    handleVizButton(event.target.value.toLowerCase());
    setOption(event.target.value);
    console.log(event.target.value.toLowerCase());
  };

  return (
    <Box sx={{ maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Option"
          onChange={handleChange}
        >
          <MenuItem value={"INTENSITY"}>INTENSITY</MenuItem>
          <MenuItem value={"RELEVANCE"}>RELEVANCE</MenuItem>
          <MenuItem value={"LIKELIHOOD"}>LIKELIHOOD</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
