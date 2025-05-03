import { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTrainings, TrainingAll } from "../service/api";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  // Käytetään useState-hookia tilan hallintaan
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  // Tila kalenterin tapahtumille (treenit)
  const [events, setEvents] = useState<{ title: string; start: Date; end: Date }[]>([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const data = await getTrainings();

        // Muutetaan jokainen training Calendar-yhteensopivaksi event-objektiksi
        const formattedEvents = data.map((t: TrainingAll) => {
          const start = new Date(t.date);
          const end = new Date(start.getTime() + t.duration * 60000);

          // Muotoillaan tapahtuman ja asiakkaan nimi, sekä aikaväli
          return {
            title: `${t.activity} / ${t.customer?.firstname ?? "?"} ${t.customer?.lastname ?? ""}`,
            start,
            end,
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching trainings:", error);
        toast.error("Could not load trainings");
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={(newView) => setView(newView)}
        onNavigate={(newDate) => setDate(newDate)}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        step={30}
        timeslots={2}
        style={{ height: "100%" }}
      />
    </div>
  );
}
