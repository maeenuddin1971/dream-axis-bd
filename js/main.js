(function () {
    var WHATSAPP_NUMBER = "8801627776675";

    var nav = document.getElementById("mainNav");
    var toTop = document.querySelector(".to-top");

    // Navbar shadow + back-to-top visibility
    function onScroll() {
        var y = window.scrollY;
        nav.classList.toggle("scrolled", y > 20);
        toTop.classList.toggle("show", y > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Close the mobile menu after picking a link
    var collapseEl = document.getElementById("nav");
    document.querySelectorAll("#nav .nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (collapseEl.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
            }
        });
    });

    // Highlight the nav link for the section in view
    var links = document.querySelectorAll("#nav .nav-link[href^='#']");
    var sections = Array.prototype.map.call(links, function (l) {
        return document.querySelector(l.getAttribute("href"));
    }).filter(Boolean);

    if ("IntersectionObserver" in window) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (l) {
                    l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach(function (s) { spy.observe(s); });

        // Fade sections in as they scroll into view
        var reveal = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    reveal.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
    }

    // "Inquire now" links preselect the matching option in the form
    var interest = document.getElementById("fInterest");
    document.querySelectorAll("[data-interest]").forEach(function (link) {
        link.addEventListener("click", function () {
            var wanted = link.getAttribute("data-interest");
            for (var i = 0; i < interest.options.length; i++) {
                if (interest.options[i].text === wanted) {
                    interest.selectedIndex = i;
                    break;
                }
            }
        });
    });

    // Inquiry form opens WhatsApp with the details filled in
    var form = document.getElementById("inquiryForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }
        var msg = "Hello Dream Axis BD, I would like to make an inquiry.\n\n" +
            "Name: " + document.getElementById("fName").value.trim() + "\n" +
            "Phone: " + document.getElementById("fPhone").value.trim() + "\n" +
            "Interested in: " + interest.value;
        var extra = document.getElementById("fMsg").value.trim();
        if (extra) msg += "\nMessage: " + extra;
        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });

    document.getElementById("year").textContent = new Date().getFullYear();
})();
