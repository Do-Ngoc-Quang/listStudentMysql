lst = [];
curItem = null;

// const newStudent = {
//     codeStudent: "123",
//     name: "Thanh Triều",
//     class: "17CSI01",
//     gender: "Nam",
//     birthday: "01/01/2222"
// };

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
                                    <button class="btn-sm btn-info" onclick="editStudent(${dssv.codeStudent})">Edit</button>
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



// function addStudentToFile(newStudent) {
//     // Retrieve existing list from local file
//     let existingList = fs.readFileSync('DSSV1.json', 'utf8');

//     // Parse JSON data into JavaScript object
//     let studentList = JSON.parse(existingList);

    
//     // Push new student object into existing list
//     studentList.push(newStudent);

//     // Convert updated list back to JSON string
//     let updatedList = JSON.stringify(studentList);

//     // Store updated JSON string in local file
//     fs.writeFileSync('DSSV1.json', updatedList, 'utf8');
// }

function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
      $.ajax({
        url: "http://localhost:3000/students/" + id,
        type: "DELETE",
        success: function(result) {
          alert("Student deleted successfully!");
          loadStudentList();
        },
        error: function(xhr, status, error) {
          console.log(xhr);
          alert("Error deleting student: " + error);
        }
      });
    }
  }
  
  