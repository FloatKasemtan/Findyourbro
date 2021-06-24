import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"GITHUB @ "}
      <Link href="https://github.com/FloatKasemtan/Findyourbro">
        MY REPOSITORY
      </Link>{" "}
      2021.
    </Typography>
  );
};

export default Copyright;
