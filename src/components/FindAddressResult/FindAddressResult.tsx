import React from 'react';
import HighlightedText from './HighlightedText';
import { FindAddressResult as FindAddressResultType } from '../../types/types';

export type FindAddressResultProps = Omit<FindAddressResultType, 'Type' | 'Id'> & { onClick: () => void };

function FindAddressResult({
  Description, Highlight = '0-0;0-0', Text, onClick,
}: FindAddressResultProps) {
  return (
    <button type="button" onClick={() => onClick()}>
      <HighlightedText text={Description} Highlight={Highlight.split(';')[1]} />
      <HighlightedText text={Text} Highlight={Highlight.split(';')[0]} />
    </button>
  );
}

export default FindAddressResult;
