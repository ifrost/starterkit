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

function resolveNames(filename, opts) {
    var resolveSource = [source];
    var resolverTarget = [dest];

    if (Array.prototype.isPrototypeOf(filename)) {
        resolveSource = resolveSource.concat(filename);
        resolverTarget = resolverTarget.concat(opts.targetFileName || filename);
    }
    else {
        resolveSource.push(filename);
        resolverTarget.push(opts.targetFileName || filename);
    }

    return {
        source: resolveSource,
        target: resolverTarget
    };
}

function copy(filename, opts) {
    opts = opts || {};

    var names = resolveNames(filename, opts);
    
    var sourceFile = path.resolve.apply(path, names.source);
    var targetFile = path.resolve.apply(path, names.target);
    log(sourceFile, "-->", targetFile);
    var sourceFileContent = fs.readFileSync(sourceFile, {encoding: "utf-8"});
    if (opts.replace) {
        opts.replace.forEach(function(mapping) {
            sourceFileContent = sourceFileContent.replace(new RegExp(mapping[0], "g"), mapping[1]);
        });
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

function copyFiles(options) {
    copy(".travis.yml");
    copy(".eslintrc.json");
    copy("webpack.config.js", {
        replace: [
            ["starterkit.js", projectName + ".js"]
        ]
    });
    copy(".gitignore.template", {targetFileName: ".gitignore"});

    copy("README.md.template", {
        targetFileName: "README.md",
        replace: [
            ["ifrost/starterkit", options.git.path],
            ["starterkit", projectName]
        ]
    });
    copy("index.html", {
        replace: [
            ["starterkit.js", projectName + ".js"]
        ]
    });
    copy("index.js");
    copy("jsdoc.conf.json");
    copy("LICENSE", {
        replace: [
            ["starterkit", projectName]
        ]
    });

    copy(["docs", "tutorials", "tutorial.md"]);
    copy(["lib", "app.js"]);
    copy(["scripts", "changelog.js"]);
    copy(["scripts", "version.sh"]);
    copy(["test", "test.js"]);
}

function install(options) {
    log("Copying all files from ", source, "to", dest);
    
    createDirs();
    copyFiles(options);
    
    projectConfig.scripts = starterkitConfig.scripts;
    projectConfig.devDependencies = starterkitConfig.devDependencies;

    for (var scriptName in projectConfig.scripts) {
        if (projectConfig.scripts.hasOwnProperty(scriptName)) {
            projectConfig.scripts[scriptName] = projectConfig.scripts[scriptName]
                .replace(new RegExp("ifrost/starterkit", "g"), options.git.path)
                .replace(new RegExp("starterkit", "g"), projectName);
        }
    }

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
            ask.question("Provide GitHub path, e.g. name/project: ",function(response) {
                install({
                    git: {
                        path: response || "name/project"
                    }
                });
                ask.close();
            });
        }
    });
}

main();

