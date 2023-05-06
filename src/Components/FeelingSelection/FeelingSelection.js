import React from "react";
import Button from "../Button/Button";
import "./FeelingSelection.css";
import PropTypes from "prop-types";

const primaryEmotions = [
  "sadness",
  "happiness",
  "fear",
  "anger",
  "surprise",
  "disgust",
  "love",
];

const FeelingSelection = () => {
  const emotionalButtons = primaryEmotions.map((emotion) => {
    return <Button id={emotion.path} key={emotion.path} name={emotion.name} />;
  });

  return <section className="button-container">{emotionalButtons}</section>;
};

export default FeelingSelection;

FeelingSelection.propTypes = {
  primaryEmotions: PropTypes.array.isRequired,
};
