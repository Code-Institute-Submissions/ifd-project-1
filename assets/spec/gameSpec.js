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
        it('should throw error "One or both argument is a negative number!"', function() {
            expect(function() {
                getRandomNumbers(-1, 3);
            }).toThrowError('One or both argument is a negative number!');
            expect(function() {
                getRandomNumbers(0, -3);
            }).toThrowError('One or both argument is a negative number!');
        });
    });

    describe('String as an argument', function() {
        it('should throw error "One or both argument is not a number!"', function() {
            expect(function() {
                getRandomNumbers("a", 3);
            }).toThrowError('One or both argument is not a number!');
            expect(function() {
                getRandomNumbers(0, "a");
            }).toThrowError('One or both argument is not a number!');
        });
    });

    describe('Undefined as an argument', function() {
        it('should throw error "One or both argument is undefined!"', function() {
            expect(function() {
                getRandomNumbers(undefined, 3);
            }).toThrowError('One or both argument is undefined!');
            expect(function() {
                getRandomNumbers(0, undefined);
            }).toThrowError('One or both argument is undefined!');
        });
    });
});

describe('getDifficulty() function', function() {
    describe('Undefined argument', function() {
        it('should throw error "Argument is undefined!"', function() {
            expect(function () {
                getDifficulty(undefined);
            }).toThrowError('Argument is undefined!');
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
        it('should throw error "The label is incorrect!"', function() {
            expect(function() {
                getDifficulty('easy');
            }).toThrowError('The label is incorrect!');
            expect(function() {
                getDifficulty('Novice');
            }).toThrowError('The label is incorrect!');
            expect(function() {
                getDifficulty('1');
            }).toThrowError('The label is incorrect!');
            expect(function() {
                getDifficulty(1);
            }).toThrowError('The label is incorrect!');
        });
    });
});