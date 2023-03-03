const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const spans = document.querySelectorAll('body > table > tbody > tr:nth-child(odd) :first-child span');

let filteredSpans = [];

// Función para filtrar los spans que coinciden con la búsqueda
function filterSpans() {
  filteredSpans = [];
  const searchText = searchBar.value.toLowerCase();
  for (let i = 0; i < spans.length; i++) {
    const spanText = spans[i].textContent.toLowerCase();
    if (spanText.includes(searchText)) {
      filteredSpans.push(spans[i]);
    }
  }
}

// Función para mostrar las sugerencias de búsqueda
function showResults() {
  searchResults.innerHTML = '';
  for (let i = 0; i < filteredSpans.length; i++) {
    const li = document.createElement('li');
    li.textContent = filteredSpans[i].textContent;
    li.addEventListener('click', () => {
      searchBar.value = li.textContent;
      search();
    });
    searchResults.appendChild(li);
  }
}

// Función para realizar la búsqueda
function search() {
  const searchText = searchBar.value.toLowerCase();
  for (let i = 0; i < filteredSpans.length; i++) {
    const spanText = filteredSpans[i].textContent.toLowerCase();
    if (spanText === searchText) {

      const rect = filteredSpans[i].getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = rect.top + scrollTop - 100;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      closeSearch();
      return;
    } else {
      closeSearch();
    }
  }
  alert('Coincidencia no encontrada');
}

function closeSearch() {
  setTimeout(() => {
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-bar').value = '';
    selectedIndex = -1;
  }, 300);
}


// Evento al hacer clic en el botón de búsqueda
searchButton.addEventListener('click', () => {
  filterSpans();
  showResults();
  search();
});

// Evento al escribir en la barra de búsqueda
searchBar.addEventListener('input', () => {
  filterSpans();
  showResults();
});

// Evento al presionar la tecla "Enter"
searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    filterSpans();
    if (filteredSpans.length > 0) {
      const rect = filteredSpans[0].getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = rect.top + scrollTop - 100;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    } else {
      alert('Coincidencia no encontrada');
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    const active = document.activeElement;
    if (active && active.previousSibling) {
      active.previousSibling.focus();
    } else if (searchResults.childNodes.length > 0) {
      searchResults.lastChild.focus();
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    const active = document.activeElement;
    if (active && active.nextSibling) {
      active.nextSibling.focus();
    } else if (searchResults.childNodes.length > 0) {
      searchResults.firstChild.focus();
    }
  }
});

// Evento al hacer clic fuera de la barra de búsqueda
document.addEventListener('click', (event) => {
  if (!event.target.matches('#search-bar, #search-results li')) {
    searchResults.innerHTML = '';
    searchBar.value = '';
  }
});
let selectedIndex = -1;

// Evento al presionar una tecla en la barra de búsqueda
searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (selectedIndex > 0) {
      selectedIndex--;
      updateSelected();
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (selectedIndex < filteredSpans.length - 1) {
      selectedIndex++;
      updateSelected();
    }
  }
});

// Función para actualizar la sugerencia seleccionada
function updateSelected() {
  for (let i = 0; i < searchResults.children.length; i++) {
    const li = searchResults.children[i];
    if (i === selectedIndex) {
      li.classList.add('selected');
      searchBar.value = li.textContent;
    } else {
      li.classList.remove('selected');
    }
  }
}

// Evento al soltar una tecla en la barra de búsqueda
searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (selectedIndex > -1) {
      searchBar.value = filteredSpans[selectedIndex].textContent;
      search();
    }
  }
});

