'use client';

import React, { FC } from 'react';
import { Folder } from '../types';

interface FoldersSidebarProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string) => void;
  onEditFolder: (folder: Folder) => void;
}

const FoldersSidebar: FC<FoldersSidebarProps> = ({
  folders,
  selectedFolderId,
  onSelectFolder,
  onEditFolder,
}) => {
  return (
    <div className="w-64 border-r overflow-y-auto p-4">
      <h3 className="font-semibold text-gray-700 mb-3">Carpetas</h3>
      <div className="space-y-2">
        {folders.map((folder) => (
          <div
            key={folder.idFolder}
            className={`p-3 rounded-md cursor-pointer border ${
              selectedFolderId === folder.idFolder
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => onSelectFolder(folder.idFolder)}
                className="flex-1"
              >
                <p className="font-medium text-gray-700">{folder.FolderName}</p>
                <p className="text-sm text-gray-500">{folder.MediaArray.length} items</p>
              </div>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditFolder(folder);
                  }}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  ⋮
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoldersSidebar;
