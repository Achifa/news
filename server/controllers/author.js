const { connectToDB } = require("../db");
const { shortId } = require("../modules");
const bcryptjs = require('bcryptjs');
const { signupAuthor, signinAuthor } = require("../signer/author");
const { uploadContent, getContents, getNotification, getUserData, getInbox } = require("../workers/author");


let signup = async(req,res) => {
    
    let {fname, lname, bio, uname, email, phone, pwd, state, city, category, acctNo, coverphoto} = req.body;
    //console.log(fname, lname, uname, email, phone, pwd, coverphoto)
    let userId = shortId.generate();
    let date = Date().toString();
    let isActive = false;
    let h_pwd = await bcryptjs.hash(pwd, 10);

    let response = await signupAuthor(fname, lname, userId, bio, uname, email, phone, h_pwd, date, isActive, state, city, category, acctNo, coverphoto);
    if(response){
        res.status(200).send({bool: true, err: ''})
    }else{
        res.status(400).send({bool: false, err: 'Error Uploading Data'})
    }
    
}

let signin = async(req, res) => {
    
    let {uname,pwd} = req.body;
    let response = await signinAuthor(uname,pwd);

    if(response.bool){
        res.status(200).send({bool: true, data: response.data})
    }else{
        res.status(400).send({bool: false, data: response.data})
    }


    
}

let dashboard = (req, res) => {

}

let editor = (req, res) => {
    let {title,description,thumbnail,content,contentFiles,category,userId} = req.body;

    let date = Date().toString();
    let articleId = shortId.generate();
    let views,shares,comments,impressions = 0;

    let response = uploadContent(title,description,thumbnail,content,contentFiles,category,userId,date,articleId,views,shares,comments,impressions);
    if(response){

    }else{

    }
}

let library = async(req, res) => {
    let {authorid} = req.query;
    let response = await getContents(authorid)
    res.status(200).send(response);
}

let notification = async(req, res) => {
    let {authorid} = req.query;
    let response = await getNotification(authorid)
    res.status(200).send(response);
}

let inbox = async(req, res) => {
    let response = await getInbox();
    res.status(200).send(response);
}

let profile = async(req, res) => {
    let {userid} = req.query;
    let response = await getUserData(userid)
    res.status(200).send(response);
}

module.exports = {
    signin,
    signup,
    editor,
    dashboard,
    library,
    notification,
    inbox,
    profile
}