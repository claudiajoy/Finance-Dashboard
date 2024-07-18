import { useContext, useEffect } from 'react';
import { StockContext } from '../context/StockContext';

const StockList = () => {
    const { stocks, fetchStockPrices } = useContext(StockContext);

    useEffect(() => {
        fetchStockPrices();
    }, []);

    const profitStyle = { color: 'green' };
    const lossStyle = { color: 'red' };

    return (
        <div>
            <h2>Stock List</h2>
            {stocks.length === 0 ? (
                <p>No stocks available</p>
            ) : (
                stocks.map((stock, index) => {
                    const profitOrLoss = (stock.currentPrice - stock.purchasePrice) * stock.quantity;
                    const profitLossStyle = profitOrLoss >= 0 ? profitStyle : lossStyle;

                    return (
                        <div key={index} style={styles.stockItem}>
                            <p>Symbol: {stock.symbol}</p>
                            <p>Quantity: {stock.quantity ? stock.quantity : 'N/A'}</p>
                            <p>Purchase Price: {stock.purchasePrice ? stock.purchasePrice.toFixed(2) : 'N/A'}</p>
                            {stock.currentPrice !== null && (
                                <>
                                    <p>Current Price: {stock.currentPrice.toFixed(2)}</p>
                                    {stock.purchasePrice !== undefined && stock.quantity !== undefined && (
                                        <p style={profitLossStyle}>
                                            Profit/Loss: {profitOrLoss >= 0 ? '+' : ''}{profitOrLoss.toFixed(2)}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

const styles = {
    stockItem: {
        border: '1px solid #ddd',
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px'
    }
};

export default StockList;