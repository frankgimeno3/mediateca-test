'use client';

import React from 'react';
import Image from 'next/image';
import cardsContents from './contents/cardsContents.json';

interface Card {
  src: string;
  title: string;
  subtitle: string;
}

const PostList: React.FC = () => {
  const cards: Card[] = cardsContents as Card[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-48">
            <Image
              src={card.src}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
