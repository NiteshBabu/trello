import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Trello from './Trello';

import {StoreProvider} from './contexts/TrelloContext'


ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
        <Trello />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

