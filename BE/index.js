const express = require('express');
const cors = require("cors");
const app = express();
let corsOptions = {
  origin: ['http://127.0.0.1:5501', 'http://localhost:5501']
};
app.use(cors(corsOptions));
const port = 3000;

const dssv = require('./DSSV1.json');

app.get('/', (req, res) => {
  res.send('Welecome to EXPRESS backend!!');
});

async function getStudents(page = 1, size = 10)
{
  let start = (page-1)*size;
  sql = `select * from students order by MaSV limit ${start},${size}`;
  let data = [];
  await db.query(sql).then((rows)=>{
    data= rows;
  });
  return data;
}

async function createStudent(student)
{
  let sql = `insert into students(MaSV, TenSV, NgaySinh, DiaChi) values('${student.MaSV}','${student.TenSV}','${student.NgaySinh}','${student.DiaChi}')`;
  let result;
  await db.query(sql).then((res)=>{
    result = res;
  });
  return result;
}

async function updateStudent(student)
{
  let sql = `update students set TenSV = '${student.TenSV}', NgaySinh = '${student.NgaySinh}', DiaChi = '${student.DiaChi}' where MaSV = '${student.MaSV}'`;
  let result;
  await db.query(sql).then((res)=>{
    result = res;
  });
  return result;
}

//GET 
app.get('/students', (req, res) => {
  // res.send(Object.values(dssv));
});

app.get('/students_mysql', async (req, res) => {
  page = req.query.page;
  size = req.query.size;
  if(page !=undefined && size != undefined)
  {
    const lst = await getStudents(page, size);
    res.send(lst);
  }
  else {
    res.send("Not Fond!!");
  }
});

// POST
app.post('/students', async (req, res) => {
  let student = req.body;
  const result = await createStudent(student);
  res.send(result);
});

// PUT
app.put('/students', async (req, res) => {
  let student = req.body;
  const result = await updateStudent(student);
  res.send(result);
});

app.delete('/students/:mssv', (req, res) => {


});

app.listen(port, () => console.log(`App is running at port ${port}`));
