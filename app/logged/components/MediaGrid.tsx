'use client';

import React, { FC } from 'react';
import { MediaContent, Folder } from '../types';
import MediaCard from './MediaCard';

interface MediaGridProps {
  media: MediaContent[];
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectMedia: (media: MediaContent) => void;
  onEditMedia: (media: MediaContent) => void;
  onMoveMedia: (media: MediaContent) => void;
  onDeleteMedia: (mediaId: string) => void;
  openMenuId: string | null;
  onToggleMenu: (mediaId: string) => void;
}

const MediaGrid: FC<MediaGridProps> = ({
  media,
  folders,
  selectedFolderId,
  onSelectMedia,
  onEditMedia,
  onMoveMedia,
  onDeleteMedia,
  openMenuId,
  onToggleMenu,
}) => {
  const folderName = selectedFolderId
    ? folders.find(f => f.idFolder === selectedFolderId)?.FolderName
    : null;

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-semibold text-gray-700 mb-4">
        {selectedFolderId ? `Contenido: ${folderName}` : 'Todo el contenido'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <MediaCard
            key={item.mediaId}
            media={item}
            onSelect={onSelectMedia}
            onEdit={onEditMedia}
            onMove={onMoveMedia}
            onDelete={onDeleteMedia}
            isMenuOpen={openMenuId === item.mediaId}
            onToggleMenu={() => onToggleMenu(item.mediaId)}
          />
        ))}
      </div>
      {media.length === 0 && (
        <p className="text-center text-gray-500 py-8">No hay contenido para mostrar</p>
      )}
    </div>
  );
};

export default MediaGrid;
