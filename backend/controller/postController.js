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

const updateMyContent = async (req, res) => {
    const { content_text, content_id } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE content SET content_text = ? WHERE cntent_id = ?',
            [content_text, content_id]
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

const deleteMyContent = async (req, res) => {
    const { content_id } = req.body;

    try {
        const [result] = await pool.query(
            'DELETE FROM content WHERE content_id = ?',
            [content_id]
        );

        res.status(201).json({
            message: 'Content added successfully',
            content_id: result.insertId,
        });
    } catch (error) {
        console.error('Error adding content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllContent = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM content ORDER BY upload_time DESC'
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
    const { post_id, sender_id, sender_name, comment_text } = req.body;

    if (!post_id || !sender_id || !sender_name || !comment_text) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO comments (post_id, sender_id, sender_name, comment_text, upload_time) VALUES (?, ?, ?, ?, NOW())',
            [post_id, sender_id, sender_name, comment_text]
        );

        res.status(201).json({
            message: 'Content added successfully',
            content_id: result.insertId,
        });
    } catch (error) {
        onsole.error('Error adding content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getRespond = async (req, res) => {
    const { postId } = req.params;

    try {
        const [comments] = await pool.query(
            'SELECT * FROM comments WHERE post_id = ? ORDER BY upload_time ASC',
            [postId]
        );
        res.json(comments);
    } catch (error) {
        console.error('Error fetching content by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addContent,
    updateMyContent,
    deleteMyContent,
    getAllContent,
    getMyContent,
    addRespond,
    getRespond,
};
