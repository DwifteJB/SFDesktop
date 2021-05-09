(async () => {
    const args = new URLSearchParams(window.location.search)
    const id = args.get('file')
    // const userDataKeyIdkWhatToNameLol = await fetch(windows.nodeApi.gibConfigPath()).then(response => response.json())
    const file_info = await fetch(`https://api.starfiles.co/file/fileinfo?file=${id}`).then(response => response.json())

    $('#fileinfo').append(`<p>Name: <code>${file_info.name}</code></p>`)
    $('#fileinfo').append(`<p>Uploaded: <code>${file_info.time_ago}</code></p>`)
    $('#fileinfo').append(`<p>Download Count: <code>${file_info.download_count}</code></p>`)
    $('#fileinfo').append(`<br>`)
    $('#fileinfo').append(`<button id="dlbtn">Download</button>`)
    $('head').append(`<script>document.getElementById("dlbtn").addEventListener('click', dlFileToIdk);\nfunction dlFileToIdk() { window.nodeApi.dlFile("https://api.starfiles.co/direct/${file_info.id}", "${file_info.name}") }</script>`)
})();