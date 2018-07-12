const R = require('ramda');

const isStrike = ( balls ) => balls[0] === 10;

const isSpare = ( balls ) => !isStrike(balls) && (balls[0] + balls[1]) === 10;

const scoreStrike = ( balls ) => {
    if (balls.length < 3) {
        throw new Error('Too few balls to score the strike');
    }
    if (balls[0] !== 10) {
        throw new Error('This is not a strike');
    }
    return balls[0] + balls[1] + balls[2];
}

const scoreSpare = ( balls ) => {
    if (balls.length < 3) {
        throw new Error('Too few balls to score the spare');
    }
    if (balls[0] + balls[1] !== 10) {
        throw new Error('This is not a spare');
    }
    return balls[0] + balls[1] + balls[2];
}

const scoreOpenFrame = ( balls ) => {
    if (balls.length < 2) {
        throw new Error('Too few balls to score the frame');
    }
    if (balls[0] + balls[1] >= 10) {
        throw new Error('This is not an open frame');
    }
    return balls[0] + balls[1];
}

const calculateFrameScore = R.cond([
    [isStrike,  scoreStrike],
    [isSpare,   scoreSpare],
    [R.T,       scoreOpenFrame]
]);

const advanceFrame = (balls) => {
    let ballCount = isStrike(balls) ? 1 : 2;
    return balls.slice(ballCount);
}

// To score an individual frame, we need to do two things: 
//     (1) calculate the score for our frame, and 
//     (2) figure out where the next frame starts. 
// Our scoring function will return both pieces of information:
// Score one frame and return the rest.
// scoreFrame :: Balls -> (Score, Balls)
const scoreFrame = (balls, frame) => {
    if (R.isNil(frame)) {
        frame = 1;
    }
    return {
        frame: frame,
        score: calculateFrameScore(balls),
        balls: advanceFrame(balls)
    };
}


module.exports =  { 
    advanceFrame,
    scoreFrame,
    calculateFrameScore,
    isStrike,
    isSpare,
    scoreStrike,
    scoreSpare,
    scoreOpenFrame
};
