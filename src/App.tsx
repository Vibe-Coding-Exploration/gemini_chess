import React from 'react';
import Board from './components/Board';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Board />
    </div>
  );
};

export default App;