# How to start

**Note** requires node v6.x.x or higher and npm 3.x.x.

```bash
git clone https://github.com/willmendesneto/ngx-feature-toggle.git
cd ngx-feature-toggle
npm install       # or `npm run reinstall` if you get an error
npm start
```

# Running test

```bash
npm test
```

## Submitting Pull Requests

**Please follow these basic steps to simplify pull request reviews - if you don't you'll probably just be asked to anyway.**

* Please rebase your branch against the current master
* Run `npm install` to make sure your development dependencies are up-to-date
* Please ensure that the test suite passes **and** that code is lint free before submitting a PR by running:
 * `npm test`
* If you've added new functionality, **please** include tests which validate its behaviour
* Make reference to possible [issues](https://github.com/willmendesneto/ngx-feature-toggle/issues) on PR comment
* This module follows Angular commit message standard, so please make sure that you are following this standard. You can run `npm run commit` and add the information related to your changes.

## Submitting bug reports

* Please detail the affected browser(s) and operating system(s)
* Please be sure to state which version of node **and** npm you're using
