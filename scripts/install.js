#!/usr/bin/env node

/**
 * Installs staterkit files into the project
 */

var fs = require("fs");
var readline = require("readline");
var path = require("path");
var source = path.resolve(__dirname, "..");
var dest = process.cwd();
var projectConfig = require(path.resolve(dest, "./package.json"));
var starterkitConfig = require(path.resolve(source, "./package.json"));
var projectName = projectConfig.name;

function log() {
    var args = Array.prototype.slice.call(arguments);
    process.stdout.write(args.join(" ") + "\n");
}

function mkdir(dirname) {
    if (!fs.existsSync(dirname)) {
        fs.mkdir(dirname);
    }
}

function copy(filename, opts) {
    var resolveSource = [source];
    var resolverTarget = [dest];

    if (Array.prototype.isPrototypeOf(filename)) {
        resolveSource = resolveSource.concat(filename);
        resolverTarget = resolverTarget.concat(filename);
    }
    else {
        resolveSource.push(filename);
        resolverTarget.push(filename);
    }

    var sourceFile = path.resolve.apply(path, resolveSource);
    var targetFile = path.resolve.apply(path, resolverTarget);
    log(sourceFile, "-->", targetFile);
    var sourceFileContent = fs.readFileSync(sourceFile, {encoding: "utf-8"});
    if (opts && opts.replace) {
        sourceFileContent = sourceFileContent.replace(new RegExp(opts.replace[0], "g"), opts.replace[1]);
    }
    fs.writeFileSync(targetFile, sourceFileContent);
}

function createDirs() {
    mkdir(path.resolve(dest, "dist"));
    mkdir(path.resolve(dest, "docs"));
    mkdir(path.resolve(dest, "docs", "tutorials"));
    mkdir(path.resolve(dest, "lib"));
    mkdir(path.resolve(dest, "scripts"));
    mkdir(path.resolve(dest, "test"));
}

function copyFiles() {
    copy(".travis.yml");
    copy(".eslintrc.json");
    copy(".gitignore");
    copy("index.html", {replace: ["starterkit.js", projectName + ".js"]});
    copy("jsdoc.conf.json");
    copy("LICENSE", {replace: ["starterkit", projectName]});

    copy(["docs", "tutorials", "tutorial.md"]);
    copy(["lib", "app.js"]);
    copy(["scripts", "changelog.js"]);
    copy(["test", "test.js"]);
}

function install() {
    log("Copying all files from ", source, "to", dest);
    
    createDirs();
    copyFiles();
    
    projectConfig.scripts = starterkitConfig.scripts;
    projectConfig.devDependencies = starterkitConfig.devDependencies;

    fs.writeFileSync(path.resolve(dest, "package.json"), JSON.stringify(projectConfig, undefined, 4));

    log("Done.");
}

function main() {
    var ask = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var prompt = "This script will override files in the current directory including package.json." +
        " Type Y to continue. ";
    
    ask.question(prompt, function(response){
        if (response === "Y") {
            install();
        }
        ask.close();
    });
}

main();

