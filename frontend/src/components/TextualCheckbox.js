import "../App.css";
import ContentBox from "./ContentBox.js";
import { /*redirect,*/ useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import styled from 'styled-components';

const StyledLabel = styled.label`
    color: #000;
    background-color: gray; /* Changing background color */
    font-weight: bold; /* Making font bold */
    border-radius: 20px; /* Making border radius */
    width: auto; /* Making auto-sizable width */
    height: auto; /* Making auto-sizable height */
    padding: 5px 30px 5px 30px; /* Making space around letters */
    margin: 0px 5px; /*TODO: this probably shouldn't be here but styled components isn't working right*/
    font-size: 18px; /* Changing font size */
`

// const StyledUncheckedLabel = styled.label`
//     color: #000;
//     background-color: gray; /* Changing background color */
//     font-weight: bold; /* Making font bold */
//     border-radius: 20px; /* Making border radius */
//     width: auto; /* Making auto-sizable width */
//     height: auto; /* Making auto-sizable height */
//     padding: 5px 30px 5px 30px; /* Making space around letters */
//     margin: 0px 5px; /*TODO: this probably shouldn't be here but styled components isn't working right*/
//     font-size: 18px; /* Changing font size */
//     opacity: 0.5;
//     font-style: italic;   
// `

// const StyledCheckedLabel = styled.label`
//     color: #000;
//     background-color: gray; /* Changing background color */
//     font-weight: bold; /* Making font bold */
//     border-radius: 20px; /* Making border radius */
//     width: auto; /* Making auto-sizable width */
//     height: auto; /* Making auto-sizable height */
//     padding: 5px 30px 5px 30px; /* Making space around letters */
//     margin: 0px 5px; /*TODO: this probably shouldn't be here but styled components isn't working right*/
//     font-size: 18px; /* Changing font size */
//     opacity: 1;
//     background-color: ${props => props.selectedColor};
//     font-style: normal;
    
//`

const HiddenCheckbox = styled.input`
    position: absolute;
    visibility: hidden;
    opacity: 0;
    &&+${StyledLabel} {
        opacity: 0.5;
        font-style: italic;
    }
    &&:checked+${StyledLabel} {
        opacity: 1;
        background-color: ${props => props.selectedColor};
        font-style: normal;
    }
`

// const UncheckedCheckbox = styled.input`
//     position: absolute;
//     visibility: hidden;
//     opacity: 0;
//     &&+${StyledLabel} {
//         opacity: 0.5;
//         font-style: italic;
//     }
// `

// const CheckedCheckbox = styled.input`
//     position: absolute;
//     visibility: hidden;
//     opacity: 0;
//     &&+${StyledLabel} {
//         opacity: 1;
//         background-color: ${props => props.selectedColor};
//         font-style: normal;
//     }
// `

function TextualCheckbox({ checkName, text, selectedColor, checked, checkHandler }) {
    return (
        <>
            <HiddenCheckbox selectedColor={selectedColor} type="checkbox" name={checkName} id={checkName} value={checkName} checked={checked} onChange={checkHandler} />
            <StyledLabel htmlFor={checkName}>{text}</StyledLabel>
            {/* {-1 === -2 && <>
            <CheckedCheckbox selectedColor={selectedColor} type="checkbox" name={checkName} id={checkName} value={checkName} checked={checked} onChange={checkHandler} /> 
            <StyledCheckedLabel selectedColor={selectedColor} htmlFor={checkName}>{text}</StyledCheckedLabel>
            </>}
            {-3 === -4 &&
                <>
                <UncheckedCheckbox selectedColor={selectedColor} type="checkbox" name={checkName} id={checkName} value={checkName} checked={checked} onChange={checkHandler} /> 
                <StyledUncheckedLabel htmlFor={checkName}>{text}</StyledUncheckedLabel>
                </>} */}
        </>
    )
}

export default TextualCheckbox;
