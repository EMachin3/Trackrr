import "../App.css";
import styled from "styled-components";
//import godfather from "../assets/the-godfather.svg";
import { React } from "react";

function ContentBox({ title, image, image_height }) {
    const ContentContainer = styled.div`
	border: 2px solid black;
	display: flex;
	align-items: center;
    justify-content: space-between;
    width: 800px;
    `
    const ContentImage = styled.img`
    height: ${image_height}px;
	width: auto;
    position: relative;
    left: 25px;
    margin: 25px 0px;
    `

    const ContentTitle = styled.p`
    position: absolute;
    left: 50%;
    transform: translateX(-50%); 
    `

    const EditButton = styled.button`
        position: relative;
        right: 25px;
    `
    return (
        <ContentContainer>
	    <ContentImage src={process.env.PUBLIC_URL + `/content_photos/${image}`}></ContentImage>
	    <ContentTitle>{title}</ContentTitle>
        <EditButton>Edit</EditButton>
	</ContentContainer>
    )
}

export default ContentBox;
