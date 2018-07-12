const R = require('ramda');
const { scoreFrame, advanceFrame } = require('./scoreFrame');

const printFrame = (frame) => {
    console.log(`Frame ${frame.frame}: score = ${frame.score} remaining: ${frame.balls}`);
}

// scoreGame :: Balls -> Score
const scoreGame = ( balls ) => {
    let frame = {
        balls: balls,
        frame: 0,
        score: 0
    };

    let cumulativeScore = 0;

    while(frame.frame < 10) {
        frame = scoreFrame( frame.balls, frame.frame + 1 );
        printFrame(frame);
        cumulativeScore += frame.score;
    }

    return cumulativeScore;
}


module.exports = scoreGame;