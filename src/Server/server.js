import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import lyricsGenerator from './lyricsGenerator.js';

dotenv.config({ path: '../../.env' }); 

const app = express();
app.use(express.json());
app.use(cors());


app.use('/generate-lyrics', lyricsGenerator);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


