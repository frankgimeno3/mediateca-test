'use client';

import React, { FC, useState } from 'react';
import { Folder } from '../types';

interface AddMediaModalProps {
  isOpen: boolean;
  folders: Folder[];
  onConfirm: (name: string, src: string, folderIds: string[]) => void;
  onCancel: () => void;
}

const AddMediaModal: FC<AddMediaModalProps> = ({ isOpen, folders, onConfirm, onCancel }) => {
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (name.trim() && src.trim() && selectedFolders.length > 0) {
      onConfirm(name, src, selectedFolders);
      setName('');
      setSrc('');
      setSelectedFolders([]);
    }
  };

  const handleCancel = () => {
    setName('');
    setSrc('');
    setSelectedFolders([]);
    onCancel();
  };

  const toggleFolder = (folderId: string) => {
    if (selectedFolders.includes(folderId)) {
      setSelectedFolders(selectedFolders.filter(id => id !== folderId));
    } else {
      setSelectedFolders([...selectedFolders, folderId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center text-gray-600">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Añadir Media</h3>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MediaFolder (selecciona al menos uno)
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border p-2 rounded-md">
              {folders.map((folder) => (
                <label key={folder.idFolder} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedFolders.includes(folder.idFolder)}
                    onChange={() => toggleFolder(folder.idFolder)}
                    className="mr-2"
                  />
                  <span className="text-sm">{folder.FolderName}</span>
                </label>
              ))}
            </div>
          </div>
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
            disabled={selectedFolders.length === 0}
            className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMediaModal;
