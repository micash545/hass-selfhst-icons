#!/usr/bin/node
import fs from "node:fs"
import { load } from "cheerio"
import path from "node:path";

const svgDir = "icons/svg"

function parseViewBox(viewBox) {
  if (!viewBox) return null;
  return viewBox.trim().split(/\s+/);
}

function parseSvgFile(filePath) {
  const svgContent = fs.readFileSync(filePath, "utf8");
  const $ = load(svgContent, { xmlMode: true });

  const viewBoxRaw = $("svg").attr("viewBox") || null;
  const viewBox = parseViewBox(viewBoxRaw);

  // Get all circles and paths, including their styles
  const circles = $("circle").map((_, el) => {
    return {
      type: "circle",
      cx: $(el).attr("cx"),
      cy: $(el).attr("cy"),
      r: $(el).attr("r"),
      class: $(el).attr("class"),
      transform: $(el).attr("transform"),
      style: $(el).attr("style"),
    };
  }).get();

  const paths = $("path").map((_, el) => {
    return {
      type: "path",
      d: $(el).attr("d"),
      class: $(el).attr("class"),
      style: $(el).attr("style"),
    };
  }).get();

  return { viewBox, elements: [...circles, ...paths] };
}

function saveIcons(icons) {
  fs.writeFileSync("icons.json", JSON.stringify(icons))
}

const icons = {}
const svgFiles = fs.readdirSync(svgDir)
  .filter(file => file.endsWith("-dark.svg"));

svgFiles.forEach(file => {
  console.log(file)
  const result = parseSvgFile(path.join(svgDir, file))
  icons[file.replace("-dark.svg", "")] = result
})

saveIcons(icons)


