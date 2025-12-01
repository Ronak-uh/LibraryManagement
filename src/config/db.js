const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://ronakchavhan89_db_user:hI2lRg1dwafe5uNd@cluster0.dlp4ogq.mongodb.net/?appName=Cluster0');

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Database connected successfully...');
});

db.on('error',()=>{
    console.log('Database connection failed...');
});

module.exports=db;