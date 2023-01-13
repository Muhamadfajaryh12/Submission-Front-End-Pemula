CheckBook = () =>{
    const getSpan           = document.querySelector('span');
    const isCompleteBook    = document.getElementById('inputBookIsComplete').checked; 
    if(isCompleteBook) {
      getSpan.innerText=" Sudah Selesai Dibaca";
    }
    else{ 
       getSpan.innerText=" Belum Dibaca";
    }
}
addBook = () =>{
  const title           = document.getElementById('inputBookTitle').value;
  const author          = document.getElementById('inputBookAuthor').value;
  const year            = document.getElementById('inputBookYear').value;
  const isComplete      = document.getElementById('inputBookIsComplete').checked; 
  const generateBookId  = generateId();
  const bookObject      = generateBookObject(generateBookId,title, author, year, isComplete);
  books.push(bookObject);

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Buku Berhasil Disimpan',
    showConfirmButton: false,
    timer: 5000
  })
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
CreateBook = (bookObject) =>{
  const {id, title, author, year, isComplete} = bookObject;
  const textTitleBook = document.createElement('h3');
  textTitleBook.innerText   = title
  const textAuthorBook = document.createElement('p');
  textAuthorBook.innerText  = author
  const textYearBook   = document.createElement('p');
  textYearBook.innerText    = year

  const action = document.createElement('div');
  action.classList.add('action');
  
  if (isComplete) {
    const iconUncompleted = document.createElement('i');
    iconUncompleted.classList.add('fa', 'fa-times');
    const Uncompleted  = document.createElement('button');
    Uncompleted.classList.add('Uncompleted-button');
    Uncompleted.append(iconUncompleted);
    Uncompleted.addEventListener('click',() =>{
      addBookToUnCompleted(id);
    })
    const iconDelete = document.createElement('i');
    iconDelete.classList.add('fa', 'fa-trash-o')
    const deletebtn = document.createElement('button');
    deletebtn.classList.add('delete-button');
    deletebtn.append(iconDelete)
    deletebtn.addEventListener('click',()=>{
      deleteBook(id);
    })
    const iconEdit = document.createElement('i');
    iconEdit.classList.add('fa', 'fa-pencil')
    const editBtn= document.createElement('button');
    editBtn.classList.add('edit-button');
    editBtn.append(iconEdit)
    editBtn.addEventListener('click',()=>{
      editBook(id);
    })
    action.append(Uncompleted, deletebtn,editBtn);
  } else {
    const icon       = document.createElement('i');
    icon.classList.add('fa','fa-check-square');
    const completed  = document.createElement('button');
    completed.classList.add('completed-button');
    completed.append(icon);
    completed.addEventListener('click',() =>{
      addBookToOnCompleted(id);
    })
    const iconDelete = document.createElement('i');
    iconDelete.classList.add('fa', 'fa-trash-o')
    const deletebtn = document.createElement('button');
    deletebtn.classList.add('delete-button');
    deletebtn.append(iconDelete)
    deletebtn.addEventListener('click',()=>{
      deleteBook(id);
    })
    const iconEdit = document.createElement('i');
    iconEdit.classList.add('fa', 'fa-pencil')
    const editBtn= document.createElement('button');
    editBtn.classList.add('edit-button');
    editBtn.append(iconEdit)
    editBtn.addEventListener('click',()=>{
      editBook(id);
    })
    action.append(completed, deletebtn, editBtn);
  }
  const container = document.createElement('article');
  container.classList.add('book_item');
  container.append(textTitleBook, textAuthorBook, textYearBook,action);
  container.setAttribute('id', `bookList-${id}`)
  return container;
}
  
 
buttonUnCompleted = () =>{
  const Uncompleted  = document.createElement('button');
  Uncompleted.classList.add('uncompleted-button');
  Uncompleted.innerText="adsdasdsad"
  Uncompleted.addEventListener('click',() =>{
    addBookToUnCompleted(bookId);
  })
}
buttonDelete = () =>{
  const deletebtn = document.createElement('button');
  deletebtn.classList.add('delete-button');
  deletebtn.addEventListener('click',()=>{
    deleteBook(bookId);
  })
}
function  addBookToOnCompleted  (bookId) {
  const bookPosition = findBook(bookId);

  if (bookPosition == null) return;
  Swal.fire({
    title: 'Kamu ingin memindahkan buku ini?',
    text :'Menuju rak buku sudah dibaca',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Pindahkan'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Berhasil!',
        'Buku yang kamu pilih telah berhasil dipindahkan kedalam rak sudah dibaca.',
        'success'
      )
  bookPosition.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
})
}
 
