import React, { useEffect, useState } from "react";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const images = new Array(10)
  .fill(0)
  .map((_, i) => `https://randomuser.me/api/portraits/lego/${i}.jpg`);

interface ImageCarouselProps {
  // images: string[]
}

const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {},
  image: {
    width: "100%",
    objectFit: "cover",
    height: "100%",
  },
  preview: {
    width: "10%",
    height: "10%",
    objectFit: "cover",
    cursor: "pointer",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function ImageCarousel(props: ImageCarouselProps) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setSelectedIndex((selected) => (selected + 1) % images.length),
      5000
    );
    // clear the interval when the component goes out of scope
    return () => clearTimeout(timeout);
  }, [selectedIndex]);
// 0 1 2 3 4
  const previewIndices = [
    selectedIndex > 0 ? selectedIndex - 1 : images.length - 1,
    selectedIndex,
    (selectedIndex + 1) % images.length,
  ];
  return (
    <div className={classes.root}>
      {/*<div className={classes.image}>*/}
      {/*  */}
      {/*</div>*/}
      <div className={classes.imageContainer}>
        <img src={images[selectedIndex]} className={classes.image} />
      </div>

      <div className={classes.controls}>
        <IconButton
          aria-label="previous-image"
          onClick={() =>
            setSelectedIndex(
              selectedIndex > 0 ? selectedIndex - 1 : images.length - 1
            )
          }
        >
          <ArrowBack />
        </IconButton>
        {previewIndices.map((index) => (
          <img
            key={index}
            src={images[index]}
            className={classes.preview}
            style={{
              border: index === selectedIndex ? "black 4px solid" : "",
            }}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
        <IconButton
          aria-label="next-image"
          onClick={() =>
            setSelectedIndex(
              selectedIndex < images.length - 1 ? selectedIndex + 1 : 0
            )
          }
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
}

export default ImageCarousel;
