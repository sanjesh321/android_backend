const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './images')
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
    
})
const filefilter = function(req,file,cb){
    if(file.mimetype == 'images/JPG' || file.mimetype == 'images/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const upload = multer({
    storage : storage
});
module.exports = upload;