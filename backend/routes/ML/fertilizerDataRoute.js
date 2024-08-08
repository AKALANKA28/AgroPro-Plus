const express = require('express');
const router = express.Router();
const fertilizerDataController  = require('../../controllers/ML/fertilizerPredictCtrl');

router.post('/add-data', fertilizerDataController.addData);
router.get('/', fertilizerDataController.getData);
router.put('/update-data/:id', fertilizerDataController.updateData);

module.exports = router;
