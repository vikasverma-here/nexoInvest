import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import { buyPlanPackage } from "../../api/user-api";

const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// eslint-disable-next-line react/prop-types
const USDTPaymentMain = ({ amount, packageId, onSuccess, onFailure, walletType }) => {
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(import.meta.env.VITE_PAYMENT_ADDRESS);

  useEffect(() => {
    setRecipientAddress(import.meta.env.VITE_PAYMENT_ADDRESS);
  }, []);

  useEffect(() => {
    if (!amount) return;
    setInvestmentAmount(amount);
  }, [amount]);

  useEffect(() => {
    const savedTx = localStorage.getItem("pendingTx");
    if (savedTx) {
      const parsed = JSON.parse(savedTx);
      transactionHandler({
        txResponse: parsed.txHash,
        investmentAmount: parsed.investmentAmount,
      })
        .then(onSuccess)
        .catch((error) => {
          if (error.response?.status === 409 || error.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Duplicate Transaction",
              text: error?.message || error?.response?.message || "This transaction has already been processed.",
            });
          } else {
            onFailure();
          }
        })
        .finally(() => {
          localStorage.removeItem("pendingTx");
        });
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        if (walletType === "safepal") {
          const isSafePal =
            window.ethereum.isSafePal ||
            navigator.userAgent.toLowerCase().includes("safepal");
          if (!isSafePal) {
            throw new Error("Please use SafePal wallet.");
          }
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x38",
                chainName: "Binance Smart Chain",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                blockExplorerUrls: ["https://bscscan.com/"],
              }],
            });
          } else {
            throw switchError;
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);
        setWalletConnected(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "MetaMask or SafePal is not installed.",
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  const transactionHandler = async (payload) => {
    try {
      await buyPlanPackage(payload);
      localStorage.removeItem("pendingTx"); 

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction confirmed. You have successfully sent ${payload.investmentAmount} USDT.`,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error during buyPlanPackage API:", error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!recipientAddress) {
      Swal.fire({
        icon: "error",
        title: "Invalid Address",
        text: "Please enter a valid recipient address",
      });
      return;
    }

    setLoading(true);

    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0x38") {
          throw new Error("Please connect to BSC network first");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);

        const decimals = await usdtContract.decimals();
        const balance = await usdtContract.balanceOf(userAddress);
        const amountInUSDT = ethers.parseUnits(investmentAmount.toString(), decimals);

        if (balance < amountInUSDT) {
          throw new Error("Insufficient USDT balance");
        }

        const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
        await tx.wait();
        console.log("Transaction hash:", tx.hash);

        // ✅ Store transaction in localStorage
        localStorage.setItem("pendingTx", JSON.stringify({
          txHash: tx.hash,
          investmentAmount: amount,
          packageId,
        }));

        await transactionHandler({
          txResponse: tx.hash,
          investmentAmount: amount,
          packageId,
        });

        onSuccess();
      } else {
        throw new Error("MetaMask or SafePal is not installed.");
      }
    } catch (error) {
      console.error("Error during USDT transfer:", error);
      Swal.fire({
        icon: "error",
        title: "Transfer Failed",
        text: error.message || "Transfer failed. Please try again.",
      });
      onFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      {loading && <PageLoader />}
      <h3>
        Pay <b>{investmentAmount}</b> USDT
      </h3>

      <div className="btns">
        {!walletConnected ? (
          <Button2 onClick={handleConnectWallet} name="Connect Wallet" />
        ) : (
          <p style={{ color: "green", fontSize: "1.4rem" }}>
            Wallet is connected
          </p>
        )}

        {walletConnected && (
          <Button2
            onClick={handlePayment}
            name={"Pay USDT"}
            disabled={loading || !walletConnected || !recipientAddress}
          />
        )}
      </div>
    </div>
  );
};

export default USDTPaymentMain;
