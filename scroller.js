
var current_idx = 0;
var num_list = 0;

var professions = [
    "Computer Engineer",
    "Researcher",
    "Tech Enthusiast",
    "Formula Student Engineer",
    "Bicyclicler",
    "Machinist",
    "History Buff",
    "Linux Ricer",
    "Gym goer",
    "International Student"
];

function update_ticker() {
    var scroll_item = document.getElementById("scroller");
    // if (num_list == 4) scroll_item.removeChild(scroll_item.lastElementChild);
    
    // if (num_list != 4) num_list++;

    var newElem = document.createElement("div");
    newElem.classList.add("scroll-item");
    newElem.innerText = professions[current_idx];
    scroll_item.prepend(newElem);

    current_idx++;
    if (current_idx == professions.length) current_idx = 0;
}

function remove_extra() {
    var scroll_item = document.getElementById("scroller");
    if (num_list >= 3) scroll_item.removeChild(scroll_item.lastElementChild);
}

function init_timeout() {
    var third_period = 8000;

    setInterval(update_ticker, third_period / 3);
    setInterval(remove_extra, third_period);
}

window.onfocus = function() {
    var scroll_item = document.getElementById("scroller");
    
    for (var i = 0; i < num_list; i++) {
        scroll_item.removeChild(scroll_item.lastElementChild);
    }

    num_list = 0;
}

window.onload = init_timeout;