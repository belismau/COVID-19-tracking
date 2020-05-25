# COVID-19-tracking

A web app for searching information about the coronavirus in different countries (or within provinces/cities if exists).

## Getting Started

This app is created with Vanilla JS and JQuery, and Ajax is used to retrieve information from an API called [Covid19API](https://covid19api.com/). Therefore, you will need to install JQuery. Also, I am using AOS.js and Lax.js for this project.

### Built With

* [JQuery](https://jquery.com/) - Framework
* [AJAX](https://api.jquery.com/jquery.ajax/) - JQuery function
* [AOS.js](https://michalsnik.github.io/aos/) - Used for animations
* [Lax.js](https://alexfox.dev/lax.js/) - Used for scroll effects

### Installation

To run this app, you need to install following packages:

JQuery

```
npm install jquery
```

AOS.js

```
npm install aos
```

Lax.js

```
npm install lax.js
```

All icons used in the project are from [Font Awesome](https://fontawesome.com/)

```
npm install font-awesome
```

For the structure, I am using [webpack](https://webpack.js.org/) (module bundler)

```
npm install webpack
```

As it says in https://github.com/tapio/live-server, AJAX requests don't work with the ```file://``` protocol due to security restrictions. Therefore, a [server](https://github.com/tapio/live-server) is needed. 

```
npm install live-server
```

## Run

To run the app, follow the steps below:

1. Open your terminal and navigate to the folder called ```COVID-19-tracking```
2. Type ```live-server``` and click enter
3. Done

## Author

* **Belis** - [My Github](https://github.com/belismau)

## License

This project is licensed under the MIT License.
