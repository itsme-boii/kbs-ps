import logo from './logo.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Input from './components/Input';
import Button from './components/Button';


function App() {
  const [namebc, setNamebc] = useState('');
  const [passbc, setPassbc] = useState('');
  const [name, setName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const contractAddress = "0xB9331C1103fF2a42F60F977E154b82860AdeBEc9";
  const contractABI=[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "password",
          "type": "string"
        }
      ],
      "name": "CredentialStored",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "storeCredential",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "credentials",
      "outputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCredential",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const web3 = new Web3(Web3.givenProvider || 'https://rpc2.sepolia.org/');
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
      web3.eth.defaultAccount = accounts[0]; 
      } else {
      console.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
     };

     const addCredential = async () => {
      try {
      await window.ethereum.enable();
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length === 0) {
              throw new Error('No accounts found. Please check your MetaMask setup.');
          };
      if (contract==null || contract==undefined) {
              throw new Error('Contract instance not available.');
          }
      const transactionParameters = {
              from: accounts[0],
              to: contractAddress,
              data: contract.methods.storeCredential(namebc, passbc).encodeABI(),
              gasPrice: '4000000000', 
          };
      const txHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          }); } catch (error) {
            console.error('Error creating order:', error);
          }
        };
  
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const sendDataToBackend = () => {
    fetch('http://127.0.0.1:5000/save_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: name }) 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} alt="logo" className='w-80'/>
        <Input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter your name  to add it to X"
        />
        <Button onClick={sendDataToBackend} children="Submit To X"/>

        {isConnected ? (
	      <p>Connected</p>
	       ) : (
	      <Button onClick={connectWallet} children={"Connect Wallet"}/>
	        )}
      
      <Input  type="text" value={namebc} onChange={(e) => setNamebc(e.target.value)} placeholder="Enter your name"/>
	    <Input type="text" value={passbc} onChange={(e) => setPassbc(e.target.value)} placeholder="enter your password"/>
	    <Button onClick={addCredential} children="Submit To Y"/>
      </header>
    </div>
  );
}

export default App;
