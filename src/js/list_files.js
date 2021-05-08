let files = "";

async function loadFilesList() {
    // get Files and Key
    const LocalUserData = await fetch(window.nodeApi.gibConfigPath()).then(response => response.json())
    files = await fetch(`https://api.starfiles.co/user/files?profile=${LocalUserData.key}`).then(response => response.json())
    // console.log(files)

    files.forEach(data => {
        // console.log(element.name)
        // Show them in index.html
        $('#filesList').append(`<a href="https://starfiles.co/file/${data.id}">${data.name}</a><br>`)
    });
}loadFilesList();