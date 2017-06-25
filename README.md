# QA Minion
Web scraper tool that runs through lists of test cases to automate webpage QA passes. Test cases can be run using objects on the dom. 

This was built as a proof of concept, and not as an ongoing project. Additional test cases can be easily added into the tests.js file. 

## To Install
`sudo npm install`

`sudo npm install gulp`

## To Run
`gulp`

## UI for Testing Webpages
`http://localhost:8081/web/`

## Test Case Endpoint (For developers)
Outputs test case results in JSON. Allows for custom UI tooling, or integration with seperate apps.
`http://localhost:8081/api/?q=http://yourdomain.com/pagetotest.html`

## Current Test Cases
* General 
  * Checks for Universal Analytics
  * Checks for Google Tag Manager
  * Checks for outdated Google Analytics code
* SEO
  * Checks for presence of H1 Tag
  * Checks for multiple H1 Tags
* Accessibility
  * Checks for image alt text


### Wishlist
* More Test Cases
* Break Test Cases into seperate files
* Custom Test Case Building 
