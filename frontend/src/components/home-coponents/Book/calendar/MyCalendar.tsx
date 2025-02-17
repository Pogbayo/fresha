import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useAppContext } from "../../../../contextAPi/AppContextApi/useAppContext";

type ValuePiece = Date | undefined;

const MyCalendar = ({
  handleCalendarValueInput,
}: {
  handleCalendarValueInput: (value: string) => void;
}) => {
  const { setIsCalendarOpen } = useAppContext();
  const [value, setValue] = useState<ValuePiece>(undefined);

  const handleDateClick = (selectedDate: Date) => {
    setValue(selectedDate);
    setIsCalendarOpen(false);
    handleCalendarValueInput("-----  Date selected  -----");
  };

  return (
    <div style={{ zIndex: 10 }}>
      <DayPicker selected={value} onDayClick={handleDateClick} />
    </div>
  );
};

export default MyCalendar;
