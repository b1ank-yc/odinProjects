const totalBooks = document.querySelector('#total');
const readBooks = document.querySelector('#read');
const unreadBooks = document.querySelector('#unread');

const addBook = document.querySelector('#add_book');
const _window = document.querySelector('#popup');

const _window_cancel = document.querySelector('#exit_window');
const _window_confirm = document.querySelector('#confirm_window');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const genre = document.querySelector('#genre');
const pages = document.querySelector('#pages');

const book_container = document.querySelector('.book-container');

const myLibrary = []; // all of my books are to be stored here

function updateInfo() {
    totalBooks.textContent = myLibrary.length;

    let pos = 0;
    let neg = 0;

    myLibrary.forEach(obj => {
        if (obj.state === "Read") {
            pos++;
        } else if (obj.state === "Unread") {
            neg++;
        }
    })

    readBooks.textContent = pos;
    unreadBooks.textContent = neg;
}

function Book(title, author, pages, genre, state) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.state = state;

}

function addBookToLibrary(title, author, pages, genre, state) {
    if (state === "No") {
        state = "Unread";
    } else if (state === "Yes") {
        state = "Read";
    }

    const book = new Book(title, author, pages, genre, state);
    myLibrary.push(book);
}

function renderBooks(array) { 
    book_container.innerHTML = '';
    
    array.forEach(obj => {
        const ids = obj.id = crypto.randomUUID();
        const container = document.createElement('div');
        container.classList.add('example_book');
        container.innerHTML = '';

        const photo = document.createElement('div');
        photo.classList.add('book_photo');
        container.appendChild(photo);
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        const title = document.createElementNS(svgNS, "title");
        title.textContent = "book-open-page-variant";
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute(
        "d",
        "M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z"
        );
        svg.append(title, path);
        svg.classList.add('example_book-svg');
        photo.appendChild(svg);

        const text = document.createElement('div');
        text.classList.add('book_text');
        container.appendChild(text);
        const h2 = document.createElement('h2');
        h2.textContent = obj.title;
        h2.classList.add('book_text-h2');
        text.appendChild(h2);
        const p = document.createElement('p');
        p.textContent = obj.author;
        p.classList.add('book_text-p');
        text.appendChild(p);
        const p2 = document.createElement('p');
        p2.textContent = `${obj.pages} pages · ${obj.genre}`;
        p2.classList.add('book_text-p');
        p2.classList.add('pages');
        text.appendChild(p2);
        const btn = document.createElement('button');
        btn.textContent = obj.state === "Read" ? 'Read' : 'Unread';
        btn.classList.add('book_text-button');
        btn.id = 'status-button';
        if (obj.state === "Read") {
            btn.style.backgroundColor = '#DCE6D8';
        } else {
            btn.style.backgroundColor = '#F0DFD5';
        }
        text.appendChild(btn);
        const span = document.createElement('span');
        span.textContent = obj.state === "Read" ? 'Mark Unread' : 'Mark Read';
        span.classList.add('book_text-span');
        span.id = 'status-text';
        if (obj.state === "Read") {
            span.style.color = '#3B903B';
        } else {
            span.style.color = '#C84C4C';
        }
        text.appendChild(span);

        const dlt_btn = document.createElement('div');
        dlt_btn.classList.add('dlt-btn');
        container.appendChild(dlt_btn);
        const svgNS2 = "http://www.w3.org/2000/svg";
        const svg2 = document.createElementNS(svgNS2, "svg");
        svg2.setAttribute("viewBox", "0 0 24 24");
        const title2 = document.createElementNS(svgNS2, "title");
        title2.textContent = "delete-outline";
        const path2 = document.createElementNS(svgNS2, "path");
        path2.setAttribute(
        "d",
        "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
        );
        svg2.append(title2, path2);
        svg2.classList.add('dlt-btn-svg');
        dlt_btn.appendChild(svg2);

        book_container.appendChild(container);
        updateInfo();

        dlt_btn.addEventListener('click', () => {
            const index = myLibrary.findIndex(book => book.id === ids);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
            book_container.removeChild(container);
            updateInfo();
        });
        span.addEventListener('click', () => {
            if (obj.state === "Read") {
                obj.state = "Unread";
                span.textContent = 'Mark Read';
                btn.textContent = 'Unread';
                btn.style.backgroundColor = '#F0DFD5';
                span.style.color = '#C84C4C';
            } else if (obj.state === "Unread") {
                obj.state = "Read";
                span.textContent = 'Mark Unread';
                btn.textContent = 'Read';
                btn.style.backgroundColor = '#DCE6D8';
                span.style.color = '#3B903B';
            }
            updateInfo();
        });
    });
}

_window_confirm.addEventListener('click', function() {
    const progress = document.querySelector('input[name="radio"]:checked');
    if (title.value && author.value && genre.value && pages.value && progress.value) {
        addBookToLibrary(
            title.value,
            author.value,
            genre.value,
            pages.value,
            progress.value
        );
        
        renderBooks(myLibrary);
        progress.checked = false;
        _window.close();
    } 
});

addBook.addEventListener('click', function() {
    title.value = '';
    author.value = '';
    genre.value = '';
    pages.value = '';
    _window.showModal();
});

_window_cancel.addEventListener('click', function() {
    _window.close();
});

addBookToLibrary("Game of Thrones", "George R.R. Martin", 328, "Fantasy", "Yes");
addBookToLibrary("The Witcher", "Andrzej Sapkowski", 467, "Dark Fantasy", "No");
addBookToLibrary("Solo Leveling", "Chugong", 2789, "Fantasy", "Yes");
renderBooks(myLibrary);