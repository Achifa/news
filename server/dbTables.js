connectToDB.then((pool) => {
    pool.query(`CREATE TABLE IF NOT EXISTS "readers"(
        id serial NOT NULL PRIMARY KEY,
        userId text NOT NULL,
        dualRole boolean NOT NULL,
        fname text NOT NULL,
        lname text NOT NULL,
        uname text NOT NULL UNIQUE,
        email text NOT NULL UNIQUE,
        phone bigint NOT NULL UNIQUE,
        pwd text NOT NULL,
        date text NOT NULL,
        isActive boolean NOT NULL,
        state text,
        city text
    )`)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`CREATE TABLE IF NOT EXISTS "authors"(
        id serial NOT NULL PRIMARY KEY,
        userId text NOT NULL,
        fname text NOT NULL,
        lname text NOT NULL,
        bio text NOT NULL,
        uname text NOT NULL UNIQUE,
        email text NOT NULL UNIQUE,
        phone bigint NOT NULL UNIQUE,
        pwd text NOT NULL,
        state text NOT NULL,
        city text NOT NULL,
        category text NOT NULL,
        acctNo text NOT NULL,
        date text NOT NULL,
        isActive boolean NOT NULL
    )`)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS coverphoto
        (
            id serial NOT NULL PRIMARY KEY,
            userid text NOT NULL,
            file text NOT NULL,
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})




connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS articleMetaDatas
        (
            id serial NOT NULL PRIMARY KEY,
            title text NOT NULL,
            description text NOT NULL,
            articlId text NOT NULL UNIQUE,
            authorId text NOT NULL,
            category text NOT NULL,
            date text NOT NULL,
            views text NOT NULL,
            shares text NOT NULL,
            comments text NOT NULL,
            impressions text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS articleThumbnails
        (
            id serial NOT NULL PRIMARY KEY,
            articlId text NOT NULL UNIQUE,
            file text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS articleContents
        (
            id serial NOT NULL PRIMARY KEY,
            articlId text NOT NULL UNIQUE,
            file text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS articleContentFiles
        (
            id serial NOT NULL PRIMARY KEY,
            articlId text NOT NULL UNIQUE,
            file text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})



connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS clicks
        (
            id serial NOT NULL PRIMARY KEY,
            clickId text NOT NULL,
            articlId text NOT NULL,
            userId text NOT NULL UNIQUE,
            date text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS comments
        (
            id serial NOT NULL PRIMARY KEY,
            commentId text NOT NULL,
            articlId text NOT NULL,
            userId text NOT NULL UNIQUE,
            date text NOT NULL,
            mssg text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS shares
        (
            id serial NOT NULL PRIMARY KEY,
            shareId text NOT NULL,
            articlId text NOT NULL,
            userId text NOT NULL UNIQUE,
            date text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS impression
        (
            id serial NOT NULL PRIMARY KEY,
            impressionId text NOT NULL,
            articlId text NOT NULL,
            userId text NOT NULL UNIQUE,
            date text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS noticfication
        (
            id serial NOT NULL PRIMARY KEY,
            userid text NOT NULL,
            notice text NOT NULL,
            noticeid text NOT NULL,
            date text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})





connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS inboxMetaDatas
        (
            id serial NOT NULL PRIMARY KEY,
            title text NOT NULL,
            description text NOT NULL,
            inboxId text NOT NULL UNIQUE,
            userid text NOT NULL,
            date text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS inboxContents
        (
            id serial NOT NULL PRIMARY KEY,
            inboxId text NOT NULL UNIQUE,
            userid text NOT NULL UNIQUE,
            file text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})

connectToDB.then((pool) => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS inboxContentFiles
        (
            id serial NOT NULL PRIMARY KEY,
            inboxid text NOT NULL UNIQUE,
            userid text NOT NULL UNIQUE,
            file text NOT NULL
        )
    `)
    .then((result) => res.json({mssg: 'hello world'}))
    .catch((err) => console.log(err))
})