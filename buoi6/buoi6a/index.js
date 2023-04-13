const express = require('express');
const cors = require("cors");
const app = express();
let corsOptions = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
};
app.use(cors(corsOptions));
const port = 3000;

const dssv = require('./DSSV1.json');

app.get('/', (req, res) => {
    res.send('Welecome to EXPRESS backend!!');
});

//GET 
app.get('/students', (req, res) => {
    res.send(Object.values(dssv));
});
app.get('/students/:mssv', (req, res) => {
    console.log(req.params.mssv);
    let i = 0;
    for (i = 0; i < dssv.length; i++) {
        if (dssv[i].codeStudent == req.params.mssv) {
            break;
        }
    }
    if (i < dssv.length) {
        res.send(dssv[i]);
    }
    else {
        res.send("Not Fond!!");
    }
});

// POST
app.post('/students', (req, res) => {

    // if (req.method === 'POST' && req.url === '/students') {
    //     let body = '';
    //     req.on('data', chunk => {
    //         body += chunk.toString();
    //     });
    //     req.on('end', () => {
    //         try {
    //             const newStudent = JSON.parse(body);
    //             studentList.push(newStudent);
    //             res.statusCode = 201;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.end(JSON.stringify(newStudent));
    //         } catch (error) {
    //             res.statusCode = 400;
    //             return res.end(`Error: ${error.message}`);
    //         }
    //     });
    // }


});

app.put('/students', (req, res) => {
    res.send('PUT students!!');
});

app.delete('/students/:mssv', (req, res) => {
    const students = require('./DSSV1.json');
    const index = req.params.mssv;
  
    if (index >= 0 && index < students.length) {
      students.splice(index, 1);
  
      // Lưu lại danh sách sinh viên sau khi xóa vào file students.json
      fs.writeFile('./DSSV1.json', JSON.stringify(students), err => {
        if (err) {
          console.error(err);
          res.status(500).send('Lỗi khi xóa sinh viên!');
        } else {
          console.log(`Xóa sinh viên ở chỉ số ${index} thành công!`);
          res.send('Xóa sinh viên thành công!');
        }
      });
    } else {
      res.status(400).send('Chỉ số sinh viên không hợp lệ!');
    }
  });
  
  
  // Start server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

app.listen(port, () => console.log(`App is running at port ${port}`));