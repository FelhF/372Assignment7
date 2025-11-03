"use strict";
(function () {
  const MY_SERVER_BASEURL = "/jokebook";
  const RANDOM_JOKE_URL = "/jokebook/random";
const FUNNY_URL = "/jokebook/category/funnyJoke";
  const LAME_URL = "/jokebook/category/lameJoke";


  window.addEventListener("load", init);

  function init() {
    getJokeRandom();
  }

  let AllJokesButton = document.createElement('button');
  AllJokesButton.textContent = 'Get all Jokes.';
  AllJokesButton.classList.add("CategoryClass");

  let FunnyButton = document.createElement('button');
  FunnyButton.textContent = 'Get Funny jokes.';
  FunnyButton.classList.add ("CategoryClass");

  let LameButton = document.createElement('Button');
  LameButton.textContent = 'Get Lame jokes.';
  LameButton.classList.add ("CategoryClass");


  AllJokesButton.addEventListener('click', function (event) {
    clearJokes();
    getJokebook();
  });

  
  FunnyButton.addEventListener('click', function (event) {
    clearJokes();
    getFunnyJokebook();
  });

  
  LameButton.addEventListener('click', function (event) {
    clearJokes();
    getLameJokebook();
  });

  function getJokeRandom() {
    let jokeDiv = id("jokebook-container");

    fetch(RANDOM_JOKE_URL)
      .then(checkStatus)
      .then((response) => {
        addParagraph(jokeDiv, response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    jokeDiv.appendChild(AllJokesButton);
  }

  function getJokebook() {
    let jokeDiv = id("jokebook-container");

    fetch(MY_SERVER_BASEURL)
      .then(checkStatus)
      .then((response) => {
        for (const item of response) {
          addParagraph(jokeDiv, item);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

      jokeDiv.appendChild(FunnyButton);
      jokeDiv.appendChild(LameButton);
  }

  
  function getFunnyJokebook() {
    let jokeDiv = id("jokebook-container");

    fetch(FUNNY_URL)
      .then(checkStatus)
      .then((response) => {
        for (const item of response) {
          addParagraph(jokeDiv, item);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

      jokeDiv.appendChild(AllJokesButton);
      jokeDiv.appendChild(LameButton);

  }
  
  function getLameJokebook() {
    let jokeDiv = id("jokebook-container");

    fetch(LAME_URL)
      .then(checkStatus)
      .then((response) => {
        for (const item of response) {
          addParagraph(jokeDiv, item);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
      jokeDiv.appendChild(AllJokesButton);
      jokeDiv.appendChild(FunnyButton);

  }

  function addParagraph(jokeDiv, jokeObject) {
    let item = document.createElement("div");

    let category = document.createElement("p");
    category.classList.add("Category");
    category.appendChild(document.createTextNode(jokeObject.category));
    
    let setup = document.createElement("p");
    setup.classList.add("Setup");
    setup.appendChild(document.createTextNode(jokeObject.setup));
    
    let delivery = document.createElement("p");
    delivery.classList.add("Delivery");
    delivery.appendChild(document.createTextNode(jokeObject.delivery));

    item.appendChild(category);
    item.appendChild(setup);
    item.appendChild(delivery);
    jokeDiv.appendChild(item);
  }

  function clearJokes() {
    let jokeDiv = id("jokebook-container");
    jokeDiv.innerHTML = '';
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response.json();
  }

})();
