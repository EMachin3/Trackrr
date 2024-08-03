import React from "react";

function LogContentForm({ contentType, contentTitle, contentDescription }) {
    //TODO: add props for pre-populated fields from fetch in parent
    // const [selectedContentType, setSelectedContentType] = useState("tv_show");
    return (
        <form action="/api/logged_content" method="post" class="form-example">
            {" "}
            {/*target="dummyframe"*/}
            <div class="form-example">
                <label>Content type: {contentType}</label>
            </div>
            <div class="form-example">
                <label>Title: {contentTitle}</label>
            </div>
            <div class="form-example">
                <label>Description: {contentDescription}</label>
            </div>
            <div class="form-example">
                <label for="status">Status: </label>
                <select
                    id="status"
                    name="status"
                    // onChange={(e) => setSelectedContentType(e.target.value)}
                    required
                >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="want_to_consume">Want to Consume</option>
                    <option value="on_hold">On Hold</option>
                    <option value="dropped">Dropped</option>
                </select>
            </div>
            <div class="form-example">
                <label for="rating">Rating: </label>
                <input type="number" name="rating" id="rating" min="0" max="10" step="0.1" />
            </div>
            <div class="form-example">
                <label for="title">Review: </label> {/* TODO make this input the thing where you can drag and expand the box */}
                <input type="text" name="user_review" id="user_review" />
            </div>
            {/* TODO: figure out some logical way to log episodes*/}
            {contentType === "video_game" && (
                <div class="form-example">
                    <label for="playtime">Playtime (hours): </label>
                    <input type="number" name="playtime" id="playtime" min="0" />
                </div>
            )}
            <div class="form-example">
                <input type="submit" value="Log Content" />
            </div>
        </form>
    );
}

export default LogContentForm;
