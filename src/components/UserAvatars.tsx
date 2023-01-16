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

export default function MyAvatar() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Avvvatars value="tim@apple.com" />
      <Avvvatars value="jim@apple.com" />
      <Avvvatars value="gim@apple.com" />
      <Avvvatars value="sim@apple.com" />
    </div>
  );
}
