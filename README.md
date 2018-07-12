# Bowling Game Kata
## A functional approach in JS

The [original Bowling Game Kata](http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata) is available from Uncle Bob.  I was looking for a Kata that I could use to build habits "thinking functionally."  I decided this was a good problem.  Multiple others have adapted the Bowling Game Kata for other functional languages, but none of them had what I was looking for.  Instead, I decided to try it myself.  This is my first attempt.

I used [Ramda.js](https://ramdajs.com/), but any functional library could be used.  I will likely try others in the future.

I expect the Kata to look something like this:

### Scoring a Frame
- Write a test to score a frame of gutter balls.
- Write a test to score an open frame
- Write a test to score a spare
- Write a test to score a strike

### Scoring multiple frames
- Write a test to score two frames

### Score a game (Bob Martin's tests)
- Score a game of gutter balls
- Score a game of all ones
- Score a game with one spare
- Score a game with one strike
- Score a perfect game

## The differences
There is a lot of redundancy in this approach, but I think this is a good thing.  In the first section we work on functions that can score a frame.  In the second section, we start composing these functions to deal with multiple frames (most likely with recursion).  And finally, we look at things from the game level, which adds some additional rules around how many balls are in a frame.

It will be interesting to see how well this holds up once I have done it a few times.
