import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventLoader,
  action as eventAction,
} from "./pages/EventDetailPage";
import EventsLayout from "./pages/EventLayout";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as formAction } from "./components/EventForm";
import Newsletter, { action as newsLetterAction } from "./pages/Newsletter";
import NewProductsPage from "./pages/NewProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: formAction,
          },
          {
            path: ":eventId",
            loader: eventLoader,
            id: "event",
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: formAction,
              },
            ],
          },
        ],
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: newsLetterAction,
      },
      {
        path: "products",
        element: <NewProductsPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
