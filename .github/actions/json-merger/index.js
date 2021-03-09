const core = require('@actions/core');
const fs = require('fs');

try {
    let workspace = JSON.parse(core.getInput('runner_context')).workspace;
    let repo_name = workspace.split("/").pop();
    let root = `${workspace}/${repo_name}`;

    let composer_path = `${root}/composer.json`;
    let composer_data = JSON.parse(
        fs.readFileSync(composer_path)
    );

    // fs.readdir("/", (err, files) => {
    //     files.forEach(file => {
    //       console.log(file);
    //     });
    // });


    console.log(workspace);
    console.log(repo_name);
    console.log(root);
    

} catch (error) {
    core.setFailed(error.message);
}