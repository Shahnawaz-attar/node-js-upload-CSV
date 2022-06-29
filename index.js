const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')
const uploadcsv = require('./uploadcsv')
 
 
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
 

 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
//! Routes start
 
//route for Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
        
});
 
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{

    // upload to db
    var uploadcsvData = new uploadcsv({
        filename: req.file.filename
        
    });
    uploadcsvData.save((err, data) => {
        if (err) {
            console.log(err);
            
        } else {
            console.log(data);
            console.log('CSV file data has been uploaded in mysql database ');
        }
    }   );
 
});
 

//create connection
const PORT = process.env.PORT || 3600
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))