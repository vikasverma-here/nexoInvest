/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import bannerImg from "../../assets/banner/FTN_Banner_Mobile.jpg";
const OfferFeaturesPopup = ({ show, onHide }) => {
  return (
    <>
      <div className="OfferFeaturesPopup">
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable
          className="PaymentAcceptModal-modal"
        >
          <Modal.Body>
            <Modal.Header closeButton />
            <div className="inner">
              <div className="img-box">
                <img src={bannerImg} alt="" />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default OfferFeaturesPopup;
