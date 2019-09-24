// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

// console.log(`'Allo 'Allo! Event Page for Page Action`);

// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs: any) {
//   chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' }, function(response: any) {
//     console.log(response.farewell);
//   });
// });


// chrome
