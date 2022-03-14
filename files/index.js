noteArr = [];
addNote();
// Function to add a note and store it in the localStorage 
let addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', () => {

    console.log('clicked');

    let input = document.getElementById('input');
    let title = document.getElementById('title');
    let notes = localStorage.getItem('notes');


    if (notes == null) {
        noteArr = [];
    }

    else {
        noteArr = JSON.parse(notes);
    }

    let mainObj = {
        inputs: input.value,
        titles: title.value
    }

    // Checkes if input have any a value or not and add a note

    if (input.value != ('') && title.value != ('')) {
        noteArr.push(mainObj);
        localStorage.setItem('notes', JSON.stringify(noteArr));
        title.value = ('');
        input.value = ('');
        addNote();
    }
    else {
        input.placeholder = ('You Have To Type Something');
        title.placeholder = ('You Have To Add A Title');
    }

})

// Function for adding a Note in the cardBox

function addNote() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        noteArr = [];
    }

    else {
        noteArr = JSON.parse(notes);
    }

    let elem = ('');

    noteArr.forEach((element, index) => {

        elem += `
            <div class="cards" cards>
            <h2>${element.titles}</h2>
            <p>${element.inputs}</p>
            <button class="del-btn" id="${index}" onclick="delNote(this.id)">Delete Note</button>
            </div>
            
            `

    });


    let cardBox = document.getElementById('cards-container');
    if (noteArr.length != 0) {
        cardBox.innerHTML = (elem);
    }
    else {
        cardBox.innerHTML = (`Nothing To Show! "Add A Note"`);
    }

}


//Function for Deleting a note 

function delNote(index) {
    noteArr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteArr));
    addNote();

};

//Function for searchBar to find a note 

let searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', () => {
    let searchVal = (searchBar.value);
    let cards = document.getElementsByClassName('cards');

    Array.from(cards).forEach((e) => {

        let cardsTitle = e.getElementsByTagName('h2')[0].innerText;
        let cardsTxt = e.getElementsByTagName('p')[0].innerText;

        if (cardsTxt.includes(searchVal) || cardsTitle.includes(searchVal)) {
            e.style.display = ('block');
        }
        else {
            e.style.display = ('none');
        }

    });

});

