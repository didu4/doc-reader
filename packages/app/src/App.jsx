import { useState } from 'react';
import { loadDocument } from '@doc-reader/core';
import FileDropzone from './components/FileDropzone.jsx';
import DocView from './components/DocView.jsx';

export default function App() {
  const [doc, setDoc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(file) {
    setError(null);
    setDoc(null);
    setLoading(true);
    setFileName(file.name);

    try {
      const result = await loadDocument(file);
      setDoc(result);
    } catch (e) {
      setError(e.message || 'Не удалось прочитать файл');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Doc Reader</h1>
        <p className="app__subtitle">Чтение DOCX и DOC прямо в браузере</p>
      </header>

      <FileDropzone onFile={handleFile} disabled={loading} />

      {fileName && (
        <p className="app__filename">
          Файл: <strong>{fileName}</strong>
        </p>
      )}

      {loading && <p className="app__status">Читаем документ…</p>}

      {error && (
        <div className="app__error">
          <strong>Ошибка:</strong> {error}
        </div>
      )}

      {doc && <DocView html={doc.html} format={doc.format} />}
    </div>
  );
}