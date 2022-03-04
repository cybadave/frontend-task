import { render, screen } from '@testing-library/react';
import React from 'react';
import HighlightedText, { rangesFromHighlight, remainingRanges } from './HighlightedText';

test('rangesFromHighlight utility function returns ranges from range string', () => {
  expect(rangesFromHighlight('0-1,11-14,15-18')).toEqual([
    { start: 0, end: 1, highlight: true },
    { start: 11, end: 14, highlight: true },
    { start: 15, end: 18, highlight: true },
  ]);
});

test(
  'remainingRanges utility function returns gaps in ranges',
  () => {
    expect(
      remainingRanges([
        { start: 0, end: 1, highlight: true },
        { start: 11, end: 14, highlight: true },
        { start: 15, end: 18, highlight: true }], 18),
    )
      .toEqual([{ start: 1, end: 10, highlight: false }]);
  },
);

test(
  'remainingRanges utility function returns  multiple gaps in ranges',
  () => {
    expect(
      remainingRanges([
        { start: 2, end: 3, highlight: true },
        { start: 11, end: 14, highlight: true },
        { start: 17, end: 18, highlight: true }], 20),
    )
      .toEqual([
        { start: 0, end: 1, highlight: false },
        { start: 3, end: 10, highlight: false },
        { start: 14, end: 16, highlight: false },
        { start: 18, end: 20, highlight: false },
      ]);
  },
);

test('highlighted description renders correctly', () => {
  render(<HighlightedText text="Edinburgh, EH7 4QJ" Highlight="0-1,11-14,15-18" />);
  const firstHighlight = screen.getByText('E');
  expect(firstHighlight).toBeInTheDocument();
  const firstRange = screen.getByText('dinburgh,');
  expect(firstRange).toBeInTheDocument();
  const secondHighlight = screen.getByText('EH7');
  expect(secondHighlight).toBeInTheDocument();
  const thirdHighlight = screen.getByText('4QJ');
  expect(thirdHighlight).toBeInTheDocument();
});
