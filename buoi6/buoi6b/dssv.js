lst = [];
curItem = null;

function getStudents() {
    fetch("http://localhost:3000/students")
        .then(res => {
            return res.json();
        })
        .then(data => {
            lst = [];
            data.forEach((dssv, i) => {
                dssv.STT = i + 1;
                lst.push(dssv);
            });

            if (lst.length > 0) {
                $("#tbodySV").html("");
                $("#dssvTemplate").tmpl(lst).appendTo("#tbodySV");
            }
            else {
                let str = "<caption>No data fond!</caption>";
                $("#tbodySV").html(str);
            }
        })
        .catch(err => {
            let str = "<caption>Error ...</caption>";
            $("#tbodySV").html(str);
        })

}