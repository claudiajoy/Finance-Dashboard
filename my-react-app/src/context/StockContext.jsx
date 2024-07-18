import { createContext, useState, useCallback, useEffect } from 'react';

const StockContext = createContext();

const StockProvider = (props) => {
    const [stocks, setStocks] = useState([]);

    const stockSymbols = [
        'BA',
        'BAB',
        'BA.LON',
        'BABA',
        'BA3.FRK',
        'BAAPX',
        'BAAAAX',
        'BAAAFX',
        'BAB3.LON',
        'BAAX39.SAO'
    ];

    const addStock = (stock) => {
        setStocks((prevStocks) => [...prevStocks, { ...stock, currentPrice: null }]);
    };

    const fetchStockPrices = useCallback(() => {
        const API_KEY = 'EUY1OD8WD2V6SL6L';

        const fetchStockPrice = (symbol) => {
            return new Promise((resolve, reject) => {
                fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${EUY1OD8WD2V6SL6L}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data['Global Quote']) {
                            const currentPrice = parseFloat(data['Global Quote']['05. price']);
                            resolve({ symbol, currentPrice });
                        } else {
                            resolve({ symbol, currentPrice: null });
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        Promise.all(
            stockSymbols.map(symbol => fetchStockPrice(symbol))
        ).then(results => {
            setStocks(results);
        }).catch(error => {
            console.error('Error fetching stock prices:', error);
        });

    }, [stockSymbols]);

    useEffect(() => {
        fetchStockPrices();
    }, [fetchStockPrices]);

    return (
        <StockContext.Provider value={{ stocks, addStock, fetchStockPrices, stockSymbols }}>
            {props.children}
        </StockContext.Provider>
    );
};

export { StockContext, StockProvider };