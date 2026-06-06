import { createContext, useState,useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllcoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-Sc7tu9HBiJHpDAXgbj3WFjcy' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            // .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchAllcoin();
      
    }, [currency])
    
    

    const contextValue = {
            allCoin,currency,setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>

            {props.children}

        </CoinContext.Provider>
    )
}

export default CoinContextProvider;