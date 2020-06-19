
function moveDavid (dx, dy) {
    var david = document.getElementById("david");
    var rect = david.getBoundingClientRect();

    var centX = (rect.left + rect.right) / 2;
    var centY = (rect.top + rect.bottom) / 2;

    var velocity = 2;
    
    david.style.position = "absolute";
    david.style.top = centY + Math.round(dx * velocity);
    david.style.left = centX + Math.round(dy * velocity);

    console.log("DOing stuff " + dx + " " + dy);
}

function maintainSocialDistancing (x, y) {
    var david = document.getElementById("david");
    var rect = david.getBoundingClientRect();

    var centX = (rect.left + rect.right) / 2;
    var centY = (rect.top + rect.bottom) / 2;

    var vecX = centX - x;
    var vecY = centY - y;
    var mag = Math.sqrt(vecX*vecX + vecY*vecY);

    moveDavid(vecX/mag, vecY/mag);
}

function getIfClose (x, y) {
    var david = document.getElementById("david");

    var rect = david.getBoundingClientRect();
    // console.log("comparing <" + x + ", " + y + "> to david <" + rect.left + ", " + rect.top + ">");
    if ((x > (rect.left - 6) && (x < (rect.right + 6))) && ((y > (rect.top - 6)) && (y < (rect.bottom + 6)))) {
        
        // Within my sphere of contamination
        maintainSocialDistancing(x, y);
    }
}

window.onload=function() {
    document.getElementById("body").addEventListener("mouseover", function(e) {
        getIfClose(e.clientX, e.clientY);
    });
}
