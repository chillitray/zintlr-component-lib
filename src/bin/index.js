#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

const filesToCopy = [
    "sentry.client.config.js",
    "sentry.edge.config.js",
    "sentry.server.config.js"
];

function showHelp() {
    console.log(`
🎯 Zintlr Component Library CLI

Usage: npx zintlr-component-lib <command>

Commands:
  sentry-init    Initialize Sentry configuration files
  sentry-clean   Remove Sentry configuration files
  help          Show this help message

Examples:
  npx zintlr-component-lib sentry-init
  npx zintlr-component-lib sentry-clean
  npx zintlr-component-lib help
`);
}

if (!command || command === "help" || command === "--help" || command === "-h") {
    showHelp();
    process.exit(0);
}

if (command === "sentry-init") {
    console.log("🚀 Initializing Sentry configuration files...\n");

    let createdCount = 0;
    let skippedCount = 0;

    filesToCopy.forEach(file => {
        const targetPath = path.resolve(process.cwd(), file);
        const templatePath = path.resolve(__dirname, `../templates/${file}`);

        try {
            if (!fs.existsSync(targetPath)) {
                if (!fs.existsSync(templatePath)) {
                    console.log(`❌ Template file not found: ${file}`);
                    return;
                }

                fs.copyFileSync(templatePath, targetPath);
                console.log(`✅ ${file} created`);
                createdCount++;
            } else {
                console.log(`⚠️  ${file} already exists — skipping`);
                skippedCount++;
            }
        } catch (error) {
            console.log(`❌ Error creating ${file}: ${error.message}`);
        }
    });

    console.log(`\n🎯 Summary:`);
    console.log(`   Created: ${createdCount} files`);
    console.log(`   Skipped: ${skippedCount} files`);

    if (createdCount > 0) {
        console.log(`\n✨ Sentry config files have been set up successfully!`);
        console.log(`   You can now customize the configuration files as needed.`);
    }
} else if (command === "sentry-clean") {
    console.log("🧹 Cleaning up Sentry configuration files...\n");

    let removedCount = 0;
    let notFoundCount = 0;

    filesToCopy.forEach(file => {
        const targetPath = path.resolve(process.cwd(), file);

        try {
            if (fs.existsSync(targetPath)) {
                fs.unlinkSync(targetPath);
                console.log(`🗑️  ${file} removed`);
                removedCount++;
            } else {
                console.log(`ℹ️  ${file} not found — skipping`);
                notFoundCount++;
            }
        } catch (error) {
            console.log(`❌ Error removing ${file}: ${error.message}`);
        }
    });

    console.log(`\n🎯 Summary:`);
    console.log(`   Removed: ${removedCount} files`);
    console.log(`   Not found: ${notFoundCount} files`);

    if (removedCount > 0) {
        console.log(`\n✨ Sentry config files have been cleaned up successfully!`);
    }
} else {
    console.log(`❌ Unknown command: ${command}`);
    console.log(`Run 'npx zintlr-component-lib help' for available commands.`);
    process.exit(1);
}
