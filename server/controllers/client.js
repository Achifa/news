const { connectToDB } = require("../db");
const { shortId } = require("../modules");
const bcryptjs = require('bcryptjs');
const { signupReader, signinReader } = require("../signer/client");
const { getHeadline, getContent, getExternalContent, getSearch, getUserProfile, uploadUserLike, uploadUserComment, uploadUserShare, uploadUserView } = require("../workers/client");


let signup = async(req,res) => {
    
    let {fname, lname, uname, email, phone, pwd, coverphoto} = req.body;
    console.log(fname, lname, uname, email, phone, pwd, coverphoto)
    let userId = shortId.generate();
    let date = Date().toString();
    let dualRole = false;
    let isActive = false;
    let h_pwd = await bcryptjs.hash(pwd, 10);

    let response = await signupReader(fname, lname, uname, h_pwd, email, phone, coverphoto, userId, date, dualRole, isActive);
    if(response){
        res.status(200).send({bool: true, err: ''})
    }else{
        res.status(400).send({bool: false, err: 'Error Uploading Data'})
    }
    
}

let signin = async(req, res) => {
    let {uname,pwd} = req.body;
    let response = await signinReader(uname,pwd);

    if(response.bool){
        res.status(200).send({bool: true, data: response.data})
    }else{
        res.status(400).send({bool: false, data: response.data})
    }
}

let headlines  = async(req,res) => {
    let {category} = req.query;
    let response = await getHeadline(category)
    res.status(200).send(response);
}

let article  = async(req,res) => {
    let {articleid} = req.query;
    let response = await getContent(articleid)
    res.status(200).send(response);
}

let trends  = async(req,res) => {
    
}

let search  = async(req,res) => {
    let {text} = req.query;
    let response = await getSearch(text)
    res.status(200).send(response);
}

let profile = async(req,res) => {
    let {userid} = req.query;
    let response = await getUserProfile(userid)
    res.status(200).send(response);
}

let views = async(req,res) => {
    let {userid,articleid} = req.body;
    let date = Date().toString()
    let response = await uploadUserView(userid,articleid,date)
    res.status(200).send(response);
}

let comment = async(req,res) => {
    let {userid,mssg,articleid} = req.body;
    let date = Date().toString()
    let commentid = shortId.generate();
    let response = await uploadUserComment(userid,commentid,mssg,articleid,date)
    res.status(200).send(response);
}

let share = async(req,res) => {
    let {userid,articleid} = req.body;
    let shareid = shortId.generate();
    let date = Date().toString()
    let response = await uploadUserShare(userid,shareid,articleid,date)
    res.status(200).send(response);
}

module.exports = {
    signin,
    signup,
    headlines,
    article,
    trends,
    search,
    views,
    comment,
    share,
    profile

}