    // for testing if this is active
    // alert("running");

    var PREV_KEYS = ["a","p","ArrowLeft"];
    var NEXT_KEYS = ["d","n","ArrowRight"];
    var PRPG_KEYS = ["q","ArrowLeft"];
    var NXPG_KEYS = ["e","ArrowRight"];
    var FAV_KEYS = ["F"];
    //var PLAY_KEYS = ("???")

document.addEventListener('keyup', (e) => {
    // we don't want to react to shortcuts if user is typing into a comment box or the search menu:
    if(e.target.matches("input") || e.target.matches("textarea")) {
        return;
    }

    if(window.location.pathname.match("/post/view/")) {
        console.log("post view controls");
        if(PREV_KEYS.includes(e.key)) {
            console.log(e.key);
            target = document.getElementById("prevlink").pathname;
            window.location.href = target;
        } else if(NEXT_KEYS.includes(e.key)) {
            console.log(e.key);
            target = document.getElementById("nextlink").pathname;
            window.location.href = target;
        } else if(e.shiftKey && FAV_KEYS.includes(e.key)) {
            console.log(e.key);
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
        }  else {
            ;
        }
    } else if(window.location.pathname.match("post/list")) {
        console.log("only page controls");
        var paginatorDiv = document.getElementById("paginator");
        var index = Array.prototype.indexOf.call(paginatorDiv.children, document.querySelector("#paginator b"));
        if(PRPG_KEYS.includes(e.key)) {
            var prevlink = paginatorDiv.children[index-1];
            if(prevlink) {
                window.location.pathname = prevlink.pathname;
            };
        /*
            do something to:
            - check which page we're on
            - check if there is a previous page
            - if yes, grab link and send us there
            - if not, do nothing
        */
        } else if(NXPG_KEYS.includes(e.key)) {
            console.log(e.key);
            nextlink = paginatorDiv.children[index+1];
            if(nextlink) {
                window.location.pathname = nextlink.pathname;
            };
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

// since we want to prevent default action for spacebar and that action usually fires before keyup, need to check for keydown:
document.addEventListener("keydown", e => {
    // we don't want to react to shortcuts if user is typing into a comment box or the search menu:
    if(e.target.matches("input") || e.target.matches("textarea")) {
        return;
    }
    console.log(e.key);

    if((window.location.pathname.match("/post/view/")) && (e.key === " ")) {
        if(e.key === " ") {
            var video = document.querySelector("video#main_image");
            if(video != null) {
                e.preventDefault();
                if(!video.paused) {
                    video.pause();  
                } else {
                    video.play();
                }
            }
        } 
    }
});

// wait until the page is fully loaded, then set download link to full-size image
window.addEventListener('load', function () {
    var dla = document.getElementById('dla');
   	var main_image = document.getElementById('main_image') 
    if(main_image) {
        if(main_image.src) {
            dla.href = main_image.src;
            dla.download = main_image.src;
        } else if(main_image.children[0].src) {
            dla.href = main_image.children[0].src;
            dla.download = main_image.children[0].src;
        } else {
            ;
        }
    }
});