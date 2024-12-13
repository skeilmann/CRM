export function searchClients(clientsData, value) {
    return clientsData.filter(client => {
        return client.fullName.toLowerCase().includes(value.toLowerCase());
    });
}

const searchInput = document.getElementById('searchInput');
const clientTableBody = document.getElementById('clientTableBody');

// Create filtration UI
function filterArr() {
    let filteredArr = [...clientsData];

    // Array of filter criteria
    const filterCriteria = [
        { id: 'search-name', property: 'fullName' },
        { id: 'search-course', property: 'faculty' },
        { id: 'search-birth', property: 'birthday' },
        { id: 'search-start', property: 'studyStart' }
    ];

    filterCriteria.forEach(criteria => {
        const value = document.getElementById(criteria.id).value;
        if (value !== '') {
            filteredArr = filter(filteredArr, criteria.property, value);
        }
    });
    return filteredArr
}

document.querySelector('.form-filtr').addEventListener('submit', function (event) {
    event.preventDefault();
    renderStudentsTable(filterArr());
});

document.querySelector('.btn-clear').addEventListener('click', function () {
    let formFiltr = document.querySelector('.form-filtr');
    formFiltr.reset();
    renderStudentsTable(studentsList);
});

document.querySelector('.form-filtr').addEventListener('input', function (event) {
    const inputId = event.target.id;
    renderStudentsTable(filterArr());
});