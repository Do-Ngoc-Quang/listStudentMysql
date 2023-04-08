lst = [];
curItem = null;
$(function () {
    getStudents();
});

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
                                    <button class="btn-sm btn-info">Edit</button>
                                    <button class="btn-sm btn-danger">Delete</button>
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
