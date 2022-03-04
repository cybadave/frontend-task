import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { FetchAddressResult as FetchAddressResultType } from '../../types/types';
import FetchAddressResult from '../../components/FetchAddressResult/FetchAddressResult';

export const GET_ADDRESS_ID = gql`
  query GetAddressId {
    addressId @client
  }
`;

const ADDRESS_QUERY = gql`
    query FindAddresses($id: String) {
        retrieveAddress(id: $id) {
        Items {
          Label,
        }
      }
    }`;

type AddressId = {
    addressId: string;
}

type AddressQueryData = {
    retrieveAddress: {
        Items: FetchAddressResultType[]
    }
}

type AddressQueryVars = {
    id: string;
}

function FetchAddressContainer() {
  const { data: idData, loading: idLoading, error: idError } = useQuery<AddressId>(GET_ADDRESS_ID);
  const { data, loading, error } = useQuery<AddressQueryData, AddressQueryVars>(
    ADDRESS_QUERY,
    { variables: { id: idData?.addressId || '' } },
  );
  if (idData?.addressId === '') return null;
  if (idLoading || loading) return <>Loading...</>;
  if (idError) return <pre>{idError.message}</pre>;
  if (error) return <pre>{error.message}</pre>;
  if (!data!.retrieveAddress.Items[0].Label) return null;
  return (
    <FetchAddressResult Label={data!.retrieveAddress.Items[0].Label} />
  );
}

export default FetchAddressContainer;
