    // for testing if this is active
    // alert("running");

    // using e.code instead of e.key to not get different results if e.g. user has capslock on
    var PREV_KEYS = ["KeyA","KeyP","ArrowLeft"];
    var NEXT_KEYS = ["KeyD","KeyN","ArrowRight"];
    var PRPG_KEYS = ["KeyA","KeyP","ArrowLeft"];
    var NXPG_KEYS = ["KeyD","KeyN","ArrowRight"];
    var FS_KEYS = ["KeyF"];
    // (un-)favorite = shift+f
    var FAV_KEYS = ["KeyF"];
    var VPP_KEYS = ["Space"];
    var VFF_KEYS = ["KeyE"];
    var VRW_KEYS = ["KeyQ"];

document.addEventListener('keyup', (e) => {
    // we don't want to react to shortcuts if user is typing into a comment box or the search menu:
    if(e.target.matches("input") || e.target.matches("textarea")) {
        return;
    }

    if(window.location.pathname.match("/post/view/")) {
        console.log("post view controls");
        if(PREV_KEYS.includes(e.code)) {
            console.log(e.code);
            target = document.getElementById("prevlink").pathname;
            window.location.href = target;
        } else if(NEXT_KEYS.includes(e.code)) {
            console.log(e.code);
            target = document.getElementById("nextlink").pathname;
            window.location.href = target;
        }  else {
            ;
        }
    } else if(window.location.pathname.match("post/list")) {
        console.log("only page controls");
        var paginatorDiv = document.getElementById("paginator");
        var index = Array.prototype.indexOf.call(paginatorDiv.children, document.querySelector("#paginator b"));
        if(PRPG_KEYS.includes(e.code)) {
            var prevlink = paginatorDiv.children[index-1];
            if(prevlink) {
                window.location.pathname = prevlink.pathname;
            };
        } else if(NXPG_KEYS.includes(e.code)) {
            console.log(e.code);
            nextlink = paginatorDiv.children[index+1];
            if(nextlink) {
                window.location.pathname = nextlink.pathname;
            };
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
    console.log(e.code);

    // override ctrl+f to focus search bar instead of browser search
    if(e.ctrlKey && e.code == "KeyF") {
        e.preventDefault();
        document.getElementsByName("search")[0].focus();
        return;
    }

    if(window.location.pathname.match("/post/view/")) {
        var video = document.querySelector("video#main_image");
        var img = document.getElementById("main_image");

        if(e.shiftKey && FAV_KEYS.includes(e.code)) {
            console.log(e.code);
            // grab "Favorite"/"Un-Favorite"-button and click it
            fb = document.querySelector('[action*="fav"] > input[type="submit"]')
            if(fb) {
                fb.click();
            } else {
                ;
            }
            return;
        } else if(FS_KEYS.includes(e.code)) {
            if (!document.fullscreenElement) {
                img.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen(); 
                }
            }
        }
        
        if(video != null) {
            if(VPP_KEYS.includes(e.code)) {
                e.preventDefault();
                if(!video.paused) {
                    video.pause();  
                } else {
                    video.play();
                }
            } else if(VRW_KEYS.includes(e.code)) {
                video.currentTime-=5;
            } else if(VFF_KEYS.includes(e.code)) {
                video.currentTime+=5;
            } else if(["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9"].includes(e.code)) {
                switch (e.code) {
                    case "1":
                        video.currentTime=video.duration*0.1;
                        break;
                    case "2":
                        video.currentTime=video.duration*0.2;
                        break;
                    case "3":
                        video.currentTime=video.duration*0.3;
                        break;
                    case "4":
                        video.currentTime=video.duration*0.4;
                        break;
                    case "5":
                        video.currentTime=video.duration*0.5;
                        break;
                    case "6":
                        video.currentTime=video.duration*0.6;
                        break;
                    case "7":
                        video.currentTime=video.duration*0.7;
                        break;
                    case "8":
                        video.currentTime=video.duration*0.8;
                        break;
                    case "9":
                        video.currentTime=video.duration*0.9;
                        break;    
                    default:
                        break;
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

// prevent rating view switcher form being submitted if no checkboxes are checked
document.querySelector("form#rtngViewForm").addEventListener('submit', function (event) {
    if($("input[name='_config_ratings_default[]']:checked").length < 1) {
        event.preventDefault(); 
        document.querySelector("form#rtngViewForm").style.color = "red";
        return false;
    }
    return true;
});