import icons from "./icons.json" with { type: "json" };
function getIcon(name) {
  if (!(name in icons)) {
    console.log(`Icon "${name}" not available`);
    return "";
  }

  const svgDef = icons[name];
  const primaryPath = svgDef[4];
  return {
    path: primaryPath,
    viewBox: `${svgDef[0]} ${svgDef[1]} ${svgDef[2]} ${svgDef[3]}`,
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
