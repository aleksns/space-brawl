import React from "react";
import "../App.css";
import GitLogo from "../images/github-icon.png";
import { makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gitLink: {
    color: "#ffffff",
    fontFamily: "Century Gothic",
    fontSize: "1.1rem",
    fontWeight: "600",
    "&:hover": {
      filter:
        "invert(48%) sepia(13%) saturate(3207%) hue-rotate(210deg) brightness(100%) contrast(90%)",
    },
  },
  gitLogo: {
    width: "40px",
    height: "40px",
  },
}));

export default function GithubLinkWithIcon(props) {
  const classes = useStyles();
  const gitUrl = "https://github.com/aleksns";

  const openInNewTab = () => {
    const newWindow = window.open(gitUrl, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="container-git-link">
      <Link
        className={classes.gitLink}
        component="button"
        underline="none"
        onClick={openInNewTab}
      >
        <img src={GitLogo} className={classes.gitLogo}></img>Github: Aleksns
      </Link>
    </div>
  );
}