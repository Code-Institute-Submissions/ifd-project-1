# Interactive Frontend Development Milestone Project
The purpose of this website is to play a simple memory game. Memory games help to enhance brain functions, like attention level, concentration, focus, and intellectual skills along with the reading and writing part of it. They are the best brain exercises. Continuously playing these games makes the human brain more sharp compared to that of those who don’t play games often. This particular memory game has a score and a timer for more challenge and fun.

## UX
The website has a simple UX design. It has a navbar, two displays (a smaller one for the score, the lives and the timer, and a larger one for the numbers and the system feedback), and a dial pad to enter the numbers. The difficulty level varies from easy to hard and it can be changed on the navigation bar. Also, a start "button" and a modal with the game information was placed on the navigation bar. The responsiveness of the website was maintained to fit the game on every device from mobile phones to desktop computers. The mobile version is working in portrait mode only.

The original wireframe can be viewed [here](https://faithy80.github.io/ifd-project/design/wireframe1.jpg).
The modified wireframe can be viewed [here](https://faithy80.github.io/ifd-project/design/wireframe2.jpg).

## Demo
The game is deployed [here](https://faithy80.github.io/ifd-project/).

## Technologies
1. HTML
2. CSS
3. JavaScript
4. Bootstrap (4.3.1)
5. jQuery (3.4.1) for targeting the elements on the website
6. Jasmine (3.5.0) for testing the script

## Features
The following features were implemented:
* Modal from Bootstrap 4, [See here](https://getbootstrap.com/docs/4.4/components/modal/)
* Navbar from Bootstrap 4, [See here](https://getbootstrap.com/docs/4.4/components/navbar/)
* Progress bar from Bootstrap 4, [See here](https://getbootstrap.com/docs/4.4/components/progress/)

## Testing

### Manual test
This site was manually tested in several web browsers (Chrome, Firefox, Opera, and Chrome developer tools) and on a couple of mobile phones to ensure compatibility and responsiveness.

The game script sends feedback to the console in Chrome developer tools for testing purposes. It makes easier to follow every event and timer in the game. It was also easier to trace the exact position of the error and get it corrected. The displays were tested visually during the game and were tweaked in case of necessity. The navigation links are only working before the start of the game. A modal shows the rules. Also, before the start, we can choose the difficulty level.

The game was tested extensively for every way to play the game. For example, the numbers were entered correctly, incorrectly and nothing was entered to test the timer function too.

The game acted strangely after restarting it without reloading. However, it seemed to be the largest problem to solve, the solution was easy enough. Since disabling the "start" click event, the program restarts properly without reloading the page.

### Automated test
Two functions of the game script were tested with Jasmine. As more tests were implemented, the functions were refactored. The following functions were tested:
* getRandomNumbers(round, difficulty): This function generates a random number string from the number of rounds and the difficulty factor using a simple equation. `lengthOfString = 3 + Math.floor(round / difficulty);` This equation ensures that the length of the number string increases according to the difficulty level. The function can take only positive numbers, otherwise, it throws an error message.
* getDifficulty(label): This function determines the difficulty factor from the label of the difficulty dropdown menu. It can take only 'Easy', 'Normal' and 'Hard' labels, otherwise, it throws an error message.

The tests can be viewed [here](https://faithy80.github.io/ifd-project/test.html).

All files were tested with the [W3C Markup Validation Service](https://validator.w3.org/) and the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/validator.html.en).

## Deployment
This site is hosted by Github pages. It updates automatically on a new commit and push to the master branch of the repository. It can be cloned using `git clone https://github.com/faithy80/ifd-project.git` in Command Line Interface or it can be downloaded from [here](https://github.com/faithy80/ifd-project) to run the site locally. After downloading, double click on `index.html` or launch it from a web browser to load the game. 

## Credits

### Content

The following solutions were implemented in this project:

* How to add a checkmark to a bootstrap dropdown menu item - [Link](https://stackoverflow.com/questions/21286887/adding-check-marks-to-bootstrap-button-drop-down-items)
* How to generate a random number - [Link](https://www.w3schools.com/js/js_random.asp)
* How to use the async function as a delay timer - [Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* How to create a countdown timer - [Link](https://www.w3schools.com/howto/howto_js_countdown.asp)
* How to disable a click event - [Link](https://stackoverflow.com/questions/37109771/disabled-button-still-listens-to-click-event)
* How to test a thrown error in Jasmine - [Link](https://stackoverflow.com/questions/21221697/using-tothrowerror-in-jasmine)

### Media
The brain favicon was downloaded from the Google search website.

### Acknowledgments
I'd like to thank
* Mentor Matt Rudge for the jasmine and API tutorials,
* Mentor Neil Mc Even for the jQuery tutorials,
* Mentor Brian Macharia for his advice and guiding me through this project,
* Haley Schafer for the README.md example from her [ucfd-project](https://github.com/Code-Institute-Solutions/StudentExampleProjectGradeFive).