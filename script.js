document.getElementById('searchBtn').addEventListener('click', async function () {
    const searchTerm = document.getElementById('searchInput').value;
    if(searchTerm!==undefined){
        let url = `http://127.0.0.1:3000/search/${searchTerm}`;
        const response  = await fetch(url);
        const data  = await response.json();
        renderResults(data)
    }
});

let dummyData = [];
const resultsPerPage = 24;
let currentPage = 1;

function renderResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    //dummyData = doSearch(searchTerm);
    console.log(data);
    const paginatedData = paginate(data, currentPage, resultsPerPage);

    paginatedData.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-md-4 mb-4';
        productElement.innerHTML = `
            <div class="card">
                <img src="${product.make}" class="card-img-top product-img" alt="${product.make}">
                <div class="card-body">
                    <h5 class="card-title">Make: ${product.make}</h5>
                    <p class="card-text">Model: ${product.model}</p>
                    <p class="card-text">Type: ${product.type}</p>
                </div>
            </div>
        `;
        resultsContainer.appendChild(productElement);
    });

    renderPagination(data.length);
}

function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
}

function renderPagination(totalItems) {
    const pageCount = Math.ceil(totalItems / resultsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', function () {
            currentPage = i;
            renderResults(document.getElementById('searchInput').value);
        });
        paginationContainer.appendChild(pageItem);
    }
}

async function doSearch(searchTerm) {
    // Default options are marked with *
    let url = "http://127.0.0.1:3000/search/nokia";
    const response  = await fetch(url);
    const data  = await response.json();
    //renderResults(searchTerm,data)
    return  data; 


}


// Initialize with empty search term
//renderResults([{}]);
