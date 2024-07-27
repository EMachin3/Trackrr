import "../App.css";
import styled from "styled-components";
import godfather from "../assets/the-godfather.svg";
import { redirect, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

function ContentCollectionBox({ attrs }) {
    const CollectionContainer = styled.div`
	border: 2px solid black;
	display: flex;
	align-content: center;
	align-items: center;
    `
    //TODO: figure out loading the image by name or something through react's nonsense
    const CollectionImage = styled.img`
    height: 50px;
	width: auto;
    `
    return (
        <CollectionContainer>
	    <CollectionImage src={godfather}></CollectionImage>
	    <p>test</p>
	</CollectionContainer>
    )
}

export default ContentCollectionBox;
