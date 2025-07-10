const { build } = require('tsup');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// Store original console.warn
const originalWarn = console.warn;

// List of warnings to ignore
const ignoredWarnings = [
  'is imported from external module',
  'but never used',
];

// Override console.warn to filter out specific warnings
console.warn = function (msg) {
  if (!ignoredWarnings.some(warning => msg.includes(warning))) {
    originalWarn.apply(console, arguments);
  }
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function checkGitStatus() {
  try {
    const { stdout } = await exec('git status --porcelain');
    return stdout.trim() !== '';
  } catch (error) {
    return false;
  }
}

async function updateVersion(currentVersion) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  console.log('\nCurrent version:', currentVersion);
  console.log('1. Major update (x.0.0)');
  console.log('2. Minor update (0.x.0)');
  console.log('3. Patch update (0.0.x)');
  console.log('4. Keep current version');

  const choice = await question('\nSelect version update type (1-4): ');

  switch (choice) {
    case '1':
      return `${major + 1}.0.0`;
    case '2':
      return `${major}.${minor + 1}.0`;
    case '3':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return currentVersion;
  }
}

async function getPackageInfo() {
  const packageJson = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8')
  );
  return packageJson;
}

async function updatePackageJson(version) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
  packageJson.version = version;
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

async function runBuild() {
  try {
    // Get initial package info
    const packageInfo = await getPackageInfo();
    const hasChanges = await checkGitStatus();

    // Build the package
    console.log('\n📦 Building package...\n');
    await build({
      config: './tsup.config.js',
    });

    // If there are uncommitted changes, prompt for version update
    if (hasChanges) {
      console.log('\n🔍 Detected uncommitted changes in the repository.');
      const newVersion = await updateVersion(packageInfo.version);

      if (newVersion !== packageInfo.version) {
        await updatePackageJson(newVersion);
        console.log(`\n✨ Updated package version to ${newVersion}`);
      }
    }

    // Get final package info
    const finalPackageInfo = await getPackageInfo();

    // Show build summary
    console.log('\n✅ Build completed successfully!');
    console.log('\n📋 Package Summary:');
    console.log('------------------');
    console.log(`📦 Package: ${finalPackageInfo.name}`);
    console.log(`📌 Version: ${finalPackageInfo.version}`);
    console.log(`📁 Main: ${finalPackageInfo.main}`);
    console.log(`📁 Module: ${finalPackageInfo.module}`);
    console.log('\n💡 To use in another project:');
    console.log('\n📋 Copy this command:');
    console.log('------------------');
    console.log(`npm install git+https://github.com/chillitray/zintlr-component-lib.git#main`);
    console.log('------------------\n');

    if (hasChanges) {
      console.log('\n⚠️  Don\'t forget to commit your changes!');
      console.log('   git add .');
      console.log('   git commit -m "Updated package to version ' + finalPackageInfo.version + '"');
      console.log('   git tag v' + finalPackageInfo.version);
      console.log('   git push && git push --tags');
    }

  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

runBuild();
