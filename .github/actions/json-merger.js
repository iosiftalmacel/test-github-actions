const core = require('@actions/core');
const fs = require('fs');

try {
    let workspace = JSON.parse(core.getInput('runner_context')).workspace;
    let repo_name = workspace.split("/").pop();
    let root = repo_name == 'merge-json-files' ? `${workspace}/${repo_name}` : `${workspace}/${repo_name}/host`;

    let composer_path = `${root}/composer.json`;
    let composer_data = JSON.parse(
        fs.readFileSync(composer_path)
    );

    fs.writeFile(
        composer_path,
        JSON.stringify({
            ...composer_data,
            ...{
                repositories: [
                    {
                        type: "path",
                        url: `/home/runner/work/php-file-manipulator/php-file-manipulator/${core.getInput('repo_relative_path')}`
                    }
                ]
            }
        }),
        function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`composer.json was updated!`);
            let resultData = fs.readFileSync(composer_path, "utf8");
            console.log("Review new data below");
            console.log(resultData);
        }); 

} catch (error) {
    core.setFailed(error.message);
}