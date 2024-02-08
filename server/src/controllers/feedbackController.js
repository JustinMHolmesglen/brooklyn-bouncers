const { db } = require('../config/db');
const ApiError = require('../utils/ApiError');
const debugREAD = require('debug')('app:read');
const debugWRITE = require('debug')('app:write');

module.exports = {

async postFeedback(req, res, next){
  console.log("controller hit")
  debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);
    // save to cloud storage
    
    //save to firestore
    try{
      const feedbackRef = db.collection('feedback');
      console.log(req.body);
      const response = await feedbackRef.add({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message,
        
      })
      console.log(`Added feedback ID: ${response.id}`);
      res.send(response.id);

    
    }catch(error){
      return next(ApiError.internal("You're request could not be saved at this time", error));
    }
  },
  async getFeedback(req, res, next){
    try {
      const feedbackRef = db.collection('feedback');
      const snapshot = await feedbackRef.orderBy("name", "asc").get();
     
      // [400 ERROR HANDLING] Check if this collection/documents exist
      if (snapshot.empty) {
        return next(ApiError.badRequest('No feedback found in the database'));
      }
  
      // SUCCESS: Push object properties to array and send to client
      let docs = [];
      snapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          username: doc.data().username,
          phone: doc.data().phone,
          email: doc.data().email,
          message: doc.data().message,
          
        });
      });
      res.send(docs);

    } catch(err){
      return next(ApiError.internal('The feedback have gone missing - sorry!', err))
    }
  },
}

