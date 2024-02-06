const User = require('../models/User')

async function show(req, res) {
    console.log('GET /api/users')
    try {
        const foundUser = await User.findById(req.id)

        res.status(200).json({
            username: foundUser.username,
            email: foundUser.email
        })

    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    show
}