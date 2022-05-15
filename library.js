let library = [];

const addBtn = document.querySelector("form > input[type='button'].add");
const title = document.querySelector("form > input:not([type='button']):nth-child(1)");
const author = document.querySelector("form > input:not([type='button']):nth-child(2)");
const pages = document.querySelector("form > input:not([type='button']):nth-child(3)");
const content = document.querySelector(".content");
let readButtons = document.querySelectorAll(".content > .card > input[value='Read']");
let removeButtons = document.querySelectorAll(".content > .card > input[value='Remove']");
// add button functionality
addBtn.addEventListener("click", (e) => {
    if (title.value === "" || author.value === "" || pages.value === "") {
        alert("You must input all information");
        return
    }
    if (Number(pages.value) < 1) {
        alert("Please enter positive numbers");
        return
    }
    let read = readBtn.getAttribute("class") === "read";
    let book = new Book(title.value, author.value, pages.value, read)
    library.push(book);
    
    content.innerHTML = "";
    for (let i = 0; i < library.length; i++) {
        let card = createCard(library[i].title, library[i].author, library[i].pages, library[i].read);
        card.setAttribute("data-index", i);
        content.appendChild(card);
    }
    title.value = "";
    author.value = "";
    pages.value = "";

    readButtons = document.querySelectorAll(".content > .card > input[value='Read']");
    // cards read button functionality
    readButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (btn.getAttribute("class") === "read") {
                btn.setAttribute("class", "");
                let i = btn.getAttribute("data-index");
                library[Number(i)].read = false;
            }
            else {
                btn.setAttribute("class", "read");
                let i = btn.getAttribute("data-index");
                library[Number(i)].read = true;
            }
        });
    });

    removeButtons = document.querySelectorAll(".content > .card > input[value='Remove']");


    // functionality for remove button
    removeButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let i = btn.parentElement.getAttribute("data-index");
            library.splice(i, 1);
            btn.parentElement.parentElement.removeChild(btn.parentElement);
        });
    });

});

// read button functionality
const readBtn = document.querySelector("form > input[type='button']");
readBtn.addEventListener("click", (e) => {
    if (readBtn.getAttribute("class") === "read") {
        readBtn.setAttribute("class", "not-read");
    }
    else {
        readBtn.setAttribute("class", "read");
    }
});



function Book(title, author, pages, read) {
    this.title = title,
    this.author = author, 
    this.pages = pages,
    this.read = read
}
// a function that creates html elements
function createCard(name, author, pages, read) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    if (read === false) {
        card.innerHTML = `<p class=\"title\">\"${name}\"</p><p class=\"author\">${author}</p><p class=\"pages\">${pages} Pages</p><input type=\"button\" value=\"Read"><input type="button" value="Remove">`;
    }
    else {
        card.innerHTML = `<p class=\"title\">\"${name}\"</p><p class=\"author\">${author}</p><p class=\"pages\">${pages} Pages</p><input type=\"button\" value=\"Read" class=\"read\"><input type="button" value="Remove">`
    }
    return card;
}