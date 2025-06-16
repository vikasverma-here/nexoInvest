import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

const ApproveMessageModal = ({ visible, onHide, onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSubmit(message);
    setMessage(""); // Clear after submit
  };

  return (
    <Dialog
      header="Approve Complain"
      visible={visible}
      onHide={onHide}
      style={{ width: "40vw" }}
      className="rounded-lg"
    >
      <div className="flex flex-col gap-4 p-4">
        <label htmlFor="responseMessage" className="font-semibold text-gray-700">
          Response Message
        </label>
        <InputTextarea
          id="responseMessage"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your response to the user..."
          className="w-full border border-gray-300 rounded-md p-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end mt-2">
          <Button
            label="Send & Approve"
            icon="pi pi-check"
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md shadow-md"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ApproveMessageModal;
