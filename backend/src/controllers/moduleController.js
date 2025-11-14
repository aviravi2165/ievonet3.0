const Module = require('../models/Module');
const logger = require('../utils/logger');

const getModules = async (req, res) => {
  try {
    const modules = await Module.getWithMenuItems();
    res.status(200).json({ modules });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Error fetching modules', error: error.message });
  }
};

const getModuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.getById(id);
    
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.status(200).json({ module });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Error fetching module', error: error.message });
  }
};

const createModule = async (req, res) => {
  try {
    const { name, label, description, icon, order_index } = req.body;

    if (!name || !label) {
      return res.status(400).json({ message: 'Name and label are required' });
    }

    const newModule = await Module.create({
      name,
      label,
      description,
      icon,
      order_index,
    });

    logger.info(`Module created: ${name}`);
    res.status(201).json({ module: newModule });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Error creating module', error: error.message });
  }
};

const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, description, icon, order_index, is_active } = req.body;

    const updatedModule = await Module.update(id, {
      label,
      description,
      icon,
      order_index,
      is_active,
    });

    if (!updatedModule) {
      return res.status(404).json({ message: 'Module not found' });
    }

    logger.info(`Module updated: ${id}`);
    res.status(200).json({ module: updatedModule });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Error updating module', error: error.message });
  }
};

const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedModule = await Module.delete(id);

    if (!deletedModule) {
      return res.status(404).json({ message: 'Module not found' });
    }

    logger.info(`Module deleted: ${id}`);
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Error deleting module', error: error.message });
  }
};

module.exports = {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
};
