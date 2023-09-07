const { connectToDB } = require("../db");


async function getHeadline(params) {

    

    let book = {};

    async function getMetaData(params) {
        return(
            await connectToDB
            .then((pool) => 
                pool.query(`select * from articlemetadatas limit 35 where category = '${category}'`)
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
                pool.query(`select * from articlethumbnails where category = '${category}'`)
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
            return(null)
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

async function getContent(articleid) {

    let book = {}

    async function getArticleMetadata(params) {
        return(
            connectToDB
            .then((pool) => 
                pool.query(`select * from articlemetadatas where articleid = '${articleid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }

    async function getArticleThumbnail(params) {
        return(
            connectToDB
            .then((pool) =>
                pool.query(`select * from articlethumbnails where articleid = '${articleid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }

    async function getArticle(params) {
        return(
            connectToDB
            .then((pool) => 
                pool.query(`select * from articlecontents where articleid = '${articleid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }
    
    async function getArticleFile(params) {
        return(
            connectToDB
            .then((pool) => 
                pool.query(`select * from articlecontentfiles where articleid = '${articleid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }

    async function getDocument() {

        let MetaData = await getArticleMetadata();
        let Thumbnail = await getArticleThumbnail();
        let Content = await getArticle();
        let ContentFiles = await getArticleFile();

        if(MetaData.length === 0){
            return(null)
        }else{
            book.metaData = MetaData
            book.thumbnail = Thumbnail
            book.content = Content
            book.contentFile = ContentFiles
            return(book)
        }

    }

    let document = await getDocument();
    return document;
    
    
}

async function getSearch(params) {
    return(
        connectToDB
        .then((pool) => 
            pool.query(`select * from articlemetadatas`)
            .then((result) => result.rows.filter(item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1))
            .catch((err) => err)
        )
        .catch((err) => err)
    )
}

async function getUserProfile(userid) {
    
    async function getUserdata(params) {
        return(
            connectToDB
            .then((pool) => 
                pool.query(`select * from users where userid = '${userid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }
    
    async function getUserPhoto(params) {
        return(
            connectToDB
            .then((pool) => 
                pool.query(`select * from coverphoto where userid = '${userid}'`)
                .then((result) => result.rows)
                .catch((err) => err)
            )
            .catch((err) => err)
        )
    }
    
    async function getDocument() {

        let userData = await getUserdata();
        let userPhoto = await getUserPhoto();

        if(userData.length === 0){
            return(null)
        }else{
            book.photo = userPhoto
            book.data = userData
            return(book)
        }

    }

    let document = await getDocument();
    return document;
}

async function getExternalContent(params) {
    
}

async function uploadUserView(userid,articleid,date) {
    
    async function updateUserView(params) {
        return(
            connectToDB
            .then((pool) => {
                pool.query(`insert into clicks(id, clickid, articleid, userid, date) values(DEFAULT, '${clickid}', '${articleid}', '${userid}', '${date}')`)
                .then((result) => result)
                .catch((err) => err)
            })
            .catch((err) => err)
        )
    }
    
    async function incrementUserView(params) {
        return(
            connectToDB
            .then((pool) => {
                pool.query(`update articlemetadatas set clicks = clicks + 1 where articleid = '${articleid}'`)
                .then((result) => result)
                .catch((err) => err)
            })
            .catch((err) => err)
        )
    }

    async function getDocument() {

        let uploadView = await updateUserView();
        let updateViews = await incrementUserView();

        if(uploadView.rowCount !== 1){
            return(null)
        }else{
            book.view = uploadView
            book.viewCount = updateViews
            return(book)
        }

    }

    let document = await getDocument();
    return document;

}

async function uploadUserComment(userid,articleid,date,commentid,mssg) {
    
    async function updateUserComment(params) {
        return(
            connectToDB((pool) => {
                pool.query(`insert into comment(id, commentid, articleid, userid, date, mssg) values(DEFAULT, '${commentid}', '${articleid}', '${userid}', '${date}', '${mssg}' )`)
                .then((result) => result)
                .catch((err) => err)
            })
            .catch((err) => err)
        )
    }
    
    async function incrementUserComment(params) {
        return(
            connectToDB((pool) => {
                pool.query(`update comments set comments = comments + 1 where articleid = '${articleid}'`)
                .then((result) => result)
                .catch((err) => err)
            })
            .catch((err) => err)
        )
    }

    async function getDocument() {

        let uploadComment = await updateUserComment();
        let updateComments = await incrementUserComment();

        if(uploadComment.rowCount !== 1){
            return(null)
        }else{
            book.comment = uploadComment
            book.commentCount = updateComments
            return(book)
        }

    }

    let document = await getDocument();
    return document;

}

async function uploadUserShare(userid,shareid,articleid,date) {
    
    async function updateUserShare(params) {
        return(
            connectToDB
            .then((pool) => {
                pool.query(`insert into shares(id, shareid, articleid, userid, date) values(DEFAULT, '${shareid}', '${articleid}', '${userid}', '${date}')`)
                .then((result) => result)
                .catch((err) => err)
            })
            .catch((err) => err)
        )
    }
    
    async function incrementUserShare(params) {
        return(
            connectToDB
            .then((pool) => {
                pool.query(`update shares set shares = shares + 1 where articleid = '${articleid}'`)
                .then((result) => result)
                .catch((err) => err)
            })
            .catch((err) => err)
        )
    }

    async function getDocument() {

        let uploadShare = await updateUserShare();
        let updateShares = await incrementUserShare();

        if(uploadShare.rowCount !== 1){
            return(null)
        }else{
            book.share = uploadShare
            book.shareCount = updateShares
            return(book)
        }

    }

    let document = await getDocument();
    return document;

}

module.exports = {
    getHeadline,
    getContent,
    getSearch,
    getUserProfile,
    getExternalContent,
    uploadUserView,
    uploadUserComment,
    uploadUserShare
}