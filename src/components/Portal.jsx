import {createPortal} from 'react-dom';
import {useRef, useLayoutEffect} from 'react';

export function Portal({children, className}) {
  const portalChild = useRef(document.createElement('div'));

  useLayoutEffect(() => {
    const portalRoot = document.getElementById('portal-root');
    portalChild.current.className = className;

    const node = portalChild.current;
    portalRoot.appendChild(node);
    return () => portalRoot.removeChild(node);
  }, [className]);

  return createPortal(children, portalChild.current);
}
