import React, { useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { userContext } from "../Contexts/userContext";
import bgTop from "../img/WEB1(HOME).svg";
import bgBottom from "../img/WEB3.svg";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles({
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const { profile } = useContext(userContext);
  useEffect(() => {
    if (profile.student_id === "") {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <Fade in timeout={1000}>
        <img
          style={{ position: "fixed", top: -50, pointerEvents: "none" }}
          src={bgTop}
        />
      </Fade>
      <div className={classes.container}>
        <Navbar></Navbar>
      </div>
      <main>
        {children}
        <div></div>
      </main>
      <Fade in timeout={1000}>
        <img
          style={{ position: "fixed", bottom: -50, pointerEvents: "none" }}
          src={bgBottom}
        />
      </Fade>
    </div>
  );
};

export default Layout;
