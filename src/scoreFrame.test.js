const expect = require('chai').expect;
const R = require('ramda');

let { 
    scoreFrame,
    calculateFrameScore,
    isStrike,
    isSpare,
    scoreStrike,
    scoreSpare,
    scoreOpenFrame,
    advanceFrame
} = require('./scoreFrame');

describe('Scoring functions', () => {
    describe('isStrike', () => {
        it('returns true on a strike', () => {
            let balls = [10];
            expect(isStrike(balls)).to.be.true;
        });

        it('returns false on any other role', () => {
            let balls = [0,1,2,3,4,5,6,7,8,9];
            balls.forEach( x => expect(isStrike(x)).to.be.false );
        });
    });

    describe('isSpare', () => {
        it('returns true on any spare', () => {
            let balls = [
                [0, 10],
                [1,  9],
                [2,  8],
                [3,  7],
                [4,  6],
                [5,  5]
            ];
            balls.forEach( x => expect(isSpare(x)).to.be.true );
        });

        it('returns false if it is not a spare', () => {
            let balls = [
                [10, 0],
                [1,  8],
                [2,  7],
                [3,  6],
                [4,  5],
                [5,  4]
            ];
            balls.forEach( x => expect(isSpare(x), `${x} should not be a spare`).to.be.false );
        });
    });

    describe('to score a Strike', () => {
        it('take the next two balls as the bonus', () => {
            expect(scoreStrike([10,0,0, 9])).to.be.equal(10);
            expect(scoreStrike([10,10,10,10])).to.be.equal(30);
        })
    });

    describe('to score a Spare', () => {
        it('take the next ball as the bonus', () => {
            expect(scoreSpare([0,10,1])).to.be.equal(11);
            expect(scoreSpare([5,5,5])).to.be.equal(15);
            expect(scoreSpare([5,5,0])).to.be.equal(10);
        })
    });

    describe('to score an Open Frame', () => {
        it('add the number of pins knocked down', () => {
            let tests = [
                { balls: [0, 9, 1], expected: 9 },
                { balls: [1, 8], expected: 9 },
                { balls: [2, 7, 3], expected: 9 },
                { balls: [3, 6], expected: 9 },
                { balls: [4, 5], expected: 9 },
                { balls: [0, 0, 10], expected: 0 },
                { balls: [1, 1, 1], expected: 2}
            ];
            tests.forEach( frame => {
                expect(scoreOpenFrame(frame.balls), 
                    `expected ${frame.balls} to give ${frame.expected}`)
                    .to.be.equal(frame.expected);
            });
        });
    });
 
    describe('to score any Frame', () => {
        it('follows the rules for a strike', () => {
            expect(calculateFrameScore([10,0,0, 9])).to.be.equal(10);
            expect(calculateFrameScore([10,10,10,10])).to.be.equal(30);
        });

        it('follows the rules for a spare', () => {
            expect(calculateFrameScore([0,10,1])).to.be.equal(11);
            expect(calculateFrameScore([5,5,5])).to.be.equal(15);
            expect(calculateFrameScore([5,5,0])).to.be.equal(10);
        });

        it('follows the rules for an open frame', () => {
            expect(calculateFrameScore([0,9,1])).to.be.equal(9);
            expect(calculateFrameScore([2,7,3])).to.be.equal(9);
            expect(calculateFrameScore([1,1,1])).to.be.equal(2);
        });
    });

    describe('to advance one frame', () => {
        it('removes one ball for a strike', () => {
            expect(advanceFrame([10, 0, 0, 0])).to.have.lengthOf(3);
        });

        it('removes two balls for a spare', () => {
            expect(advanceFrame([5,5,0,0])).to.have.lengthOf(2);
        });

        it('removes two balls for an open frame', () => {
            expect(advanceFrame([0,0,0,0])).to.have.lengthOf(2);
        })

    })
    
});