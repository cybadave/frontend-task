import React from 'react';
import { FetchAddressResult as FetchAddressResultType } from '../../types/types';

export type FetchAddressResultProps = FetchAddressResultType;

function FetchAddressResult({ Label = '' }: FetchAddressResultProps) {
  return <span>{Label.split('\n').map((l) => (<p key={`${Label}[${l}]`}>{l}</p>))}</span>;
}

export default FetchAddressResult;
