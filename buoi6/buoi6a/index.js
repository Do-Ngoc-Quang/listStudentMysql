const express = require('express');
const cors = require("cors");
const app = express();
let corsOptions = {
    origin:['http://127.0.0.1:5500','http://localhost:5500']
};
app.use(cors(corsOptions));
const port = 3000;

const dssv = require('./DSSV.json');

app.get('/',(req, res)=>{
    res.send('Welecome to EXPRESS backend!!');
});

//GET 
app.get('/students',(req, res)=>{
    res.send(Object.values(dssv));
});
app.get('/students/:maSV',(req, res)=>{
    console.log(req.params.maSV);
    let i = 0;
    for(i =0; i < dssv.length; i++){
        if(dssv[i].maSV == req.params.maSV){
            break;
        }
    }
    if(i < dssv.length){
        res.send(dssv[i]);
    }
    else{
        res.send("Not Fond!!");
    }
});

// POST
app.post('/students',(req, res)=>{
    res.send('POST students!!');
});
app.put('/students',(req, res)=>{
    res.send('PUT students!!');
});
app.delete('/students',(req, res)=>{
    res.send('DELETE students!!');
});

app.listen(port,()=>console.log(`App is running at port ${port}`));