function addBookToUnCompleted  (bookId) {
  const bookPosition = findBook(bookId);

  if ( bookPosition == null) return;
  Swal.fire({
    title: 'Kamu ingin memindahkan buku ini?',
    text :'Menuju rak belum dibaca',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Pindahkan'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Berhasil!',
        'Buku yang kamu pilih telah berhasil dipindahkan kedalam rak yang belum dibaca.',
        'success'
      )
  bookPosition.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  }
})
}


deleteBook = (bookId) => {
  Swal.fire({
    title: 'Kamu ingin menghapus buku ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Hapus'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Dihapus!',
        'Buku yang kamu pilih telah berhasil dihapus.',
        'success'
      )
      const bookPosition = findBookIndex(bookId);
    books.splice(bookPosition, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    }
  })
}
searchBookByTitle = () => {
  const keyInput = document.getElementById('searchBookTitle').value.toLowerCase();
  const item = document.querySelectorAll('article');
  for (i of item) {
    const title = i.firstElementChild.textContent.toLowerCase();
    if (title.includes(keyInput)) {
      i.style.display = 'block';
    } else if (keyInput === '') {
      i.style.display = '';
    } else {
      i.style.display = 'none';
    }
  }
  }
  
  booksLength = () => {
    const LengthBook = document.getElementById('length_books');
    LengthBook.innerText = books.length;
  }

  editBook = (bookId) => {
    const modal = document.querySelector(".modal");
    modal.classList.toggle('hide');
    const bookTarget = findBook(bookId);
    const editBookTitle = document.getElementById("inputBookUpdate");
    editBookTitle.value = bookTarget.title;
    const editBookAuthor = document.getElementById("inputAuthorUpdate");
    editBookAuthor.value = bookTarget.author;
    const editYear = document.getElementById("inputYearUpdate");
    editYear.value = bookTarget.year;
    const editBookCompleted = document.getElementById('hidden-check');
    editBookCompleted.checked = bookTarget.isComplete;
    const editBtn = document.getElementById("updateBtn");
    editBtn.addEventListener("click", (event) => {
      updateEditBook(
        editBookTitle.value,
        editBookAuthor.value,
        editYear.value,
        editBookCompleted.checked,
        bookId
      );
      const modal = document.querySelector(".modal");
      modal.classList.add('hide');
      event.preventDefault();
    });
    
  }
    updateEditBook = (title, author, year, isComplete, id) => {
    const StorageBook = JSON.parse(localStorage[STORAGE_KEY]);
    const bookIndex = findBookIndex(id);
    console.log(StorageBook);
    console.log(bookIndex);
    StorageBook[bookIndex] = {
      id: id,
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };
    const parsed = JSON.stringify(StorageBook);
    localStorage.setItem(STORAGE_KEY, parsed);
    location.reload(true);
  }
  resetSearch =  () =>{
    const resetSearch = document.getElementById('searchBookTitle');
    resetSearch.value='';
  }
  resetForm = () =>{
    const resetTitle = document.getElementById('inputBookTitle');
    resetTitle.value = '';
    const resetAuthor = document.getElementById('inputBookAuthor');
    resetAuthor.value ='';
    const resetYear   = document.getElementById('inputBookYear');
    resetYear.value='';
    const resetCheck  = document.getElementById('inputBookIsComplete');
    resetCheck.checked='';
  }