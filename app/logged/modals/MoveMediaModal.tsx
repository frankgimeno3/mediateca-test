'use client';

import React, { FC, useState } from 'react';
import { MediaContent, Folder } from '../types';

interface MoveMediaModalProps {
  isOpen: boolean;
  media: MediaContent | null;
  folders: Folder[];
  onConfirm: (folderId: string) => void;
  onCancel: () => void;
}

const MoveMediaModal: FC<MoveMediaModalProps> = ({ isOpen, media, folders, onConfirm, onCancel }) => {
  const [selectedFolder, setSelectedFolder] = useState('');

  if (!isOpen || !media) return null;

  const handleConfirm = () => {
    if (selectedFolder) {
      onConfirm(selectedFolder);
      setSelectedFolder('');
    }
  };

  const handleCancel = () => {
    setSelectedFolder('');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center text-gray-600">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Mover Media</h3>
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecciona una carpeta</option>
          {folders.map((folder) => (
            <option key={folder.idFolder} value={folder.idFolder}>
              {folder.FolderName}
            </option>
          ))}
        </select>
        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={handleCancel}
            className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFolder}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Mover
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveMediaModal;
