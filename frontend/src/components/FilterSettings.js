import "../App.css";
import { React, useState, useEffect } from "react";
import styled from 'styled-components';
import TextualCheckbox from "../components/TextualCheckbox";
import filterBoxes from "../config/filterBoxes"

function FilterSettings() {
  //const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  // const [filterParams, setFilterParams] = useState({
  //   contentTypes: [],
  //   statuses: [],
  // });
  const [filterParams, setFilterParams] = useState(filterBoxes);
  const StatusBoxes = styled.div`
    display: flex;
	  align-items: center;
  `
  // const handleCheckboxChange = (data) => {
  //   const isChecked = checkedCheckboxes.some(checkedCheckbox => checkedCheckbox.value === data.value)
  //   if (isChecked) {
  //     setCheckedCheckboxes(
  //       checkedCheckboxes.filter(
  //         (checkedCheckbox) => checkedCheckbox.value !== data.value
  //       )
  //     );
  //   } else {
  //     setCheckedCheckboxes(checkedCheckboxes.concat(data));
  //   }
  // };
  function handleStatusChange(index) {
    setFilterParams({
      'statusBoxes': filterParams.statusBoxes.map((filterBox, currIndex) => {
        return currIndex === index ? { ...filterBox, checked: !filterBox.checked } : filterBox
      })
    })
    //const { value, checked } = e.target;
    //console.log(`${value} is ${checked}`);
    /*if (checked) { TODO: WHY DOES THIS NOT WORK
              setFilterParams({
                  contentTypes: filterParams.contentTypes,
      statuses: [...filterParams.statuses, value],
        })
    }
    else {
              setFilterParams({
                  contentTypes: filterParams.contentTypes,
                  statuses: filterParams.statuses.filter(
                      (e) => e !== value
      ),
              })
    }*/
    //e.target.checked = e.target.checked ? false : true;
    console.log(filterParams);
  }
  return (
    <>
      <StatusBoxes>
        <p>Status: </p>
        {filterBoxes.statusBoxes.map((filterBox, index) => <TextualCheckbox key={filterBox.checkName} {...filterBox} checkHandler={() => handleStatusChange(index)} />)}
      </StatusBoxes>
      {/* <h3>Content types:</h3>
      {filterParams.contentTypes.map(param => <p>{param}</p>)} */}
      <h3>Statuses:</h3>
      {filterParams.statusBoxes.map(param => {
        return (
          <>
          <p>{param.checkName}</p>
          <p>{param.text}</p>
          <p>{param.selectedColor}</p>
          <p>{param.checked ? "Checked" : "Not checked"}</p>
          </>
        )
      })}
    </>
  )
}

export default FilterSettings;
