module.exports = photobook

function photobook(app, db, multer, RandomString, async, sleep) {

    const storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './photo')
        },
        filename: (req, file, cb)=>{
            cb(null, RandomString.generate(30)+'.'+file.mimetype.split('/')[1])
        }
    })
    const upload = multer({ storage: storage})


    app.post('/photobook/make', (req, res)=>{
        var body = req.body;
        console.log(req.file)
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

        db.sql.query('INSERT INTO photobook (name, photo, summary, since, booktoken, count, usertoken) VALUES (?,?,?,?,?,?,?)', [body.name, "https://www.sgu.ac.kr/_res/sgu_mobile/img/common/prepare.jpg", body.summary, date, RandomString.generate(10), 0, body.usertoken], (err)=>{
            if(err) throw err
            else {
                res.send(200, {success:true, message:"사진첩을 새로 생성했습니다."})
            }
        })
    })

    app.post('/photobook/list', (req, res)=>{
        var body = req.body
        db.sql.query("SELECT * FROM photobook WHERE usertoken = ?", [body.usertoken], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(200, data)
            }
            else{
                res.send(200, [])
            }
        })
    })

    app.post('/photobook/list/all', (req, res)=>{
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
        db.sql.query('SELECT * FROM photobook WHERE booktoken = ?', [body.booktoken], (err, datas)=>{
            if(err) throw err
            else if(datas[0]){
                db.sql.query('INSERT INTO photo (booktoken, summary, photo, usertoken) VALUES (?,?,?,?)', [body.booktoken, body.summary, "http://soylatte.kr:5000/"+file.path, datas[0].usertoken], (err)=>{
                    if(err) throw err
                    else {
                        db.sql.query('SELECT * FROM photobook WHERE booktoken = ?', [body.booktoken], (err, data)=>{
                            console.log(data[0].count)
                            if(err) throw err;
                            else if(data[0]){
                                var count = data[0].count+1
                                console.log(count)
                                if(data[0].count == 0){
                                    db.sql.query('UPDATE photobook SET photo = ?  WHERE booktoken = ?', ["http://soylatte.kr:5000/"+file.path, body.booktoken], (err)=>{
                                        if(err) throw err
                                    })
                                }
                                db.sql.query('UPDATE photobook SET count = ? WHERE booktoken = ?', [count, body.booktoken], (err)=>{
                                    if(err) throw err
                                    else{
                                        res.send(200, {success:true, message:"사진을 성공적으로 등록했습니다."})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    })
    app.post('/photobook/photo/list', (req, res)=>{
        var body = req.body
        db.sql.query('SELECT * FROM photo WHERE booktoken = ?', [body.booktoken], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                var array = new Array()
                for (var i=0; i<data.length; i++){
                    array.push(data[i].photo)
                }
                res.send(200, array)
            }
            else{
                res.send(200, [])
            }
        })
    })

    app.post('/photobook/photo/show', (req, res)=>{
        var body = req.body
        db.sql.query('SELECT * FROM photo WHERE photo = ?', [body.url], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(data[0])
            }
            else{
                res.send(401, {success:false, message:"이미지를 찾을수 없습니다."})
            }
        })
    })

    app.post('/photobook/photo/all', (req, res)=> {
        var body = req.body
        var array = new Array()
        db.sql.query('SELECT * FROM photo WHERE usertoken = ?', [body.usertoken], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                for(var i=0; i<data.length; i++){
                    array.push(data[i].photo)
                }
                res.send(200, array)
            }
            else{
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