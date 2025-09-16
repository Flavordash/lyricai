import express from 'express';
import axios from 'axios';
import { syllable } from 'syllable';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

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

  const { bpm, theme, keywords, referenceArtist, genre, metre } = req.body;

  try {
    // Format keywords if it's an array or string
    const keywordsFormatted = Array.isArray(keywords) ? keywords.join(', ') : keywords;

    // DeepSeek API 프롬프트 구성
    const systemPrompt = 'You are an expert songwriter and lyricist.';
    const userPrompt = `Write song lyrics with the following specifications:\n- Style similar to ${referenceArtist || 'a contemporary artist'}\n- Theme: ${theme || 'love and relationships'}\n- Genre: ${genre || 'pop'}\n- Including these keywords: ${keywordsFormatted || 'emotion, feeling'}\n- Suitable for ${metre || '4/4'} time signature\n\nWrite only the lyrics without any explanations or additional text.`;

    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: false,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    );

    let generatedLyrics = response.data.choices[0].message.content.trim();

    // Adjust lyrics to match BPM AFTER AI generates them
    const adjustedLyrics = adjustLyricsToBPM(generatedLyrics, bpm);

    res.json({ lyrics: adjustedLyrics });
  } catch (error) {
    console.error('Error generating lyrics:', error?.response?.data || error);
    res.status(500).json({ error: 'Failed to generate lyrics' });
  }
});

// 단어 교체 + 라임 맞춤 엔드포인트
router.post('/replace-word', async (req, res) => {
  const { originalLyrics, selectedWord, lineText } = req.body;
  try {
    const systemPrompt = 'You are an expert songwriter and lyricist.';
    const userPrompt = `In the following lyric line, replace the word "${selectedWord}" with a word that has a similar meaning and rhymes with the end of the line. Only return the new word, nothing else.\n\nLyric line: ${lineText}`;

    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: false,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 10
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    );

    const newWord = response.data.choices[0].message.content.trim();
    res.json({ newWord });
  } catch (error) {
    console.error('Error replacing word:', error?.response?.data || error);
    res.status(500).json({ error: 'Failed to replace word' });
  }
});
console.log('DEEPSEEK_API_KEY loaded:', process.env.DEEPSEEK_API_KEY);

export default router;
