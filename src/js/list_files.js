let files = "";
let folder = "";
(async () => {
    // get Files and Key
    const LocalUserData = await fetch(window.nodeApi.gibConfigPath()).then(response => response.json())
    files = await fetch(`https://api.starfiles.co/user/files?profile=${LocalUserData.key}`).then(response => response.json())
    folders = await fetch(`https://api.starfiles.co/user/folders?profile=${LocalUserData.key}`).then(response => response.json())
    // console.log(folders)

    files.forEach(async data => {
        //<br><a style="width:600px" href="javascript:alert(1)"> <span class="file_logo"><i class="bi bi-file-earmark-code"></i></span><span class="filename">&nbsp; Terraria.zip</span><span class="filedate">Feb 07 2018</span><span class="filesize">100MB</span></a>
        const file_info = await fetch(`https://api.starfiles.co/file/fileinfo?file=${data.id}`).then(response => response.json());
        $("#filesdocu").append(`<br><a style="width:600px" href="./file.html?file=${data.id}"> <span class="file_logo"><i class="bi bi-file-earmark-code"></i></span><span class="filename">&nbsp; ${data.name}</span><span class="filedate">${new Date(file_info.upload_time * 1000).toLocaleDateString("en-US")}</span><span class="filesize">${file_info.tidy_size}</span></a>`);
        //$('#filesList').append(`<a class="btn btn-primary" href="./file.html?file=${data.id}">${data.name}</a>`)
    });
    folders.forEach(data => {
        // Show them in index.html
        $("#filesdocu").append(`<br><a style="width:600px" href="./file.html?file=${data.id}"> <span class="file_logo"><i class="bi bi-folder2"></i></span><span class="filename">&nbsp; ${data.name}</span><span class="filedate">N/A</span><span class="filesize">UNKNOWN</span></a>`);
        // $('#folderList').append(`<a class="btn btn-primary" href="https://starfiles.co/folder/${data.id}">${data.name}</a>`)
    })
})();