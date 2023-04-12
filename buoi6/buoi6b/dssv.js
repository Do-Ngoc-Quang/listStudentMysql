lst = [];
curItem = null;

$(function () {
    getStudents();
});
// $('#add-student-button').on('click', function () {
//     addStudent();
// });, addStudentToFile(newStudent)



function getStudents() {
    // fetch("http://localhost:3000/students")
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         lst = [];
    //         data.forEach((dssv, i) => {
    //             dssv.STT = i + 1;
    //             lst.push(dssv);
    //         });

    //         if (lst.length > 0) {
    //             $("#tbodySV").html("");
    //             $("#dssvTemplate").tmpl(lst).appendTo("#tbodySV");
    //         }
    //         else {
    //             let str = "<caption>No data fond!</caption>";
    //             $("#tbodySV").html(str);
    //         }
    //     })
    //     .catch(err => {
    //         let str = "<caption>Error ...</caption>";
    //         $("#tbodySV").html(str);
    //     });

    let students = [];
    fetch("http://localhost:3000/students")
        .then(res => res.json())
        .then(data => {
            lst = data;
            if (lst.length > 0) {
                let tbody = $("#tbodySV");
                tbody.empty();
                lst.forEach((dssv, i) => {
                    let row = $("<tr></tr>");
                    row.append($(`<td>${i + 1}</td>`));
                    row.append($(`<td>${dssv.codeStudent}</td>`));
                    row.append($(`<td>${dssv.name}</td>`));
                    row.append($(`<td>${dssv.class}</td>`));
                    row.append($(`<td>${dssv.gender}</td>`));
                    row.append($(`<td>${dssv.birthday}</td>`));
                    row.append($(`<td>
                                    <button class="btn-sm btn-info" onclick="openModal(${dssv.codeStudent})">Edit</button>
                                    <button class="btn-sm btn-danger" onclick="deleteStudent(${dssv.codeStudent})">Delete</button>
                                </td>`));
                    tbody.append(row);
                });
            } else {
                $("#tbodySV").html("<caption>No data found!</caption>");
            }
        })
        .catch(err => {
            $("#tbodySV").html("<caption>Error fetching data!</caption>");
            console.error(err);
        });
}

function openModal(mssv) {
  var currID = document.querySelector("#currentID");
  currID.value = "ID: " + mssv;
  console.log(mssv);

  // var code = document.querySelector('#txtCode');
  // code.value = mssv;
  // code.ariaDisabled;
  // const name = document.querySelector('#txtName');
  // name.value = "Test";
  // const studentClass = document.querySelector('#txtClass').value;
  // studentClass.value = "Test";
  // const gender = document.querySelector('input[name="gender"]:checked').value;
  // gender.value = "Test";
  // const birthday = document.querySelector('#date').value;
  // birthday.value = "Test";

  // console.log(code.value);
  // console.log(name.value);
  // console.log(studentClass);
  // console.log(gender);
  // console.log(birthday);

  fetch('http://localhost:3000/students')
  .then(response => response.json())
  .then(data => {
    const student = data.find(data => student.codeStudent === mssv);
      if (student) {
        // Nếu tìm thấy sinh viên, thực hiện các hành động tiếp theo
        console.log(student); // In thông tin sinh viên ra console
        // Thực hiện các hành động tiếp theo với đối tượng sinh viên này
      }

    console.log(data)
  })


  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


}

function editStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    console.log(id);
    fetch('http://localhost:3000/students/', {
    method: 'delete'
    })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

  }
}

function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
      console.log(id);
      fetch('http://localhost:3000/students/', {
      method: 'delete'
      })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    }
  }
  
  // function loadStudentList() {
  //   const studentList = document.getElementById("tbodySV");
  //   studentList.innerHTML = "";
  
  //   fetch("http://localhost:3000/students")
  //     .then(response => response.json())
  //     .then(students => {
  //       students.forEach(student => {
  //         const tr = document.createElement("tr");
  //         tr.innerHTML = `
  //           <td>${student.codeStudent}</td>
  //           <td>${student.name}</td>
  //           <td>${student.class}</td>
  //           <td>${student.gender}</td>
  //           <td>${student.birthday}</td>
  //           <td>
  //           <button class="btn-sm btn-info" onclick="editStudent(${student.codeStudent})">Edit</button>
  //           <button class="btn-sm btn-danger" onclick="deleteStudent(${student.codeStudent})">Delete</button>
  //           </td>
  //         `;
  //         studentList.appendChild(tr);
  //       });
  //     })
  //     .catch(error => console.error(error));
  // }
  
  