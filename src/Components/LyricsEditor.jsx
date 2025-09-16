import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const EditableDiv = styled.div`
  width: 100%;
  height: 450px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  overflow-y: auto;
  font-family: inherit;
  font-size: 1rem;
  white-space: pre-wrap;
`;

function LyricsEditor({ lyrics, onUpdateLyrics }) {
  const divRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = lyrics || 'Lyrics will appear here once generated 🎵';
    }
  }, [lyrics]);


  const handleReplaceWithRhyme = async () => {
    const selection = window.getSelection();
    const selected = selection.toString();
    if (!selected) return;

    const range = selection.getRangeAt(0);
    const lineText = selected;
    setIsEditing(true);

    try {
      const res = await fetch('/generate-lyrics/replace-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalLyrics: divRef.current.innerText,
          selectedWord: selected,
          lineText
        })
      });

      const data = await res.json();
      const replaced = document.createElement('span');
      replaced.style.color = 'red';
      replaced.textContent = data.newWord;

      range.deleteContents();
      range.insertNode(replaced);

      // Collapse selection after insert to avoid nested issues
      const selection = window.getSelection();
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.setStartAfter(replaced);
      newRange.collapse(true);
      selection.addRange(newRange);

      onUpdateLyrics(divRef.current.innerHTML);
    } catch (err) {
      console.error('Error replacing word:', err);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div>
      <EditableDiv
        id="lyrics-editor"
        contentEditable
        ref={divRef}
        suppressContentEditableWarning
        onInput={() => onUpdateLyrics(divRef.current.innerHTML)}
      />
      <button
        onClick={handleReplaceWithRhyme}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: isEditing ? '#999' : 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: isEditing ? 'not-allowed' : 'pointer' }}
        disabled={isEditing}
      >
        {isEditing ? 'Editing with AI...' : 'Rhymer'}
      </button>
    </div>
  );
}

export default LyricsEditor;
