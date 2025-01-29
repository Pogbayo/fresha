import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppContext } from "../../../../contextAPi/useAppContext";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const MyCalendar = ({
  handleCalendarValueInput,
}: {
  handleCalendarValueInput: (value: string) => void;
}) => {
  const { setIsCalendarOpen } = useAppContext();
  const [value, setValue] = useState<Value>(new Date());
  const handleDateClick = (selectedDate: Value) => {
    setValue(selectedDate);
    setIsCalendarOpen(false);
    handleCalendarValueInput("-----  Date selected  -----");
  };
  return (
    <div>
      <ReactCalendar onChange={handleDateClick} value={value} />
    </div>
  );
};
