// The script starts when the website is loaded
$(document).ready(function () {

    /*******************************************************************
    * Purpose of the function : This is click event handler to determine
    *                           and checkmark the chosen difficulty
    *                           level in the Difficulty dropwdown menu
    *******************************************************************/
    $('.dropdown-item').click(function () {
        $('.dropdown-item').removeClass('dropdown-item-checked');
        $(this).addClass('dropdown-item-checked');
        console.log('The difficulty has changed to ' + $(this).text());
    });


    /******************************************************************
    * Input Parameters : a string
    * 
    * Returns : a number for the difficulty level or an error message
    *                    if the label differs from Easy, Normal or Hard
    * 
    * Purpose of the function : to transform the difficulty level label
    *                           to a number for the calculations
    *******************************************************************/
    function getDifficulty(label) {
        switch (label) {
            case 'Easy':
                return 3;
            case 'Normal':
                return 2;
            case 'Hard':
                return 1;
            default:
                return 'The label is incorrect!';
        }
    }
  

    /***************************************************************
    * Input Parameters : two numbers
    * 
    * Returns : a string or an error message if any of the arguments
    *           is not a number
    * 
    * Purpose of function : to generate a random number string from
    *                       the round and difficulty variables
    ****************************************************************/
    function getRandomNumbers(round, difficulty) {
        if (typeof(round) == 'number' && typeof(difficulty) == 'number') {  // test for arguments are numbers
            var lengthOfString = 3 + Math.floor(round / difficulty),        // determines the length of the string
            randomString = '';                                              // variable to store random numbers as a string

            for (i = 0; i < lengthOfString; i++) {                          // generating random numbers
                var num = Math.floor(Math.random() * 10);
                randomString += num.toString();                             // and store them in randomString variable
            }
            console.log(lengthOfString + ' random numbers are generated.');
            return randomString;                                            // returns the value of randomString
        } else {
            return 'One or both argument is not a number!';
        }
    }


    /*************************************************************
    * Input Parameters : 3 numbers
    * 
    * Returns : nothing
    * 
    * Purpose of function : to update the score, the lives and the
    *                       timer display
    **************************************************************/
    function updateDisplay(score, lives, timer) {
        $('.score').text(score);
        $('.lives').text(lives);
        $('.timer').text(timer);
    }


    /************************************************************
    * Input Parameters : nothing
    * 
    * Returns : a promise object that resolves a 2-second timeout
    * 
    * Purpose of function : to act a 2-second synchronous timer
    *************************************************************/
    function wait2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }


    // Feedback to console: ready to start the game
    console.log('DOM is ready. Click on Start to play!');


    /**************************************************************
    * Purpose of function : This is a click event to start the game
    ***************************************************************/
    $('#lnkStart').click(function () {

        /****************************************************************
        * Input Parameters : nothing
        * 
        * Returns : nothing
        * 
        * Purpose of function : to start the asynchronous countdown timer
        *****************************************************************/
        function countdown() {
            tmr = setInterval(function () {
                timer--;                                // decreasing the value of the timer variable
                updateDisplay(score, lives, timer);    

                if (timer > 0) {                        // until it reaches zero
                    console.log('Timer: ' + timer);
                } else {
                    testStrings();                      
                }
            }, 1000);
        }

    
        /******************************************************************
        * Input Parameters : the random number string
        * 
        * Returns : nothing
        * 
        * Purpose of function : to show the random number string for
        *                       2 senconds, hide it and start the countdown
        *                       timer
        *******************************************************************/
        async function showHideNumbers(string) {
            $('.display').text(string).show();
            var x = await wait2Seconds();
            console.log('Numbers displayed for 2 seconds.');
            $('.display').text('.');
            $('.btn-custom').removeClass('disabled');
            console.log('Repeat numbers:');
            countdown();
        }


        // Function to check the number of lives
        /**************************************************************
        * Input Parameters : nothing
        * 
        * Returns : nothing
        * 
        * Purpose of function : to check the number of lives and decide
        *                       to countinue or stop the game
        ***************************************************************/
        function checkLives() {
            if (lives === 0) {                                      // if no more lives left
                console.log('Game over!');                          // game is over
                alert('Game over!\nYour final score is ' + score);  // shows final score
                $('.score').text('');
                $('.lives').text('');
                $('.timer').text('');
                $('#lnkStart').removeClass('disabled');
                $('.dropdown-toggle').removeClass('disabled');
                $('#lnkAbout').removeClass('disabled');
                $('.display').text('.');                            // restores display and menu items
                $('.btn-custom').off();                             // removes the click event for the buttons
            } else {
                console.log('Round ' + (round + 1) + '.');          // prepares the next round
                randomString = getRandomNumbers(round, difficulty);
                updateDisplay(score, lives, timer);
                showHideNumbers(randomString);
            }
        }


        /*********************************************************************
        * Input Parameters : nothing
        * 
        * Returns : nothing
        * 
        * Purpose of function : to compare the random and the input strings.
        *                       if the strings are the same, calculate score.
        *                       if the strings are not the same or time is up,
        *                       decrease the number of lives.
        **********************************************************************/
        async function testStrings() {
            if (randomString.length === inputString.length) {
                if (randomString === inputString) {
                    clearInterval(tmr);
                    $('.btn-custom').addClass('disabled');
                    $('.display').text('Correct!');
                    console.log('Input numbers correct!');
                    var x = await wait2Seconds();
                    inputString = '';
                    round++;
                    score += (randomString.length * 10 + timer * 2);
                    timer = 10;
                    console.log('Round ' + (round + 1) + '.');
                    randomString = getRandomNumbers(round, difficulty);
                    updateDisplay(score, lives, timer);
                    showHideNumbers(randomString);
                } else {
                    clearInterval(tmr);
                    timer = 10;
                    $('.btn-custom').addClass('disabled');
                    $('.display').text('INCORRECT!');
                    console.log('Input numbers INCORRECT!');
                    var x = await wait2Seconds();
                    inputString = '';
                    lives--;
                    checkLives();
                }
            } else if (timer == 0) {
                clearInterval(tmr);
                timer = 10;
                $('.btn-custom').addClass('disabled');
                $('.display').text('Time is up!');
                console.log('Time is up!');
                var x = await wait2Seconds();
                inputString = '';
                lives--;
                checkLives();
            }
        }

        // Initialize the variables and the game 
        var lives = 3,                                                  // variable for the number of lives
            round = 0,                                                  // variable for the number of rounds
            score = 0,                                                  // variable for the score
            timer = 10,                                                 // variable for the timer
            randomString = "",                                          // variable for the random numbers to memorize
            inputString = "",                                           // variable for entering the memorized numbers
            tmr = null;                                                 // variable for coundown event
        difficulty = getDifficulty($('.dropdown-item-checked').text()); // determine difficulty from the .dropdown-item-checked class

        // Disable menu after start (except home link)
        $('#lnkStart').addClass('disabled');
        $('.dropdown-toggle').addClass('disabled');
        $('#lnkAbout').addClass('disabled');
        console.log('The game has been initialized.');

        // Get the random numbers, show them for 2 seconds and hide them again
        randomString = getRandomNumbers(round, difficulty);
        console.log('Round ' + (round + 1) + '.');
        updateDisplay(score, lives, timer);
        showHideNumbers(randomString);

        /*************************************************************************
        * Purpose of function : This is a click event handler to enter the numbers
        *                       using the buttons
        **************************************************************************/
        $('.btn-custom').click(function () {
            // No input in case if buttons are disabled
            if ($(this).hasClass('disabled')) {
                console.log('Button ' + $(this).text() + ' disabled!');
                return false;
            }

            if ($(this).text() === 'C') {
                inputString = '';
                $('.display').text('.');
                console.log('Clear button pressed.');
            } else if ($(this).text() === '#') {
                console.log('# button pressed.');
            } else {
                inputString += $(this).text();
                $('.display').text(inputString);
                console.log('Number ' + $(this).text() + ' pressed.');
                testStrings();
            }
        });
    });
});