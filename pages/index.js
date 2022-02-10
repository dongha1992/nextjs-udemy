import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../utils/api-helper";

function HomePage({ featuredEvents }) {
  return (
    <div>
      <h1>The Home Page</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { featuredEvents },
  };
}

export default HomePage;
