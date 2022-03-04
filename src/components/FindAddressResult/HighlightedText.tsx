import React from 'react';

type HighlightedDescriptionProps = {
  Highlight: string;
  text: string;
};

type Range = {
  start: number;
  end: number;
  highlight: boolean;
}

export const rangesFromHighlight = (highlight: string): Range[] => highlight
  .split(',')
  .map((s) => ({ start: Number(s.split('-')[0]), end: Number(s.split('-')[1]), highlight: true }));

export const remainingRanges = (ranges: Range[], end: number) => {
  if (ranges.length === 0) {
    return [{ start: 0, end, highlight: false }];
  }
  const out = ranges
    .map(
      (
        val,
        index,
        array,
      ) => ({
        start: val.end,
        end: array[index + 1] ? array[index + 1].start - 1 : end,
        highlight: false,
      }),
    ).filter((range) => range.start < range.end);
  if (out.length === 0) {
    return [];
  }
  if (out[out.length - 1].start >= end) out.pop();
  return ranges[0].start > 1
    ? [{ start: 0, end: ranges[0].start - 1, highlight: false }].concat(out) : out;
};

function HighlightedText({ text, Highlight = '0-0' }: HighlightedDescriptionProps) {
  const highlightedRanges = rangesFromHighlight(Highlight);
  const normalRanges = remainingRanges(highlightedRanges, text.length);
  const allRanges = highlightedRanges
    .concat(normalRanges).sort((a, b) => ((a.start > b.start) ? 1 : -1));
  return (
    <>
      {
      allRanges
        .map((range) => (<span key={`${text}[${text.slice(range.start, range.end)}]`} style={{ background: range.highlight ? 'lightskyblue' : 'none' }}>{text.slice(range.start, range.end)}</span>))
      }
    </>
  );
}

export default HighlightedText;
