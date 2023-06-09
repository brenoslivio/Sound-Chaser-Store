const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

// user routes
router.post('/', controller.post);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;