// The script starts when the website is loaded
$(document).ready(function () {

    console.log('DOM is ready. Click on Start to play!');

    // Function to mark selected difficulty level
    $('.dropdown-item').click(function () {
        $('.dropdown-item').removeClass('dropdown-item-checked');
        $(this).addClass('dropdown-item-checked');

        console.log('The difficulty has changed to ' + $(this).text());
    });

    // Function to start the game
    $('#lnkStart').click(function () {

        // Function to determine difficulty level from the .dropdown-item-checked class
        function getDifficulty() {
            switch ($('.dropdown-item-checked').text()) {
                case 'Easy':
                    return 3;
                case 'Normal':
                    return 2;
                case 'Hard':
                    return 1;
            }
        }

        // Function to generate a random nuber string from the round and difficulty variables
        function getRandomNumbers(rnd, diff) {
            var numberOfNumbers = 3 + Math.floor(rnd / diff), // determine the number of numbers using a simple equation
                rndStr = ''; // variable to store random numbers as string

            for (i = 0; i < numberOfNumbers; i++) { // generating random numbers
                var num = Math.floor(Math.random() * 10);
                rndStr += num.toString(); // and store them in rndStr variable
            }
            console.log(numberOfNumbers + ' random numbers are generated.');
            return rndStr; // return the value of rndStr
        }

        // Function to update display
        function updateDisplay(score, lives, timer) {
            $('.score').text(score);
            $('.lives').text(lives);
            $('.timer').text(timer);
        }

        // Function to wait 2 seconds
        function resolveAfter2Seconds() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        }

        // Function to show numbers to memorize and hide them after
        async function showHideNumbers(str) {
            $('.display').text(str).show();
            var x = await resolveAfter2Seconds();
            console.log('Numbers displayed for 2 seconds.');

            $('.display').text('.');
            $('.btn-custom').removeClass('disabled');

            console.log('Repeat numbers:');
        }

        async function showWin() {
            $('.btn-custom').addClass('disabled');
            $('.display').text('Correct!');
            console.log('Input numbers correct!');
            var x = await resolveAfter2Seconds();
            inputStr = '';
            round++;
            score += randomStr.length * 10;
            console.log('Round ' + (round + 1) + '.');
            randomStr = getRandomNumbers(round, difficulty);
            updateDisplay(score, lives, timer);
            showHideNumbers(randomStr);
        }

        async function showLose() {
            $('.btn-custom').addClass('disabled');
            $('.display').text('INCORRECT!');
            console.log('Input numbers INCORRECT!');
            var x = await resolveAfter2Seconds();
            inputStr = '';
            lives--;
            if (lives === 0) {
                try {
                    console.log('Game over!');
                    throw new Error();
                } catch {
                    alert('Game over!\nYour final score is ' + score);
                    location.reload(true);
                }
            } else {
                console.log('Round ' + (round + 1) + '.');
                randomStr = getRandomNumbers(round, difficulty);
                updateDisplay(score, lives, timer);
                showHideNumbers(randomStr);
            }
        }

        // Function to test random and input strings and compare them
        function testStrings() {
            if (randomStr.length === inputStr.length) {
                if (randomStr === inputStr) {
                    showWin();
                } else {
                    showLose();
                }
            }
        }

        // Initialize the game
        console.log('The game has been started.');

        var lives = 3, // variable for the number of lives
            round = 0, // variable for the number of rounds
            score = 0, // variable for the score
            timer = 10, // variable for the timer
            randomStr = "", // variable for the random numbers to memorize
            inputStr = "", // variable for entering the memorized numbers
            //currentTime = 0, // variable to assist the timer

            difficulty = getDifficulty(); // determine difficulty from the .dropdown-item-checked class

        // Disable menu after start (except home link)
        $('#lnkStart').addClass('disabled');
        $('.dropdown-toggle').addClass('disabled');
        $('#lnkAbout').addClass('disabled');

        console.log('The game has been initialized.');

        // Get the random numbers, show for 2 seconds and hide again
        randomStr = getRandomNumbers(round, difficulty);
        console.log('Round ' + (round + 1) + '.');
        updateDisplay(score, lives, timer);

        showHideNumbers(randomStr);

        // Functions to click number buttons
        $('.btn-custom').click(function () {
            if ($(this).hasClass('disabled')) {
                console.log('Button ' + $(this).text() + ' disabled!');
                return false;
            }

            inputStr += $(this).text();
            $('.display').text(inputStr);
            console.log('Number ' + $(this).text() + ' pressed.');
            testStrings();
        });

    });

});