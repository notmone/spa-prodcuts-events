// import { useEffect, useState } from "react";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";
function EventsPage() {
  const { events } = useLoaderData(); //result of response
  //console.log("events", events);

  return (
    <Suspense fallback={<p>loading...</p>}>
      <Await resolve={events} errorElement={<div> could not fetch events</div>}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );

  // return (
  //   <Suspense fallback={<p>loading...</p>}>
  //     <Await resolve={events}>
  //       {(loadedEvents) => <EventsList events={loadedEvents} />}
  //     </Await>
  //   </Suspense>
  // );
}

// function EventsPage() {

//   const data = useLoaderData(); //result of response

//   const fetchedEvents = data?.events;

//   return (

//     <EventsList events={fetchedEvents} />
//   );
// }

// function EventsPage() {
//   //   const [isLoading, setIsLoading] = useState(false);
//   //   const [fetchedEvents, setFetchedEvents] = useState();
//   //   const [error, setError] = useState();
//   //1-
//   //const fetchedEvents = useLoaderData();

//   //3-
//   const data = useLoaderData(); //result of response

//   //1-Error
//   //   if (data.isError) {
//   //     return <div>{data.message}</div>;
//   //   }
//   //2-
//   const fetchedEvents = data?.events;

//   //console.log(fetchedEvents);

//   //   useEffect(() => {
//   //     async function fetchEvents() {
//   //       setIsLoading(true);
//   //       const response = await fetch("http://localhost:8080/events");

//   //       if (!response.ok) {
//   //         setError("Fetching events failed.");
//   //       } else {
//   //         const resData = await response.json();
//   //         setFetchedEvents(resData.events);
//   //       }
//   //       setIsLoading(false);
//   //     }

//   //     fetchEvents();
//   //   }, []);
//   return (
//     // <>
//     //   <div style={{ textAlign: "center" }}>
//     //     {isLoading && <p>Loading...</p>}
//     //     {error && <p>{error}</p>}
//     //   </div>
//     //   {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     // </>
//     <EventsList events={fetchedEvents} />
//   );
// }

export default EventsPage;

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
export const loader = async ({ req, params }) => {
  // const response = await fetch("http://localhost:8080/events");

  // if (!response.ok) {
  //   throw json({ message: "could not fetch events" }, { status: 500 });
  // }

  // return response;

  return defer({
    events: loadEvents(),
  });
};

// export const loader = async ({ req, params }) => {
//    const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     throw json({ message: "could not fetch events" }, { status: 500 });
//   }

//   return response;
// };

// export const loader = async ({ req, params }) => {
//   const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     //1-
//     //return { isError: true, message: "could not fetch events" };
//     //2-1
//     // throw { message: "could not fetch events" };
//     //2-2
//     // throw new Response(JSON.stringify({ message: "could not fetch events" }), {
//     //   status: 500,
//     // });
//     throw json({ message: "could not fetch events" }, { status: 500 });
//   }
//   //1-
//   //const resData = await response.json();
//   //return resData.events;
//   //2-
//   //   const res= new Response("any data",{status:200})
//   //   return res
//   //3-
//   return response;
// };
