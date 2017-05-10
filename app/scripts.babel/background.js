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
  disableApp = !disableApp;
  chrome.storage.sync.set({
    disable: disableApp
  });
  if (disableApp) {
    chrome.browserAction.setBadgeText({text: 'disable'});
  } else {
    chrome.browserAction.setBadgeText({text: ''});
  }
  chrome.tabs.query({}, tabs => {
    for (var tab of tabs) {
      chrome.tabs.sendMessage(tab.id, {
        directive: disableApp ? 'disable-app' : 'enable-app'
      }, res => {

      });
    }
  });
})

// chrome.browserAction.setBadgeText({text: '^_^'});
