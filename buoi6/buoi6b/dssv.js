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
                                    <button class="btn-sm btn-info"  data-bs-toggle="modal" data-bs-target="#editStudent_${dssv.codeStudent}">Edit</button>
                                    <button class="btn-sm btn-danger">Delete</button>
                                </td>
                    
                                <div class="modal fade" id="editStudent_${dssv.codeStudent}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add Student</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                    <form>
                                        <div class="form-group row mb-3">
                                        <label for="txtCode" class="col-sm-2 col-form-label">Code</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="txtCode" value="" placeholder="Code of Student">
                                        </div>
                                        </div>
                                        <div class="form-group row mb-3">
                                        <label for="txtName" class="col-sm-2 col-form-label">Name</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="txtName" value="" placeholder="Name of Student">
                                        </div>
                                        </div>
                                        <div class="form-group row mb-3">
                                        <label for="txtClass" class="col-sm-2 col-form-label">Class</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="txtClass" value="" placeholder="Class of Student">
                                        </div>
                                        </div>
                                        <div class="form-group row mb-3">
                                        <label for="txtClass" class="col-sm-2 col-form-label">Birthday</label>
                                        <div class="col-sm-10">
                                            <div class="control">
                                            <input type="text" class="form-control datetimepicker" name="date" id="date">
                                            </div>
                                        </div>
                                        </div>

                                        <div class="form-group row">
                                        <label for="txtClass" class="col-sm-2 col-form-label">Gender</label>
                                        <div class="col-sm-10">
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="male" value="Male">
                                            <label class="form-check-label" for="male">Male</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="female" value="Female">
                                            <label class="form-check-label" for="female">Female</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="other" value="Other">
                                            <label class="form-check-label" for="other">Other</label>
                                            </div>
                                        </div>
                                        </div>
                                    </form>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Add Student</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                                `));
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
