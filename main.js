

function scroll_to_element(elem) {
    var bounds = elem.getBoundingClientRect();
    var yOffset = -70;
    var scrollLoc = bounds.top + window.pageYOffset + yOffset;

    window.scrollTo({top: scrollLoc, behavior: 'smooth'});
}

function init_projects() {
    var project_buttons = document.getElementsByClassName("collapsible");

    for (var i = 0; i < project_buttons.length; i++) {
        project_buttons[i].addEventListener("click", function() {
            // var hover_button = this.nextElementSibling;
            var content = this.nextElementSibling;
            if (content.classList.contains("content-open")) {
                content.classList.remove("content-open");
                content.classList.add("content");
            } else {
                // hover_button.style.display = "none";
                scroll_to_element(content.parentElement);
                content.classList.remove("content");
                content.classList.add("content-open");
            }
        });
    }
}

function init() {
    init_timeout();
    init_projects();
}

window.onload = init;