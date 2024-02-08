var admin = require("firebase-admin");
const config = require('./config');

const dbStartup = require('debug')('app:db');
const debugError500 = require('debug')('app:error500');

try{
    dbStartup("Attempting database connection...")
    console.log(config.db.serviceAccountKey)
    var serviceAccount = require(config.db.serviceAccountKey);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: config.db.storageBucket
    });

    //connection to DB is established
    dbStartup("DB Connection established!");

    const db = admin.firestore();
    const bucket = admin.storage().bucket();
    
    //TEST DB connection (only works if you have a collection)
    const dbPing = db.listCollections()
    .then(collections => {
        dbStartup("Connected to Cloud Firestore");
        for (let collection of collections) {
        dbStartup(`Found db collection: ${collection.id}`);
    }
  });


    //export db methods
    module.exports = { db, bucket, dbPing }

} catch (error) {
    debugError500(error);
}   
