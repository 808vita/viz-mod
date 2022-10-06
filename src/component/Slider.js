import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SliderSizes({ silderFilter, selectedViz }) {
  const [sliderVal, setSliderVal] = useState(50);
  const oof = useDebounce(sliderVal, 500);
  useEffect(() => {
    setTimeout(() => {
      silderFilter(sliderVal);
    }, 500);
  }, [oof]);

  useEffect(() => {
    silderFilter(50);
    setSliderVal(50);
  }, [selectedViz]);

  return (
    <Box width={300}>
      <Slider
        max={50}
        defaultValue={50}
        value={sliderVal}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e) => setSliderVal(e.target.value)}
      />
    </Box>
  );
}
