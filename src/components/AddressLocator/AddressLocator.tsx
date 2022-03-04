import React, { useState } from 'react';
import FindAddressContainer from '../../containers/FindAddressContainer/FindAddressContainer';

function AddressLocator() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <label>
        Enter address:
        <input id="queryString" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      {query !== '' ? <FindAddressContainer query={query} /> : null}
    </div>
  );
}

export default AddressLocator;
