import { createStyles, Text, Avatar, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "60%",
    marginLeft: "auto",
    marginTop: theme.spacing.xl,
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    backgroundColor: "#465ffd",
    color: "#fff",
  },
}));

interface CommentSimpleProps {
  body: string;
  author: {
    name: string;
  };
}

export default function CommentSimple({ body, author }: CommentSimpleProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Text size="sm">{body}</Text>
    </div>
  );
}
