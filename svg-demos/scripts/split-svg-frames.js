/**
 * Usage:
 *   node scripts/split-svg-frames.js <input.svg> [frames=7] [outDir=./src/demos/frames/frames-out]
 *
 * Example:
 *   node scripts/split-svg-frames.js scripts/runandfall.svg 6
 */
import fs from 'fs';
import path from 'path';

const [,, inputPath, framesArg = '7', outDirArg] = process.argv;
if (!inputPath) {
  console.error('Provide input SVG path');
  process.exit(1);
}
const FRAMES = parseInt(framesArg, 10) || 7;
const outDir = outDirArg || path.join(path.dirname(inputPath), 'frames-out');

const content = fs.readFileSync(inputPath, 'utf8');
const svgMatch = content.match(/<\?xml[\s\S]*?\?>\s*/i);
const xmlHeader = svgMatch ? svgMatch[0] : '';
const svgTagMatch = content.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/i);
if (!svgTagMatch) {
  console.error('No <svg> tag found');
  process.exit(1);
}
const svgAttrs = svgTagMatch[1];
const inner = svgTagMatch[2];

// parse existing viewBox or width/height
let viewBoxMatch = svgAttrs.match(/viewBox=["']([^"']+)["']/i);
let widthMatch = svgAttrs.match(/width=["']?([\d.]+)([a-z%]*)["']?/i);
let heightMatch = svgAttrs.match(/height=["']?([\d.]+)([a-z%]*)["']?/i);

let vbX = 0, vbY = 0, totalW = null, totalH = null;
if (viewBoxMatch) {
  const parts = viewBoxMatch[1].trim().split(/\s+|,/).map(Number);
  vbX = parts[0] || 0;
  vbY = parts[1] || 0;
  totalW = parts[2];
  totalH = parts[3];
} else {
  if (widthMatch && heightMatch) {
    totalW = parseFloat(widthMatch[1]);
    totalH = parseFloat(heightMatch[1]);
    vbX = 0; vbY = 0;
  } else {
    console.error('SVG missing viewBox and width/height, cannot determine size');
    process.exit(1);
  }
}
if (!totalW || !totalH) {
  console.error('Failed to determine SVG width/height');
  process.exit(1);
}

const frameW = totalW / FRAMES;

// ensure output dir
fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < FRAMES; i++) {
  const offsetX = vbX + i * frameW;
  // build new svg attributes: keep original attrs but replace/add viewBox, width and height
  // remove existing viewBox, width and height occurrences
  let newAttrs = svgAttrs
    .replace(/viewBox=["'][^"']*["']/i, '')
    .replace(/width=["']?[^"']*["']?/i, '')
    .replace(/height=["']?[^"']*["']?/i, '')
    .trim()
    // collapse multiple spaces for cleanliness
    .replace(/\s{2,}/g, ' ');

  // add xmlns if missing (safe)
  if (!/xmlns=/.test(newAttrs)) {
    newAttrs = ' xmlns="http://www.w3.org/2000/svg" ' + newAttrs;
  }

  const newViewBox = `viewBox="${offsetX.toFixed(6)} ${vbY} ${frameW.toFixed(6)} ${totalH.toFixed(6)}"`;
  const newWidth = `width="${frameW.toFixed(6)}"`;
  const newHeight = `height="${totalH.toFixed(6)}"`;

  const finalAttrs = `${newAttrs} ${newViewBox} ${newWidth} ${newHeight}`.replace(/\s+/g, ' ').trim();
  const outSvg = `${xmlHeader}<svg ${finalAttrs}>\n${inner}\n</svg>\n`;
  const outName = path.join(outDir, `frame-${String(i).padStart(2,'0')}.svg`);
  fs.writeFileSync(outName, outSvg, 'utf8');
  console.log('Wrote', outName);
}

console.log(`Done — ${FRAMES} frames written to ${outDir}`);