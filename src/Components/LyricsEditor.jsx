import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const EditableDiv = styled.div`
  width: 100%;
  height: 500px;
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
    if (divRef.current && !divRef.current.innerText.trim()) {
      divRef.current.innerHTML = lyrics;
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
      const replaced = `<span style="color: red;">${data.newWord}</span>`;

      range.deleteContents();
      const el = document.createElement('span');
      el.innerHTML = replaced;
      range.insertNode(el);

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
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: isEditing ? '#999' : 'black',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isEditing ? 'not-allowed' : 'pointer'
        }}
        disabled={isEditing}
      >
        {isEditing ? 'AI 편집 중...' : '선택한 단어를 라임으로 교체'}
      </button>
    </div>
  );
}

export default LyricsEditor;
