'use strict';
module.exports = `mongodb+srv://admin:${process.env.DATABASE_PASSWORD}@comb.kofyd.mongodb.net/${process.env.DATABSE_NAME}?retryWrites=true&w=majority`;