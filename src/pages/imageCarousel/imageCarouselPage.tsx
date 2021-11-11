import React from "react";
import ImageCarousel from "./imageCarousel";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  carousel: {
    width: "25%",
    margin: "auto",
    border: "whitesmoke",
  },
  '@media (max-width: 732px)': {
    carousel: {
      width: "80%",
      margin: "auto",
      border: "whitesmoke",
    },}
}));

const images = new Array(10)
  .fill(0)
  .map((_, i) => `https://randomuser.me/api/portraits/lego/${i}.jpg`);

function ImageCarouselPage() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.carousel}>
        <ImageCarousel />
      </div>
    </div>
  );
}

export default ImageCarouselPage;
