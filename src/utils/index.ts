type Fetch = (input: RequestInfo, init?: RequestInit | undefined) => Promise<any>;

// fetch request after handling errors, as not a lot of
// error handling has been done on the server side.
export const fetchJson: Fetch = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export const minMax = (
  value: number,
  min: number,
  max: number
) => Math.min(max, Math.max(min, value));

export const subCoordinates = (a: ScreenCoordinates, b: ScreenCoordinates): ScreenCoordinates => {
  return { x: a.x - b.x, y: a.y - b.y };
}


