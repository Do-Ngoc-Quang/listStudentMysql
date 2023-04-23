lst = [];
curItem = null;

$(function () {
  getStudentsMysql();
});

let canChangeTotal = 45;

function goToPage(page) {
  const maxPage = Math.ceil(numStudents / pageSize);
  if (page < 1) {
    page = 1;
  } else if (page > maxPage) {
    page = maxPage;
  }
  cPage = page;
  getStudentsMysql();
}

function goNext() {
  cPage++;
  getStudentsMysql();
}

function goPrev() {
  cPage--;
  getStudentsMysql();
}

function formatDate(str){
  const d = new Date(str);
  return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}

function getStudentsMysql() {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/students_mysql",
    data: {
      page: cPage,
      size: 10
    }
  })
    .done(function (res) {
      let data = res.data;
      lst = [];
      data.forEach((dssv, i) => {
        dssv.STT = (cPage - 1) * size + i + 1;
        lst.push(dssv);
      });
      if (lst.length > 0) {
        $("#tbodySV").html("");
        $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
      }
      else {
        str = "<caption>No DATA FOUND</caption>"
        $("#tbodySV").html(str);
      }
      curPage = cPage;
      totPage = parseInt(res.TotalRecord / 10) + 1;
      canChangeTotal = res.TotalRecord;
      // console.log(res.TotalRecord);
      // console.log(canChangeTotal);
    })
    .fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
}
console.log(canChangeTotal);

// Get the pagination element and the numStudents variable
const pagination = document.querySelector('.pagination');
let numStudents = canChangeTotal;

// Define the page size (e.g. 10 students per page)
const pageSize = 10;

// Calculate the initial number of pages
const numPages = parseInt(numStudents / pageSize);
// console.log(numPages);

// Update the pagination HTML with the correct number of page links
let html = '';
html += `<li class="page-item">
            <a class="page-link" href="javascript:void(0)" onclick="goPrev()" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>`;
for (let i = 1; i <= numPages; i++) {
  html += `<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goToPage(${i})">${i}</a></li>`;
}
html += `<li class="page-item">
            <a class="page-link" href="javascript:void(0)" onclick="goNext()" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>`;
pagination.innerHTML = html;

const size = 10; // set the number of records to display per page
let cPage = 1; // initialize the current page to 1

// Update the goToPage() function to take the new number of pages into account


// getStudentsJson
// function getStudentsJson() {
//   fetch("http://localhost:3000/students")
//     .then(res => { return res.json(); })
//     .then(data => {
//       lst = [];
//       let i = 1;
//       data.forEach(sv => {
//         sv.STT = i++;
//         lst.push(sv);
//       });
//       if (lst.length > 0) {
//         $("#tbodySV").html("");
//         $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
//       }
//       else {
//         str = "<caption>No DATA FOUND</caption>"
//         $("#tbodySV").html(str);
//       }
//     })
//     .catch(err => {
//       str = "<caption>ERROR .....</caption>"
//       $("#tbodySV").html(str);
//     })
// }


// getStudentsMysql





// function openModal(mssv, index) {
//   fetch('http://localhost:3000/students')
//     .then(response => response.json())
//     .then(students => {
//       console.log(students); // This will log the array of students to the console

//       // Use forEach() to iterate over each student in the array
//       students.forEach((student, i) => {
//         if (i === index) {
//           console.log(student);
//           document.querySelector("#currentID").value = index;
//           document.querySelector("#txtCodeEdit").value = student.MaSV;
//           document.querySelector("#txtNameEdit").value = student.HoTen;
//           document.querySelector("#txtClassEdit").value = student.Lop;
//           document.querySelector("#dateEdit").value = student.NgaySinh;

//           if (student.GioiTinh === "Nam") {
//             document.querySelector('#male').checked = true;
//           }
//           if (student.GioiTinh === "Nữ") {
//             document.querySelector('#female').checked = true;
//           }

//           // Show the modal
//           $('#modalEdit').modal('show');
//         }
//       });
//     })
//     .catch(error => {
//       console.error();
//       // Handle the error here
//     });

//   // Get the modal
//   var modal = document.getElementById("modalEdit");

//   // Get the <span> element that closes the modal
//   var span = document.getElementsByClassName("close")[0];

//   // When the user clicks the button, open the modal
//   modal.style.display = "block";

//   // When the user clicks on <span> (x), close the modal
//   span.onclick = function () {
//     modal.style.display = "none";
//   }

//   // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   }
// }

function addStudent() {

  gt = $('input[name="gender"]:checked').val();
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/students_mysql",
    data: {
      "MaSV": $("#txtCodeAdd").val(),
      "HoTen": $("#txtNameAdd").val(),
      "Lop": $("#txtClassAdd").val(),
      "GioiTinh": gt,
      "NgaySinh": $("#dateAdd").val(),
    }
  })
    .done(function (res) {
      if (res.success) alert(res.msg);
      else alert(res.msg);
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });

}


// function updateStudent() {
//   var gt = $('input[name="genderEdit"]:checked').val();
//   var data = {
//     "MaSV": $("#txtCodeEdit").val(),
//     "HoTen": $("#txtNameEdit").val(),
//     "Lop": $("#txtClassEdit").val(),
//     "GioiTinh": gt,
//     "NgaySinh": $("#dateEdit").val(),
//   };
//   var studentCode = $("#txtCodeEdit").val();
//   console.log(studentCode);
//   $.ajax({
//     method: "PUT",
//     url: "http://localhost:3000/students/" + studentCode,
//     data: data
//   })
//     .done(function (res) {
//       if (res.success) alert(res.msg);
//       else alert("Update student success");
//     }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });

// }

// function deleteStudent(mssv) {
//   if (confirm("Bạn có chắc chắn muốn xóa không?")) {
//     $.ajax({
//       method: "DELETE",
//       url: "http://localhost:3000/students",
//       data: {
//         "MaSV": mssv,
//       }
//     })
//       .done(function (res) {
//         if (res.success) {
//           alert(res.msg);
//           getStudents();
//         }
//         else alert(res.msg);
//       }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
//   }
// }





