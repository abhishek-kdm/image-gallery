export const minMax = (
  value: number,
  min: number,
  max: number
) => Math.min(max, Math.max(min, value));

export const subCoordinates = (a: ScreenCoordinates, b: ScreenCoordinates): ScreenCoordinates => {
  return { x: a.x - b.x, y: a.y - b.y };
}


