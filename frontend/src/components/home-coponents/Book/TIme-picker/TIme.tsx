import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import styles from "./time.module.css";
import { useAppContext } from "../../../../contextAPi/useAppContext";
export const Time = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const { setIsTime } = useAppContext();
  const handleCloseTimeModal = () => {
    setIsTime(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <TimePicker
          label="Select Time"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <button className={styles.button} onClick={handleCloseTimeModal}>
          OK
        </button>
      </div>
    </LocalizationProvider>
  );
};
