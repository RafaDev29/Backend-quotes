const userService = require('../user/service');

const userController = {
  createUser: async (req, res, next) => {
    try {
      const userId = await userService.createUser(req.body);
      res.status(201).json({ userId });
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  updateUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await userService.updateUserById(userId, req.body);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await userService.deleteUserById(userId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
