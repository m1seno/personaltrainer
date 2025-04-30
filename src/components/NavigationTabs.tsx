import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";

function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      sx={{ marginBottom: 2 }}
    >
      <Tab label="Treeni" value="/trainings" />
      <Tab label="Asiakkaat" value="/customers" />
    </Tabs>
  );
}

export default NavigationTabs;
