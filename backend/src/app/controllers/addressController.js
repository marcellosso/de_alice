const Address = require('../models/Address');
const User = require('../models/User')


module.exports = {
    async create (req, res) {
        try {
            const userId  = req.userId;

            const address = new Address(req.body);

            const user = await User.findById(userId);
            
            address.user = user;

            await address.save();

            // user.address = address;
            // await user.updateOne();
    
            return res.send({ address });
        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: 'Address registration failed' });
        }
    }
}