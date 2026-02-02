import { Image, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import allProducts from "../AllProductsData";

const GridContent: React.FC = () => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Content className="grid_content">
      <Row gutter={16}>
        {allProducts?.map(({ key, label, src }) => {
          return (
            <Col
              className="gutter-row"
              span={12}
              sm={{ span: 8 }}
              lg={{ span: 6 }}
              key={key}
            >
              <Image alt="example" className="" src={src} />
              <div>{label}</div>
            </Col>
          );
        })}
      </Row>
      {/*<Divider/>*/}
      {/* <Space wrap size="middle" className="grid_space">
        {items?.map(({ key, label, src }) => {
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
              </div>

              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <Image src={src} alt="alt" className="full-size-img" />
              </Modal>
            </div>
          );
        })}
      </Space> */}
    </Content>
  );
};
export default GridContent;
