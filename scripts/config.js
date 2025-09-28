const path = require("path");

// __dirname = folder where this config.js lives
const PROJECTS_DATA_FILE = path.resolve(__dirname, "../projects.json");
const PROJECTS_FOLDER = path.resolve(__dirname, "../../");

module.exports = {
  PROJECTS_DATA_FILE,
  PROJECTS_FOLDER,
};
