import { DUMMY_EVENTS } from "../data/dummy";

const BASE_URL =
  "https://nextjs-test-api-default-rtdb.firebaseio.com/events.json";

export async function getAllEvents() {
  const data = await fetch(BASE_URL).then((res) => res.json());
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  console.log(id);
  return allEvents.find((event) => event.id === id);
}
