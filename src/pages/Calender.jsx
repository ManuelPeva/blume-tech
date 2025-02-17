import{ useState } from "react";
import Calendar from "react-calendar";
import "../styles/calender.css";

function Calender() {
  const [value, setValue] = useState(new Date());
  const markedDays = ["2025-01-15", "2025-01-20"]; // Ejemplo

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      if (markedDays.includes(formattedDate)) {
        return "marked-day";
      }
      if (formattedDate === new Date().toISOString().split("T")[0]) {
        return "current-day";
      }
    }
    return null;
  };

  return(
    <div>
      <Calendar onChange={setValue} value={value} tileClassName={tileClassName} />
    </div>
  );
}

export default Calender;
