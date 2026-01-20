'use client';

import React, { FC } from 'react';

interface SearchBarProps {
  mediaIdFilter: string;
  contentNameFilter: string;
  publicationDateFilter: string;
  postIdFilter: string;
  onMediaIdChange: (value: string) => void;
  onContentNameChange: (value: string) => void;
  onPublicationDateChange: (value: string) => void;
  onPostIdChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  mediaIdFilter,
  contentNameFilter,
  publicationDateFilter,
  postIdFilter,
  onMediaIdChange,
  onContentNameChange,
  onPublicationDateChange,
  onPostIdChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID de Media</label>
        <input
          type="text"
          value={mediaIdFilter}
          onChange={(e) => onMediaIdChange(e.target.value)}
          className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar por ID..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Contenido</label>
        <input
          type="text"
          value={contentNameFilter}
          onChange={(e) => onContentNameChange(e.target.value)}
          className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar por nombre..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Publicación</label>
        <input
          type="text"
          value={publicationDateFilter}
          onChange={(e) => onPublicationDateChange(e.target.value)}
          className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar por fecha..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID de Post</label>
        <input
          type="text"
          value={postIdFilter}
          onChange={(e) => onPostIdChange(e.target.value)}
          className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar por post ID..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
