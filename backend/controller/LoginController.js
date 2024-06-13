// LoginController.js
const pool = require('../library/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../library/config');

module.exports = {
    async loginAuth(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error('Email or password not provided');
            return res.status(400).json({ message: 'Please enter email and password' });
        }

        try {
            const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
            if (rows.length > 0) {
                const user = rows[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const payload = { userId: user.user_id, username: user.username };
                    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
                    return res.status(200).json({ message: 'Login successful', token });
                } else {
                    console.error('Invalid password for user:', email);
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
            } else {
                console.error('User not found:', email);
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: 'Error during login' });
        }
    },

    async logout(req, res) {
        try {
            // Implementasi logout, misal dengan menghapus token dari cookie
            res.clearCookie('jwtToken'); // Hapus cookie jwtToken saat logout
            return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json({ message: 'Logout error' });
        }
    }    
};
