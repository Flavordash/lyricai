import React, { useState } from 'react';
import styled from 'styled-components';
import LyricsEditor from './LyricsEditor';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 0;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  gap: 2rem;
`;

const Panel = styled.div`
  width: 100%;
  flex: 1;
  padding: 2rem;
  border-radius: 10px;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const InputPanel = styled(Panel)`
  background-color: #ffe6e6;
`;

const OutputPanel = styled(Panel)`
  background-color: #e6f0ff;
  min-height: 300px;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: start;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

function CreateLyrics() {
  const [bpm, setBpm] = useState('');
  const [theme, setTheme] = useState('');
  const [reference, setReference] = useState('');
  const [genre, setGenre] = useState('');
  const [metre, setMetre] = useState('');
  const [keywords, setKeywords] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setLyrics('Generating lyrics... 🎵');

    try {
      const response = await fetch('/generate-lyrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bpm: parseInt(bpm, 10) || 100,
          theme,
          referenceArtist: reference,
          keywords,
          genre,
          metre
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate lyrics');
      }

      const data = await response.json();
      setLyrics(data.lyrics);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while generating lyrics. Please try again.');
      setLyrics('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>LyricAi</Title>
      </Header>
      <Content>
        <InputPanel>
          <h2>INPUT</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="bpm">BPM</Label>
              <Input id="bpm" type="number" value={bpm} onChange={(e) => setBpm(e.target.value)} placeholder="Numbers only" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="theme">Theme</Label>
              <Input id="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="What is the theme of your song?" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="reference">Reference (Artist)</Label>
              <Input id="reference" type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Optional" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="keywords">Keywords</Label>
              <Input id="keywords" type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Comma-separated keywords" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="genre">Genre</Label>
              <Select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">Select a genre</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Jazz">Jazz</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="metre">Metre</Label>
              <Select id="metre" value={metre} onChange={(e) => setMetre(e.target.value)}>
                <option value="">Select metre</option>
                <option value="4/4">4/4</option>
                <option value="3/4">3/4</option>
                <option value="6/8">6/8</option>
              </Select>
            </FormGroup>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Lyrics'}
            </Button>
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          </Form>
        </InputPanel>
        <OutputPanel>
          <h2>OUTPUT</h2>
          <LyricsEditor lyrics={lyrics} onUpdateLyrics={setLyrics} />
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#555' }}>
  * Block a word and click the Rhymer to replace it with a rhyming word.
</p>
        </OutputPanel>
      </Content>
    </PageContainer>
  );
}

export default CreateLyrics;
