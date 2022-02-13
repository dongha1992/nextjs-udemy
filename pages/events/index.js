import { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { getAllEvents } from "../../utils/api-helper";
import EventList from "../../components/events/event-list";
import EventsSearch from "./events-search";

function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: { events },
    revalidate: 60,
  };
}

export default AllEventsPage;
