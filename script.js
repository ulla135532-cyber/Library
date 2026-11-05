const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const libraryContainer = document.querySelector("#library");

function displayBooks() {
  libraryContainer.textContent = "";

  for (const book of myLibrary) {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + " pages";

    if (book.read) {
      read.textContent = "Read";
    } else {
      read.textContent = "Not read";
    }

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function () {
        const index = myLibrary.findIndex(function (book) {
            return book.id === card.dataset.id;
        });

        myLibrary.splice(index, 1);
        displayBooks();
    });

    const readButton = document.createElement("button");
    readButton.textContent = "Change read status";
    readButton.type = "button";

    readButton.addEventListener("click", function () {
      book.toggleRead();
      displayBooks();
});

card.appendChild(readButton);
   
    card.appendChild(removeButton);
    libraryContainer.appendChild(card);
  }
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const newBookButton = document.querySelector("#new-book");
const bookForm = document.querySelector("#book-form");

newBookButton.addEventListener("click", function () {
    bookForm.hidden = false;
});    

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  bookForm.reset();
  bookForm.hidden = true;
});