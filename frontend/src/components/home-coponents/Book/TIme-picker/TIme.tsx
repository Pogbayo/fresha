import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";

export const Time = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          border: "1px solid gray",
          padding: 30,
          backgroundColor: "white",
          color: "white",
        }}
      >
        <TimePicker
          label="Select Time"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
    </LocalizationProvider>
  );
};
