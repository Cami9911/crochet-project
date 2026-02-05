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
    </Content>
  );
};
export default GridContent;
