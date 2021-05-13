async function ld_plgins() {
    const loadPluginFiles = window.nodeApi.getPluginFiles();
    const userConfig = await fetch(window.nodeApi.gibConfigPath()).then(response => response.json())

    loadPluginFiles.forEach(file => {
        const path = 'file://' + userConfig.userData + 'plugins' + '/' + file
        $('body').append(`<script src="${path}"></script>`);
    })
}ld_plgins();