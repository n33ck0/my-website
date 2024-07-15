/* --CSCI-355 Internet Web Technologies-->
<! --Summer 2024-->
<! --Isaias Hernandez-->
<! --Assignment07 - Basic Webpage-->*/

/**
 * Unfortunately navigator.appName has been deprecated and no longer works;
 * as per: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appName;
 * "Note: Do not rely on this property to return a real browser name. All browsers return "Netscape" as the value of this property."
 * This function was found scouring the Internet @StackOverFlow:
 * https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browsers/9851769#9851769
 * Here: https://github.com/bowser-js/bowser and here: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browsers/9851769#9851769
 */
$(document).ready(function () {
    // Check that jQuery and the jQuery browser plugin are loaded
    if (typeof $.browser !== "undefined") {
        console.log("jQuery and the jQuery browser plugin are loaded");
    } else {
        console.error("jQuery or the jQuery browser plugin is not loaded");
        return;
    }

    // Function to update elements in the new window
    function elementUpdate(element, content, newWindow) {
        const id = newWindow.document.getElementById(element);
        if (id) {
            id.innerHTML = content;
        }
    }

    // Mapping of link IDs to their corresponding update functions
    // Modified from here: https://dev.to/dhilipkmr/implementing-our-own-array-map-method-in-javascript-553m
    // Here: https://dev.to/tqbit/replace-your-endless-if-else-or-switch-javascript-statements-with-maps-3i0a
    // And here: https://stackoverflow.com/questions/53967165/how-to-render-array-of-object-in-html-element
    // -using-javascript-using-map-function
    const updateFunctions = {
        "navigator-link": updateNavigator,
        "window-link": updateWindow,
        "screen-link": updateScreen,
        "location-link": updateLocation,
        "geolocation-link": getLocation
    };

    // Function to handle link clicks
    function handleLinkClick(event) {
        event.preventDefault();
        const idLink = event.target.id;

        // Open a new window
        // Modified from here: https://www.geeksforgeeks.org/how-to-open-url-in-a-new-window-using-javascript/#
        // And here: https://stackoverflow.com/questions/14132122/open-url-in-new-window-with-javascript
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        newWindow.document.write('<html lang="en"><head><title>Browser Info</title></head><body><div id="content">' +
            '<div id="Navigator"></div><div id="Product"></div><div id="Version"></div><div id="Agent"></div><div id="Platform">' +
            '</div><div id="Language"></div><div id="Screen"></div><div id="Window"></div><div id="Location"></div><div id="Hostname">' +
            '</div><div id="Pathname"></div><div id="Protocol"></div><div id="Geolocation"></div></div></body></html>');
        newWindow.document.close();

        // Calling the appropriate function based on the clicked link's ID
        // Modified from here: https://stackoverflow.com/questions/72400541/how-to-get-updated-dom-element-in-javascript-code
        const updateFunction = updateFunctions[idLink];
        if (updateFunction) {
            updateFunction(newWindow);
        } else {
            console.error("Unrecognized link ID");
        }
    }

    // Navigator Update function
    // Modified from here: https://www.w3schools.com/js/js_htmldom_html.asp
    function updateNavigator(newWindow) {
        elementUpdate("Navigator", "Your Browser is: " + $.browser.name + " v " +
            $.browser.versionNumber + " on " + $.browser.platform, newWindow);
        elementUpdate("Product", "Your Browser's Product ID is: " + navigator.product, newWindow);
        elementUpdate("Version", "Your Browser's Version is: " + navigator.appVersion, newWindow);
        elementUpdate("Agent", "Your Browser's Agent is: " + navigator.userAgent, newWindow);
        elementUpdate("Platform", "Your Browser's Platform is: " + navigator.platform, newWindow);
        elementUpdate("Language", "Your Browser's Language is: " + navigator.language, newWindow);
    }

    // Window Update function
    function updateWindow(newWindow) {
        elementUpdate("Window", "The screen's inner window width is " +
            window.innerWidth + " pixels." + "<br>The screen's inner window height is " + window.innerHeight + " pixels", newWindow);
    }

    // Screen Update function
    function updateScreen(newWindow) {
        elementUpdate("Screen", "The screen's width is " + screen.width + " pixels. " + "<br>The screen's height is " +
            screen.height + " pixels. " + "<br>The screen's available width is " + screen.availWidth + " pixels. " + "<br>The screen's available height is "
            + screen.availHeight + " pixels. " + "<br>The screen's color depth is " + screen.colorDepth + " bits. " + "<br>The screen's pixel depth is " +
            screen.pixelDepth + " ppi", newWindow);
    }

    // Location Update function
    function updateLocation(newWindow) {
        elementUpdate("Location", "The page's URL is " + window.location.href + "<br>The page's hostname is " +
            window.location.hostname + "<br>The page's pathname is " + window.location.pathname + "<br>The page's protocol is " +
            window.location.protocol, newWindow);
    }

    // Geolocation
    /**
     * The following code has been implemented from https://stackoverflow.com/questions/2577305/get-gps-location-from-the-web-browser
     * And more from here: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
     */
    function getLocation(newWindow) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                showPosition(position, newWindow);
            });
        } else {
            newWindow.document.getElementById("Geolocation").innerHTML = "Geolocation is not supported by your browser.";
        }
    }

    // Geolocation function
    function showPosition(position, newWindow) {
        const content = `Your browser's latitude is ${position.coords.latitude}. <br>
    Your browser's longitude is ${position.coords.longitude}`;
        elementUpdate("Geolocation", content, newWindow);
    }

    // Load the navbar and set up event listeners
    // This function takes advantage of JQuery framework
    // See here: https://jquery.com/
    $(document).ready(function () {
        $("#navbar-placeholder").load("navBar.html", function() {
            if(!$("#navbar-placeholder").html()){
                console.error("Error loading navBar.html");
            }
            // Link Listeners for Browser Menu
            $("#navigator-link").on("click", handleLinkClick);
            $("#window-link").on("click", handleLinkClick);
            $("#screen-link").on("click", handleLinkClick);
            $("#location-link").on("click", handleLinkClick);
            $("#geolocation-link").on("click", handleLinkClick);

            // Directly opening the dev and contact pages
            $("#dev-link").on("click", function(event) {
                event.preventDefault();
                window.location.href = "devInfo.html";
            });
            $("#contact-link").on("click", function(event) {
                event.preventDefault();
                window.location.href = "devContact.html";
            });
        });

    })

});
