const { bucket } = require('../config/db');
const debugBucket = require('debug')('app:bucket');
const config = require('../config/config')
const uuid = require('uuid');
const fs = require('fs');

module.exports = {
    async storageBucketUpload(filename){
        // generate random uuid storage token
        debugBucket(`Firestore Filename: ${filename}`)
        const storageToken = uuid.v4();

        // declare our filepath and optional params for bucket upload
        const serverFilePath = `./public/uploads/${filename}`;
        const options = {
            destination: filename,
            resumable: true,
            validation: 'crc32c',
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: storageToken
                },
            }
        }

           // OPTIONAL DEBUGGING: Checks if server-side /uploads file exists before BUCKET UPLOAD
            fs.access(serverFilePath, fs.F_OK, (err) => {
                if (err) {
                debugBucket(err);
                return({
                    message: 'Error occurred in storing file to server'
                });
                } else {
                debugBucket("File Successfully Stored in Server");
                }
             });
        // cloud firstore upload
        const result = await bucket.upload(serverFilePath, options)
        const bucketName = result[0].metadata.bucket;
        debugBucket(`Bucket Name : ${bucketName}`)

        // retrieve link to file
        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;
        console.log(`File Successfully uploaded: ${downloadURL}`)

        //delete temp file
        fs.unlink(serverFilePath, error => {
            if(error){
                debugBucket(error);
                return({
                    message: 'Error occured in removing file from temporary storage'
                });
            } else {
                debugBucket('file in temporary storage has been deleted')
            }
        })

        return downloadURL;

        // save the download link to firestore
    },

    getFileFromUrl(downloadURL) {
        debugBucket(`DownloadURL from DB: ${downloadURL}`);
    
        // Slice off the base URL from downloadURL
        const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucket}/o/`;
        let fileGlob = downloadURL.replace(baseURL, "");
        
        // Remove everything after the query string
        const indexOfEndPath = fileGlob.indexOf("?");
        fileGlob = fileGlob.substring(0, indexOfEndPath);
        
        // Return file glob to be deleted 
        debugBucket(`File in Bucket qeued for Deletion: ${fileGlob}`);
        return fileGlob;
      },

    async deleteFileFromBucket(uploadedFile){
        const file = bucket.file(uploadedFile);
        const fileChecker = await file.exists();

        // 400 error
        if(fileChecker[0] === false){
            // toggle
            const options = {
                ignoreNotFound: true,
            };

            const data = await file.delete(options);
            debugBucket(` The file ${uploadedFile} does not exist in storage - Please check server for inconsistent data handling`);
            return data[0];
        } else {
            const data = await file.delete();
            debugBucket(`File deleted from Storage : ${uploadedFile}`);
            return data[0];
        }
    }
}