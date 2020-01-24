// The script starts when the website is loaded
$(document).ready(function () {

    // Function to mark selected difficulty level
    $('.dropdown-item').click(function () {
        $('.dropdown-item').removeClass('dropdown-item-checked');
        $(this).addClass('dropdown-item-checked');
        console.log('The difficulty has changed to ' + $(this).text());
    });

    // Function to determine difficulty level from the .dropdown-item-checked class
    function getDifficulty(linkText) {
        switch (linkText) {
            case 'Easy':
                return 3;
            case 'Normal':
                return 2;
            case 'Hard':
                return 1;
        }
    }

    // Function to generate a random number string from the round and difficulty variables
    function getRandomNumbers(round, difficulty) {
        var lengthOfString = 3 + Math.floor(round / difficulty), // determine the number of numbers using a simple equation
            randomString = ''; // variable to store random numbers as string

        for (i = 0; i < lengthOfString; i++) { // generating random numbers
            var num = Math.floor(Math.random() * 10);
            randomString += num.toString(); // and store them in rndStr variable
        }
        console.log(lengthOfString + ' random numbers are generated.');
        return randomString; // return the value of randomString
    }

    // Function to update display
    function updateDisplay(score, lives, timer) {
        $('.score').text(score);
        $('.lives').text(lives);
        $('.timer').text(timer);
    }

    // Function to wait 2 seconds
    function wait2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    // Feedback to console
    console.log('DOM is ready. Click on Start to play!');

    // Function to start the game
    $('#lnkStart').click(function () {

        // Function to activate countdown timer
        function countdown() {
            tmr = setInterval(function () {
                timer--;
                updateDisplay(score, lives, timer);

                if (timer > 0) {
                    console.log('Timer: ' + timer);
                } else {
                    testStrings();
                }
            }, 1000);
        }

        // Function to show numbers to memorize and hide them after
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
        function checkLives() {
            if (lives === 0) {
                console.log('Game over!');
                alert('Game over!\nYour final score is ' + score);
                $('.score').text('');
                $('.lives').text('');
                $('.timer').text('');
                $('#lnkStart').removeClass('disabled');
                $('.dropdown-toggle').removeClass('disabled');
                $('#lnkAbout').removeClass('disabled');
                $('.display').text('.');
                $('.btn-custom').off();
            } else {
                console.log('Round ' + (round + 1) + '.');
                randomString = getRandomNumbers(round, difficulty);
                updateDisplay(score, lives, timer);
                showHideNumbers(randomString);
            }
        }

        // Function to test random and input strings and compare them
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
        var lives = 3, // variable for the number of lives
            round = 0, // variable for the number of rounds
            score = 0, // variable for the score
            timer = 10, // variable for the timer
            randomString = "", // variable for the random numbers to memorize
            inputString = "", // variable for entering the memorized numbers
            tmr = 0; // variable for coundown event
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

        // Functions to click number buttons
        $('.btn-custom').click(function () {
            // No input in case if buttons are disabled
            if ($(this).hasClass('disabled')) {
                console.log('Button ' + $(this).text() + ' disabled!');
                return false;
            }

            inputString += $(this).text();
            $('.display').text(inputString);
            console.log('Number ' + $(this).text() + ' pressed.');
            testStrings();
        });
    });
});