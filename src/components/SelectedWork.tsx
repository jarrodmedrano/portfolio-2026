'use client';

import { carouselItems } from '@/data/projects';
import Carousel3D from './Carousel3D';

export default function SelectedWork() {
  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Selected Work
          </h2>
          <div className="h-px bg-black w-full" />
        </div>

        {/* Carousel */}
        <Carousel3D items={carouselItems} autoPlayInterval={5000} />
      </div>
    </section>
  );
}
