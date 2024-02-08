const { db } = require('../config/db');
const ApiError = require('../utils/ApiError');
const { storageBucketUpload, getFileFromUrl, deleteFileFromBucket } = require("../utils/bucketService");
const debugREAD = require('debug')('app:read');
const debugWRITE = require('debug')('app:write');

module.exports = {
  async getAllProducts(req, res, next){
    try {
      const productRef = db.collection('products');
      const snapshot = await productRef.get();
      // const snapshot = await productRef.orderBy("name", "asc").get();

      // Index option for Sale items
      // const snapshot = await productRef.where("onSale", "==", "true").orderBy("name", "asc").limit(10).get();

       // Index option for Sale items
      // const snapshot = await productRef.where("onSale", "==", "true").orderBy("name", "asc").limit(10).get();


      // [400 ERROR HANDLING] Check if this collection/documents exist
      if (snapshot.empty) {
        return next(ApiError.badRequest('The products you were looking for do not exist'));
      }
  
      // SUCCESS: Push object properties to array and send to client
      let docs = [];
      snapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          category: doc.data().category,
          price: doc.data().price,
          sizes: doc.data().sizes,
          texture: doc.data().texture,
          onSale: doc.data().onSale,
          isAvailable: doc.data().isAvailable,
          image: doc.data().image,
        });
      });
      res.send(docs);

    } catch(err){
      return next(ApiError.internal('The products have gone missing - sorry!', err))
    }
  },
  async getSaleProducts(req, res, next){
       
      try {
        const productRef = db.collection('products');
        const snapshot = await productRef.where("onSale", "==", "true").orderBy("name", "asc").get();
          
        // [400 ERROR HANDLING] Check if this collection/documents exist
        if (snapshot.empty) {
          return next(ApiError.badRequest('The products you were looking for do not exist'));
        } else {
    
        // SUCCESS: Push object properties to array and send to client
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            category: doc.data().category,
            price: doc.data().price,
            sizes: doc.data().sizes,
            texture: doc.data().texture,
            onSale: doc.data().onSale,
            isAvailable: doc.data().isAvailable,
            image: doc.data().image,
          });
        });
        res.send(docs);
        }
      } catch(err){
        return next(ApiError.internal('The products have gone missing - sorry!', err))
      }
  },

  async postProducts(req, res, next){
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);
    // save to cloud storage
    let downloadURL = null;
    try{
      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);


    }catch(error){
      return next(ApiError.internal("An error occured in uploading an image to cloud storage", error));
    }

    //save to firestore
    try{
      const productRef = db.collection('products');
      const response = await productRef.add({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: Number(req.body.price),
        sizes: req.body.sizes,
        texture: req.body.texture,
        onSale: req.body.onSale,
        isAvailable: req.body.isAvailable,
        image: downloadURL
      })
      console.log(`Added product ID: ${response.id}`);
      res.send(response.id);

    
    }catch(error){
      return next(ApiError.internal("You're request could not be saved at this time", error));
    }
  },

  async getProductById(req, res, next){
    // debugREAD("Test 1, 2, 3");
    // debugREAD(req.params);
    debugREAD(req.params.id);
    try{
      const productRef = db.collection('products').doc(req.params.id);
      const doc = await productRef.get();

      if(!doc.exists){
        return next(ApiError.badRequest('The item you were looking for does not exist'));
      } else {
        res.send(doc.data());
      }

    } catch( error ){ 
      return next(ApiError.internal("You're request could not be made at this time", error));
    }
  
  },

  async editProductById(req, res, next){
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(req.params.id)
    debugWRITE(res.locals);

    let downloadURL = null;
    
    try{
      if(req.files){
      // storage upload
      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);

      // second part tomorrow replace image
      if(req.body.uploadedFile){
        debugWRITE(`deleting old image in storage: ${req.body.uploadedFile}`);

      }
      const bucketResponse = await deleteFileFromBucket(req.body.uploadedFile);
      
      // image has not been changed
      }else{
        console.log('No change to image in DB')
        downloadURL = req.body.image;
      }
      //500 error database didn't get uploaded file
    }catch(error){
      return next(ApiError.internal("An error occured in uploading an image to cloud storage", error));
    }

    //save to firestore
    try{
      const productRef = db.collection('products').doc(req.params.id);
      const response = await productRef.update({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: Number(req.body.price),
        sizes: req.body.sizes,
        texture: req.body.texture,
        onSale: req.body.onSale,
        isAvailable: req.body.isAvailable,
        image: downloadURL
      });
      res.send(response);

    
    }catch(error){
      return next(ApiError.internal("You're request could not be saved at this time", error));
    }
  },

  // [5] DELETE Product BY ID
  async deleteProductById(req, res, next){
    // (a) Delete document image file from storage 
    try {
      // (i) Store the document query in variable & call GET method for ID
      const productRef = db.collection('products').doc(req.params.id);
      const doc = await productRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(ApiError.badRequest('The item you were looking for does not exist'));
      } 
      
      // (ii) Store downloadURL and obtain uploadedFile in storage bucket
      const downloadURL = doc.data().image;
      const uploadedFile = getFileFromUrl(downloadURL);

      // (iii) Call storage bucket delete function & delete previously uploadedFile
      const bucketResponse = await deleteFileFromBucket(uploadedFile);

      // (b) Delete document from Cloud Firestore
      if (bucketResponse) {
        // ? ? ? document exists
        //  SUCCESS IMAGE DELETION
        const response = await productRef.delete({exists:true});

        // SUCCESS: Issue back response for timebeing
        res.send(response);
      }

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your request could not be saved at this time', err));
    }
  }
}
