import { useState } from "react";
import { createStyles, Container, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  app: {
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    height: "fit-content",
    width: "40vw",
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
      width: "96%",
    },
  },

  title: {
    textAlign: "center",
    marginTop: theme.spacing.md,

    [theme.fn.smallerThan("md")]: {
      marginTop: theme.spacing.sm,
    },
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

export default function LoginPage({ handleLogin }) {
  const { classes } = useStyles();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(userName);
    localStorage.setItem("userName", userName);
  };

  return (
    <div className={classes.app}>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>dtf?</Title>
        <form className="home__container" onSubmit={handleSubmit}>
          <div className={classes.inputWrapper}>
            <input
              autoFocus
              id="username"
              className={classes.messageInput}
              minLength={6}
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ fontFamily: "inherit" }}
            />
            <button style={{ border: "none", background: "transparent" }}>
              <img
                className={classes.sendButton}
                src="https://cdn-icons-png.flaticon.com/512/2985/2985034.png"
                alt=""
              />
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
