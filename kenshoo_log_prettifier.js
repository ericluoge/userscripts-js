// ==UserScript==
// @name         Kenshoo logs - Pretty Print SQL
// @namespace    http://thelogproject.kenshoo.com
// @version      1.0
// @description  Pretty print SQL in logs
// @author       Eric + Conny + Salman
// @include      https://*.kenshoo.com/global_log_viewer.jsp*%2FReport+*
// @run-at       document-end
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @resource     css   https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/default.min.css
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/highlight.min.js
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getResourceText
// ==/UserScript==
GM_addStyle(GM_getResourceText("css"));
GM_addStyle(".sql{display: none; position: absolute; left: 0; top: 100%; z-index: 2; background-color: rgb(47, 197, 242); color: rgb(69, 83, 87); border-radius: 10px; padding: 10px; min-width: 200px; max-width: 900px; white-space: pre-line; font-size: 150%; word-break: keep-all;}.span{display: block;}");

window.addEventListener( "load", function( windowLoadE ) {
var elements = document.body.querySelectorAll( "[id^='textDiv']" );
for ( var i = 0; i < elements.length; i++ )
{
    elements[ i ].style.position = "relative";
    var tooltip = document.createElement( "code" );
    tooltip.setAttribute( "class", "sql" );
    tooltip.innerText = elements[ i ].innerText.replace(/\s\s+/g, ' ').replace(/tmp_report/g, "kenshoointernal.ticket").replace(/^.*create/, 'create').replace(/^com\.(.*?)SELECT/, 'SELECT').replace(/SELECT/g, '\nSELECT').replace(/FROM/g, '\nFROM').replace(/WHERE/g, '\nWHERE').replace(/LEFT\sJOIN/g, '\nLEFT JOIN').replace(/ORDER\sBY/g, '\nORDER BY').replace(/GROUP\sBY/g, '\nGROUP BY');
    elements[ i ].appendChild( tooltip );
    hljs.highlightBlock(tooltip);
    elements[ i ].addEventListener( "click", function( elMouseEneterE ) {
        var tooltip = this.querySelector( "code" );
        tooltip.style.display = "inline-block";
        GM_setClipboard(tooltip.innerText + '\n;');
//        alert("Copied text:" + tooltip.innerText + '\n;');
    } );
    elements[ i ].addEventListener( "mouseleave", function( elMouseEneterE ) {
        var tooltip = this.querySelector( "code" );
        tooltip.style.display = "none";
    } );
}
} );