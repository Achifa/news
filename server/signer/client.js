const { connectToDB } = require('../db');
let {express} = require('../modules');


function signupReader(fname, lname, uname, h_pwd, email, phone, coverphoto, userId, date, dualRole, isActive) {

    async function uploadData(params) {

        return(
            await connectToDB
            .then((pool) => 
                pool.query(`
                    insert into 
                    "readers"
                    (id, userId, dualRole, fname, lname, uname, email, phone, pwd, date, isActive) 
                    values
                    (DEFAULT, '${userId}', ${dualRole}, '${fname}', '${lname}', '${uname}', '${email}', ${phone}, '${h_pwd}', '${date}', ${isActive})
                `)
                .then((result) => result)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }

    async function uploadPhoto(params) {

        return(      
            await connectToDB
            .then((pool) => 
                pool.query(`insert into coverphoto(id, userId, file) values(DEFAULT, '${userId}','${coverphoto}')`)
                .then((result) => result)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }

    let worker = new Promise(async(resolve, reject) => {
        let response = await uploadData()
        response.rowCount === 1 ? resolve() : reject()
    })
    .then(async() => {
        let response = await uploadPhoto()
        return response.rowCount === 1 ? true : false
    })
    .catch((err) => console.log(err))

    return worker;

}

function signinReader(uname,pwd) {
    //let {uname,pwd} = req.body;
  

    async function getUserId (name){
        
        return(
            await connectToDB
            .then((pool) => 
                
                pool.query(`select "id" from "readers" where "uname" = '${name}'`)
                .then((result) => result.rows.length > 0 ? result.rows[0].id : 0)
                .catch((err) => console.log(err))

            )
            .catch((err) => err)
        )
        
        
    }

    async function getUserDetails(id) {
        return(
            await connectToDB
            .then(async(pool) => {
                let database_return_value = await pool.query(
                    `select "uname", "pwd", "userId" from "readers" where "id" = '${id}'`
                )
                .then(result => result.rows[0])
                .catch(err => console.log(err))

                return database_return_value
            })
        )

    }

    async function AuthenticateUser(userData) {
        if(userData){
   
            const auth = await bcrypt.compare(pwd, userData.pwd);
            if (auth) {
                const token = createToken(userData.user_id);
                return({boolean: true, data: token})
                res.status(200).send({
                    user: token
                });
    
            }else{
                return({boolean: false, data: "Incorrect Password"})
                res.status(400).send({
                    Mssg: "Invalid Password"
                })
            }
        }else{
            return({boolean: false, data: "User Name is not registered"})

            res.status(400).send({
                Mssg: "User Name is not registered"
            })
        }
    }


    return new Promise(async(resolve, reject) => {
        let id = await getUserId(uname);
        return id ? resolve(id) : reject({boolean: false, data: "User Name is not registered"})
    })
    .then(async(id) => await getUserDetails(id))
    .then(async(userData) =>  await AuthenticateUser(userData))
    .catch(err => err)
    

}

module.exports = {
    signupReader,
    signinReader
}