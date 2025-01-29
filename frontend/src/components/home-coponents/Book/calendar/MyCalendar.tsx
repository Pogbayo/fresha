import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const MyCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
};
