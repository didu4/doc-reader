import { useRef, useState } from 'react';

export default function FileDropzone({ onFile, disabled }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  function pickFile() {
    if (!disabled) inputRef.current?.click();
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    e.target.value = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  const className = [
    'dropzone',
    dragOver ? 'dropzone--over' : '',
    disabled ? 'dropzone--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      onClick={pickFile}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pickFile();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".docx,.doc"
        hidden
        onChange={handleInputChange}
      />
      <p className="dropzone__title">Перетащите файл сюда</p>
      <p className="dropzone__hint">или нажмите, чтобы выбрать .docx или .doc</p>
    </div>
  );
}