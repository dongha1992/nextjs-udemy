import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../utils/api-helper";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>The Home Page</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
