import { useState, useEffect, useCallback, useRef } from 'react';
import { EVENTS } from '../configs';
import { minMax } from '.';


export const useViewportDimensions = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [setDimensions]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return dimensions;
}

export const useDrag = (
  defaultOrigin: ScreenCoordinates,
  container: React.RefObject<HTMLElement>,
  draggable: React.RefObject<HTMLElement>,
) => {
  // tracking whether if the child is grabbed by the cursor.
  const [grabbed, setGrabbed] = useState<boolean>(false);
  // top left corner of the draggable child.
  const [origin, setOrigin] = useState<ScreenCoordinates>(defaultOrigin);
  // offset from cursor pointer to origin.
  // set while grabbing the draggable child.
  const [cursorOffset, setCursorOffset] = useState<ScreenCoordinates>({ x: 0, y: 0 });

  const grabChild = useCallback(({ clientX, clientY }) => {
    setGrabbed(true);

    const { offsetLeft, offsetTop } = draggable.current as HTMLElement;
    setCursorOffset({
      x: clientX - (offsetLeft || 0),
      y: clientY - (offsetTop || 0)
    });
  }, [setGrabbed, setCursorOffset, draggable]);

  // event handlers.
  const onRelease = useCallback(() => { setGrabbed(false); }, [setGrabbed]);
  const onDrag = useCallback(({ clientX, clientY }) => {
    setOrigin((state) => {
      if (!grabbed) { return state; }

      const c = container.current as HTMLElement;
      const d = draggable.current as HTMLElement;

      // getting initial x, y by subtracting cursor offset from clientx/y
      // and then setting bounds [0 .. width/height]
      // need to subtract draggablewidth from containerwidth, as origin 
      // starts from top left corner of the draggable;
      const x = minMax(clientX - cursorOffset.x, 0, c.offsetWidth - d.offsetWidth);
      const y = minMax(clientY - cursorOffset.y, 0, c.offsetHeight - d.offsetHeight);

      return { x, y };
    });
  }, [grabbed, setOrigin, cursorOffset, container, draggable]);

  // side effects.
  useEffect(() => {
    document.addEventListener(EVENTS.mousemove, onDrag);
    document.addEventListener(EVENTS.mouseup, onRelease);
    return () => {
      document.removeEventListener(EVENTS.mousemove, onDrag);
      document.removeEventListener(EVENTS.mouseup, onRelease);
    }
  }, [onDrag, onRelease]);

  useEffect(() => {
    if (container.current) {
      const { offsetLeft, offsetTop } = container.current;
      setOrigin({ x: offsetLeft, y: offsetTop });
    }
  }, [container, setOrigin]);

  return { origin, setOrigin, grabChild };
}


export const useImageCropper = () => {
  // assuming (for now), both the container as well as the ImageCropper
  // child, is a div element.
  const container = useRef<HTMLDivElement>(null);
  const draggable = useRef<HTMLElement>(null);

  const {
    origin,
    setOrigin,
    grabChild,
  } = useDrag({ x: 0, y: 0 }, container, draggable);

  const containerProps = useCallback(({ style, ...rest }) => ({
    ...rest,
    style: {
      ...style,
      position: 'relative',
      width: 1024,
      height: 1024
    },
    ref: container,
  } as React.HTMLAttributes<HTMLElement>), []);

  const draggableProps = useCallback((
    // default provided attrs (if any).
    { style, ...rest }: React.HTMLAttributes<HTMLElement>
  ) => ({
    ...rest,
    ref: draggable,
    onMouseDown: grabChild,
    style: {
      ...style,
      position: 'absolute',
      left: `${origin.x}px`,
      top: `${origin.y}px`,
      backgroundColor: 'rgba(255, 255, 255, .3)',
      border: '.5px solid white',
      cursor: 'move',
    },
  } as React.HTMLAttributes<HTMLElement>), [origin, draggable, grabChild]);

  return { containerProps, draggableProps, origin, setOrigin };
}
