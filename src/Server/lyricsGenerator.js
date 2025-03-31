import express from 'express';
import OpenAI from 'openai';
import syllable from 'syllable';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// Function to estimate syllables per line based on BPM
const getSyllablesPerLine = (bpm) => {
  if (bpm < 80) return 4;  
  if (bpm < 100) return 8;  
  if (bpm < 120) return 12; 
  if (bpm < 140) return 16; 
  if (bpm < 160) return 18; 
  return 20; 
};

// Function to adjust lyrics syllables per line to fit BPM
const adjustLyricsToBPM = (lyrics, bpm) => {
  const targetSyllables = getSyllablesPerLine(bpm);
  const lines = lyrics.split("\n");
  const adjustedLyrics = lines.map(line => {
    const words = line.split(" ");
    let syllableCount = words.reduce((count, word) => count + syllable(word), 0);

    // Adjust line length to fit target BPM syllables per line
    while (syllableCount > targetSyllables) {
      words.pop(); 
      syllableCount = words.reduce((count, word) => count + syllable(word), 0);
    }

    return words.join(" ");
  });

  return adjustedLyrics.join("\n");
};

router.post('/', async (req, res) => {
  console.log('Request received:', req.body);

  const { bpm, theme, keywords, referenceArtist } = req.body;  // Removed metre

  try {
    // Generate lyrics WITHOUT mentioning BPM or Metre
    const response = await client.chat.completions.create({
      model: 'ft:gpt-4o-mini:your_model_name',  
      messages: [
        { role: 'system', content: 'You are a fine-tuned AI lyricist. Generate high-quality lyrics based on theme, reference artist style, and keywords.' },
        {
          role: 'user',
          content: `
            Write lyrics in the style of ${referenceArtist}.
            Theme: ${theme}.
            Keywords: ${keywords.join(', ')}.
          `,
        },
      ],
    });

    let generatedLyrics = response.choices[0].message.content.trim();

    // Adjust lyrics to match BPM AFTER AI generates them
    const adjustedLyrics = adjustLyricsToBPM(generatedLyrics, bpm);

    res.json({ lyrics: adjustedLyrics });
  } catch (error) {
    console.error('Error generating lyrics:', error);
    res.status(500).json({ error: 'Failed to generate lyrics' });
  }
});

export default router;
