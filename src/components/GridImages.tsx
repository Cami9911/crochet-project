import { Modal, Space, Image } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import "./Grids.scss";

interface GridItem {
  src: string;
  key: string;
  label: string;
}

interface GridCmpProps {
  items: GridItem[];
}

const GridImages: React.FC<GridCmpProps> = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Content className="grid_content">
      {/*<Divider/>*/}
      <Space wrap size="middle" className="grid_space">
        {items?.map(({ key, label, src }) => {
          //   const showModal = () => {
          //     setIsModalOpen(true);
          //   };

          const handleOk = () => {
            setIsModalOpen(false);
          };

          const handleCancel = () => {
            setIsModalOpen(false);
          };

          return (
            <div key={key}>
              <div className="img_card">
                <Image alt="example" className="img_content" src={src} />
                <p className="img_text">{label}</p>
                {/*<Sider className="img_sider"/>*/}
              </div>
              {/*onClick={showModal}*/}

              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <Image src={src} alt="alt" className="full-size-img" />
                {/*<CarouselCmp items={carouselItems}/>*/}
              </Modal>
            </div>
          );
        })}
      </Space>
    </Content>
  );
};
export default GridImages;
