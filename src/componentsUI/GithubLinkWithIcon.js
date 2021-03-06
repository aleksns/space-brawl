import React from "react";
import "../App.css";
import { makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gitLinkStyle: {
    color: "#ffffff",
    fontFamily: "Audiowide",
    letterSpacing: "1.5px",
    fontSize: "1.1rem",
    fontWeight: "600",
    transitionDuration: 0,
    "&:hover": {
      filter:
      "invert(48%) sepia(13%) saturate(3207%) hue-rotate(170deg) brightness(100%) contrast(90%)",
    },
  },
  gitLogoStyle: {
    width: "40px",
    height: "40px",
  },
}));

export default function GithubLinkWithIcon(props) {
  const {gitLogo} = props;
  const classes = useStyles();
  const gitUrl = "https://github.com/aleksns";

  const openInNewTab = () => {
    const newWindow = window.open(gitUrl, "_blank", "noopener noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="container-git-link"
    >
      <Link
        className={classes.gitLinkStyle}
        component="button"
        underline="none"
        onClick={openInNewTab}
      >
        <img src={gitLogo} className={classes.gitLogoStyle}></img>Github: Aleksns
      </Link>
    </div>
  );
}