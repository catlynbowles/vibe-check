import React from "react";
import LoadingIcon from "../../LoadingIcon/LoadingIcon";
import Postcard from "../Postcard/Postcard";
import "./Gallery.css";

export default function Gallery({ postcards }) {
  console.log(postcards);
  // console.log(postcards[0].$, "7");
  const generatePostcards = () => {
    return postcards.map((postcard) => {
      console.log(postcard.$);
      if (postcard.$.imageid) {
        return (
          <Postcard
            sentence={postcard.$.sentence}
            imageid={postcard.$.imageid}
            postdate={postcard.$.postdate}
          />
        );
      }
    });
  };
  return (
    <div className="gallery">
      {postcards.length && generatePostcards()}
      {/* {!postcards.length ? <LoadingIcon /> : generatePostcards()} */}
    </div>
  );
}
