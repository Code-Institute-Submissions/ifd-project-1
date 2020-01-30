describe('getRandomNumber() function', function() {
    describe('Positive numbers (0, 3) as arguments', function() {
        it('should return a 3 digit number as string', function() {
            var result = getRandomNumbers(0, 3);
            expect(result.length).toBe(3);
        });
    });

    describe('Positive numbers (9, 3) as arguments', function() {
        it('should return a 6 digit number as string', function() {
            var result = getRandomNumbers(9, 3);
            expect(result.length).toBe(6);
        });
    });

    describe('Negative number as an argument', function() {
        it('should return "One or both argument is a negative number!"', function() {
            expect(getRandomNumbers(-1, 3)).toBe('One or both argument is a negative number!');
            expect(getRandomNumbers(0, -3)).toBe('One or both argument is a negative number!');
        });
    });

    describe('String as an argument', function() {
        it('should return "One or both argument is not a number!"', function() {
            expect(getRandomNumbers("a", 3)).toBe('One or both argument is not a number!');
            expect(getRandomNumbers(0, "a")).toBe('One or both argument is not a number!');
        });
    });

    describe('Undefined as an argument', function() {
        it('should return "One or both argument is undefined!"', function() {
            expect(getRandomNumbers(undefined, 3)).toBe('One or both argument is undefined!');
            expect(getRandomNumbers(0, undefined)).toBe('One or both argument is undefined!');
        });
    });
});

describe('getDifficulty() function', function() {
    describe('Undefined argument', function() {
        it('should return "Argument is undefined!"', function() {
            expect(getDifficulty(undefined)).toBe('Argument is undefined!');
        });
    });

    describe('"Easy", "Normal" or "Hard" as an argument', function() {
        it('should return the correspondent number', function() {
            expect(getDifficulty('Easy')).toBe(3);
            expect(getDifficulty('Normal')).toBe(2);
            expect(getDifficulty('Hard')).toBe(1);
        });
    });

    describe('Anything else but "Easy", "Normal" or "Hard" as an argument', function() {
        it('should return "The label is incorrect!"', function() {
            expect(getDifficulty('easy')).toBe('The label is incorrect!');
            expect(getDifficulty('Novice')).toBe('The label is incorrect!');
            expect(getDifficulty('1')).toBe('The label is incorrect!');
            expect(getDifficulty(1)).toBe('The label is incorrect!');
        });
    });
});