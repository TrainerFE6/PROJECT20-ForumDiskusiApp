const pool = require('../library/database');

const addContent = async (req, res) => {
    const { sender_id, sender_name, content_text, category } = req.body;

    if (!sender_id || !sender_name || !content_text || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO content (sender_id, sender_name, content_text, category, upload_time) VALUES (?, ?, ?, ?, NOW())`,
            [sender_id, sender_name, content_text, category]
        );

        res.status(201).json({
            message: 'Content added successfully',
            content_id: result.insertId,
        });
    } catch (error) {
        console.error('Error adding content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllContent = async (req, res) => {
    const { category } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM content WHERE category = ? ORDER BY upload_time DESC',
            [category]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching content by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMyContent = async (req, res) => {
    const { sender_id } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM content WHERE sender_id = ? ORDER BY upload_time DESC',
            [sender_id]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching content by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addRespond = async (req, res) => {
    const { content_id, responder_id, responder_name, respond_text } = req.body;

    if (!content_id || !responder_id || !responder_name || !respond_text) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO respond (content_id, responder_id, responder_name, respond_text, upload_time) VALUES (?, ?, ?, ?, NOW())',
            [content_id, sender_id, sender_name, respond_text]
        );

        res.status(201).json({
            message: 'Content added successfully',
            content_id: result.insertId,
        });
    } catch (error) {
        onsole.error('Error adding content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addContent,
    getAllContent,
    getMyContent,
    addRespond,
};
