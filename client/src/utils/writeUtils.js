export function getFileFromUrl(downloadUrl){
const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${import.meta.env.VITE_STORAGE_BUCKET_URL}/o/` 
let fileGlob = downloadUrl.replace(baseUrl, "");

//remove end of url string
const indexOfEndPath = fileGlob.indexOf("?");
fileGlob = fileGlob.substring(0, indexOfEndPath)

//return existing fileglob
console.log(`generated fileFlob : ${fileGlob}`)
return fileGlob;

}