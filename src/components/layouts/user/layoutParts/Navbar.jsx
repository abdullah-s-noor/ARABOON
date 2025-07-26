import { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./Sidebar";
import { AccountCircle, Brightness7, PersonAdd } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import style from "./style";
import SelectLanguage from "../../../common/SelectLanguage";
export default function Navbar() {

  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language?.toUpperCase() || "EN");
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const menuItems = [
    t("home"),
    t("ranking"),
    t("manga list"),
    t("favorited"),
    t("about us"),
  ];
  return (
    <AppBar position="static" sx={style.appBar}>
      <Toolbar sx={style.toolbar}>
        {/* Yellow bar on hover */}
        <Box
          sx={{

            left: barStyle.left,
            width: barStyle.width,
            opacity: hoveredIdx !== null ? 1 : 0,
            transform: `scaleY(${hoveredIdx !== null ? 1 : 0})`,
            ...style.yellowBar,
          }}
        />

        {/* Logo */}
        {windowWidth > 900 ?
          (<Box sx={{ display: "flex", alignItems: "center", position: 'relative' }}>
            <img src="/image/logo/6.png" alt="Logo" style={{ height: 64, marginRight: 8 }} />
            <img src="/image/logo/7.gif" style={{ height: 55, position: 'absolute', bottom: '0', ...(language === 'AR' && { left: 0 }) }} />
          </Box>) :
          <Sidebar language={language} setLanguage={setLanguage} />
        }

        {/* Menu Items */}
        {windowWidth > 900 ?
          (<Box sx={{ display: "flex", gap: 2 }}>
            {menuItems.map((item, idx) => (
              <Typography
                key={item}
                ref={(el) => {
                  menuRefs.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                sx={style.menuItems}
              >
                {item}
              </Typography>
            ))}
          </Box>)
          :
          (<Box sx={{ display: "flex", alignItems: "center", position: 'relative' }}>
            <img src="/image/logo/6.png" alt="Logo" style={{ height: 64, marginRight: 8 }} />
            <img src="/image/logo/7.gif" style={{ height: 55, position: 'absolute', bottom: '0', ...(language === 'AR' && { left: 0 }) }} />
          </Box>)
        }

        {/* Language & LightDark Mode& Login & Search */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {windowWidth > 900 &&
            <>
              <SelectLanguage
                language={language}
                setLanguage={setLanguage}
              />
              {/* Light&Dark Mode */}
              <Box
                sx={style.menuIcons}
              >
                <Brightness7 sx={{ color: "#ccc" }} fontSize="medium" />
              </Box>
              {/* Login Icon */}
              <Box
                sx={style.menuIcons}
              >
                <AccountCircle sx={{ color: "#ccc" }} fontSize="medium" />
              </Box>
            </>
          }
          {/* Search Icon Only */}
          <Box
            sx={style.menuIcons}
          >
            <SearchIcon sx={{ color: "#ccc" }} fontSize="medium" />
          </Box>
        </Box>

      </Toolbar>
    </AppBar>
  );
}


/*
  When the page renders, the menuItems array is mapped into <Typography> components.
  Each menu item uses a `ref` to store its DOM element into the `menuRefs.current[]` array.

  For example, menuRefs.current[0] holds the first menu item's DOM node.

  This allows us to:
    - Access the element's position and size using: menuRefs.current[idx].getBoundingClientRect()
    - Get the element's parent using: parentNode or menuRefs.current[idx].parentNode.parentNode
    - Read computed CSS properties using: getComputedStyle(menuRefs.current[idx]).padding, margin, etc.

  We use this to move and size the yellow hover bar dynamically,
  based on the hovered menu item's actual width and position in the UI.

  
 console.log("Hovered Index:", hoveredIdx);
      console.log("Menu Refs:", menuRefs.current);
      console.log("Menu Item:", menuRefs.current[hoveredIdx]);
      console.log("Menu Item Rect:", menuRefs.current[hoveredIdx].getBoundingClientRect());
      console.log("Parent Node:", menuRefs.current[hoveredIdx].parentNode);
      console.log("Parent Node Rect:", menuRefs.current[hoveredIdx].parentNode.getBoundingClientRect());
      console.log("Hovered Item:", menuRefs.current[hoveredIdx].textContent);
      console.log("Hovered Item Style:", getComputedStyle(menuRefs.current[hoveredIdx]));
      console.log("Hovered Item Color:", getComputedStyle(menuRefs.current[hoveredIdx]).color);
      console.log("Hovered Item Font Size:", getComputedStyle(menuRefs.current[hoveredIdx]).fontSize);
      console.log("Hovered Item Font Weight:", getComputedStyle(menuRefs.current[hoveredIdx]).fontWeight);
      console.log("Hovered Item Padding:", getComputedStyle(menuRefs.current[hoveredIdx]).padding);
      console.log("Hovered Item Margin:", getComputedStyle(menuRefs.current[hoveredIdx]).margin);
      console.log("Hovered Item Display:", getComputedStyle(menuRefs.current[hoveredIdx]).display);
      console.log("Hovered Item Position:", getComputedStyle(menuRefs.current[hoveredIdx]).position);
      console.log("Hovered Item Left:", getComputedStyle(menuRefs.current[hoveredIdx]).left);
      console.log("Hovered Item Top:", getComputedStyle(menuRefs.current[hoveredIdx]).top);
      console.log("Hovered Item Width:", getComputedStyle(menuRefs.current[hoveredIdx]).width);
      console.log("Hovered Item Height:", getComputedStyle(menuRefs.current[hoveredIdx]).height);
      console.log("Hovered Item Z-Index:", getComputedStyle(menuRefs.current[hoveredIdx]).zIndex);
      console.log("Hovered Item Transform:", getComputedStyle(menuRefs.current[hoveredIdx]).transform);
      console.log("Hovered Item Opacity:", getComputedStyle(menuRefs.current[hoveredIdx]).opacity);
      console.log("Hovered Item Visibility:", getComputedStyle(menuRefs.current[hoveredIdx]).visibility);
  */
