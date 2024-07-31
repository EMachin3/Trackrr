const filterBoxes = {
  contentTypes: [
    {
      checkName: "tv_show",
      text: "TV",
      selectedColor: "red", //TODO put more thought into the color scheme for contentType
      checked: true,
    },
    {
      checkName: "movie",
      text: "Movies",
      selectedColor: "orange",
      // 'defaultChecked': 'true', TODO: test if this is necessary for this and statusTypes
      checked: true,
    },
    {
      checkName: "video_game",
      text: "Games",
      selectedColor: "yellow",
      checked: true,
    },
    {
      checkName: "book",
      text: "Books",
      selectedColor: "green",
      checked: true,
    },
    {
      checkName: "music",
      text: "Music",
      selectedColor: "blue",
      checked: true,
    },
    {
      checkName: "podcast",
      text: "Podcasts",
      selectedColor: "violet",
      checked: true,
    },
  ],
  statusBoxes: [
    {
      checkName: "completed",
      text: "Completed",
      selectedColor: "blue",
      checked: false,
    },
    {
      checkName: "in_progress",
      text: "In Progress",
      selectedColor: "green",
      defaultChecked: "true",
      checked: true,
    },
    {
      checkName: "want_to_consume",
      text: "Want to Consume",
      selectedColor: "purple", //idk which color represents want to watch
      checked: false,
    },
    {
      checkName: "on_hold",
      text: "On Hold",
      selectedColor: "yellow",
      checked: false,
    },
    {
      checkName: "dropped",
      text: "Dropped",
      selectedColor: "red",
      checked: false,
    },
  ],
};

export default filterBoxes;
