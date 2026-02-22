const { Router } = require('../../Node-App');
const router = Router();

const usersRoutes = require('./users.routes');

router.use('/users', usersRoutes);

module.exports = router;
