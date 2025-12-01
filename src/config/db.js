const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/library-management-api');

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Database connected successfully...');
});

db.on('error',()=>{
    console.log('Database connection failed...');
});

module.exports=db;