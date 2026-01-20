'use client';

import React, { FC, useState, useEffect } from 'react';
import { MediaContent } from '../types';

interface EditMediaModalProps {
  isOpen: boolean;
  media: MediaContent | null;
  onConfirm: (name: string, src: string) => void;
  onCancel: () => void;
}

const EditMediaModal: FC<EditMediaModalProps> = ({ isOpen, media, onConfirm, onCancel }) => {
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (media) {
      setName(media.contentName);
      setSrc(media.contentSrc);
    }
  }, [media]);

  if (!isOpen || !media) return null;

  const handleConfirm = () => {
    if (name.trim() && src.trim()) {
      onConfirm(name, src);
    }
  };

  const handleCancel = () => {
    setName('');
    setSrc('');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center text-gray-600">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Editar Media</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="contentName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="contentSrc"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={handleCancel}
            className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMediaModal;
