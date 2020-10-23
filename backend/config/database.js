let mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PW}@edustartup.netzt.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`,
        {useUnifiedTopology: true,useFindAndModify: false  })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error'+err)
            })
    }
}
module.exports = new Database()

