/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "./ui/TextInput";
import { Button5 } from "./ui/Buttons";
import TextareaField from "./ui/TextareaField";

const SwitchPromoter = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="SwitchPromoter-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Switch Promotor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-container">
          <TextInput
            labelName={"Promoter Name"}
            placeholder={"Promoter Name"}
          />
          <TextInput labelName={"Email"} placeholder={"Email"} />
          <TextareaField labelName={"Remarks"} placeholder={"Enter here.."} />
        </div>
        <div className="btns">
          <Button5 name={"Convert"} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SwitchPromoter;
