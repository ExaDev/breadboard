import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from "@actions/github";
import * as glob from "@actions/glob";
import * as io from "@actions/io";
import * as fs from "fs";
import path from "path";
const __original_require__ = require;

const globals = {
  require,
  __original_require__,
  github,
  core,
  exec,
  glob,
  io,
  fetch,
};

Object.assign(global, globals);

function spacer({
  char = '=',
  count = 80
}: { char?: string; count?: number; } = {}) {
  console.log(char.repeat(count));
}

module.exports = async () => {
  const workspace = process.cwd();
  console.log({ cwd: workspace });

  const packageDir = path.resolve(workspace, "packages");
  const packages = [
    "breadboard",
    "breadboard-cli",
    "create-breadboard",
    "create-breadboard-kit",
  ] as const;

  const depTypes = ["dependencies", "devDependencies", "peerDependencies"] as const;

  const fromScope = "@google-labs";
  const packagesWithScope = packages.map((pkg) => `${fromScope}/${pkg}`);
  const toScope = `@${github.context.repo.owner.toLowerCase()}`;
  console.log({ fromScope, toScope });

  await exec.exec("npm", ["install"], { cwd: workspace });

  for (const pkg of packages) {
    spacer();
    const packagePath = path.resolve(packageDir, pkg, "package.json");
    console.log({ package: packagePath });
    const packageJson: {
      name?: string;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    } = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const currentName = packageJson.name;
    console.log({ name: currentName });
    const newName = currentName?.replace(fromScope, toScope);
    console.log({
      name: {
        from: currentName,
        to: newName,
      }
    });

    // replace occurences in dependencies
    for (const depType of depTypes) {
      const deps = packageJson[depType];
      if (deps) {
        for (const [dep, version] of Object.entries(deps)) {
          if (packagesWithScope.includes(dep)) {
            const newVersion = `npm:${dep.replace(fromScope, toScope)}@*`;
            console.log(`${depType}.${dep}: "${newVersion}"`);
            deps[dep] = newVersion;
          }
        }
      }
      packageJson[depType] = deps;
    }
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  }
};
