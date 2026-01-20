'use client';

import React, { FC, useState, useEffect, useCallback } from 'react';
import mediatecaFolders from '../contents/MediatecaFolders.json';
import mediatecaContents from '../contents/mediatecaContents.json';
import { MediaContent, Folder } from './types';
import FoldersSidebar from './components/FoldersSidebar';
import MediaGrid from './components/MediaGrid';
import SearchBar from './components/SearchBar';
import ConfirmCloseModal from './modals/ConfirmCloseModal';
import CreateFolderModal from './modals/CreateFolderModal';
import AddMediaModal from './modals/AddMediaModal';
import EditMediaModal from './modals/EditMediaModal';
import MoveMediaModal from './modals/MoveMediaModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import EditFolderModal from './modals/EditFolderModal';

interface MediatecaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (media: MediaContent) => void;
}

const MediatecaModal: FC<MediatecaModalProps> = ({ isOpen, onClose, onSelectMedia }) => {
  const [folders, setFolders] = useState<Folder[]>(mediatecaFolders as Folder[]);
  const [contents, setContents] = useState<MediaContent[]>(mediatecaContents as MediaContent[]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [mediaIdFilter, setMediaIdFilter] = useState('');
  const [contentNameFilter, setContentNameFilter] = useState('');
  const [publicationDateFilter, setPublicationDateFilter] = useState('');
  const [postIdFilter, setPostIdFilter] = useState('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteFolderConfirm, setShowDeleteFolderConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'media' | 'folder'; id: string } | null>(null);
  const [showEditMedia, setShowEditMedia] = useState(false);
  const [showMoveMedia, setShowMoveMedia] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaContent | null>(null);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [mediaMenuOpen, setMediaMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !showConfirmClose) {
          setShowConfirmClose(true);
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, showConfirmClose]);

  const getCurrentFolderMedia = useCallback(() => {
    if (!selectedFolderId) return [];
    const folder = folders.find(f => f.idFolder === selectedFolderId);
    if (!folder) return [];
    return contents.filter(c => folder.MediaArray.includes(c.mediaId));
  }, [selectedFolderId, folders, contents]);

  const getFilteredMedia = useCallback(() => {
    const media = selectedFolderId ? getCurrentFolderMedia() : contents;
    
    return media.filter(m => {
      const matchesMediaId = !mediaIdFilter || m.mediaId.toLowerCase().includes(mediaIdFilter.toLowerCase());
      const matchesContentName = !contentNameFilter || m.contentName.toLowerCase().includes(contentNameFilter.toLowerCase());
      const matchesPublicationDate = !publicationDateFilter || m.publicationTimestamp.toLowerCase().includes(publicationDateFilter.toLowerCase());
      const matchesPostId = !postIdFilter || (m.postId && m.postId.toLowerCase().includes(postIdFilter.toLowerCase()));
      
      return matchesMediaId && matchesContentName && matchesPublicationDate && matchesPostId;
    });
  }, [selectedFolderId, getCurrentFolderMedia, contents, mediaIdFilter, contentNameFilter, publicationDateFilter, postIdFilter]);

  const handleCreateFolder = (folderName: string) => {
    const newFolder: Folder = {
      idFolder: `folder-${Date.now()}`,
      FolderName: folderName,
      MediaArray: []
    };
    setFolders([...folders, newFolder]);
    setShowCreateFolder(false);
  };

  const handleAddMedia = (name: string, src: string, folderIds: string[]) => {
    const newMedia: MediaContent = {
      mediaId: `media-${Date.now()}`,
      contentName: name,
      publicationTimestamp: new Date().toISOString(),
      contentSrc: src,
      postId: `post-${Date.now()}`,
      existsIn: []
    };
    
    setContents([...contents, newMedia]);
    
    setFolders(folders.map(folder => {
      if (folderIds.includes(folder.idFolder)) {
        return {
          ...folder,
          MediaArray: [...folder.MediaArray, newMedia.mediaId]
        };
      }
      return folder;
    }));
    
    setShowAddMedia(false);
  };

  const handleDeleteMedia = () => {
    if (!itemToDelete || itemToDelete.type !== 'media') return;
    
    setContents(contents.filter(c => c.mediaId !== itemToDelete.id));
    setFolders(folders.map(folder => ({
      ...folder,
      MediaArray: folder.MediaArray.filter(id => id !== itemToDelete.id)
    })));
    
    setItemToDelete(null);
    setShowDeleteConfirm(false);
    setMediaMenuOpen(null);
  };

  const handleDeleteFolder = () => {
    if (!itemToDelete || itemToDelete.type !== 'folder') return;
    
    setFolders(folders.filter(f => f.idFolder !== itemToDelete.id));
    if (selectedFolderId === itemToDelete.id) {
      setSelectedFolderId(null);
    }
    
    setItemToDelete(null);
    setShowDeleteFolderConfirm(false);
  };

  const handleEditMedia = (name: string, src: string) => {
    if (!editingMedia) return;
    
    setContents(contents.map(c => 
      c.mediaId === editingMedia.mediaId 
        ? { ...c, contentName: name, contentSrc: src }
        : c
    ));
    
    setEditingMedia(null);
    setShowEditMedia(false);
    setMediaMenuOpen(null);
  };

  const handleMoveMedia = (folderId: string) => {
    if (!editingMedia) return;
    
    let updatedFolders = folders.map(folder => ({
      ...folder,
      MediaArray: folder.MediaArray.filter(id => id !== editingMedia.mediaId)
    }));
    
    updatedFolders = updatedFolders.map(folder => 
      folder.idFolder === folderId
        ? { ...folder, MediaArray: [...folder.MediaArray, editingMedia.mediaId] }
        : folder
    );
    
    setFolders(updatedFolders);
    setEditingMedia(null);
    setShowMoveMedia(false);
    setMediaMenuOpen(null);
  };

  const handleEditFolder = (folderName: string) => {
    if (!editingFolder) return;
    
    setFolders(folders.map(f => 
      f.idFolder === editingFolder.idFolder
        ? { ...f, FolderName: folderName }
        : f
    ));
    
    setEditingFolder(null);
    setShowEditFolder(false);
  };

  const handleConfirmClose = () => {
    setShowConfirmClose(false);
    onClose();
  };

  const handleSelectMediaItem = (media: MediaContent) => {
    if (onSelectMedia) {
      onSelectMedia(media);
      onClose();
    }
  };

  const handleEditMediaClick = (media: MediaContent) => {
    setEditingMedia(media);
    setShowEditMedia(true);
  };

  const handleMoveMediaClick = (media: MediaContent) => {
    setEditingMedia(media);
    setShowMoveMedia(true);
  };

  const handleDeleteMediaClick = (mediaId: string) => {
    setItemToDelete({ type: 'media', id: mediaId });
    setShowDeleteConfirm(true);
  };

  const handleEditFolderClick = (folder: Folder) => {
    setEditingFolder(folder);
    setShowEditFolder(true);
  };

  const handleDeleteFolderClick = (folderId: string) => {
    setItemToDelete({ type: 'folder', id: folderId });
    setShowDeleteFolderConfirm(true);
  };

  if (!isOpen) return null;

  const filteredMedia = getFilteredMedia();

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-gray-700">Mediateca</h2>
            <button
              onClick={() => setShowConfirmClose(true)}
              className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Toolbar */}
          <div className="p-4 border-b space-y-3">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowCreateFolder(true)}
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Folder
              </button>
              <button
                onClick={() => setShowAddMedia(true)}
                className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Añadir Media
              </button>
            </div>
            <SearchBar
              mediaIdFilter={mediaIdFilter}
              contentNameFilter={contentNameFilter}
              publicationDateFilter={publicationDateFilter}
              postIdFilter={postIdFilter}
              onMediaIdChange={setMediaIdFilter}
              onContentNameChange={setContentNameFilter}
              onPublicationDateChange={setPublicationDateFilter}
              onPostIdChange={setPostIdFilter}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex">
            <FoldersSidebar
              folders={folders}
              selectedFolderId={selectedFolderId}
              onSelectFolder={setSelectedFolderId}
              onEditFolder={handleEditFolderClick}
            />
            <MediaGrid
              media={filteredMedia}
              folders={folders}
              selectedFolderId={selectedFolderId}
              onSelectMedia={handleSelectMediaItem}
              onEditMedia={handleEditMediaClick}
              onMoveMedia={handleMoveMediaClick}
              onDeleteMedia={handleDeleteMediaClick}
              openMenuId={mediaMenuOpen}
              onToggleMenu={(id) => setMediaMenuOpen(mediaMenuOpen === id ? null : id)}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmCloseModal
        isOpen={showConfirmClose}
        onConfirm={handleConfirmClose}
        onCancel={() => setShowConfirmClose(false)}
      />

      <CreateFolderModal
        isOpen={showCreateFolder}
        onConfirm={handleCreateFolder}
        onCancel={() => setShowCreateFolder(false)}
      />

      <AddMediaModal
        isOpen={showAddMedia}
        folders={folders}
        onConfirm={handleAddMedia}
        onCancel={() => setShowAddMedia(false)}
      />

      <EditMediaModal
        isOpen={showEditMedia}
        media={editingMedia}
        onConfirm={handleEditMedia}
        onCancel={() => {
          setShowEditMedia(false);
          setEditingMedia(null);
        }}
      />

      <MoveMediaModal
        isOpen={showMoveMedia}
        media={editingMedia}
        folders={folders}
        onConfirm={handleMoveMedia}
        onCancel={() => {
          setShowMoveMedia(false);
          setEditingMedia(null);
        }}
      />

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        title="¿Estás seguro de que quieres eliminar este media?"
        onConfirm={handleDeleteMedia}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
      />

      <EditFolderModal
        isOpen={showEditFolder}
        folder={editingFolder}
        onConfirm={handleEditFolder}
        onDelete={handleDeleteFolderClick}
        onCancel={() => {
          setShowEditFolder(false);
          setEditingFolder(null);
        }}
      />

      <DeleteConfirmModal
        isOpen={showDeleteFolderConfirm}
        title="¿Estás seguro de que quieres eliminar esta carpeta?"
        message="Esto eliminará todos los media asociados a esta carpeta."
        onConfirm={handleDeleteFolder}
        onCancel={() => {
          setShowDeleteFolderConfirm(false);
          setItemToDelete(null);
        }}
      />
    </>
  );
};

export default MediatecaModal;
