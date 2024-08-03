import "../App.css";
import styled from "styled-components";
//import godfather from "../assets/the-godfather.svg";
import { React } from "react";

function SelectContentBox({ title, image, image_height, handleSelect, index }) {
  const ContentContainer = styled.div`
    border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
  `;
  const ContentImage = styled.img`
    height: ${image_height}px;
    width: auto;
    position: relative;
    left: 25px;
    margin: 25px 0px;
  `;

  const ContentTitle = styled.p`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `;

  const SelectButton = styled.button`
    position: relative;
    right: 25px;
  `;
  return (
    <ContentContainer>
      <ContentImage
        src={process.env.PUBLIC_URL + `/content_photos/${image}`}
      ></ContentImage>
      <ContentTitle>{title}</ContentTitle>
      <SelectButton id={index} onClick={(e) => handleSelect(e)}>
        Select
      </SelectButton>
    </ContentContainer>
  );
}

export default SelectContentBox;
