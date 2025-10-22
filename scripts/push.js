const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { PROJECTS_FOLDER } = require("./config");

const README = "README.md";
const commitMessage = "docs: update README.md";

function run(command, cwd) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (err, stdout, stderr) => {
      if (err) return reject(err);
      if (stderr) console.log(stderr);
      resolve(stdout);
    });
  });
}

async function push(folder) {
  try {
    console.log(`🚀 Pushing changes for ${folder}...`);

    // check if README changed
    const diff = await run(`git diff -- ${README}`, folder);
    if (!diff) {
      console.log(`✅ No changes in ${folder}/${README}`);
      return;
    }

    // commit + push
    await run(`git add ${README}`, folder);
    await run(`git commit -m "${commitMessage}"`, folder);
    await run(`git push`, folder);

    console.log(`✅ Successfully pushed ${folder}/${README}`);
  } catch (err) {
    console.error(`❌ Error in ${folder}:`, err.message);
  }
}

// list subfolders in current directory
const items = fs.readdirSync(PROJECTS_FOLDER, { withFileTypes: true });
const folders = items.filter((i) => i.isDirectory()).map((d) => d.name);

// loop and push each
(async () => {
  for (const folder of folders) {
    await push(path.join(PROJECTS_FOLDER, folder));
  }
})();
