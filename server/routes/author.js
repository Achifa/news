const { signup, signin, library, notification, profile, editor, inbox, dashboard } = require('../controllers/author');
const { express,path,fs,parser,mocha,cors,shortId,jwt,io} = require('../modules');


let authorRouter = express.Router();

authorRouter.post('/system/signup', parser, signup);
authorRouter.post('/system/signin', parser, signin);
authorRouter.post('/system/editor', parser, editor);

authorRouter.get('/system/dashboard', dashboard);
authorRouter.get('/system/library', library);
authorRouter.get('/system/noticfication', notification);
authorRouter.get('/system/inbox', inbox);
authorRouter.get('/system/profile', profile);


module.exports = authorRouter;

