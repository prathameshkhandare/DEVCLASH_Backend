const express = require('express');
const router = express.Router();
const {
    createModule,
    getAllModules,
    getModuleById,
    updateModule,
    deleteModule
} = require('../controller/Modulecontroller');

router.post('/', createModule);
router.get('/', getAllModules);
router.get('/:id', getModuleById);
router.put('/:id', updateModule);
router.delete('/:id', deleteModule);

module.exports = router;
