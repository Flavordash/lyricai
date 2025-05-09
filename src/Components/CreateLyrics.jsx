import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
  height: 100vh;
  overflow: hidden;
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
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
`;

const Panel = styled.div`
  flex: 1;
  padding: 2rem;
  border-radius: 10px;
  height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const InputPanel = styled(Panel)`
  background-color: #ffe6e6;
  margin-right: 1rem;
`;

const OutputPanel = styled(Panel)`
  background-color: #e6f0ff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: start; /* Align titles to the start */
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

const TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  background-color: #fff;
  box-sizing: border-box;
`;

const LyricsDisplay = styled.div`
  flex: 1;
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  min-height: 200px;
  white-space: pre-wrap;
  overflow-y: auto;
  font-family: inherit;
  font-size: 1rem;
`;

function CreateLyrics() {
  const [bpm, setBpm] = useState('');
  const [theme, setTheme] = useState('');
  const [reference, setReference] = useState('');
  const [genre, setGenre] = useState('');
  const [metre, setMetre] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedLyrics, setGeneratedLyrics] = useState('');
  const [selectedWord, setSelectedWord] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [replaceLoading, setReplaceLoading] = useState(false);
  const [replaceError, setReplaceError] = useState('');

  const [highlightInfo, setHighlightInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // The API endpoint - change to your server address if different
      const apiUrl = '/generate-lyrics';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bpm: parseInt(bpm, 10) || 100,
          theme,
          referenceArtist: reference,
          keywords,
          genre,
          metre
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate lyrics');
      }
      
      const data = await response.json();
      setGeneratedLyrics(data.lyrics);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while generating lyrics. Please try again.');
      setGeneratedLyrics('');
    } finally {
      setIsLoading(false);
    }
  };

  // 가사 편집창에서 텍스트 선택 시 선택된 단어 추출
  const handleSelection = (e) => {
    const textarea = e.target;
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).trim();
    setSelectedWord(selection);
  };

  // 선택된 단어가 포함된 줄(lineText) 추출 함수
  const getLineWithSelectedWord = () => {
    if (!selectedWord) return '';
    const lines = generatedLyrics.split('\n');
    return lines.find(line => line.includes(selectedWord)) || '';
  };

  // AI로 단어 바꾸기 버튼 클릭 시
  const handleReplaceWord = async () => {
    if (!selectedWord) return;
    setReplaceLoading(true);
    setReplaceError('');
    const lineText = getLineWithSelectedWord();
    try {
      const response = await fetch('/generate-lyrics/replace-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalLyrics: generatedLyrics,
          selectedWord,
          lineText
        })
      });
      if (!response.ok) throw new Error('Failed to replace word');
      const data = await response.json();
      const newWord = data.newWord;
      // 해당 줄에서 단어 교체
      const lines = generatedLyrics.split('\n');
      const newLines = lines.map((line, idx) => {
        if (line === lineText) {
          // 교체된 단어의 인덱스 찾기 (첫 번째만)
          const wordArr = line.split(' ');
          const wordIdx = wordArr.findIndex(w => w === selectedWord);
          if (wordIdx !== -1) {
            wordArr[wordIdx] = newWord;
            setHighlightInfo({ lineIdx: idx, wordIdx, word: newWord });
            return wordArr.join(' ');
          }
        }
        return line;
      });
      setGeneratedLyrics(newLines.join('\n'));
      setSelectedWord('');
    } catch (err) {
      setReplaceError('AI 단어 교체에 실패했습니다.');
    } finally {
      setReplaceLoading(false);
    }
  };

  return (
    <PageContainer>
     
      <Header>
        
        <Title>LYRICAi</Title>
      </Header>
      <Content>
        <InputPanel>
          <h2>INPUT</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="bpm">BPM</Label>
              <Input
                id="bpm"
                type="number"
                placeholder="Numbers Only"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="theme">Theme</Label>
              <Input
                id="theme"
                type="text"
                placeholder="What is the Theme of your song?"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="reference">Reference (Artist)</Label>
              <Input
                id="reference"
                type="text"
                placeholder="Optional"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                type="text"
                placeholder="Comma-separated keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="genre">Genre</Label>
              <Select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">Select a genre</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Jazz">Jazz</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="metre">Metre</Label>
              <Select
                id="metre"
                value={metre}
                onChange={(e) => setMetre(e.target.value)}
              >
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
          <LyricsDisplay>
            {generatedLyrics.split('\n').map((line, i) => (
              <div key={i}>
                {line.split(' ').map((word, j) => {
                  const isHighlight =
                    highlightInfo &&
                    highlightInfo.lineIdx === i &&
                    highlightInfo.wordIdx === j &&
                    highlightInfo.word === word;
                  return (
                    <span
                      key={j}
                      style={isHighlight ? { color: 'red', fontWeight: 'bold' } : {}}
                    >
                      {word}
                      {j !== line.split(' ').length - 1 ? ' ' : ''}
                    </span>
                  );
                })}
              </div>
            ))}
          </LyricsDisplay>
          <Button
            type="button"
            onClick={handleReplaceWord}
            disabled={!selectedWord || replaceLoading}
            style={{ marginTop: '1rem', backgroundColor: selectedWord ? 'black' : '#ccc' }}
          >
            {replaceLoading ? 'AI로 교체 중...' : 'AI로 단어 바꾸기'}
          </Button>
          {replaceError && <p style={{ color: 'red', marginTop: '0.5rem' }}>{replaceError}</p>}
        </OutputPanel>
      </Content>
    </PageContainer>
  );
}

export default CreateLyrics;
