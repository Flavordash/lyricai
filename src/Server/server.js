import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import lyricsGenerator from './lyricsGenerator.js';

dotenv.config({ path: '../../.env' }); 

const app = express();

// Increase header size limits to prevent 431 errors
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
app.use(cors());


// Add error handling middleware for header size issues
app.use((err, req, res, next) => {
  if (err.code === 'ECONNRESET' || err.message.includes('header')) {
    return res.status(431).json({
      error: 'Request headers too large. Please try reducing browser extensions or clearing cookies.'
    });
  }
  next(err);
});

app.use('/generate-lyrics', lyricsGenerator);

const PORT = process.env.PORT || 3001;

// Configure server with increased header size limit
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Increase the maximum header size (default is 8KB, increasing to 32KB)
server.maxHeadersCount = 0; // No limit on number of headers
server.headersTimeout = 60000; // 60 seconds timeout


