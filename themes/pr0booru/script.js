document.addEventListener('keyup', (e) => {
    // for testing if this is active
    // alert("running");

    var PREV_KEYS = ["a","p"];
    var NEXT_KEYS = ["d","n"];
    var PRPG_KEYS = ["q"];
    var NXPG_KEYS = ["e"];
    var FAV_KEYS = ["f"];
    //var PLAY_KEYS = ("???")

    if(window.location.pathname.match("/post/view/")) {
        console.log("post view controls");
        if(PREV_KEYS.includes(e.key)) {
            console.log(PREV_KEYS);
            $target = document.getElementById("prevlink").pathname;
            window.location.href=$target;
        } else if(NEXT_KEYS.includes(e.key)) {
            console.log(NEXT_KEYS);
            $target = document.getElementById("nextlink").pathname;
            window.location.href=$target;
        } else if(FAV_KEYS.includes(e.key)) {
            console.log(FAV_KEYS);
            // grab "Favorite"/"Un-Favorite"-button and click it
            fb = document.querySelector('\
                section#Post_Controlsleft > div.blockbody > form[action="/change_favorite"] > input[value="Favorite"],\
                section#Post_Controlsleft > div.blockbody > form[action="/change_favorite"] > input[value="Un-Favorite"]\
            ');
            if(fb) {
            fb.click();
            } else {
                ;
            }
        } else {
            ;
        }
    } else if(window.location.pathname.match("post/list")) {
        console.log("only page controls");
        if(PRPG_KEYS.includes(e.key)) {
        /*
            do something to:
            - check which page we're on
            - check if there is a previous page
            - if yes, grab link and send us there
            - if not, do nothing
        */
        } else if(NXPG_KEYS.includes(e.key)) {
            /*
                do something to:
                - check which page we're on
                - check if there is a next page
                - if yes, grab link and send us there
                - if not, do nothing
             */
        } else {
            ;
        }
    } else {
        ;
    }
});

