'use strict';

var disableApp = false;
chrome.storage.sync.get({
    disable: false
  }, item => {
  disableApp = item.disable;
  console.log(disableApp);
})

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(tab => {
  console.log(tab);
  disableApp = !disableApp;
  chrome.storage.sync.set({
    disable: disableApp
  });
  chrome.tabs.query({}, function (tabs) {
    for (var tab of tabs) {
      chrome.tabs.sendMessage(tab.id, {
        directive: disableApp ? 'disable-app' : 'enable-app'
      }, res => {

      });
    }
  });
})

// chrome.browserAction.setBadgeText({text: '^_^'});
