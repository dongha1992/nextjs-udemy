import { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../utils/api-helper";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: { event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // 프리 렌더할 특정 이벤트만 가져옴
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    // "blocking" 설정할 경우, 완료된 데이터를 넘겨서 로딩창 보여줄 필요 없음
    fallback: true,
  };
}

export default EventDetailPage;
