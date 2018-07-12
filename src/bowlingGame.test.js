const expect = require('chai').expect;
const R = require('ramda');
const scoreGame = require('./scoreGame');

// Some design inspiration from http://www.randomhacks.net/2007/04/28/bowling-in-haskell/ 

describe('Bowling Game', () => {
    it('A game of all gutterballs scores 0', () => {
       let balls = R.repeat(0, 20);
       expect(scoreGame(balls)).to.be.equal(0);
    });

    it('A spare-ful game', () => {
        let balls = R.repeat(5, 21);
        expect(scoreGame(balls)).to.be.equal(150);
    })

    it('A perfect game', () => {
        let balls = R.repeat(10, 12);
        expect(scoreGame(balls)).to.be.equal(300);
    })
});