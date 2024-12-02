

let fromDatabase = async function () {
    const response = await fetch(`http://localhost:3000/api/students`);
    const studentsElements = await response.json();
    studentsElements.forEach(student => {
        student.fullName = student.name + ' ' + student.surname + ' ' + student.lastname;
        studentsList.push(student);
    });

    renderStudentsTable(studentsList);
};

let addToDatabase = async function (studentObj) {
    const newStudent = createNewStudent();
    await fetch(`http://localhost:3000/api/students`, {
        method: 'POST',
        body: JSON.stringify(newStudent),
        headers: {
            'Content-Type': 'aplication/json',
        },
    })
}

const deleteFromDatabase = async function (id) {
    console.log(id);
    await fetch(`http://localhost:3000/api/students/${id}`, {
        method: 'DELETE',
    })
}