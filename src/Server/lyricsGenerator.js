import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

router.post('/', async (req, res) => {
  console.log('Request received:', req.body); 
  const { bpm, theme, genre, keywords } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Generate lyrics with a BPM of ${bpm}, theme of ${theme}, genre ${genre}, and keywords ${keywords.join(', ')}.`,
        },
      ],
    });

    const generatedLyrics = response.choices[0].message.content.trim();
    res.json({ lyrics: generatedLyrics });
  } catch (error) {
    console.error('Error generating lyrics:', error);
    res.status(500).json({ error: 'Failed to generate lyrics' });
  }
});

export default router;
