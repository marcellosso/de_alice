const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Lafmlfo1855@dealice-jiqdp.mongodb.net/DeAlice', { 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;

module.exports = mongoose;