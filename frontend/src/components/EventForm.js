import { useEffect } from "react";
import {
  useNavigate,
  Form,
  json,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  //console.log(actionData);

  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  return (
    // <Form className={classes.form} method="post">
    <Form className={classes.form} method={method}>
      {actionData && actionData.errors && (
        <ul>
          {Object.entries(actionData.errors).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={event ? event.description : ""}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const method = request.method;
  //console.log(method);
  const event = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  // console.log(event);
  let url = "http://localhost:8080/events";
  if (method === "PATCH") {
    //console.log(params);
    const eventId = params.eventId;
    url = `http://localhost:8080/events/${eventId}`;
  }
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      {
        message: method === "PATCH" ? "cannot edit post" : "cannot create post",
      },
      { status: 500 }
    );
  }
  //return redirect("");
  return redirect("/events");
};
