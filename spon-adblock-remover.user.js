// ==UserScript==
// @name         Remove Spiegel Online Adblock Popup Asynchronously
// @namespace    http://tampermonkey.net/
// @homepageURL  https://github.com/tsak/spon-remove-adblock
// @updateURL    https://github.com/tsak/spon-remove-adblock/raw/master/spon-adblock-remover.user.js
// @supportURL   https://github.com/tsak/spon-remove-adblock/issues
// @version      0.2
// @license      MIT
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
        "body > div[id^=sp_message], body > div[class^=sp_veil] {\n"+
        "animation-duration: 0.001s;\n"+
        "animation-name: nodeInserted;\n"+
        "}"
    );

    var insertListener = function(event){
        if (event.animationName == "nodeInserted") {
            // Remove nag screen
            var el = document.querySelectorAll('div[id^=sp_message_id]')[0];
            el.parentNode.removeChild(el);
            
            // Remove overlay
            var el2 = document.querySelectorAll('div[class^=sp_veil]')[0];
            el2.parentNode.removeChild(el2);
            
            // Disable blur on content wrapper
            document.getElementsByTagName('html')[0].setAttribute('style', '');
            document.getElementsByTagName('body')[0].setAttribute('style', '');
        }
    };

    document.addEventListener("animationstart", insertListener, false); // standard + firefox
    document.addEventListener("MSAnimationStart", insertListener, false); // IE
    document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari
})();
