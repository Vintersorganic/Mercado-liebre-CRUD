// ************ Require's ************
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.resolve(__dirname, '../../public/images/products')); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))} 
  })

const upload = multer({storage})


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single("image"), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
