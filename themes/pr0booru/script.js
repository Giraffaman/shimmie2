    // for testing if this is active
    // alert("running");

    var PREV_KEYS = ["a","p","ArrowLeft"];
    var NEXT_KEYS = ["d","n","ArrowRight"];
    var PRPG_KEYS = ["a","p","ArrowLeft"];
    var NXPG_KEYS = ["d","m","ArrowRight"];
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

/*
handles state changes in rating view form checkboxes:
- if SFW is checked, add hidden input to also enable rating PUBLIC
- if SFW is unchecked, remove hidden input
- if NSFW is checked, add hidden input to also enabled questionable and unrated (?)
- if NSFW unchecked, remove hidden inputs for Q and ?

ISSUES:
- the add/remove parts do work, but the event, no matter if using click, change or else,
only fires once. So if a user checks, then unchecks e.g. SFW for some reason, the hidden input 
for PUBLIC is added, but not removed. Also, if a user checks e.g. NSFW and then SFW, hidden inputs
for Q and ? are added, but not for PUBLIC.

TODO:
- figure out a better way to evaluate and add/remove hidden inputs, rather than reacting to checkbox
changes. Maybe better to get called by the submit button, do our thing and then "pass along" the submit event?
*/
function validateRatingViewForm() {
//    document.querySelector("form#rtngViewForm").addEventListener('submit', function (event) {
    console.log("validateRatingViewForm() called...");    
    if($("input[name='_config_ratings_default[]']:checked").length > 0) {
        console.log("at least one option checked...");
            [...document.querySelectorAll("form#rtngViewForm input[type='checkbox']")].forEach(function(cb) {
//                cb.addEventListener('change', function(e) {
                    form = document.getElementById("rtngViewForm");
                    if(cb.checked) {
                        console.log(cb.id+" checked");
                        switch(cb.id) {
                            case "chkbx_e":
                                /* for some reason, when validating the form through JS and either input's onclick or form's onsubmit,
                                the form's checkboxes are immediately reset, so only e.g. here ? and q are added, but not e.
                                Working around this by adding hidden inputs for e and (below) s, but this should not be necessary.
                                */
                                form.innerHTML+="<input type='hidden' id='hee' name='_config_ratings_default[]' value='e'>";
                                form.innerHTML+="<input type='hidden' id='heu' name='_config_ratings_default[]' value='?'>";
                                form.innerHTML+="<input type='hidden' id='heq' name='_config_ratings_default[]' value='q'>";
                                console.log("heu and heq added");
                                break;
                            case "chkbx_s":
                                form.innerHTML+="<input type='hidden' id='hss' name='_config_ratings_default[]' value='s'>";
                                form.innerHTML+="<input type='hidden' id='hsp' name='_config_ratings_default[]' value='p'>";
                                console.log("hsp added");
                                break;
                            default:
                                console.log("????");
                        }
                    } else {
                        console.log(cb.id+" unchecked");
                        switch(cb.id) {
                            case "chkbx_e":
                                if(document.contains(document.getElementById("heu"))) {
                                    document.getElementById("heu").remove();
                                    console.log("heu removed");
                                }
                                if(document.contains(document.getElementById("heq"))) {
                                    document.getElementById("heq").remove();
                                    console.log("heq removed");
                                }
                                break;
                            case "chkbx_s":
                                if(document.contains(document.getElementById("hsp"))) {
                                    document.getElementById("hsp").remove();
                                    console.log("hsp removed");
                                }
                                break;
                            default:
                                console.log("!!!");                
                        }        
                    }
//                });
            });    
        console.log("validation passed!");
        return true;
        //form.submit();
        } else {
//            event.preventDefault(); 
            document.querySelector("form#rtngViewForm").style.color = "red";
            console.log("validation failed!");
            return false;
        }
//    });    
    return true;
}
