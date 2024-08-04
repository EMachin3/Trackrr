import React from "react";
import styled from "styled-components";

function AddEpisodeForm({ season_index, handleSubmit }) {
  const StyledForm = styled.form`
    border: 2px solid black;
  `;

  return (
    <>
      <StyledForm
        season_index={season_index}
        onSubmit={handleSubmit}
        class="form-example"
      >
        <p>Add Episode</p> {/*target="dummyframe"*/}
        <div class="form-example">
          <label for="title">Title: </label>
          <input type="text" name="title" id="title" required />
        </div>
        <div class="form-example">
          <label for="descr">Description (optional): </label>
          <input type="text" name="descr" id="descr" />
        </div>
        <div class="form-example">
          <label for="picture">Picture (optional): </label>
          <input type="file" name="picture" id="picture" />
        </div>
        <div class="form-example">
          <button type="submit">Submit</button>
        </div>
      </StyledForm>
    </>
  );
}

export default AddEpisodeForm;
