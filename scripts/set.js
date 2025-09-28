const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { PROJECTS_DATA_FILE, PROJECTS_FOLDER } = require("./config");

// Load existing projects
const projects = require(PROJECTS_DATA_FILE);

// Get folder name from CLI arguments
const folderName = process.argv[2];
if (!folderName) {
  console.error("❌ Please provide a folder name.");
  console.log("Usage: node set.js <folder-name>");
  process.exit(1);
}

// Ensure folder exists or create it
const folderPath = path.join(PROJECTS_FOLDER, folderName);
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`📂 Folder "${folderName}" created.`);
}

// Helper: Ask user input
function getInput(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Update projects.json
async function updateProjectsFile() {
  const sorted = [...projects].sort((a, b) =>
    a.repoName.localeCompare(b.repoName)
  );
  await fs.promises.writeFile(
    PROJECTS_DATA_FILE,
    JSON.stringify(sorted, null, 2),
    "utf8"
  );
  console.log(`✅ Updated ${PROJECTS_DATA_FILE}`);
}

// Gather project data interactively
async function getProjectData(existingProject = {}) {
  const name =
    (await getInput(`Enter project name [${existingProject.name || ""}]: `)) ||
    existingProject.name ||
    "Untitled Project";

  const challenge =
    (await getInput(
      `Enter challenge URL [${existingProject.challenge || ""}]: `
    )) || existingProject.challenge ||
    "";

  const solution =
    (await getInput(
      `Enter solution URL [${existingProject.solution || ""}]: `
    )) || existingProject.solution ||
    "";

  const source =
    (await getInput(`Enter source code URL [${existingProject.source || ""}]: `)) ||
    existingProject.source ||
    "";

  const demo =
    (await getInput(`Enter live demo URL [${existingProject.demo || ""}]: `)) ||
    existingProject.demo ||
    "";

  let difficulty = parseInt(
    await getInput(
      `Enter difficulty (1-5) [${existingProject.difficulty || 1}]: `
    ),
    10
  );
  if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
    difficulty = existingProject.difficulty || 1;
  }

  const description =
    (await getInput(
      `Enter project description [${existingProject.description || ""}]: `
    )) || existingProject.description ||
    "";

  const heroImage =
    (await getInput(
      `Enter hero image URL [${existingProject.heroImage || ""}]: `
    )) || existingProject.heroImage ||
    "";

  const stackInput =
    (await getInput(
      `Enter tech stack (comma separated) [${(existingProject.stack || []).join(
        ", "
      )}]: `
    )) || existingProject.stack?.join(", ") ||
    "";
  const stack = stackInput
    ? stackInput.split(",").map((s) => s.trim())
    : [];

  return {
    name,
    repoName: folderName,
    challenge,
    solution,
    source,
    demo,
    difficulty,
    description,
    heroImage,
    stack,
  };
}

// Main logic
(async () => {
  const projectIndex = projects.findIndex((p) => p.repoName === folderName);
  const exists = projectIndex !== -1;

  const answer = await getInput(
    `⚠️ Project "${folderName}" ${
      exists ? "already exists" : "not found"
    }. Do you want to ${exists ? "update" : "add"} it? (y/n): `
  );
  if (answer.toLowerCase() !== "y") {
    console.log("Exiting without changes.");
    process.exit(0);
  }

  const projectData = await getProjectData(
    exists ? projects[projectIndex] : undefined
  );

  if (exists) {
    projects[projectIndex] = projectData;
    console.log(`✅ Project "${folderName}" updated successfully.`);
  } else {
    projects.push(projectData);
    console.log(`✅ Project "${folderName}" added successfully.`);
  }

  await updateProjectsFile();
})();
