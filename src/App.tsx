import { useState, useEffect } from "react";
import { createStyles, Button, Container, Title, Text } from "@mantine/core";
import socketIO from "socket.io-client";
// const socket = socketIO("http://localhost:4000/");
const socket = socketIO("https://dtf-server-production.up.railway.app");
import Login from "./Login";
import UserAvatars from "./components/UserAvatars";
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
    height: "90vh",
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

  titleWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: theme.spacing.md,

    [theme.fn.smallerThan("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },

  title: {
    textAlign: "center",
    // align item to the center of flexbox
    alignSelf: "center",
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

  leaveButton: {
    backgroundColor: "#f76f72",
    // put to far right
    justifySelf: "end",

    "&:hover": {
      backgroundColor: "#f24245",
    },
  },
}));

function App() {
  const { classes } = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("messageResponse", (data) =>
      setMessageArray([...messageArray, data])
    );
  }, [socket, messageArray]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      console.log(data);
      setUsers(data);
    });
  }, [socket, users]);

  const handleLogin = (userName) => {
    setIsLoggedIn(true);
    socket.emit("newUser", { userName, socketID: socket.id });
  };

  const sendMessage = (e) => {
    e.preventDefault();

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
    window.location.reload();
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <div className={classes.app}>
      <Container className={classes.wrapper}>
        <div className={classes.titleWrapper}>
          <UserAvatars users={users} />
          <Title className={classes.title}>dtf?</Title>
          <Button className={classes.leaveButton} onClick={leaveChat}>
            Exit Chat
          </Button>
        </div>
        <div className={classes.messagesWrapper}>
          {messageArray.map((message: any) => {
            if (message.type === "join") {
              return <JoinBadge userName={message.userName} />;
            } else if (message.name === localStorage.getItem("userName")) {
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
        <Text size="xs" style={{ textAlign: "center" }}>
          someone is typing...
        </Text>
        <form onSubmit={sendMessage}>
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
              style={{ fontFamily: "inherit" }}
            />
            <button style={{ border: "none", background: "transparent" }}>
              <img
                className={classes.sendButton}
                src="img/send.png"
                alt="send"
                onClick={sendMessage}
              />
            </button>
          </div>
        </form>
      </Container>
    </div>
  ) : (
    <Login handleLogin={handleLogin} />
  );
}

export default App;
