import { Button, Flex } from "antd";

const NotFound = () => {
  return (
    <div>
      <span>Nu există rezultate pentru</span>
      <span>
        Din păcate, nu am găsit exact ceea ce cauți. Dar nu-i nimic! Descoperă
        ce am pregătit pentru tine.
      </span>
      <Flex>
        <Button>Genti</Button>
        <Button>Pantofi</Button>
      </Flex>
      <Button>Înapoi la pagina principală</Button>
    </div>
  );
};
export default NotFound;
