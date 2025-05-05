import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const Wallet = () => {
  const navigate = useNavigate();
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [provider, setProvider] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const handleBack = () => {
    navigate("/play");
  };

  const retrieveWallet = async () => {
    setDataRetrieved(true);

    if (window.ethereum === void 0 || window.ethereum === null) {
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts');

    if(accounts === void 0 || accounts === null || accounts.length === 0) {
      return;
    }

    setProvider(provider);
    setAddresses(accounts);
  };

  if (!dataRetrieved) {
    retrieveWallet();
  }

  const WalletAddresses = () => {
    return (<>
      {addresses.map((address, index) =>
        <span key={index}>Wallet {index + 1}: {address}</span>
      )}
    </>);
  };

  return (
    <div>
      {dataRetrieved ? <WalletAddresses /> : <span>Loading...</span>}

      <br />

      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default Wallet;
