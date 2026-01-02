# Testing Assignment 2

## Description

Selenium (End‐to‐ End UI Automation): Write three automated test cases for any public web application (not the one used in lab):

1. Login failure with wrong credentials (assert visible error).
2. Login success with correct credentials (assert landing page content).
3. Post‐ login navigation (e.g., profile/settings) and assert a key element.
   Rules for Task 2
   - Read username/password from an Excel file (e.g., Apache POI).
   - Support Chrome, Firefox, Edge (compatible drivers).
   - Do not use real institutional credentials; use safe test accounts.
   - Do not upload real credentials; placeholders only (we will test live in demo).

## Run Instricutions

Requirements:

- NodeJS installed
- Browsers(CHROME, FIREFOX, EDGE) installed

1. In a terminal(root project folder), execute `npm install` to install required packages

2. In a terminal(root project folder), execute `npm run test` to run tests
