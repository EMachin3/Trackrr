import "../App.css";
import styled from "styled-components";
//import godfather from "../assets/the-godfather.svg";
import { React } from "react";

function SeasonBox({ season_index, setAddingEpisodeSeason }) {
  const ContentContainer = styled.div`
    border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
  `;
  // const ContentImage = styled.img`
  //   height: ${image_height}px;
  //   width: auto;
  //   position: relative;
  //   left: 25px;
  //   margin: 25px 0px;
  // `;

  const SeasonTitle = styled.p`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `;

  const AddButton = styled.button`
    position: relative;
    right: 25px;
  `;

  const DeleteButton = styled.button`
    position: relative;
    left: 25px;
  `;
  return (
    <ContentContainer>
      {/* <ContentImage
        src={process.env.PUBLIC_URL + `/content_photos/${image}`}
      ></ContentImage> */}
      <DeleteButton>Delete</DeleteButton>
      <SeasonTitle>{"Season " + (season_index + 1)}</SeasonTitle>
      <AddButton
        onClick={(e) => {
          e.preventDefault();
          setAddingEpisodeSeason(season_index);
        }}
      >
        Add Episode
      </AddButton>
    </ContentContainer>
  );
}

export default SeasonBox;
