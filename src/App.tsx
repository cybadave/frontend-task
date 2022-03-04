import React from 'react';
import AddressLocator from './components/AddressLocator/AddressLocator';
import FetchAddressContainer from './containers/FetchAddressContainer/FetchAddressContainer';

function App() {
  return (
    <>
      <AddressLocator />
      <FetchAddressContainer />
    </>
  );
}

export default App;
