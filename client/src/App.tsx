import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { createStyles, Container, Title } from "@mantine/core";
import JoinBadge from "./components/JoinBadge";
import SelfMessage from "./components/SelfMessage";
import StrangerMessage from "./components/StrangerMessage";

const socket = io();

const useStyles = createStyles((theme) => ({
  app: {
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    height: "86vh",
    width: "80vw",
    display: "grid",
    gap: theme.spacing.md,
    gridTemplateRows: "auto 1fr",
    marginTop: theme.spacing.xl,
    border: "4px solid #020202",
    borderRadius: "18px",
    boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",

    [theme.fn.smallerThan("md")]: {
      border: "none",
      boxShadow: "none",
      width: "100%",
      height: "100dvh",
      marginTop: theme.spacing.sm,
    },
  },

  title: {
    textAlign: "center",
    marginTop: theme.spacing.xl,

    [theme.fn.smallerThan("md")]: {
      marginTop: theme.spacing.sm,
    },
  },

  messagesWrapper: {
    gridRow: "2 / -1",
    overflowY: "auto",
    borderRadius: "10px",
    marginTop: theme.spacing.md,
  },

  inputWrapper: {
    marginBottom: theme.spacing.md,
    height: 50,
    backgroundColor: "#f4f5fa",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },

  messageInput: {
    background: "transparent",
    fontSize: 16,
    border: "none",
    width: "96%",

    "&:focus": {
      outline: "none",
    },
  },

  sendButton: {
    height: 24,

    "&:hover": {
      cursor: "pointer",
      // height: 28,
      // transition: "all 0.2s ease-in-out",
    },
  },
}));

const data = {
  body: "This Pokémon likes to lick its palms that are sweetened by being soaked in honey. The water spouts are very accurate.",
  author: {
    name: "Jacob Warnhalter",
  },
};

function App() {
  const { classes } = useStyles();
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket: any = io();
    const newSocket: any = io(`http://localhost:3000`, {
      withCredentials: true,
    });
    // fetch("http://localhost:3000")
    //   .then(data => data.json())
    //   .then(data => console.log(data))

    // setSocket(newSocket);
    // return () => newSocket.close();
  }, [setSocket]);

  const sendMessage = () => {
    console.log(message);
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className={classes.app}>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>dtf?</Title>
        <div className={classes.messagesWrapper}>
          <StrangerMessage body={data.body} author={data.author} />
          <JoinBadge />
          <SelfMessage body={data.body} author={data.author} />
          <JoinBadge />
          <StrangerMessage body={data.body} author={data.author} />
          <JoinBadge />
          <SelfMessage body={data.body} author={data.author} />
          <SelfMessage body={data.body} author={data.author} />
        </div>
        <div className={classes.inputWrapper}>
          <input
            autoFocus
            className={classes.messageInput}
            placeholder="Type a message..."
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <img
            className={classes.sendButton}
            placeholder=""
            src="img/send.png"
            alt="send"
            onClick={sendMessage}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
