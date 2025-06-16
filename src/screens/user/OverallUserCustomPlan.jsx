import { useEffect, useState } from "react";
import "../../styles/user/CustomPlanCard.css";
import PageLoader from "../../components/ui/PageLoader";
import Swal from "sweetalert2";
import WalletOptionModal from "../../components/ui/WalletOptionModal";
import USDTPaymentMain from "../../components/wallet/USDTPaymentMain";
import { Modal } from "react-bootstrap";
import { Button2 } from "../../components/ui/Buttons";
import { MainContent } from "../../constants/content/MainContent";
import { packageAmount } from "../../api/user-api"; // ✅ Ensure this API function exists

const OverallUserCustomPlan = () => {
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [amount, setAmount] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [packageMin, setPackageMin] = useState(100); // Renamed to packageMin to avoid confusion

  // ✅ Fetch minimum package amount from API
  const getPackageAmount = async () => {
    try {
      setLoading(true);
      const res = await packageAmount();
      // console.log(res?.depositAmount)
      setPackageMin(res?.depositAmount || 100);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch package info", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Call on component mount
  useEffect(() => {
    getPackageAmount();
  }, []);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConfirm = () => {
    const value = parseInt(amount, 10);
    const minAmount = parseInt(packageMin, 10);

    if (!value || value % minAmount !== 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Entry",
        text: `Amount must be a multiple of ${minAmount}.`,
      });
      return;
    }

    setAmount(value);
    setShowWalletModal(true);
  };

  return (
    <>
      {loading && <PageLoader />}

      {showWalletModal && (
        <WalletOptionModal
          hide={() => setShowWalletModal(false)}
          connectWallet={(walletName) => {
            setWalletType(walletName);
            setShowPaymentModal(true);
          }}
        />
      )}

      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        className="BNBPaymentModal"
      >
        <Modal.Body>
          <div className="inner">
            <h4>{MainContent.appName}</h4>
            <USDTPaymentMain
              amount={amount}
              walletType={walletType}
              packageId={null}
              onSuccess={() => setShowPaymentModal(false)}
              onFailure={() => setShowPaymentModal(false)}
            />
            <div className="btns">
              <Button2
                className="closeBtn"
                name={"Close"}
                onClick={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="MatrimonyUserCustomPlan OverallUserCustomPlan">
        <div className="glass-card">
          <h2>Enter Custom Amount</h2>
          <p>(Only multiples of {packageMin} allowed)</p>
          <p className="text-yellow-300 text-sm mt-1">
            Minimum Package Amount: {packageMin} USDT
          </p>

          <input
            type="number"
            min={packageMin}
            step={packageMin}
            value={amount}
            onChange={handleInputChange}
            placeholder={`e.g., ${packageMin}, ${packageMin * 2}, ...`}
            className="text-black"
          />
          <button onClick={handleConfirm}>Proceed to Payment</button>
        </div>
      </div>
    </>
  );
};

export default OverallUserCustomPlan;
