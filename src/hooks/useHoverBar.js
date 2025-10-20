import { useRef, useState, useEffect } from "react";
export default function useHoverBar() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef([]);
  useEffect(() => {
    if (hoveredIdx !== null && menuRefs.current[hoveredIdx]) {
      const item = menuRefs.current[hoveredIdx];
      const parent = item.parentNode.parentNode;
      const rect = item.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setBarStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    }
  }, [hoveredIdx]);

  return { hoveredIdx, setHoveredIdx, menuRefs, barStyle };
}
