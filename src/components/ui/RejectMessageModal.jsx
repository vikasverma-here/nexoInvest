import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

const RejectMessageModal = ({ visible, onHide, onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return; // Do nothing if message is empty

    onSubmit(message);     // Submit the message to the parent
    setMessage("");        // Clear the input
    onHide();              // Close the modal after successful submission
  };

  return (
    <Dialog
      header="Reject Complain"
      visible={visible}
      onHide={onHide}
      style={{ width: "40vw" }}
      className="rounded-lg"
    >
      <div className="flex flex-col gap-4 p-4">
        <label htmlFor="responseMessage" className="font-semibold text-gray-700">
          Rejection Reason
        </label>
        <InputTextarea
          id="responseMessage"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please provide the reason for rejection"
          className="w-full border border-gray-300 rounded-md p-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-400"
        />
        <div className="flex justify-end mt-2">
          <Button
            label="Send & Reject"
            icon="pi pi-times"
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow-md"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default RejectMessageModal;
