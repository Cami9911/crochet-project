import React from "react";
import { Modal } from "antd";
import { openContactModalAtom } from "../atoms";
import { useAtom } from "jotai";
import ContactOptions from "./ContactOptions";

const ContactModal: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(openContactModalAtom);

  return (
    <>
      <Modal
        title={
          <div>
            <p className="m-0">Găsește-mă pe social media</p>
            <p className="mt-1 text-sm font-normal text-gray-400">
              Urmărește-mă pentru noutăți, creații noi și videouri cu produsele
              mele
            </p>
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={false}
      >
        <ContactOptions />
      </Modal>
    </>
  );
};

export default ContactModal;
