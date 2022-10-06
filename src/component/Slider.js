import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import useDebounce from "../hooks/useDebounce";
import { useState } from "react";

export default function SliderSizes({ silderFilter }) {
  const [sliderVal, setSliderVal] = useState(50);
  const oof = useDebounce(sliderVal, 500);

  const handleChange = (val) => {
    setSliderVal(val);
    silderFilter(oof);
  };

  return (
    <Box width={300}>
      <Slider
        max={50}
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e) => handleChange(e.target.value)}
      />
    </Box>
  );
}
