import { providers } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  
  const web3ModalRef = useRef();

  const presaleMint = async () => {
    
  }

  const getProviderOrSigner = async (neetSigner=false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider)

    const {chainId} = await web3Provider.getNetwork();

    if (chainId != 4) {
      window.alert("Please switch to Rinkeby network!");
      throw new Error("incorrect network!!");
    }
    
    if (neetSigner) {
      const signer = await web3Provider.getSigner();
      return signer
    }

    return provider;

  }

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);   
    }
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>
          Crypto Devs NFT
        </title>
      </Head>      
      <div className={styles.main}>
       {!walletConnected ? (
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet
        </button>
       ) : null} 
      </div> 
    </div>
  )
}