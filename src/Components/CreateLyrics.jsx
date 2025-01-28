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

function CreateLyrics() {
  const [bpm, setBpm] = useState('');
  const [theme, setTheme] = useState('');
  const [reference, setReference] = useState('');
  const [genre, setGenre] = useState('');
  const [metre, setMetre] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedLyrics, setGeneratedLyrics] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setGeneratedLyrics(
      `Generated Lyrics:\nBPM: ${bpm}\nTheme: ${theme}\nReference: ${reference}\nGenre: ${genre}\nMetre: ${metre}\nKeywords: ${keywords}`
    );
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
            <Button type="submit">Generate Lyrics</Button>
          </Form>
        </InputPanel>
        <OutputPanel>
          <h2>OUTPUT</h2>
          <TextArea
            readOnly
            value={generatedLyrics}
            placeholder="Generated lyrics will appear here..."
          />
        </OutputPanel>
      </Content>
    </PageContainer>
  );
}

export default CreateLyrics;
