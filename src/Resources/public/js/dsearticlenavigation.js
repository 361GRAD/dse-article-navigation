// (function ($) {
//     $(document).ready(function () {
//         var articleAttr = "";
//         var articleNavHtml = "<ul>";
//         $('[data-articlenav]').each(function () {
//             articleAttr = $(this).data('articlenav');
//             articleNavHtml += '<li><a class="anchorlink" href="' + window.location.pathname + '#article-' + articleAttr.split('-')[0] + '">' + articleAttr.substr(articleAttr.indexOf("-") + 1) + '</a></li>';
//         });
//         articleNavHtml += "</ul>";
//         $("div.mod_dse_article_nav").html(articleNavHtml);
//     });
// })(jQuery);

let initialIndicator = true;
document.addEventListener("DOMContentLoaded", function (event) {

    if (document.getElementById('anArticleNav') === null) {
        return false;
    }

    let articleAttr = "";
    let articleNavHtml = '';
    document.querySelectorAll('[data-articlenav]').forEach((el, index) => {
        articleAttr = el.dataset.articlenav;
        if (index == 0) {
            articleNavHtml += '<a class="an-nav-link" href="#article-' + articleAttr.split('-')[0] + '" aria-selected="true">' + articleAttr.substr(articleAttr.indexOf("-") + 1) + '</a>';
        } else {
            articleNavHtml += '<a class="an-nav-link" href="#article-' + articleAttr.split('-')[0] + '" aria-selected="false">' + articleAttr.substr(articleAttr.indexOf("-") + 1) + '</a>';
        }
    });
    articleNavHtml += '<span id="anIndicator" class="an-indicator"></span>';
    document.querySelector("#anArticleNavContents").innerHTML = articleNavHtml;

    // https://benfrain.com/a-horizontal-scrolling-navigation-pattern-for-touch-and-mouse-with-moving-current-indicator/
    let anSettings = {
        navBarTravelling: false,
        navBarTravelDirection: "",
        navBarTravelDistance: 150
    }

    let colours = {
        0: "#867100",
        1: "#7F4200",
        2: "#99813D",
        3: "#40FEFF",
        4: "#14CC99",
        5: "#00BAFF",
        6: "#0082B2",
        7: "#B25D7A",
        8: "#00FF17",
        9: "#006B49",
        10: "#00B27A",
        11: "#996B3D",
        12: "#CC7014",
        13: "#40FF8C",
        14: "#FF3400",
        15: "#ECBB5E",
        16: "#ECBB0C",
        17: "#B9D912",
        18: "#253A93",
        19: "#125FB9",
    }

    let anButtonLeft = document.getElementById("anButtonLeft");
    let anButtonRight = document.getElementById("anButtonRight");

    let anIndicator = document.getElementById("anIndicator");

    let anArticleNav = document.getElementById("anArticleNav");
    let anArticleNavContents = document.getElementById("anArticleNavContents");

    anArticleNav.setAttribute("data-overflowing", determineOverflow(anArticleNavContents, anArticleNav));

    // set the indicator
    moveIndicator(anArticleNav.querySelector("[aria-selected=\"true\"]"), colours[0]);

    // Handle the scroll of the horizontal container
    let last_known_scroll_position = 0;
    let ticking = false;

    function checkOverflow(scroll_pos) {
        anArticleNav.setAttribute("data-overflowing", determineOverflow(anArticleNavContents, anArticleNav));
    }

    anArticleNav.addEventListener("scroll", function () {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                checkOverflow(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });


    anButtonLeft.addEventListener("click", function () {
        // If in the middle of a move return
        if (anSettings.navBarTravelling === true) {
            return;
        }
        if (determineOverflow(anArticleNavContents, anArticleNav) === "left" || determineOverflow(anArticleNavContents, anArticleNav) === "both") {
            // Find how far this panel has been scrolled
            let availableScrollLeft = anArticleNav.scrollLeft;
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the settings
            if (availableScrollLeft < anSettings.navBarTravelDistance * 2) {
                anArticleNavContents.style.transform = "translateX(" + availableScrollLeft + "px)";
            } else {
                anArticleNavContents.style.transform = "translateX(" + anSettings.navBarTravelDistance + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
            anArticleNavContents.classList.remove("no-transition");
            // Update our settings
            anSettings.navBarTravelDirection = "left";
            anSettings.navBarTravelling = true;
        }
        // Now update the attribute in the DOM
        anArticleNav.setAttribute("data-overflowing", determineOverflow(anArticleNavContents, anArticleNav));
    });

    anButtonRight.addEventListener("click", function () {
        // If in the middle of a move return
        if (anSettings.navBarTravelling === true) {
            return;
        }
        // If we have content overflowing both sides or on the right
        if (determineOverflow(anArticleNavContents, anArticleNav) === "right" || determineOverflow(anArticleNavContents, anArticleNav) === "both") {
            // Get the right edge of the container and content
            let navBarRightEdge = anArticleNavContents.getBoundingClientRect().right;
            let navBarScrollerRightEdge = anArticleNav.getBoundingClientRect().right;
            // Now we know how much space we have available to scroll
            let availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the settings
            if (availableScrollRight < anSettings.navBarTravelDistance * 2) {
                anArticleNavContents.style.transform = "translateX(-" + availableScrollRight + "px)";
            } else {
                anArticleNavContents.style.transform = "translateX(-" + anSettings.navBarTravelDistance + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
            anArticleNavContents.classList.remove("no-transition");
            // Update our settings
            anSettings.navBarTravelDirection = "right";
            anSettings.navBarTravelling = true;
        }
        // Now update the attribute in the DOM
        anArticleNav.setAttribute("data-overflowing", determineOverflow(anArticleNavContents, anArticleNav));
    });

    anArticleNavContents.addEventListener(
        "transitionend",
        function () {
            // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
            let styleOfTransform = window.getComputedStyle(anArticleNavContents, null);
            let tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
            // If there is no transition we want to default to 0 and not null
            let amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
            anArticleNavContents.style.transform = "none";
            anArticleNavContents.classList.add("no-transition");
            // Now lets set the scroll position
            if (anSettings.navBarTravelDirection === "left") {
                anArticleNav.scrollLeft = anArticleNav.scrollLeft - amount;
            } else {
                anArticleNav.scrollLeft = anArticleNav.scrollLeft + amount;
            }
            anSettings.navBarTravelling = false;
        },
        false
    );

    // Handle setting the currently active link
    anArticleNavContents.addEventListener("click", function (e) {
        e.preventDefault();

        let links = resetNavLinks();

        e.target.setAttribute("aria-selected", "true");
        moveIndicator(e.target, colours[links.indexOf(e.target)]);

        scrollPageTo(document.querySelector(e.target.hash), 800);

        return false;
    });
    
    checkActiveArticle();
});

// window resize withtimeout
window.addEventListener("resize", timeoutFunc(function (event) {
    makeSticky();

    checkActiveArticle();
}))

// window scroll
window.onscroll = function (wse) {
    makeSticky();
};
// with timeout
window.addEventListener("scroll", timeoutFunc(function (event) {
    checkActiveArticle();
}));

function makeSticky() {
    let anArticleNavEl = document.querySelector('[data-ansticky]');
    // minus header height because header is also sticky
    if (window.pageYOffset > (anArticleNavEl.closest('.mod_article').offsetTop - document.querySelector('.header-block').clientHeight)) {
        anArticleNavEl.parentNode.style.height = document.getElementById('anArticleNav').clientHeight + 'px';
        anArticleNavEl.setAttribute('data-ansticky', 'true');
    } else {
        anArticleNavEl.setAttribute('data-ansticky', 'false');
    }
}

function checkActiveArticle() {
    resetNavLinks();

    // https://codepen.io/bfintal/pen/Ejvgrp
    for (var el of document.querySelectorAll('#main > .inside > *')) {
        let scroll = window.scrollY || window.pageYOffset;
        let boundsTop = el.getBoundingClientRect().top + scroll
        let viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        }
        
        let bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight,
        }
        
        if (bounds.bottom >= (viewport.top + document.getElementById('anArticleNav').clientHeight) || bounds.top >= (viewport.top + document.getElementById('anArticleNav').clientHeight) ) {
            var navLink = document.querySelector('a[href="#' + el.id + '"]');
            // only adjust the navigation when there is an article with a headline (this headline will also be in the navigation)
            if (el.hasAttribute('data-articlenav')) {
                navLink.setAttribute("aria-selected", "true");

                moveIndicator(navLink);
            }

            break;
        }
    }
}

function resetNavLinks() {
    let links = [].slice.call(document.querySelectorAll(".an-nav-link"));
    links.forEach(function (item) {
        item.setAttribute("aria-selected", "false");
    });

    return links;
}

// let count = 0;
function moveIndicator(item, color=0) {
    let textPositionWidth = 0;
    let textPosition = item.getBoundingClientRect();
    let container = anArticleNavContents.getBoundingClientRect().left;
    let distance = textPosition.left - container;
    let scroll = anArticleNavContents.scrollLeft;
    // check if is on page load to calc the scale for the indicator
    if (initialIndicator) {
        textPositionWidth = Math.round(textPosition.width + 3);
        initialIndicator = false;
    } else {
        textPositionWidth = textPosition.width;
    }
    anIndicator.style.transform = "translateX(" + (distance + scroll) + "px) scaleX(" + textPositionWidth * 0.01 + ")";
    // count = count += 100;
    // anIndicator.style.transform = "translateX(" + count + "px)";

    if (color) {
        anIndicator.style.backgroundColor = color;
    }
}

function determineOverflow(content, container) {
    let containerMetrics = container.getBoundingClientRect();
    let containerMetricsRight = Math.floor(containerMetrics.right);
    let containerMetricsLeft = Math.floor(containerMetrics.left);
    let contentMetrics = content.getBoundingClientRect();
    let contentMetricsRight = Math.floor(contentMetrics.right);
    let contentMetricsLeft = Math.floor(contentMetrics.left);
    if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
    } else if (contentMetricsRight > containerMetricsRight) {
        return "right";
    } else {
        return "none";
    }
}

