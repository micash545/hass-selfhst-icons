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
  const paths = $("path").map((_, el) => $(el).attr("d")).get();

  return [...viewBox, ...paths]
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


