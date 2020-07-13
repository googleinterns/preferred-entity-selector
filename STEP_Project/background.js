'use strict';

chrome.runtime.onInstalled.addListener(function() 
{
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlMatches: '.*admin.google.com\/(u\/[0-9]+\/)?ac\/(appsettings\/[0-9]+\/.+)|(orgunits)|(settings\/serviceonoff)'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
