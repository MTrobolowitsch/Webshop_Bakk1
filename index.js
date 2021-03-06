

const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

const root = process.cwd()
npm_install_recursive(root)

// Since this script is intended to be run as a "preinstall" command,
// it will do `npm install` automatically inside the root folder in the end.
console.log('===================================================================')
console.log(`Performing "npm install" inside root folder`)
console.log('===================================================================')

// Recurses into a folder
function npm_install_recursive(folder)
{
    const has_package_json = fs.existsSync(path.join(folder, 'package.json'))

    // Abort if there's no `package.json` in this folder and it's not a "packages" folder
    // if (!has_package_json && path.basename(folder) !== 'Services')
    // {
    //     return
    // }

    // If there is `package.json` in this folder then perform `npm install`.
    //
    // Since this script is intended to be run as a "preinstall" command,
    // skip the root folder, because it will be `npm install`ed in the end.
    // Hence the `folder !== root` condition.
    //
    if (has_package_json && folder !== root && !fs.existsSync(path.join(folder, 'node_modules')))
    {
        console.log('===================================================================')
        console.log(`Performing "npm install" inside ${folder === root ? 'root folder' : './' + path.relative(root, folder)}`)
        console.log('===================================================================')

        npm_install(folder)
    }

 if (has_package_json && folder !== root && fs.existsSync(path.join(folder, 'tsconfig.json'))){
        npm_build(folder);
    }
    if (has_package_json && folder !== root /*fs.existsSync(path.join(folder, 'tsconfig.json')*/){
        //npm_build(folder);
        npm_run(folder)
    }

    // Recurse into subfolders
    for (let subfolder of subfolders(folder))
    {
        npm_install_recursive(subfolder)
    }
   // setUpMongo();
}

// Performs `npm install`
function npm_install(where)
{
    child_process.execSync('npm install', { cwd: where, env: process.env, stdio: 'inherit' })
}

function npm_build(where)
{
    child_process.execSync('tsc', { cwd: where, env: process.env, stdio: 'inherit' })
}

function npm_run(where)
{
    //if (where.includes("Frontend")) return;
    child_process.spawn('npm run start', { cwd: where, env: process.env, stdio: 'inherit', shell:true },function (a,b,c) {
        if (a) console.error(a);
        console.log("running");
        
        console.log(stoud);
        console.log(out);
    });
    console.log(where);
    
}


// Lists subfolders in a folder
function subfolders(folder)
{
    return fs.readdirSync(folder)
        .filter(subfolder => fs.statSync(path.join(folder, subfolder)).isDirectory())
        .filter(subfolder => subfolder !== 'node_modules' && subfolder[0] !== '.')
        .map(subfolder => path.join(folder, subfolder))
}
