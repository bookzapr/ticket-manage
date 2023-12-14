import React, { useEffect, useState } from "react";
import { formatDate } from "../../util/dateUtil";
import "./TicketForm.css";

function TicketForm({
  id = "",
  title,
  description,
  contact,
  status,
  createDate = new Date(),
  updateDate = new Date(),
  readonly = false,
  onSubmit = () => {},
  onClear = () => {},
}) {
  const [tTitle, setTTitle] = useState(title);
  const [tDescription, setTDescription] = useState(description);
  const [tContact, setTContact] = useState(contact);
  const [tStatus, setTStatus] = useState(status);

  useEffect(() => {
    setTTitle(title || "General");
    setTDescription(description || "");
    setTContact(contact || "Admin");
    setTStatus(status || "Pending");
  }, [id]);

  return (
    <div className="TicketForm">
      <div className="form">
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="number" value={id} name="id" disabled />
        </div>
        

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select
            name="title"
            value={tTitle}
            onChange={(e) => setTTitle(e.target.value)}
            disabled={readonly}
          >
            <option>General</option>
            <option>Tech</option>
            <option>Lonely</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={tDescription}
            onChange={(e) => setTDescription(e.target.value)}
            disabled={readonly}
          />
        </div>


        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <select
            name="contact"
            value={tContact}
            onChange={(e) => setTContact(e.target.value)}
            disabled={readonly}
          >
            <option>Admin</option>
            <option>Boss</option>
            <option>Guard</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            value={tStatus}
            onChange={(e) => setTStatus(e.target.value)}
            disabled={readonly}
          >
            <option>Pending</option>
            <option>Accepted</option>
            <option>Resolved</option>
            <option>Rejected</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="createDate">Create Date</label>
          <input
            type="date"
            value={formatDate(createDate)}
            name="createDate"
            disabled
          />
        </div>


        <div className="form-group">
          <label htmlFor="updateDate">Update Date</label>
          <input
            type="date"
            value={formatDate(updateDate)}
            name="updateDate"
            disabled
          />
        </div>


        <div className="button-group">
          <button
            className="button"
            style={{ width: "50%" }}
            onClick={() => {
              onSubmit(
                id,
                tTitle,
                tDescription,
                tContact,
                tStatus,
                createDate,
                new Date().toString()
              );
            }}
          >
            Submit
          </button>
          <button style={{ width: "50%" }} onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketForm;
