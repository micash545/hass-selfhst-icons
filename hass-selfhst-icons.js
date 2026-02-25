import icons from "./icons.json" with { type: "json" };
function getIcon(name) {
  if (!(name in icons)) {
    console.log(`Icon "${name}" not available`);
    return "";
  }

  const svgDef = icons[name];
  return {
    viewBox: `${svgDef.viewBox[0]} ${svgDef.viewBox[1]} ${svgDef.viewBox[2]} ${svgDef.viewBox[3]}`,
    elements: svgDef.elements,
  };
}

function getIconList() {
  return Object.entries(icons).map(([icon]) => ({
    name: icon,
  }));
}

globalThis.customIconsets = globalThis.customIconsets || {};
globalThis.customIconsets.selfhst = getIcon;

globalThis.customIcons = globalThis.customIcons || {};
globalThis.customIcons.selfhst = { getIcon, getIconList };
