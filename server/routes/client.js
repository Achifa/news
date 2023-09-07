const { signup, signin, headlines, article, trends, search, like, comment, share } = require('../controllers/client');
const { express,path,fs,parser,mocha,cors,shortId,jwt,io} = require('../modules');


let clientRouter = express.Router();

clientRouter.post('/signup', parser, signup);
clientRouter.post('/signin', parser, signin);

clientRouter.get('/headlines', headlines);
clientRouter.get('/article', article);
clientRouter.get('/trends', trends);
clientRouter.get('/search', search);

clientRouter.post('/like', parser, like);
clientRouter.post('/comment', parser, comment);
clientRouter.post('/share', parser, share);


module.exports = clientRouter;

