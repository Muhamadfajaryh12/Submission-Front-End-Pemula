
document.addEventListener('DOMContentLoaded',  () => {
    const checkBox = document.getElementById('inputBookIsComplete');
    checkBox.addEventListener('change', () => {
        CheckBook();
    });

    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit',  (event) => {
      event.preventDefault();
      addBook();
      resetForm ();
    });

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      searchBookByTitle();
      resetSearch();
    });

    if (isStorageExist()) {
      loadDataFromStorage();
    }
});


