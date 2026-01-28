import type { CardTransform } from '@/types/carousel';

export function getCardTransform(
  cardIndex: number,
  activeIndex: number,
  totalCards: number,
): CardTransform {
  // Calculate relative position (-2, -1, 0, 1, 2)
  let diff = cardIndex - activeIndex;

  // Handle circular wrapping
  if (diff > Math.floor(totalCards / 2)) {
    diff -= totalCards;
  }
  if (diff < -Math.floor(totalCards / 2)) {
    diff += totalCards;
  }

  const rotation = diff * 72; // 72° per position (360° / 5)
  const isActive = diff === 0;
  const isNear = Math.abs(diff) === 1;

  // Calculate scale based on position
  let scale = 0.5; // default for far
  if (isActive) scale = 1;
  else if (isNear) scale = 0.7;

  // Calculate opacity based on position
  let opacity = 0.4; // default for far
  if (isActive) opacity = 1;
  else if (isNear) opacity = 0.7;

  return {
    rotateY: rotation,
    scale,
    opacity,
    zIndex: 5 - Math.abs(diff),
    translateZ: isActive ? 0 : -200,
    isGoldenRect: isActive,
  };
}
