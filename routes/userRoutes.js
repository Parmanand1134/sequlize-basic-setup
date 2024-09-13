
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/upload', authenticate, upload.single('image'), (req, res) => {
    res.json({ file: req.file });
});

module.exports = router;
