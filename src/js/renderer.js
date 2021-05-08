const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};
const secure_nonce = random(14)

let userConfig = "";

async function crtCSPHeader() {
    // get csp config
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

    // Creat CSP Header
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    $('head').append(`<!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->\n<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'strict-dynamic' 'nonce-${secure_nonce}' ${script_src_conf}; style-src 'self' 'nonce-${secure_nonce}' ${style_src_conf}; font-src 'self' ${font_src_conf}; img-src 'self' ${img_src_conf};">`);
    $('head').append(`<meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self' 'nonce-${secure_nonce}' ${script_src_conf}; style-src 'self' 'strict-dynamic' 'nonce-${secure_nonce}' ${style_src_conf}; font-src 'self' ${font_src_conf}; img-src 'self' ${img_src_conf};">`);
}
crtCSPHeader()


// Other Head configs
$('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Karla:wght@200&display=swap">`)
$('head').append(`<script nonce="${secure_nonce}">console.warn('Pasting Code in this console has an 69/10 chance of being scammed!');</script>`)

async function addOpenDir() {
    userConfig = await fetch(window.nodeApi.gibConfigPath()).then(response => response.json())
    $('body').append(`<button id="btn1">Open User Dir</button>`)
    $('head').append(`<script nonce="${secure_nonce}">document.getElementById("btn1").addEventListener('click', openDir);\nfunction openDir() { window.nodeApi.openUserPath("${userConfig.userData}") }</script>`)
}addOpenDir();