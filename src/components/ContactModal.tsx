import React from "react";
import { Modal } from "antd";
import { openContactModalAtom } from "../storageAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import ContactOptions from "./ContactOptions";

const ContactModal: React.FC = () => {
  const isOpenContactModal = useAtomValue(openContactModalAtom);
  const setIsOpenContactModal = useSetAtom(openContactModalAtom);

  const handleCancel = () => {
    setIsOpenContactModal(false);
  };

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
        open={isOpenContactModal}
        onCancel={handleCancel}
        footer={false}
      >
        <ContactOptions />
      </Modal>
    </>
  );
};

export default ContactModal;
