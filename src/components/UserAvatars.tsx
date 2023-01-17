import { createStyles, Container, Title } from "@mantine/core";
import Avvvatars from "avvvatars-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    gap: theme.spacing.sm,

    [theme.fn.smallerThan("md")]: {
      display: "none"
    },
  },
}));

export default function MyAvatar({users}) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      {users.map(user => <Avvvatars value={user.userName} />)}
    </div>
  );
}
