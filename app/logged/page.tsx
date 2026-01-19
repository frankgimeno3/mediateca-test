'use client';

import React, { FC, useState } from 'react';
import TopNav from './TopNav';

interface LoggedPageProps {
  
}

const LoggedPage: FC<LoggedPageProps> = ({ }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [useSrc, setUseSrc] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleClearAll = () => {
    setTitle('');
    setSubtitle('');
    setImageSrc('');
    setImageFile(null);
  };

  const handleConfirm = () => {
    // Funcionalidad pendiente
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNav />
      <div className="max-w-2xl mx-auto p-6">
        <form className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el título"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              id="subtitle"
              value={subtitle || ''}
              onChange={(e) => setSubtitle(e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el subtítulo"
            />
          </div>

          <div>
            <label className="flex items-center space-x-3 mb-4">
              <span className="text-sm font-medium text-gray-700">
                {useSrc ? 'Introducir URL' : 'Adjuntar imagen'}
              </span>
              <button
                type="button"
                onClick={() => setUseSrc(!useSrc)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    useSrc ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            {useSrc ? (
              <input
                key="image-src-input"
                type="text"
                value={imageSrc || ''}
                onChange={(e) => setImageSrc(e.target.value)}
                className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa la URL de la imagen"
              />
            ) : (
              <input
                key="image-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="cursor-pointer bg-gray-500 text-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-400"
              />
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleClearAll}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Borrar todo
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoggedPage;