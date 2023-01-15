import { useState, useEffect } from "react";
import { createStyles, Container, Title } from "@mantine/core";
import socketIO from "socket.io-client";
const socket = socketIO("http://localhost:4000");
import Login from "./Login";
import UserAvatats from "./components/UserAvatars"
import JoinBadge from "./components/JoinBadge";
import SelfMessage from "./components/SelfMessage";
import StrangerMessage from "./components/StrangerMessage";

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
    marginTop: theme.spacing.md,

    [theme.fn.smallerThan("md")]: {
      marginTop: theme.spacing.sm,
    },
  },

  messagesWrapper: {
    gridRow: "2 / -1",
    overflowY: "auto",
    borderRadius: "10px",
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
    height: 20,
    marginRight: 6,
    marginLeft: 12,
    "&:hover": {
      cursor: "pointer",
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) =>
      setMessageArray([...messageArray, data])
    );
  }, [socket, messageArray]);

  const handleLogin = userName => {
    setIsLoggedIn(true);
    socket.emit('newUser', { userName, socketID: socket.id });
  }

  const sendMessage = () => {
    // console.log(message);
    console.log({ userName: localStorage.getItem("userName"), message });

    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }

    setMessage("");
  };

  const leaveChat = () => {
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <div className={classes.app}>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>dtf?</Title>
        <div className={classes.messagesWrapper}>
          {/* <StrangerMessage body={data.body} author={data.author} />
          <JoinBadge />
          <SelfMessage body={data.body} author={data.author} />
          <JoinBadge />
          <StrangerMessage body={data.body} author={data.author} />
          <JoinBadge />
          <SelfMessage body={data.body} author={data.author} />
          <SelfMessage body={data.body} author={data.author} /> */}
          {messageArray.map((message:any) => {
            if (message.name === localStorage.getItem("userName")) {
              return <SelfMessage body={message.text} />;
            } else {
              return (
                <StrangerMessage
                  body={message.text}
                  author={{ name: message.name }}
                />
              );
            }
          })}
        </div>
        <p>Someone is typing...</p>
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
            src="img/send.png"
            alt="send"
            onClick={sendMessage}
          />
        </div>
      </Container>
    </div>
  ) : (
      <Login handleLogin={handleLogin} />
  );
}

export default App;
