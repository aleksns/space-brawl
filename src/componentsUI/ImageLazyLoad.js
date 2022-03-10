import React, { useState, useEffect } from "react";

export default function ImageLazyLoad(props) {
  const { original, placeholder } = props;

  const [currentImg, setCurrentImg] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imgToLoad = new Image();
    imgToLoad.src = original;

    const getImg = new Promise((resolve) => resolve(imgToLoad.onload));

    async function loadImage() {
      await getImg
        .then(() => {
          setIsLoading(false);
          setCurrentImg(original);
        })
        .catch((e) => console.log(e.name));
    }

    loadImage();
  }, [original]);

  return (
    <img
      className="img-tutorial"
      src={currentImg}
      style={{
        opacity: isLoading ? 0.65 : 1,
        transition: "opacity 0.2s linear",
      }}
    />
  );
}
