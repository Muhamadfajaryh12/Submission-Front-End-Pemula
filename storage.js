const STORAGE_KEY = 'Bookshelf';
const RENDER_EVENT = 'render-event';
const SAVED_EVENT = 'saved-event';
let books = [];
function generateId() {
  return +new Date();
}
generateBookObject = (id,title,author,year,isComplete) => {
  return{
  id,
  title,
  author,
  year,
  isComplete,
  };
}

isStorageExist = () =>{
  if(typeof (Storage)== null){
    alert('Maaf Browser Kamu Tidak Mendukung Penyimpanan Ini')
    return false;
  }
  return true;
}

saveData = () =>{
  if(isStorageExist()){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY,parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
      for (const book of data) {
          books.push(book);
      }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}


updateDataToStorage = () => {
  if (isStorageExist()) {
    saveData();
  }
}
findBook = (bookId) => {
  for (const book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

findBookIndex = (bookId) => {
  for (const index in books) {
    if (books[index].id === bookId) {
        return index;
    }
}
return -1;
}
document.addEventListener(RENDER_EVENT, () => {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  incompleteBookshelfList.innerHTML = '';

  const completeBookshelfList = document.getElementById('completeBookshelfList');
  completeBookshelfList.innerHTML = '';

  for (const book of books) {
      const bookElement = CreateBook(book);
      
      if (book.isComplete) {
          completeBookshelfList.append(bookElement);
      } else {
        incompleteBookshelfList.append(bookElement);
      }
  }
  booksLength();
});

document.addEventListener(SAVED_EVENT, () => {
  console.log(localStorage.getItem(STORAGE_KEY));
  booksLength();
});
