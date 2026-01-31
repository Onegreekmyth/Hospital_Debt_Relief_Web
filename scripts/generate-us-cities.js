/**
 * Fetches the full US cities list from kelvins/US-Cities-Database (CSV)
 * and generates src/data/usCitiesByState.json with every city per state.
 * Run: node scripts/generate-us-cities.js
 */
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_URL =
  "https://raw.githubusercontent.com/kelvins/US-Cities-Database/main/csv/us_cities.csv";
const OUT_PATH = path.join(__dirname, "..", "src", "data", "usCitiesByState.json");

function parseCSVLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQuotes = !inQuotes;
    else if (c === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else if (c !== "\r") current += c;
  }
  fields.push(current.trim());
  return fields;
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

async function main() {
  console.log("Fetching US cities CSV...");
  const csv = await fetchText(CSV_URL);
  const lines = csv.split("\n").filter((l) => l.trim());
  const byState = {};
  const header = lines[0].toLowerCase();
  const stateIdx = header.includes("state_name") ? 2 : 2;
  const cityIdx = 3;

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    const stateName = (fields[stateIdx] || "").trim();
    const city = (fields[cityIdx] || "").trim();
    if (!stateName || !city) continue;
    if (!byState[stateName]) byState[stateName] = new Set();
    byState[stateName].add(city);
  }

  const result = {};
  const stateNames = Object.keys(byState).sort();
  for (const state of stateNames) {
    result[state] = Array.from(byState[state]).sort();
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), "utf8");
  const totalCities = Object.values(result).reduce((s, arr) => s + arr.length, 0);
  console.log(`Wrote ${stateNames.length} states, ${totalCities} cities to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
