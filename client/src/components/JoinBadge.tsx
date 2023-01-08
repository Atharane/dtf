import { createStyles, Badge } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  badge: {
    display: "block",
    width: "fit-content",
    margin: "0 auto",
    marginTop: theme.spacing.xl,
    textTransform: "none",
    backgroundColor: "#fff",
    boxShadow:  "8px 8px 16px #d0d3e4, -8px -8px 16px #fafdff"
  },
}));

export default function SimpleBatch() {
  const { classes } = useStyles();

  return <Badge className={classes.badge}>👋 Jacob just joined the chat</Badge>;
}
