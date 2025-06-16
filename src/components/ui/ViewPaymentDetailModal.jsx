/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { Button2 } from "./Buttons";

const ViewTicketDetail = ({ show, onHide, data }) => {
  console.log(data.response)
  return (
    <>
      <div className="ViewTicketDetail">
        <Modal
          show={show}
          onHide={onHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable
          className="PaymentAcceptModal-modal"
        >
          <Modal.Body style={{ backgroundColor: "#CBC3E3", color: "#000" }}>
            <div className="inner">
              <div className="top-container " >
                <h5 className="title" style={{ color: "#000" }}>Complain Details</h5>
              </div>
              <div className="inner-wrapper">
                <div className="msg mar-top">
                  <h5 className=" text-[2rem]">Subject:</h5>
                  <h3 className=" text-[2rem]">{data?.subject}</h3>
                </div>
                <div className="msg mar-top">
                  <h5 className=" text-[2rem]">Message:</h5>
                  <h3 className=" text-[2rem]" >{data?.message}</h3>
                </div>
                <div className="msg mar-top">
                  <h5 className=" text-[2rem]">Response:</h5>
                  <h3 className=" text-[2rem]" >{data?.response}</h3>
                </div>
              </div>
              <div className="btns">
                <Button2 name={"Close"} onClick={onHide} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ViewTicketDetail;
