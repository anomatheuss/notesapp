import React from "react";
import s from "../pages/EditorPage.module.scss";

const CalendarView = ({ notes }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={s.calendarWrapper}>
      <div className={s.calendarHeader}>
        <h2>{today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}</h2>
        <p>You have {notes.length} notes recorded this month.</p>
      </div>
      <div className={s.calendarGrid}>
        {weekDays.map(d => <div key={d} className={s.dayHeader}>{d}</div>)}
        {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
          <div key={d} className={`${s.calendarDay} ${d === today.getDate() ? s.today : ''}`}>
            <span className={s.dayNumber}>{d}</span>
            {notes.filter(n => n.date?.includes(`/${d}/`)).map(n => (
              <div key={n.id} className={s.noteDot}>{n.title || "Note"}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
