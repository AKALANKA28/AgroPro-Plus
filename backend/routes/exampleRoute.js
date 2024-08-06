const express = require('express');
const router = express.Router();
const exampleCtrl = require('../controllers/exampleCtrl');

router.post('/', exampleCtrl.createExample);
router.get('/', exampleCtrl.getExamples);
router.get('/:id', exampleCtrl.getExampleById);
router.put('/:id', exampleCtrl.updateExample);
router.delete('/:id', exampleCtrl.deleteExample);

module.exports = router;
