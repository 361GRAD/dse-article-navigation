// Smooth Scroll
!function (e, t) { "function" == typeof define && define.amd ? define("smoothScroll", t(e)) : "object" == typeof exports ? module.exports = t(e) : e.smoothScroll = t(e) }(window || this, function (e) { "use strict"; var t, n, o, r = {}, a = !!document.querySelector && !!e.addEventListener, c = { speed: 500, easing: "easeInOutCubic", offset: 0, updateURL: !0, callbackBefore: function () { }, callbackAfter: function () { } }, u = function (e, t, n) { if ("[object Object]" === Object.prototype.toString.call(e)) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e); else for (var r = 0, a = e.length; a > r; r++)t.call(n, e[r], r, e) }, i = function (e, t) { var n = {}; return u(e, function (t, o) { n[o] = e[o] }), u(t, function (e, o) { n[o] = t[o] }), n }, l = function (e, t) { for (var n = t.charAt(0); e && e !== document; e = e.parentNode)if ("." === n) { if (e.classList.contains(t.substr(1))) return e } else if ("#" === n) { if (e.id === t.substr(1)) return e } else if ("[" === n && e.hasAttribute(t.substr(1, t.length - 2))) return e; return !1 }, s = function (e) { return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight) }, f = function (e) { for (var t, n = String(e), o = n.length, r = -1, a = "", c = n.charCodeAt(0); ++r < o;) { if (t = n.charCodeAt(r), 0 === t) throw new InvalidCharacterError("Invalid character: the input contains U+0000."); a += t >= 1 && 31 >= t || 127 == t || 0 === r && t >= 48 && 57 >= t || 1 === r && t >= 48 && 57 >= t && 45 === c ? "\\" + t.toString(16) + " " : t >= 128 || 45 === t || 95 === t || t >= 48 && 57 >= t || t >= 65 && 90 >= t || t >= 97 && 122 >= t ? n.charAt(r) : "\\" + n.charAt(r) } return a }, d = function (e, t) { var n; return "easeInQuad" === e && (n = t * t), "easeOutQuad" === e && (n = t * (2 - t)), "easeInOutQuad" === e && (n = .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t), "easeInCubic" === e && (n = t * t * t), "easeOutCubic" === e && (n = --t * t * t + 1), "easeInOutCubic" === e && (n = .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e && (n = t * t * t * t), "easeOutQuart" === e && (n = 1 - --t * t * t * t), "easeInOutQuart" === e && (n = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e && (n = t * t * t * t * t), "easeOutQuint" === e && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e && (n = .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), n || t }, h = function (e, t, n) { var o = 0; if (e.offsetParent) do o += e.offsetTop, e = e.offsetParent; while (e); return o = o - t - n, o >= 0 ? o : 0 }, m = function () { return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) }, p = function (e) { return e && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(e) : {} }, v = function (t, n) { history.pushState && (n || "true" === n) && history.pushState(null, null, [e.location.protocol, "//", e.location.host, e.location.pathname, e.location.search, t].join("")) }; r.animateScroll = function (t, n, r) { var a = i(a || c, r || {}), u = p(t ? t.getAttribute("data-options") : null); a = i(a, u), n = "#" + f(n.substr(1)); var l = "#" === n ? document.documentElement : document.querySelector(n), g = e.pageYOffset; o || (o = document.querySelector("[data-scroll-header]")); var b, O, y, S = null === o ? 0 : s(o) + o.offsetTop, I = h(l, S, parseInt(a.offset, 10)), H = I - g, E = m(), A = 0; v(n, a.updateURL); var L = function (o, r, c) { var u = e.pageYOffset; (o == r || u == r || e.innerHeight + u >= E) && (clearInterval(c), l.focus(), a.callbackAfter(t, n)) }, Q = function () { A += 16, O = A / parseInt(a.speed, 10), O = O > 1 ? 1 : O, y = g + H * d(a.easing, O), e.scrollTo(0, Math.floor(y)), L(y, I, b) }, C = function () { a.callbackBefore(t, n), b = setInterval(Q, 16) }; 0 === e.pageYOffset && e.scrollTo(0, 0), C() }; var g = function (e) { var n = l(e.target, "[data-scroll]"); n && "a" === n.tagName.toLowerCase() && (e.preventDefault(), r.animateScroll(n, n.hash, t)) }, b = function () { n || (n = setTimeout(function () { n = null, headerHeight = null === o ? 0 : s(o) + o.offsetTop }, 66)) }; return r.destroy = function () { t && (document.removeEventListener("click", g, !1), e.removeEventListener("resize", b, !1), t = null, n = null, o = null) }, r.init = function (n) { a && (r.destroy(), t = i(c, n || {}), o = document.querySelector("[data-scroll-header]"), document.addEventListener("click", g, !1), o && e.addEventListener("resize", b, !1)) }, r });

