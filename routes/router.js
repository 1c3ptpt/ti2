const express = require('express');
const router = express.Router();
const Likes = require('../models/like');
const Dislikes = require('../models/dislike');

router.post('/like', async (req, res) => {
    const { utilizador, tarefaId } = req.body;
    try {
        // Check if the user has already liked the task
        const existingLike = await Likes.findOne({ where: { utilizador, tarefaId } });
        if (existingLike) {
            // If the user has already liked, remove the like (toggle like off)
            await existingLike.destroy();
            return res.json({ message: 'Like removed' });
        }

        // Check if the user has already disliked the task
        const existingDislike = await Dislikes.findOne({ where: { utilizador, tarefaId } });
        if (existingDislike) {
            // If the user has disliked, remove the dislike
            await existingDislike.destroy();
        }

        // Create a like
        const like = await Likes.create({ utilizador, tarefaId });
        res.json(like);
    } catch (error) {
        console.error('Error liking the task:', error);
        res.status(500).json({ error: 'Unable to like the task' });
    }
});

router.post('/dislike', async (req, res) => {
    const { utilizador, tarefaId } = req.body;
    try {
        // Check if the user has already disliked the task
        const existingDislike = await Dislikes.findOne({ where: { utilizador, tarefaId } });
        if (existingDislike) {
            // If the user has already disliked, remove the dislike (toggle dislike off)
            await existingDislike.destroy();
            return res.json({ message: 'Dislike removed' });
        }

        // Check if the user has already liked the task
        const existingLike = await Likes.findOne({ where: { utilizador, tarefaId } });
        if (existingLike) {
            // If the user has liked, remove the like
            await existingLike.destroy();
        }

        // Create a dislike
        const dislike = await Dislikes.create({ utilizador, tarefaId });
        res.json({ message: 'Dislike added', dislike});
    } catch (error) {
        console.error('Error disliking the task:', error);
        res.status(500).json({ error: 'Unable to dislike the task' });
    }
});

router.delete('/deletelike', async (req, res) => {
    try {
        // Extract data from the request body
        const { utilizador, tarefaId } = req.body;

        // Insert a new record into the Ti1Like table
        const result = await Dislikes.create({ utilizador, tarefaId });

        // Send a success response
        if (result) {
            res.status(400);

        }
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error inserting dislike:', error);
        res.status(500).json({ error: 'Unable to insert dislike' });
    }
});
// Route to get the count of likes for a specific tarefaId
router.get('/stats/:tarefaId', async (req, res) => {
    const { tarefaId } = req.params;
    try {
        const likeCount = await Likes.count({ where: { tarefaId } });
        const dislikeCount = await Dislikes.count({ where: { tarefaId } });
        res.json({ likes: likeCount, dislikes: dislikeCount });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Unable to get stats' });
    }
});

router.get('/getuserstats/', async (req, res) => {
    const { utilizador, tarefaId } = req.query;
    try {
        const liked = await Likes.findOne({ where: { tarefaId, utilizador } });
        const disliked = await Dislikes.findOne({ where: { tarefaId, utilizador } });
        res.json({ liked: liked!==null, disliked: disliked!==null });

    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error counting likes:', error);
        res.status(500).json({ error: 'Unable to count likes' });
    }
})
module.exports = router;
