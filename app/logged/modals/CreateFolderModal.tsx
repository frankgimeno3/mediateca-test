'use client';

import React, { FC, useState } from 'react';

interface CreateFolderModalProps {
  isOpen: boolean;
  onConfirm: (folderName: string) => void;
  onCancel: () => void;
}

const CreateFolderModal: FC<CreateFolderModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (folderName.trim()) {
      onConfirm(folderName);
      setFolderName('');
    }
  };

  const handleCancel = () => {
    setFolderName('');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center text-gray-600">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Crear Carpeta</h3>
        <input
          type="text"
          placeholder="Nombre de la carpeta"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex gap-3 justify-end">
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
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
