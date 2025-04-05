const express = require('express');
const router = express.Router();
const {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource
} = require('../controller/Resourcecontroller');

// Routes
router.post('/', createResource);
router.get('/', getAllResources);
router.get('/:id', getResourceById);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

module.exports = router;
