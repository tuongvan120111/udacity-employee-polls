# Employee polls Project

This is project pratice for udacity course with redux and other library testing. The project describe how to create a poll, the way to answer one of two option, login, the score for each good question of member.
Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to bootstrap the project.

- install all project dependencies with `npm install`
- start the development server with `npm start`

```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── babel.config.js
├── jest.config.js # that convert each file like css for run test
├── jest.setup.js # jest dom test environment
├── public
│   ├── favicon.ico # Default react Icon.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── _DATA.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── router.js # Router is here
    ├── components # Pure component
    ├── constants # contain hard code variable
    ├── hook # hook custome
    ├── pages # main pages
    ├── slice # Where reducer, actions defince
    ├── store # Router is here
    ├── tests # Test write here
    └── utils # Pure function
```

## Backend API

- [`_getUsers`](#_getUsers)
- [`_getQuestions`](#_getQuestions)
- [`_saveQuestion`](#_saveQuestion)
- [`_saveQuestionAnswer`](#_saveQuestionAnswer)

### `_getUsers`

Method Signature:

```js
_getUsers();
```

- Returns a Promise which resolves to a JSON object containing a collection of user objects.

### `_getQuestions`

Method Signature:

```js
_getQuestions();
```

- Returns a Promise which resolves to a JSON object containing a collection of user objects.

### `_saveQuestion`

Method Signature:

```js
_saveQuestion(question);
```

- question: `<object>` containing at optionOneText, optionTwoText, author
- Returns a Promise which resolves to a JSON object containing a collection of a new question.

### `_saveQuestionAnswer`

Method Signature:

```js
_saveQuestionAnswer(question);
```

- question: `<object>` containing at authedUser, qid, answer
- qid is generate by other function automationly
- Returns a Promise which resolves to a save question action success.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
