document.addEventListener('keydown', (e) => {
    // for testing if this is active
    // alert("running");

    var PREV_KEYS = ("a","p");
    var NEXT_KEYS = ("d","n");
    var PRPG_KEYS = ("q");
    var NXPG_KEYS = ("e");
    var FAV_KEYS = ("f");
    //var PLAY_KEYS = ("???")

    switch(e.key) {
        case $PREV_KEYS.includes(e.key):
            if(window.location.pathname.match("/post/view/")) {
                $target = document.getElementById("prevlink").getAttribute("href");
                window.location.href=$target;
            } else {
                break;
            }
            break;
        case $NEXT_KEYS.includes(e.key):
            if(window.location.pathname.match("/post/view/")) {
                $target = document.getElementById("nextlink").getAttribute("href");
                window.location.href=$target;
            } else {
                break;
            }
            break;
        case "f":
            // grab "Favorite"/"Un-Favorite"-button and click it
            $fb = document.querySelector('\
                section#Post_Controlsleft > div.blockbody > form[action="/change_favorite"] > input[value="Favorite"],\
                section#Post_Controlsleft > div.blockbody > form[action="/change_favorite"] > input[value="Un-Favorite"]\
            ');
            if($fb) {
                $fb.click();
                break;
            } else {
                break;
            }
$fb.click();
        case "q":
            /*
                do something to:
                - check which page we're on
                - check if there is a previous page
                - if yes, grab link and send us there
                - if not, do nothing
            */
           break;
        case "e":
            /*
                do something to:
                - check which page we're on
                - check if there is a next page
                - if yes, grab link and send us there
                - if not, do nothing
            */
           break;
        default:
            // nothing to do here
            break;
    }
});

