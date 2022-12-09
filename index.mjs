#!/usr/bin/env zx

const packages = await glob(['./**/package.json']);

const dryRun = argv['dry-run'] || argv.dryRun || process.argv.includes('--dry-run');

if (dryRun) {
  console.log(chalk.black.bgYellow(`[DRY RUN]`), 'no files will be modified');
}

for (const pkg of packages) {
  let json = {};
  try {
    json = await fs.readJson(pkg);
  } catch {
    console.log(chalk.black.bgRed(`[ERROR]`), 'failed to read', pkg);
    continue;
  }

  if (json.name) continue;

  json = { name: path.basename(path.dirname(pkg)), ...json };

  try {
    if (!dryRun) {
      await fs.writeJson(pkg, json, { spaces: 2 });
    }
  } catch {
    console.log(chalk.black.bgRed(`[ERROR]`), 'failed to write', pkg);
    continue;
  }

  console.log(chalk.black.bgGreen(`[UPDATED]`), "added property 'name' to", pkg);
}

if (dryRun) {
  console.log(chalk.black.bgYellow(`[DRY RUN]`), 'no files were modified');
}