(function () {

    let windowWidth = 0;

    document.addEventListener("DOMContentLoaded", function (event) {
        windowWidth = window.outerWidth;
        if (document.getElementById('anArticleNav') === null) {
            return false;
        }

        let articlesTarget = document.querySelectorAll(".anchor-target");
        let modArticleNav = document.querySelector(".mod_dse_article_nav");
        let anArticleNavContents = modArticleNav.querySelector("#anArticleNavContents");
        let articleAttr = "";
        let fixedHeaderHeight = 0;
        if (document.getElementById('fixedHeader') !== null) {
            fixedHeaderHeight = document.getElementById('fixedHeader').clientHeight
        }

        if (articlesTarget.length > 0) {
            [].forEach.call(articlesTarget, function (el, index) {
                articleAttr = el.dataset.articlenav;
                el.setAttribute('id', 'anchor' + index);

                let navItem = document.createElement('a');
                navItem.innerHTML = '<span>' + articleAttr.substr(articleAttr.indexOf("-") + 1) + '</span>';
                if (index === 0 && window.scrollY === 0) {
                    navItem.setAttribute('class', 'an-nav-link reading');
                } else {
                    navItem.setAttribute('class', 'an-nav-link');
                }
                navItem.setAttribute('data-scroll', '');
                navItem.setAttribute('data-index', index);
                navItem.setAttribute('href', '#anchor' + index);
                anArticleNavContents.appendChild(navItem);
            });
        }

        initSmoothScroll();

        initArrows();

        window.addEventListener('scroll', function () {
            let isScrolling
            window.clearTimeout(isScrolling)
            isScrolling = setTimeout(function () {
                makeNavSticky(fixedHeaderHeight);
                markOnScroll(articlesTarget, fixedHeaderHeight);
            }, 100);
        });

        initHorizontalScroll(modArticleNav, anArticleNavContents);
        window.addEventListener("resize", timeoutFunc(function (event) {
            initHorizontalScroll(modArticleNav, anArticleNavContents);
        }))

    });

    function initSmoothScroll() {
        smoothScroll.init({
            speed: 1000,
            easing: 'easeInOutCubic',
            offset: 60,
            updateURL: false,
            callbackBefore: function (toggle, anchor) {
                let current = document.querySelector('.scroll-active');
                if (current) {
                    current.classList.remove('scroll-active');
                }
                if (toggle) {
                    toggle.classList.add('scroll-active');
                }
            },
            callbackAfter: function (toggle, anchor) {
            }
        });
    }

    function initArrows() {
        let anSettings = {
            navBarTravelling: false,
            navBarTravelDirection: "",
            navBarTravelDistance: 150
        }
        let anButtonLeft = document.getElementById("anButtonLeft");
        let anButtonRight = document.getElementById("anButtonRight");

        let anIndicator = document.getElementById("anIndicator");

        let anArticleNav = document.getElementById("anArticleNav");
        let anArticleNavContents = document.getElementById("anArticleNavContents");

        if (windowWidth >= 1200) {
            anArticleNav.setAttribute("data-overflowing", determineOverflow(anArticleNavContents, anArticleNav));
        }
        anButtonLeft.addEventListener("click", function () {
            navTransitionend()
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
            navTransitionend()
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

        function navTransitionend() {
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
        }

    }

    function makeNavSticky(fixedHeaderHeight) {
        let anArticleNavEl = document.querySelector('[data-ansticky]');
        if (anArticleNavEl === null) {
            return false
        }

        if (window.pageYOffset > (anArticleNavEl.parentNode.parentNode.offsetTop - fixedHeaderHeight)) {
            anArticleNavEl.parentNode.style.height = document.getElementById('anArticleNav').clientHeight + 'px';
            anArticleNavEl.setAttribute('data-ansticky', 'true');
        } else {
            anArticleNavEl.setAttribute('data-ansticky', 'false');
        }
    }

    function markOnScroll(articlesTarget, fixedHeaderHeight) {
        let heightArr = [];
        let scrollY = window.pageYOffset;
        let currentAnchor = null
        let currentIndex = 0
        let anchorNavLinks = document.querySelectorAll('#anArticleNavContents a');

        articlesTarget.forEach(function (item, index, arr) {
            let heightVal;
            if (index === articlesTarget.length - 1) {
                heightVal = window.pageYOffset - fixedHeaderHeight + arr[index].getBoundingClientRect().top
            } else {
                heightVal = window.pageYOffset - fixedHeaderHeight + arr[index].getBoundingClientRect().top
            }

            heightArr.push(parseInt(heightVal, 10))
        })

        heightArr.forEach(function (val, index) {
            if (scrollY >= val - 100) {
                currentAnchor = articlesTarget[index]
                currentIndex = index
            }
        })

        articlesTarget.forEach(function (el, index) {
            if (index === currentIndex) {
                // mark active link
                let oldLink = document.querySelector(".scroll-active")
                if (oldLink !== null) {
                    oldLink.classList.remove("scroll-active", "reading");
                }

                if (scrollY + 100 >= heightArr[0]) {
                    anchorNavLinks[currentIndex].classList.remove('previous');
                    anchorNavLinks[currentIndex].classList.add("scroll-active", "reading");
                }
                if (scrollY === 0) {
                    anchorNavLinks[0].classList.remove("scroll-active", "reading");
                }
            }
        })
    }

    function initHorizontalScroll(modArticleNav, anArticleNavContents) {
        let anArticleNav = modArticleNav.querySelector('.an-article-nav');
        let anArticleNavWidth = anArticleNav.offsetWidth;
        let anArticleNavItems = Array.prototype.slice.call(modArticleNav.querySelectorAll('a.an-nav-link'))
        if (anArticleNavWidth < anArticleNavContents.offsetWidth) {
            let activeItem;
            let borderIndex = anArticleNavItems[Math.floor(anArticleNavItems.length / 2)].getAttribute('data-index')
            if (windowWidth < 1200) {
                let scrollOffset = 0;
                let previousActive = null;
                window.addEventListener("scroll", timeoutFunc(function (event) {
                    let currentWidth = 0;
                    activeItem = modArticleNav.querySelector("a.an-nav-link.scroll-active");
                    if (activeItem && activeItem.getAttribute('data-index') > 2 && activeItem !== previousActive) {
                        let p = activeItem;
                        while (p = p.previousElementSibling) {
                            currentWidth += p.offsetWidth;
                        }
                        scrollOffset = (currentWidth - anArticleNavWidth / 2) + activeItem.offsetWidth / 2;
                        // anArticleNav.scrollLeft = 0;
                        // anArticleNavContents.classList.remove("no-transition");
                        anArticleNavContents.setAttribute("style", "transform:translateX(-" + scrollOffset + "px)");
                    } else if (activeItem && activeItem.getAttribute('data-index') <= 2 || window.pageYOffset === 0) {
                        // anArticleNavContents.classList.remove("no-transition");
                        scrollTo(anArticleNav, 0, 250);
                        anArticleNavContents.setAttribute("style", "transform:translateX(0px)");
                    }
                    previousActive = activeItem;
                }));
            } else {
                let navArrowLeft = modArticleNav.querySelector('#anButtonLeft');
                let navArrowRight = modArticleNav.querySelector('#anButtonRight');
                window.addEventListener("scroll", timeoutFunc(function (event) {
                    activeItem = modArticleNav.querySelector("a.an-nav-link.scroll-active");
                    if (activeItem && activeItem.getAttribute('data-index') >= borderIndex) {
                        navArrowRight.click()
                    } else {
                        navArrowLeft.click()
                    }
                }));
            }
        }
    }

    function timeoutFunc(func) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 300, event);
        };
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

    function scrollTo(element, to, duration) {
        var start = element.scrollLeft,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function () {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

})();
