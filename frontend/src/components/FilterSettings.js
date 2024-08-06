import "../App.css";
import { React } from "react";
import styled from "styled-components";
import TextualCheckbox from "../components/TextualCheckbox";
// import filterBoxes from "../config/filterBoxes"

//TODO: each click on a filter causes a TON of re-renders.
function FilterSettings({ filterParams, setFilterParams /*, setQueryURL*/ }) {
  //const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  // const [filterParams, setFilterParams] = useState({
  //   contentTypes: [],
  //   statuses: [],
  // });
  // const [filterParams, setFilterParams] = useState(filterBoxes);
  const FilterBoxes = styled.div`
    display: flex;
    align-items: center;
  `;
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
  function handleContentTypeChange(index) {
    setFilterParams({
      contentTypes: filterParams.contentTypes.map((contentType, currIndex) => {
        return currIndex === index
          ? { ...contentType, checked: !contentType.checked }
          : contentType;
      }),
      statusBoxes: filterParams.statusBoxes,
    });
    //console.log(filterParams)
  }
  function handleStatusChange(index) {
    setFilterParams({
      contentTypes: filterParams.contentTypes,
      statusBoxes: filterParams.statusBoxes.map((filterBox, currIndex) => {
        return currIndex === index
          ? { ...filterBox, checked: !filterBox.checked }
          : filterBox;
      }),
    });
    //console.log(filterParams)
    //const { value, checked } = e.target;
    //console.log(`${value} is ${checked}`);
    /*if (checked) {
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
    // console.log(filterParams);
  }
  return (
    <>
      <FilterBoxes>
        <p>Content Types: </p>
        {filterParams.contentTypes.map((contentType, index) => (
          <TextualCheckbox
            key={contentType.checkName}
            {...contentType}
            checkHandler={() => handleContentTypeChange(index)}
          />
        ))}
      </FilterBoxes>
      <FilterBoxes>
        <p>Status: </p>
        {filterParams.statusBoxes.map((filterBox, index) => (
          <TextualCheckbox
            key={filterBox.checkName}
            {...filterBox}
            checkHandler={() => handleStatusChange(index)}
          />
        ))}
      </FilterBoxes>
      {/* <h3>Content types:</h3>
      {filterParams.contentTypes.map(param => <p>{param}</p>)} */}
      {/* <h3>Statuses:</h3>
      {filterParams.statusBoxes.map(param => {
        return (
          <>
          <p>{param.checkName}</p>
          <p>{param.text}</p>
          <p>{param.selectedColor}</p>
          <p>{param.checked ? "Checked" : "Not checked"}</p>
          </>
        )
      })} */}
    </>
  );
}

export default FilterSettings;
