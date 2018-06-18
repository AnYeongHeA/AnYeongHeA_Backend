module.exports = auth

function auth(app, db, RandomString){

    app.post('/auth/register', (req, res)=>{
        var body = req.body
        db.sql.query('SELECT * FROM user WHERE schoolName = ? AND schoolNumber = ?', [body.schoolName, body.schoolNumber], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(409, {success:false, message:"Already In Database"})
            }
            else{
                db.sql.query('INSERT INTO user (username, schoolName, schoolNumber, birthday, password, usertoken) VALUES (?,?,?,?,?,?)', [body.username, body.schoolName, body.schoolNumber, body.birthday, body.password, RandomString.generate(10)], (err)=>{
                    if(err){
                        throw err
                    }
                    else{
                        res.send(200, {success:true, message:"Register Success"})
                    }
                })
            }
        })
    })

    app.post('/auth/login', (req, res)=>{
        var body = req.body
        db.sql.query('SELECT * FROM user WHERE schoolName = ? AND schoolNumber = ? AND birthday = ? AND password = ?', [body.schoolName, body.schoolNumber, body.birthday, body.password], (err, data)=>{
            if(err) throw err
            else if(data[0]){
                res.send(200, data[0])
            }
            else{
                res.send(401, {success:false, message:"존재하지 않는 유저입니다."})
            }
        })
    })

}