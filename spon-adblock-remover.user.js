// ==UserScript==
// @name         Remove Spiegel Online Adblock Popup Asynchronously
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  remove annoying Adblock nag screen from Spiegel.de
// @author       tsak
// @match        *://*.spiegel.de/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Neat trick from https://davidwalsh.name/detect-node-insertion
    GM_addStyle(
        "@keyframes nodeInserted {\n" +
        "from { opacity: 0.99; }\n" +
        "to { opacity: 1; }\n" +
        "}"
    );

    GM_addStyle(
        "body > .ua-detected {\n"+
        "animation-duration: 0.001s;\n"+
        "animation-name: nodeInserted;\n"+
        "}"
    );

    var insertListener = function(event){
        if (event.animationName == "nodeInserted") {
            // Remove nag screen
            var el = document.querySelectorAll('.ua-detected')[0];
            el.parentNode.removeChild(el);
            // Disable blur on content wrapper
            document.getElementById('wrapper-content').setAttribute('style', '');
        }
    };

    document.addEventListener("animationstart", insertListener, false); // standard + firefox
    document.addEventListener("MSAnimationStart", insertListener, false); // IE
    document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari
})();
