const fs = require("fs");
const path = require("path");
const { PROJECTS_DATA_FILE, PROJECTS_FOLDER } = require("./config");

const projects = require(PROJECTS_DATA_FILE);

// Maps
const difficultyMap = [
  { text: "NEWBIE", color: "blue" },
  { text: "JUNIOR", color: "green" },
  { text: "INTERMEDIATE", color: "yellow" },
  { text: "ADVANCED", color: "orange" },
  { text: "GURU", color: "red" },
];
const skillsMap = {
  HTML: "https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white",
  CSS: "https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white",
  JS: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
  API: "https://img.shields.io/badge/API-FF6C37?style=for-the-badge&logo=postman&logoColor=white",
  REACT:
    "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black",
  NODE: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white",
};
// Badges
const difficultyBadge = (difficulty) => {
  const { text, color } = difficultyMap[difficulty - 1];
  return `![${text}](https://img.shields.io/badge/Difficulty-${text}-${color})`;
};
const skillBadges = (skills) => {
  let string = "";
  for (const skill of skills) {
    if (!skillsMap[skill]) continue;

    const text =
      skill === "JS"
        ? "JavaScript"
        : skill === "REACT"
        ? "React"
        : skill === "NODE"
        ? "Node.js"
        : skill;
    string += `![${text}](${skillsMap[skill]})\n`;
  }
  return `${string}\n`;
};
const levelBadges = (level) => {
  let string = "<span>\n";
  for (let i = 0; i < level; i++) {
    string += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100" fill="gold">
  <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9"/>
</svg>\n`;
  }
  for (let i = level; i < 5; i++) {
    string += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100" fill="none" stroke="gold" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter">
  <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9"/>
</svg>\n`;
  }
  string += "</span>\n";
  return string;
};
// Link Item
const Link = (name, url) => `[${name}](${url})`;
// Repo Link
const More = "https://github.com/younes-alhyan/frontend-mentor/";
//Header
const Header = `# 💻 Frontend Mentor Projects

Welcome to my collection of **Frontend Mentor** projects!  
This repository serves as an index to all my completed challenges with links to the challenge, solution, live demo, and source code. Each project helps me improve my **HTML, CSS, and JavaScript skills**.

## 📂 Projects\n\n`;

//content
const Project = (project, isMain) => {
  let size = isMain ? "##" : "";
  let content = "";
  const {
    name,
    challenge,
    solution,
    source,
    demo,
    difficulty,
    description,
    heroImage,
    stack,
  } = project;
  //header
  content += `${size}# ${isMain ? "📝" : "📂"} ${name}\n\n`;
  content += `!${Link("Hero Image", heroImage)}\n\n`;
  content += `${size}## 🌟 Description\n\n`;
  content += `${description}\n\n`;
  content += `${size}## 🏆 Challenge\n\n`;
  content += `${Link("Frontend Mentor Challenge", challenge)}\n\n`;
  content += `${size}## 💡 Solution\n\n`;
  content += `${Link("Solution Link", solution)}\n\n`;
  content += `${size}## 🚀 Live Demo\n\n`;
  content += `${Link("View Demo", demo)}\n\n`;
  if (isMain) {
    content += `${size}## 👨‍💻 Source Code\n\n`;
    content += `${Link("GitHub Repository", source)}\n\n`;
  } else {
    content += `${size}## 🔎 More\n\n`;
    content += `${Link("GitHub Repository", More)}\n\n`;
  }
  content += `${size}## 🛠️ Tech Stack\n\n`;
  content += skillBadges(stack);
  content += `${size}## 🔥 Difficulty\n\n`;
  content += `${difficultyBadge(difficulty)}\n\n`;
  content += `${size}## 🏅 Level\n\n`;
  content += levelBadges(difficulty);
  return content;
};

const mainContent = (projects) => {
  let content = Header;
  projects.forEach((project) => {
    content += Project(project, true);
    content += "\n";
  });
  return content;
};

// Write to frontend-mentor/README.md
const frontendMentorREADME = path.join(
  PROJECTS_FOLDER,
  "frontend-mentor",
  "README.md"
);
fs.writeFileSync(frontendMentorREADME, mainContent(projects), "utf8");
console.log("✅ frontend-mentor/README.md created successfully!");
//write to projects/README.md
for (const project of projects) {
  const projectReadme = path.join(
    PROJECTS_FOLDER,
    project.repoName,
    "README.md"
  );
  fs.writeFileSync(projectReadme, Project(project, false), "utf8");
  console.log(`✅ README for "${project.repoName}" created successfully!`);
}
