import "../App.css";
import styled from "styled-components";
//import godfather from "../assets/the-godfather.svg";
import { React } from "react";

function EpisodeBox({ title, episode_index, picture, image_height }) {
  const EpisodeContainer = styled.div`
    border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const EpisodeImage = styled.img`
    height: ${image_height}px;
    width: auto;
    position: relative;
    left: 25px;
    margin: 25px 0px;
  `;

  const EpisodeTitle = styled.p`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `;

  const EditButton = styled.button`
    position: relative;
    right: 25px;
  `;
  return (
    <EpisodeContainer>
      <EpisodeImage
        src={process.env.PUBLIC_URL + `/content_photos/${picture}`}
      ></EpisodeImage>
      <EpisodeTitle>{`Episode ${episode_index + 1}: ${title}`}</EpisodeTitle>
      <EditButton>Edit</EditButton>
    </EpisodeContainer>
  );
}

export default EpisodeBox;
