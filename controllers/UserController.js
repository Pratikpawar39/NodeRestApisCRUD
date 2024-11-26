const UserModel = require('../models/UserModel')

const UserController = () => {
  
    const get = async (req, res) => {

        try {
            console.log("getUsers ==>", req.body, req.user);
            let result = await UserModel.get(req.body, req.user);
            return res.status(result.statusCode).json(result);
        } catch (error) {
            console.log(`getUsers ${error}`);
            return res.status(500).json({ msg: 'Internal server error', err: error.errors || '' });
        }
    };

    const create = async (req, res) => {
  
      try {
            console.log("createUser ==>", req.body, req.user);
            const result = await UserModel.create(req.body, req.user);
            return res.status(result.statusCode).json(result);
      } catch (error) {
            console.log(`createUser ${error}`);
            return res.status(500).json({ msg: 'Internal server error', err: error.errors || '' });
      }
    };
  
    const edit = async (req, res) => {
  
      console.log('updateObj', req.body);
  
      try {
            console.log("updateUser ==>", req.body, req.user);
            const result = await UserModel.update(req.body, req.user);
            return res.status(result.statusCode).json(result);
      } catch (error) {
            console.log(`updateUser ${error}`);
            return res.status(500).json({ msg: 'Internal server error', err: error.errors || '' });
      }
    };
  
    const remove = async (req, res) => {
      const { id } = req.body;
    
      try {
        console.log("deleteUser ==>", req.body, req.user);
        const result = await UserModel.destroy(id);
  
        if (result === 1) {
            return res.status(200).json({ msg: 'Successfully Deleted', success: true });
        }

        return res.status(200).json({ msg: 'User already deleted', success: false });

      } catch (error) {
            console.log(`deleteUser ${error}`);
            return res.status(500).json({ msg: 'Internal server error', err: error.errors || '', success: false });
      }
    };
  
    return {
      get,
      create,
      edit,
      remove
    };
  };
  
  module.exports = UserController;