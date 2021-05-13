const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};
const secure_nonce = random(14)

let userConfig = "";

(async (userConfig, secure_nonce) => {
    // get csp config
    userConfig = await fetch(window.nodeApi.gibConfigPath()).then(response => response.json())
    userData = await fetch(window.nodeApi.gibDataPath()).then(response => response.json())
    const csp_conf = await fetch("./csp.json").then(response => response.json())
        
    // script-src
    const script_url = csp_conf.script_src;
    const script_src_conf = script_url.join(' ');
    
    // style-src
    const style_url = csp_conf.style_src;
    const style_src_conf = style_url.join(' ');
    
    // font-src
    const font_url = csp_conf.font_src;
    const font_src_conf = font_url.join(' ');
    
    // img-src
    const img_url = csp_conf.img_src;
    const img_src_conf = img_url.join(' ');

    // connect-src
    const connect_url = csp_conf.connect_src;
    const connect_src_conf = connect_url.join(' ');

    // Creat CSP Header
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    $('head').append(`<!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->\n<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'strict-dynamic' 'nonce-${secure_nonce}' ${script_src_conf}; style-src 'self' 'nonce-${secure_nonce}' ${style_src_conf}; font-src 'self' ${font_src_conf}; img-src 'self' ${img_src_conf}; connect-src 'self' ${connect_src_conf};">`);
    $('head').append(`<meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self' 'nonce-${secure_nonce}' ${script_src_conf}; style-src 'self' 'strict-dynamic' 'nonce-${secure_nonce}' ${style_src_conf}; font-src 'self' ${font_src_conf}; img-src 'self' ${img_src_conf}; connect-src 'self' ${connect_src_conf};">`);
    //Other Head Configs
    $('head').append(`<!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
    `)
    $('head').append(`<!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
    `)
    $('head').append(`<script nonce="${secure_nonce}">console.warn('Pasting Code in this console has an 69/10 chance of being scammed!');</script>`)
    $("head").append(`<link rel="stylesheet" href="./css/main.css">`)
    $('head').append('<link rel="stylesheet" href="./css/titlebar.css">')


    $('head').append(`<script nonce="${secure_nonce}">document.getElementById("btn1").addEventListener('click', openDir);\nfunction openDir() { window.nodeApi.openUserPath("${userConfig.userData}") }</script>`)
    $('head').append(`<script nonce="${secure_nonce}">document.getElementById("btn2").addEventListener('click', regKey);\nfunction regKey() {\nvar input =  document.getElementById("private_key").value;\nconsole.log(input);\nwindow.nodeApi.addKey(input);\n};</script>`)
    // print starfiles key
    // $('#info').append(`<br><br><p>You Starfiles key is: <code>${userConfig.key}</code></p>`)
    $("#username").text(userData.username)
    $("#avatar").attr("src", userData.avatar)
    $("#files").text("Files: " + userData.filesAmount)
    $("#folders").text("Folders: " + userData.foldersAmount)
    $("body").prepend(`        <div style="position:sticky" class="titlebar.webkit-draggable titlebar">
    <div class="titlebar-stoplight">
        <div id=close class="titlebar-close">
            <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
                <polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
            </svg>
        </div>
        <div id=minimize class="titlebar-minimize">
            <svg x="0px" y="0px" viewBox="0 0 8 1.1">
                <rect fill="#995700" width="8" height="1.1"></rect>
            </svg>
        </div>
        <div id=maximize class="titlebar-fullscreen">
            <svg class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 6 5.9">
                <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
                <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
            </svg>
            <svg class="maximize-svg" x="0px" y="0px" viewBox="0 0 7.9 7.9">
                <polygon fill="#006400" points="7.9,4.5 7.9,3.4 4.5,3.4 4.5,0 3.4,0 3.4,3.4 0,3.4 0,4.5 3.4,4.5 3.4,7.9 4.5,7.9 4.5,4.5"></polygon>
            </svg>
        </div>
    </div>
</div><script nonce="${secure_nonce}">$("#minimize").click(function() {
    window.nodeApi.sendEvent("minimize")
});
$("#maximize").click(function() {
    window.nodeApi.sendEvent("maximize")
});
$("#close").click(function() {
    window.nodeApi.sendEvent("close")
});
</script>`)

    //for(index in json) {console.log(`${[index]} : ${json[index]}`)}


})();
