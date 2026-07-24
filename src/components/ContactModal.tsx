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
            <p className="m-0">Contactează-mă acum</p>
            <p className="mt-1 text-sm font-normal text-gray-400">
              Alege o metodă de contact
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
