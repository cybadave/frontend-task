import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  FindAddressResult as FindAddressResultType,
} from '../../types/types';
import FindAddressResult from '../../components/FindAddressResult/FindAddressResult';
import { addressIdVar } from '../../cache';

export type FindAddressResultsProps = {
    query: string;
}

const ADDRESS_QUERY = gql`
    query getAddresses($query: String!) {
      findAddress(text: $query) {
        Items {
          Description
          Highlight
          Id
          Text
          Type
        }
      }
    }`;

type AddressQueryData = {
    findAddress: {
        Items: FindAddressResultType[]
    }
}

function FindAddressContainer({ query }: FindAddressResultsProps) {
  const { data, loading, error } = useQuery<AddressQueryData, FindAddressResultsProps>(
    ADDRESS_QUERY,
    { variables: { query } },
  );

  if (loading) return <>Loading...</>;
  if (error) return <pre>{error.message}</pre>;

  const resultCount = data?.findAddress.Items.length || 0;
  if (resultCount === 0) {
    return (
      <>
        No results found for &lsquo;
        {query}
        &rsquo; Keep typing!
      </>
    );
  }

  const addresses = data!.findAddress.Items.filter(({ Type }: FindAddressResultType) => Type === 'Address');

  if (addresses.length === 0) {
    return (
      <>
        Too many results found for &lsquo;
        {query}
        &rsquo; to display! Please add more detail.
      </>
    );
  }

  return (
    <ul>
      {addresses
        .map(({ Type, Id, ...rest }: FindAddressResultType) => (
          <FindAddressResult
            key={`${rest.Description}${rest.Text}`}
            onClick={() => {
              addressIdVar(Id);
            }}
            {...rest}
          />
        ))}
    </ul>
  );
}

export default FindAddressContainer;
