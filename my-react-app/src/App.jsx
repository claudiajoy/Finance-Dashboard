import { useState } from 'react'
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import { StockProvider } from './context/StockContext';

const App = () => {
  return (
    <StockProvider>
      <div className="container">
        <h1>Finance Dashboard</h1>
        <StockForm />
        <StockList />
      </div>
    </StockProvider>
  );
};

export default App;
