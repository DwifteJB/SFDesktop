(async () => {
    function wait(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }
    $("#joke").text(window.nodeApi.getJoke());
    // update function
    $("#status").text("CHECKING FOR UPDATES");
    await window.nodeApi.checkforUpdate().then(async function(updateResult) {
        console.log(updateResult);
        await wait(2500);
        if (updateResult == true) {
            $("#status").text("UPDATE FOUND!");
            // do like the shit for downloading update lol
        }
        // preload index.html
        $("#status").text("LOADING STARFILES DESKTOP");
        window.nodeApi.preloadIndex().then(async function() {
           await wait(2500);
           window.close();
        })
    })
})();