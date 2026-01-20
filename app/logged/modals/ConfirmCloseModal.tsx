'use client';

import React, { FC } from 'react';

interface ConfirmCloseModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCloseModal: FC<ConfirmCloseModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center text-gray-600">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h3 className="text-lg font-semibold mb-4">¿Estás seguro de que quieres salir?</h3>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCloseModal;
