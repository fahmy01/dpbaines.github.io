

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

function create_svg() {
    var toggler = document.getElementById("navbar-toggle");
    var svgdm = document.getElementById("svg-icon");
    
    var svg = Snap(svgdm);
    var mainpath = svg.path("M 26,26 4,4 M 26,4 4,26");
    mainpath.attr({
        fill: "none",
        stroke: "#ffffff",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeOpacity: 1
        // strokeDasharray: 1000
    });

    var leftlines = svg.path("M 4,4 4,26");
    leftlines.attr({
        fill: "none",
        stroke: "#ffffff",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4,
        // strokeDasharray: 1000,
        strokeOpacity: 1
        // strokeDashoffset: 0
    });

    var rightlines = svg.path("M 26,4 26,26");
    rightlines.attr({
        fill: "none",
        stroke: "#ffffff",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4,
        // strokeDasharray: 1000,
        strokeOpacity: 1
        // strokeDashoffset: 0
    });

    // document.getElementById("navbar-toggle").addEventListener("click", function() {
        // lines.animate({strokeDashoffset: 0}, 3000, mina.linear);
    // });

    toggler.addEventListener("click", function() {
        if(toggler.classList.contains("navbar-active-icon")) {
            toggler.classList.remove("navbar-active-icon");
            toggler.classList.add("navbar-inactive-icon");
            leftlines.animate({transform: 'r0,0,0'}, 500, mina.linear);
            rightlines.animate({transform: 'r0,0,0'}, 500, mina.linear);
        } else {
            toggler.classList.remove("navbar-inactive-icon");
            toggler.classList.add("navbar-active-icon");
            leftlines.animate({transform: 'r-45,4,4'}, 500, mina.linear);
            rightlines.animate({transform: 'r-45,26,26'}, 500, mina.linear);

            // Snap.animate(0, 45, function(val) {
            //     lines.attr({
            //         transform: 'r' + val
            //     });
            // }, 100, mina.linear);
        }
    });
}

function init_navbar() {
    var navbar = document.getElementById("navbar-toggle");
    navbar.addEventListener("click", function() {
        var navthing = document.getElementById("navbarNav");
        if (navthing.classList.contains("navcollapse")) {
            navthing.classList.remove("navcollapse");
            navthing.classList.add("navopen");
        
        } else {
            navthing.classList.remove("navopen");
            navthing.classList.add("navcollapse");
            
        }
    });
}

function init() {
    init_timeout();
    init_projects();
    init_navbar();
    create_svg();
}

window.onload = init;