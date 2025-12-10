const express = require('express');
const axios = require('axios');
const router = express.Router();

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

router.get('/news', async (req, res) => {
  const page = req.query.page || 1;
  const topic = req.query.topic || 'books';
  const pageSize = req.query.pageSize || 10;

  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: topic,
        lang: 'en',
        max: pageSize,
        page,
        token: GNEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching from GNews:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
