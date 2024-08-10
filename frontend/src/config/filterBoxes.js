const filterBoxes = {
  defaultSearchParams: {
    status: "in_progress",
    content_type: "tv_show,movie,video_game,book,music,podcast",
  },
  contentTypes: [
    {
      checkName: "tv_show",
      text: "TV",
      selectedColor: "red", //TODO put more thought into the color scheme for contentType
      checked: false,
    },
    {
      checkName: "movie",
      text: "Movies",
      selectedColor: "orange",
      // 'defaultChecked': 'true', TODO: test if this is necessary for this and statusTypes
      checked: false,
    },
    {
      checkName: "video_game",
      text: "Games",
      selectedColor: "yellow",
      checked: false,
    },
    {
      checkName: "book",
      text: "Books",
      selectedColor: "green",
      checked: false,
    },
    {
      checkName: "music",
      text: "Music",
      selectedColor: "blue",
      checked: false,
    },
    {
      checkName: "podcast",
      text: "Podcasts",
      selectedColor: "violet",
      checked: false,
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
      checked: false,
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
