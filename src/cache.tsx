import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        addressId: {
          read() {
            return addressIdVar();
          },
        },
      },
    },
  },
});

export const addressIdVar: ReactiveVar<string> = makeVar<string>('');
