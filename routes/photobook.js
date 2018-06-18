module.exports = photobook

function photobook(app, db, multer, RandomString) {

    const storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './photo')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(30)+'.'+file.mimetype.split('/')[1])
        }
    })
    const upload = multer({ storage: storage})


    app.post('/photobook/make', upload.single('file'), (req, res)=>{
        var body = req.body;
        console.log(req.file)
        db.sql.query('SELECT * FROM photobook WHERE name = ?', [body.name], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(409, {success:false, message:"이미 존재하는 포토북입니다."})
            }
            else {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();

                if(dd<10) {
                    dd='0'+dd
                }

                if(mm<10) {
                    mm='0'+mm
                }

                date = yyyy+"."+mm+"."+dd

                db.sql.query('INSERT INTO photobook (name, photo, summary, since, booktoken) VALUES (?,?,?,?,?)', [body.name, "http://soylatte.kr:3000/"+req.file.path, body.summary, date, RandomString.generate(10)], (err)=>{
                    if(err) throw err
                    else {
                        res.send(200, {success:true, message:"사진첩을 새로 생성했습니다."})
                    }
                })
            }
        })
    })

    app.post('/photobook/list', (req, res)=>{
        db.sql.query("SELECT * FROM photobook", (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(200, data)
            }
            else{
                res.send(200, [])
            }
        })
    })

    app.post('/photobook/photo/add', upload.single('file'), (req, res)=>{
        var body = req.body
        var file = req.file
        db.sql.query('INSERT INTO photo (booktoken, summary, photo) VALUES (?,?,?)', [body.booktoken, body.summary, "http://soylatte.kr:3000/"+file.path], (err)=>{
            if(err) throw err
            else {
                res.send(200, {success:true, message:"사진을 성공적으로 등록했습니다."})
            }
        })
    })

    app.post('/photobook/photo/list', (req, res)=>{
        var body = req.body
        db.sql.query('SELECT * FROM photo WHERE booktoken = ?', [body.booktoken], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(200, data)
            }
            else{
                res.send(200, [])
            }
        })
    })

    app.post('/photobook/photo/all', (req, res)=>{
        var body = req.body
        db.sql.query('SELECT * FROM photo', (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(200, data)
            }
            else {
                res.send(200, [])
            }
        })
    })

    app.post('/photobook/search', (req, res)=>{
        var body = req.body
        db.sql.query('SELECT * FROM photobook WHERE name = ?', [body.name], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(200, data)
            }
            else {
                res.send(200, [])
            }
        })
    })



}