/** simply an `object` with width, height props. */
type Dimensions = { width: number, height: number };
/** simply an `object` with x, y props. */
type ScreenCoordinates = { x: number, y: number };

/**
 * @params actual x, y coordinates relative to the screen.
 * @returns coordinates with adjustments (if any).
 * @description This is used add/modify any kind of 
 * offset/padding to the coordinates before render.
 */
type SanitizedCoordinates = (x: number, y: number) => ScreenCoordinates


type Maybe<T> = T | null;
type Omit<T, k extends keyof t> = Pick<T, Exclude<keyof T, k>>;
