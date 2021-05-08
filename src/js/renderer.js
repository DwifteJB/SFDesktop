const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};
const secure_nonce = random(14)

$('head').append(`<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'nonce-${secure_nonce}' https://code.jquery.com/; style-src 'self' https://*.github.io/ https://fonts.googleapis.com/; font-src 'self' https://fonts.gstatic.com/;">`);
$('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Karla:wght@200&display=swap">`)
$('body').append(`<script nonce="${secure_nonce}">console.warn('Pasting Code in this console has an 69/10 chance of being scammed!');</script>`)
