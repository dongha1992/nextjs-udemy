import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { getFilteredEvents } from "../../utils/api-helper";
import EventList from "../../components/events/event-list";
import ResultsTitle from "./results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
import { BASE_URL } from "../../utils/api-helper";

function FilteredEventsPage({ hasError }) {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const filteredData = router.query.slug;

  const fetcher = async (url) => {
    const result = await fetch(url).then((res) => res.json());

    const events = [];
    for (const key in result) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    setEvents(events);
  };

  const { data, error } = useSWR(BASE_URL, fetcher);

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const currentDate = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={currentDate} />
      <EventList items={events} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filteredData = params.slug;

//   const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destinaion: "/error",
//       // },
//     };
//   }

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
