const filterBoxes = {
    'statusBoxes': [
        {
            'checkName': 'completed',
            'text': 'Completed',
            'selectedColor': 'blue',
            'checked': false,
        },
        {
            'checkName': 'in_progress',
            'text': 'In Progress',
            'selectedColor': 'green',
            'defaultChecked': 'true',
            'checked': true,
        },
        {
            'checkName': 'want_to_consume',
            'text': 'Want to Consume',
            'selectedColor': 'purple', //idk which color represents want to watch
            'checked': false,
        },
        {
            'checkName': 'on_hold',
            'text': 'On Hold',
            'selectedColor': 'yellow',
            'checked': false,
        },
        {
            'checkName': 'dropped',
            'text': 'Dropped',
            'selectedColor': 'red',
            'checked': false,
        },
    ]
};

export default filterBoxes;
