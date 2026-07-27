let students = [];
const studentForm = document.querySelector(".student-form");
const tableBody = document.getElementById("student-table-body");

function renderStudents() {
    tableBody.innerHTML = "";

    students.forEach(function (student) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${student.id}</td> 
        <td>${student.name}</td> 
        <td>${student.department}</td> 
        <td>${student.semester}</td> 
        <td>${student.cgpa}</td> 
        <td>Active</td> 
        <td><button class="delete-btn" data-id="${student.id}">Delete</button></td> 
        `
        tableBody.appendChild(row);
    });

}

tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const studentId = Number(event.target.dataset.id);
        students = students.filter(function (student) {
            return student.id !== studentId;
        })
        renderStudents();
}


});


studentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("student-id").value;
    const name = document.getElementById("student-name").value;
    const department = document.getElementById("department").value;
    const semester = document.getElementById("semester").value;
    const cgpa = document.getElementById("cgpa").value;


    const student = {
        id: Number(id),
        name: name,
        department: department,
        semester: Number(semester),
        cgpa: Number(cgpa)
    };

    students.push(student);
    updateStatistics();
    renderStudents();
    studentForm.reset();
}
)


function updateStatistics(){
    let totalCgpa=0;
    for(const student of students)
    {
         totalCgpa=totalCgpa+student.cgpa;
    }
    
    const averageCgpaValue=students.length===0?0:totalCgpa/students.length;

    const totalStudents=document.getElementById("stat-card1");
    totalStudents.textContent=students.length;

    const averageCgpa=document.getElementById("stat-card2");
    averageCgpa.textContent=averageCgpaValue.toFixed(2);

    let highestCgpa=0;
    for(const student of students)
    {   
        if(student.cgpa>highestCgpa)
            highestCgpa=student.cgpa;
    }
    
    const highcgpa=document.getElementById("stat-card3");
    highcgpa.textContent=highestCgpa.toFixed(2);


    let departmentNum=new Set();
    for(const student of students){
        departmentNum=departmentNum.add(student.department);
    }

    const depart=document.getElementById("stat-card4");
    depart.textContent=departmentNum.size;

}