const express = require('express');
const router = express.Router();
const {
    createModule,
    getAllModules,
    getModuleBySubjectAndClass,
    updateModule,
    deleteModule
} = require('../controller/Modulecontroller');

router.post('/', createModule);
router.get('/', getAllModules);
router.get('/:subject/:classname', getModuleBySubjectAndClass);
router.put('/:id', updateModule);
router.delete('/:id', deleteModule);

module.exports = router;
