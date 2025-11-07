import { useState } from 'react';
import { useStorage } from '../../hooks/useStorage';

export const FileUploader = () => {
  const { upload, uploading, error } = useStorage();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const result = await upload(file);
    if (result) {
      console.log('Uploaded:', result.path);
      console.log('URL:', result.url);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        accept=".txt,.json,.js,.ts,.py,.java,.cpp,.c,.yaml,.yml,.xml,.html,.css"
        disabled={uploading}
      />
      
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};