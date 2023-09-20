document.addEventListener('keydown', (e) => {
    alert("running");
    switch(e.key) {
        case $PREV_KEYS.includes(e.key):
            $target = document.getElementById("prevlink").getAttribute("href");
            window.location.href=$target;
            break;
        case $NEXT_KEYS.includes(e.key):
            $target = document.getElementById("nextlink").getAttribute("href");
            window.location.href=$target;
            break;
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

