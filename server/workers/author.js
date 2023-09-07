const { connectToDB } = require("../db");

async function uploadContent(title,description,thumbnail,content,contentFiles,category,userid,date,articleid,views,shares,comments,impressions) {

    async function uploadMetadata(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`insert into articlemetadatas(id,title,description,articleid,userid,category,date,views,shares,comments,impressions) values(DEFAULT, '${title}', '${description}', '${articleid}', '${userid}', '${category}', '${date}', '${views}', '${shares}', '${comments}', '${impressions}')`)
                .then((result) => result)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }

    async function uploadThumbnail(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`insert into articlethumbnails(id, articleid, file) values(DEFAULT, '${articleid}', '${thumbnail}')`)
                .then((result) => result)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }

    async function uploadContent(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`insert into articlecontents(id,articleid,file) values(DEFAULT, '${articleid}', '${content}')`)
                .then((result) => result)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }

    async function uploadContentFiles(params) {
        let book = [];

        let response = contentFiles.map(async(item) => 
            await connectToDB
            .then((pool) => 
                pool.query(`insert into articlecontentfiles(id,articleid,file) values(DEFAULT, '${articleid}', '${item}')`)
                .then((result) => book.push(result))
                .catch((err) => err)
            )
            .catch((err) => err),
            book.length === contentFiles.length ? true : false
        )
           
        return response;
    }

    return new Promise((resolve, reject) => {
        let response = uploadMetadata();
        response.rowAffected === 1 ? resolve(true) : reject(false)
    })
    .then((bool) => {
        if(bool){
            let response = uploadThumbnail();
            return(response.rowAffected === 1 ? true : false)
        }else{
            return false;
        }
    })
    .then((bool) => {
        if(bool){
            let response = uploadContent();
            return(response.rowAffected === 1 ? true : false)
        }else{
            return false;
        }
    })
    .then((bool) => {
        if(bool){
            let response = uploadContentFiles();
            return(response.rowAffected === 1 ? true : false)
        }else{
            return false;
        }
    })
    .catch((err) => err)

}

function updateContent(params) {
    
}

async function getContents(userid) {
    let book = {};

    async function getMetaData(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`select * from articlemetadatas where userid = '${userid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }

    async function getThumbnail(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`select * from articlethumbnails where userid = '${userid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }

    async function getDocument() {

        let MetaData = await getMetaData();
        let Thumbnail = await getThumbnail();

        if(MetaData.length === 0){
            cb(null)
        }else{
            book.content = MetaData
            book.thumbnail = Thumbnail
            //console.log("book: ",book)
            return(book)
        }

    }
    let document = await getDocument();
    return document;
    
}

async function getNotification(userid) {

    return(
        await connectToDB
        .then((pool) => 
            pool.query(`select * from notification where userid = '${userid}'`)
            .then((result) => result.rows)
            .catch((err) => err)
        )
        .catch((err) => err)

    )
}

async function getUserData(userid) {

    let book = {}

    async function getUserDetails(params) {
        return(
            await connectToDB((pool) => 
                pool.query(`select * from author where userid = '${userid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }

    async function getUserPhoto(params) {
        return(
            await connectToDB((pool) => 
                pool.query(`select * from coverphoto where userid = '${userid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }

    async function getDocument(params) {
        let userData = getUserDetails();
        let userPhoto = getUserPhoto();

        if(userData.length === 0){
            return(null)
        }else{
            book.user = userData
            book.photo = userPhoto
            //console.log("book: ",book)
            return(book)
        }

    }

    let document = await getDocument();
    return document;

}

async function getInbox(params) {

    async function getInboxMetaData(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`select * from inboxmetadatas`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }

    async function getInboxContent(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`select * from inboxcontents`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }


    async function getInboxFiles(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`select * from inboxcontentfiles`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)

        )
    }

    async function getDocument() {

        let MetaData = await getInboxMetaData();
        let Files = await getInboxFiles();
        let Content = await getInboxContent(); 

        if(MetaData.length === 0){
            return(null)
        }else{
            book.metadata = MetaData
            book.files = Files
            book.content = Content
            return(book)
        }

    }
    let document = await getDocument();
    return document;

}



module.exports = {
    uploadContent,
    getContents,
    getNotification,
    getUserData,
    getInbox
}