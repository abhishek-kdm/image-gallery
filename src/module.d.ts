type Dimensions = { width: number, height: number };

type Maybe<T> = T | null;
type Omit<T, k extends keyof t> = Pick<T, Exclude<keyof T, k>>;
