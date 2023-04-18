const { query } = require('./db.js');

const express = require('express');
const fs = require('fs');
const cors = require("cors");
const app = express();
let corsOptions = {
  origin: ['http://127.0.0.1:5501', 'http://localhost:5501']
};
app.use(cors(corsOptions));
const port = 3000;

// const dssv = require('./DSSV.json');

const bodyParser = require('body-parser');
const { start } = require('repl');
var urlParser = bodyParser.urlencoded({ extended: false });


app.get('/', (req, res) => {
  res.send('Welecome to EXPRESS backend!!');
});


// functions
async function getStudentsMysql(page = 1, size = 10) {
  let start = (page - 1) * size;
  let sql = `SELECT * FROM students ORDER BY MaSV LIMIT ${start},${size}`;
  let data = [];
  await query(sql).then((rows) => {
    data = rows;
  });
  sql1 = `SELECT COUNT(*) AS 'TotalRecord' FROM students`;
  let totRecord = 0;
  await query(sql1).then((rows) => {
    totRecord = rows[0].TotalRecord;
  });
  return {
    data: data,
    TotalRecord: totRecord
  };
}


//GET 
app.get('/students', (req, res) => {
  res.send(Object.values(dssv));
});

// GET Json
// app.get('/students/:mssv', (req, res) => {
//   console.log(req.params.mssv);
//   let i = 0;
//   for (i = 0; i < dssv.length; i++) {
//     if (dssv[i].codeStudent == req.params.mssv) {
//       break;
//     }
//   }
//   if (i < dssv.length) {
//     res.send(dssv[i]);
//   }
//   else {
//     res.send("Not Fond!!");
//   }
// });




// GET mySql
app.get('/students_mysql', async (req, res) => {
  page = req.query.page;
  size = req.query.size;
  if (page != undefined && size != undefined) {
    const ret = await getStudentsMysql(page, size);
    res.send(ret);
  } else {
    res.send("Not Fond!!");
  }
});

// //POST Add new student
// app.post("/students", urlParser, (req, res) => {
//   var sv = req.body;
//   var result = dssv.find(item => item.MaSV === sv.MaSV);
//   console.log(result);
//   if (result != null || result != undefined) {
//     var obj = {
//       success: false, msg: "Mã SV bị trùng!"
//     };
//     res.send(obj);
//   }
//   else {
//     dssv.push(sv);
//     fs.writeFile('DSSV.json', JSON.stringify(dssv), err => {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         console.log("OK");
//       }
//     });

//     var obj = {
//       success: true, msg: "Add new student success!"
//     };
//     res.send(obj);
//   }

// });


// app.put('/students/:mssv', urlParser, (req, res) => {
//   const mssv = req.params.mssv; // get the mssv from the URL parameter
//   const updatedStudent = req.body; // get the updated student data from the request body

//   // Find the index of the student with the specified mssv value
//   const index = dssv.findIndex(student => student.MaSV === mssv);
//   console.log(index);
//   if (index === -1) {
//     // If the student is not found, send a 404 response
//     res.status(404).send('Student not found');
//   } else {
//     // Update the properties of the student object at the specified index
//     dssv[index].HoTen = updatedStudent.HoTen;
//     dssv[index].Lop = updatedStudent.Lop;
//     dssv[index].GioiTinh = updatedStudent.GioiTinh;
//     dssv[index].NgaySinh = updatedStudent.NgaySinh;

//     // Write the updated data to the JSON file
//     fs.writeFile('DSSV.json', JSON.stringify(dssv), err => {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Server error');
//       } else {
//         res.send('Student updated successfully');
//       }
//     });
//   }
// });



// app.delete("/students", urlParser, (req, res) => {
//   var sv = req.body;
//   var i = dssv.findIndex(item => item.MaSV === sv.MaSV);
//   console.log(i);
//   if (i != null || i != undefined) {
//     dssv.splice(i, 1);
//     fs.writeFile('DSSV.json', JSON.stringify(dssv), err => {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         console.log("OK");
//       }
//       var obj = {
//         success: true, msg: "Xoá thành công!"
//       };
//       res.send(obj);
//     });
//   }


// });


app.listen(port, () => console.log(`App is running at port ${port}`));