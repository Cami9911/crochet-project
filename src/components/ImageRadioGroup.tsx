import { Radio, RadioChangeEvent } from "antd";
import purseflorina5 from "../assets/purse-florina-5.jpg";
import purseflorina2 from "../assets/purse-florina-2.jpg";
import "./ImageRadioGroup.scss";

const options = [
  { value: 1, label: "Rosu", img: purseflorina2 },
  { value: 2, label: "Verde", img: purseflorina5 },
];

interface ImageRadioGroupProps {
  value: number;
  onChange: (e: RadioChangeEvent) => void;
}

const ImageRadioGroup: React.FC<ImageRadioGroupProps> = ({
  value,
  onChange,
}) => {
  const color = options.find((col) => col.value === value);
  return (
    <div className="my-12 flex flex-col">
      <span>CULOARE: {color?.label}</span>
      <Radio.Group
        value={value}
        onChange={onChange}
        className="image-radio-group"
      >
        <div className="flex">
          {options.map((item) => (
            <Radio key={item.value} value={item.value}>
              <div
                className="w-30"
                style={{
                  border:
                    value === item.value
                      ? "1px solid #000"
                      : "1px solid #979797",
                }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Radio>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
};

export default ImageRadioGroup;
