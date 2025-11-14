const express = require('express');
const {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} = require('../controllers/moduleController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getModules);
router.get('/:id', getModuleById);
router.post('/', auth, createModule);
router.put('/:id', auth, updateModule);
router.delete('/:id', auth, deleteModule);

module.exports = router;
