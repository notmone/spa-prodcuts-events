import { Suspense } from "react";
import {
  Link,
  useParams,
  json,
  useRouteLoaderData,
  redirect,
  Await,
  defer,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  // const params = useParams();

  const { event, events } = useRouteLoaderData("event");
  //console.log(data);

  return (
    <>
      <Suspense fallback={<p>loading ...</p>}>
        <Await resolve={event} errorElement={<p>could not fetch event</p>}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>loading ...</p>}>
        <Await
          resolve={events}
          errorElement={<div> could not fetch events</div>}
        >
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

// const EventDetailPage = () => {
//   // const params = useParams();

//   const data = useRouteLoaderData("event");
//   //console.log(data);

//   const event = data.event;
//   return (
//     <>
//       {/* <div>{params.eventId}</div>
//       <Link to="..">back</Link> */}
//       <EventItem event={event} />
//     </>
//   );
// };
export default EventDetailPage;
const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "could not fetch events" }, { status: 500 });
  }
  // if (!response.ok) {
  //   const error = new Error("could not fetch events");
  //   error.status = 500;
  //   throw error;
  // }

  const data = await response.json();

  return data.events;
};

const loadEvent = async (eventId) => {
  //console.log(eventId);
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw json({ message: "could not fetch event" }, { status: 500 });
  }

  const data = await response.json();
  //console.log("data", data);

  return data.event;
};

export const loader = async ({ requset, params }) => {
  const eventId = params.eventId;
  return defer({
    event: await loadEvent(eventId),
    events: loadEvents(),
  });
};

// export const loader = async ({ requset, params }) => {
//   //console.log(params);
//   const eventId = params.eventId;
//   const response = await fetch(`http://localhost:8080/events/${eventId}`);

//   if (!response.ok) {
//     throw json({ message: "could not fetch event" }, { status: 500 });
//   }

//   return response;
// };

export const action = async ({ request, params }) => {
  // console.log(request);
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    // method: "DELETE",
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "could not delete event" }, { status: 500 });
  }

  return redirect("/events");
};
