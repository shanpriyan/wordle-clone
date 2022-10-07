import {createElement} from 'react';
import {Tile} from './Board';

const exampleWords = [
  [
    {letter: 'h', status: 'exact'},
    {letter: 'e'},
    {letter: 'l'},
    {letter: 'l'},
    {letter: 'o'},
  ],
  [
    {letter: 'w'},
    {letter: 'o'},
    {letter: 'r', status: 'almost'},
    {letter: 'l'},
    {letter: 'd'},
  ],
  [
    {letter: 's'},
    {letter: 'p'},
    {letter: 'a'},
    {letter: 'c', status: 'miss'},
    {letter: 'e'},
  ],
];

const description = [
  () => (
    <p>
      The letter <b>H</b> is in the word and in the correct spot.
    </p>
  ),
  () => (
    <p>
      The letter <b>R</b> is in the word but in the wrong spot.
    </p>
  ),
  () => (
    <p>
      The letter <b>C</b> is not in the word in any spot.
    </p>
  ),
];

export function HelpModal() {
  return (
    <>
      <p className="my-3">
        Guess the <strong>WORDLE</strong> in six tries.
      </p>
      <p className="my-3">
        Each guess must be a valid five-letter word. Hit the enter button to
        submit.
      </p>
      <p className="my-3">
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
      </p>
      <div className="flex flex-col gap-5 border-t-2 border-black-20 pt-3">
        <b>Examples</b>
        {exampleWords.map((row, index) => (
          <div key={index}>
            <div className="mb-2 flex gap-1">
              {row.map(({letter, status}, i) => (
                <Tile key={i} state={status} className="h-10 w-10">
                  {letter}
                </Tile>
              ))}
            </div>
            {createElement(description[index])}
          </div>
        ))}
      </div>
    </>
  );
}
