'use strict';

chrome.runtime.onInstalled.addListener(function() 
{
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          //regex expression matches settings or OU page
          pageUrl: {urlMatches: '.*admin.google.com\/u\/[0-9]+\/ac\/(appsettings)|(orgunits)|(settings/serviceonoff)'}
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});
