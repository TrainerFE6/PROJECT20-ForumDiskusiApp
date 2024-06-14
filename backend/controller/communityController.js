const pool = require('../library/database');

const addCommunity = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO communities (name, description, created_at) VALUES (?, ?, NOW())`,
            [name, description]
        );

        res.status(201).json({
            message: 'Community created successfully',
            community_id: result.insertId,
        });
    } catch (error) {
        console.error('Error creating community:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCommunity = async (req, res) => {
    const { community_id } = req.params;
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const [result] = await pool.query(
            `UPDATE communities SET name = ?, description = ? WHERE community_id = ?`,
            [name, description, community_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Community not found' });
        }

        res.status(200).json({
            message: 'Community updated successfully'
        });
    } catch (error) {
        console.error('Error updating community:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteCommunity = async (req, res) => {
    const { community_id } = req.params;

    try {
        const [result] = await pool.query(
            `DELETE FROM communities WHERE community_id = ?`,
            [community_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Community not found' });
        }

        res.status(200).json({
            message: 'Community deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting community:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllCommunities = async (req, res) => {
    try {
        const [results] = await pool.query(`SELECT * FROM communities`);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching communities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const joinCommunity = async (req, res) => {
    const { community_id } = req.body;
    const user_id = req.userId;

    if (!community_id) {
        return res.status(400).json({ error: 'Community ID is required' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO usercommunities (user_id, community_id, joined_at) VALUES (?, ?, NOW())`,
            [user_id, community_id]
        );

        res.status(201).json({
            message: 'Joined community successfully',
            membership_id: result.insertId,
        });
    } catch (error) {
        console.error('Error joining community:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const leaveCommunity = async (req, res) => {
    const { community_id } = req.body;
    const user_id = req.userId;

    if (!community_id) {
        return res.status(400).json({ error: 'Community ID is required' });
    }

    try {
        const [result] = await pool.query(
            `DELETE FROM usercommunities WHERE user_id = ? AND community_id = ?`,
            [user_id, community_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Membership not found' });
        }

        res.status(200).json({
            message: 'Left community successfully'
        });
    } catch (error) {
        console.error('Error leaving community:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const checkFollowStatus = async (req, res) => {
    const { community_id } = req.params;
    const userId = req.userId;

    try {
        const [result] = await pool.query(
        'SELECT * FROM usercommunities WHERE community_id = ? AND user_id = ?',
        [community_id, userId]
        );

        res.json({ isFollowed: result.length > 0 });
    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTopicsByCommunityId = async (req, res) => {
    const { community_id } = req.params;

    try {
        const [topics] = await pool.query(
            `SELECT * FROM community_topics WHERE community_id = ?`, 
            [community_id]
        );
        res.status(200).json({ topics });
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addTopic = async (req, res) => {
    const { community_id } = req.params;
    const { sender_id, sender_name, description } = req.body;

    if (!sender_id || !sender_name || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO community_topics (community_id, sender_id, sender_name, description, created_at) VALUES (?, ?, ?, ?, NOW())`,
            [community_id, sender_id, sender_name, description]
        );
        res.status(201).json({
            message: 'Topic added successfully',
            topic: {
                topic_id: result.insertId,
                community_id,
                sender_id,
                sender_name,
                description
            }
        });
    } catch (error) {
        console.error('Error adding topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a comment
const addComment = async (req, res) => {
const { topic_id, user_id, user_name, comment_text } = req.body;

if (!topic_id || !user_id || !user_name || !comment_text) {
    return res.status(400).json({ error: 'Missing required fields' });
}

try {
    const [result] = await pool.query(
    `INSERT INTO community_comments (topic_id, user_id, user_name, comment_text, created_at) VALUES (?, ?, ?, ?, NOW())`,
    [topic_id, user_id, user_name, comment_text]
    );

    const [comment] = await pool.query(`SELECT * FROM community_comments WHERE id = ?`, [result.insertId]);

    res.status(201).json({
    message: 'Comment added successfully',
    comment: comment[0]
    });
} catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};

// Get comments for a topic
const getCommentsByTopic = async (req, res) => {
    const { topic_id } = req.params;

    try {
        const [comments] = await pool.query(
            `SELECT * FROM community_comments WHERE topic_id = ? ORDER BY created_at DESC`,
            [topic_id]
        );

        res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addCommunity,
    updateCommunity,
    deleteCommunity,
    getAllCommunities,
    joinCommunity,
    leaveCommunity,
    checkFollowStatus,
    getTopicsByCommunityId,
    addTopic,
    addComment,
    getCommentsByTopic,
};
