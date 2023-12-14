import { useEffect, useState } from "react";
import "./App.css";
import {
  createTicket,
  fetchAllTickets,
  updateTicket,
} from "./service/ticketService";
import TicketForm from "./components/TicketForm/TicketForm";
import { formatDate } from "./util/dateUtil";
import Table from "./components/Table/Table";

const COLS = [
  "id",
  "title",
  "description",
  "contact",
  "status",
  "create_date",
  "update_date",
];

function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});

  const loadTicket = (ticket) => {
    setCurrentTicket(ticket);
  };

  const unloadTicket = () => {
    setCurrentTicket({});
  };

  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  };

  const sendSaveRequest = async (
    id,
    title,
    description,
    contact,
    status,
    create_date,
    update_date
  ) => {
    const newTicket = {
      id,
      title,
      description,
      contact,
      status,
      create_date: formatDate(new Date(create_date)),
      update_date: formatDate(new Date(update_date)),
    };

    const savedTicket = id
      ? await updateTicket(id, newTicket)
      : await createTicket(newTicket);

    if (!savedTicket) {
      return;
    }

    getAllTickets();
    setCurrentTicket(savedTicket);
  };


  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div className="App">
      <div className="main-table">
        <h2 className="title">Tickets</h2>
        <Table
          list={tickets}
          colNames={COLS}
          onSelect={loadTicket}
        />
      </div>
      <div className="main-form">
        <h2 className="title">Modify Ticket</h2>
        <TicketForm
          id={currentTicket.id}
          title={currentTicket.title}
          description={currentTicket.description}
          contact={currentTicket.contact}
          status={currentTicket.status}
          createDate={
            currentTicket.create_date
              ? new Date(currentTicket.create_date)
              : new Date()
          }
          updateDate={
            currentTicket.update_date
              ? new Date(currentTicket.update_date)
              : new Date()
          }
          readonly={false}
          onSubmit={sendSaveRequest}
          onClear={unloadTicket}
        />
      </div>
    
    </div>

  );
}

export default App;
