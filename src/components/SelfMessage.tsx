import { createStyles, Text} from "@mantine/core";

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
}

export default function CommentSimple({ body }: CommentSimpleProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Text size="sm">{body}</Text>
    </div>
  );
}