// https://gist.github.com/felipenmoura/650e7e1292c1e7638bcf6c9f9aeb9dd5
function scrollPageTo(to, duration = 500) {
    //t = current time
    //b = start value
    //c = change in value
    //d = duration

    // or cube instead of Quad: http://www.gizma.com/easing/#cub3
    const easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    return new Promise((resolve, reject) => {
        const element = document.scrollingElement;

        if (typeof to === 'string') {
            to = document.querySelector(to) || reject();
        }
        if (typeof to !== 'number') {
            to = to.getBoundingClientRect().top + element.scrollTop;
        }

        let offset = document.getElementById('anArticleNav').clientHeight - 1,
            headerHeight = document.querySelector('.header-block').clientHeight,
            start = element.scrollTop,
            change = to - start - offset - headerHeight,
            currentTime = 0,
            increment = 20;

        const animateScroll = function () {
            currentTime += increment;
            let val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                // https://gist.github.com/felipenmoura/650e7e1292c1e7638bcf6c9f9aeb9dd5#gistcomment-2886427
                // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
                // setTimeout(animateScroll, increment);
                requestAnimationFrame(animateScroll);
            } else {
                resolve();
            }
        };
        animateScroll();
    });
}

// Timeout function
function timeoutFunc(func) {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 300, event);
    };
}
