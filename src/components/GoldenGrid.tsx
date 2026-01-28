import { ReactNode } from 'react';

interface GoldenGridProps {
  main: ReactNode;
  sidebar?: ReactNode;
  reversed?: boolean; // If true, the smaller section comes first
  className?: string;
}

export default function GoldenGrid({
  main,
  sidebar,
  reversed = false,
  className = '',
}: GoldenGridProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 ${className}`}>
      {/*
        The Golden Ratio is approx 1.618.
        In a 12-column grid:
        12 / 1.618 ≈ 7.4 (round to 7 or 8)
        Let's do a 7/5 split which is 1.4, or 8/4 which is 2.
        Actually, 1.618 split of 100% is roughly 62% / 38%.
        12 * 0.62 = 7.44 -> 7 or 8 cols.
        12 * 0.38 = 4.56 -> 4 or 5 cols.
        Let's try a 7/5 split (1.4 ratio) or 8/4 (2 ratio).
        7/5 is closer to pure golden ratio (1.4 is closer to 1.6 than 2.0).
        Wait, 7/5 = 1.4.
        8/5 = 1.6! (Perfect match for Fibonacci sequence 1,1,2,3,5,8...)
        So we need 13 columns? No, standard tailwind is 12.

        Let's use custom percentages or just approx with 8/4 (2/1) or 7/5.
        Actually, let's use flexbox with shrink/grow based on golden ratio?

        For simplicity and grid alignment, let's try col-span-8 (66%) and col-span-4 (33%).
        Or custom grid template: 1fr 1.618fr.
      */}

      <div
        className={`
          flex flex-col justify-center
          ${reversed ? 'order-last lg:col-span-8' : 'order-first lg:col-span-8'}
          ${!sidebar ? 'lg:col-span-12 max-w-5xl mx-auto' : ''}
        `}
      >
        {main}
      </div>

      {sidebar && (
        <div
          className={`
            flex flex-col justify-center
            ${reversed ? 'order-first lg:col-span-4' : 'order-last lg:col-span-4'}
          `}
        >
          {sidebar}
        </div>
      )}
    </div>
  );
}
