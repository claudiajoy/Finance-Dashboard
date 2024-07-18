import { useState, useContext } from 'react';
import { StockContext } from '../context/StockContext';

const StockForm = () => {
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const { addStock } = useContext(StockContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addStock({ symbol, quantity: parseInt(quantity), purchasePrice: parseFloat(purchasePrice) });
        setSymbol('');
        setQuantity('');
        setPurchasePrice('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Purchase Price"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                required
            />
            <button type="submit">Add Stock</button>
        </form>
    );
};

export default StockForm;