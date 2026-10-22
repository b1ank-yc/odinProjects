const totalBooks = document.querySelector('#total');
const readBooks = document.querySelector('#read');
const unreadBooks = document.querySelector('#unread');

const addBook = document.querySelector('#add_book');
const _window = document.querySelector('#popup');


addBook.addEventListener('click', function() {
    _window.showModal();
});


const myLibrary = []; // all of my books are to be stored here

function Book(title, author, pages, genre, state) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.state = state;

}

function addBookToLibrary(title, author, pages, genre, state) {
    const book = new Book(title, author, pages, genre, state);
    book.id = crypto.randomUUID();
    myLibrary.push(book);
    console.log(book);

    // take params, create a book & store it in the array
    // every book is to have its own unique id crypto.randomUUID()
}


addBookToLibrary("Game of Thrones", "George R.R. Martin", 328, "Fantasy", "Read");


console.log(myLibrary);