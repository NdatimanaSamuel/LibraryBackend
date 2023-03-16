const {sequelize,Users} =require('../../models/users');

const createAccountContorller=async(req,res)=>{

    const { id,names,email } = req.body;
    try {
      // create our new user
      const newUser = await Users.create({ id, names,email });
      res.status(201).json({
        message: " User created successfully",
        data: newUser
      });
    } catch (error) {
        console.log("error "+err);
        return res.status(500).json(err)
    }
}


module.exports.createAccountContorller = createAccountContorller