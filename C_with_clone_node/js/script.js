'use strict';

const rowTemplate = () => {
    const trTemplate = document.createElement('tr');

    const tdAuthor = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdYear = document.createElement('td');
    tdYear.classList.add('right');

    const imgDelete = document.createElement('img');
    imgDelete.src = 'path/to/delete/icon.png'; // Set path to delete icon
    imgDelete.classList.add('delete');
    const tdDelete = document.createElement('td');
    tdDelete.appendChild(imgDelete);
    tdDelete.classList.add('right');

    trTemplate.appendChild(tdAuthor);
    trTemplate.appendChild(tdTitle);
    trTemplate.appendChild(tdYear);
    trTemplate.appendChild(tdDelete);

    return trTemplate;
};

// Function to save data to localStorage
function saveData(data) {
    localStorage.setItem('tableData', JSON.stringify(data));
}

// Function to get data from localStorage
function loadData() {
    const data = localStorage.getItem('tableData');
    return data ? JSON.parse(data) : [];
}

// Function to add row to the table
function addRowToTable(dataRow) {
    const trNew = rowTemplate().cloneNode(true);
    trNew.querySelector('td:nth-of-type(1)').innerText = dataRow.author;
    trNew.querySelector('td:nth-of-type(2)').innerText = dataRow.title;
    trNew.querySelector('td:nth-of-type(3)').innerText = dataRow.year;

    trNew.querySelector('img').addEventListener('click', function() {
        this.parentElement.parentElement.remove();
        updateLocalStorage();
    });

    document.querySelector('table > tbody').appendChild(trNew);
}

// Load existing data from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const data = loadData();
    data.forEach(addRowToTable);
    document.querySelector('table').classList.add('visible');
});

document.querySelector('#frmCD').addEventListener('submit', function(e) {
    e.preventDefault();

    const author = e.target.txtAuthor.value;
    const title = e.target.txtTitle.value;
    const year = parseInt(e.target.txtYear.value);

    const rowData = { author, title, year };
    addRowToTable(rowData);

    // Update localStorage
    const data = loadData();
    data.push(rowData);
    saveData(data);

    this.reset(); // The form is reset
});

// Update localStorage when a row is deleted
function updateLocalStorage() {
    const rows = document.querySelectorAll('table > tbody > tr');
    const data = Array.from(rows).map(tr => {
        return {
            author: tr.cells[0].innerText,
            title: tr.cells[1].innerText,
            year: parseInt(tr.cells[2].innerText)
        };
    });
    saveData(data);
}