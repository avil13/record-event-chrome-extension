// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
import { activate, diactivate } from './lib/content';

// console.log(`'Allo 'Allo! Content script`);

const sendMessage = (data: any) => {
  chrome.runtime.sendMessage(data, function(response) {
    console.log(response.farewell);
  });
};


