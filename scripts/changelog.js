/**
 * This script will generate changelog.txt file with list of all the commits since the last tag
 *
 * The list can be used to update release page on GitHub
 */

var fs = require("fs");
var execSync = require("child_process").execSync;

function getRepoUrl() {
    var repoUrl = process.argv[2];
    repoUrl += repoUrl.endsWith("/") ? "" : "/";
    return repoUrl;
}

function getCurrentTag() {
    return execSync("git describe --abbrev=0", {encoding: 'utf-8'}).trim();
}

function getChanges(currentTag, repoUrl) {
    var listChangesCommand =  "git log " + currentTag + "..HEAD --pretty=format:\"* [[`%h`](" + repoUrl + "commit/%h)] - %s\"";
    return execSync(listChangesCommand, {encoding: 'utf-8'});
}

function save(fileContent) {
    fs.writeFile('changelog.txt', fileContent, {encoding: 'utf-8'});
}

function main() {
    if (!process.argv[2]) {
        console.log('Provide repo url as the first argument.');
        return;
    }

    var currentTag = getCurrentTag();
    var repoUrl = getRepoUrl();
    var changes = getChanges(currentTag, repoUrl);
    save("Changes:\n\n" + changes);
}

main();