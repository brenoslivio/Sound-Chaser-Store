const express = require('express');
const router = express.Router();
const controller = require('../controllers/albums');

// album routes
router.post('/', controller.post);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/', controller.put);
router.put('/:id', controller.putById);
router.delete('/:id', controller.delete);

module.exports = router;