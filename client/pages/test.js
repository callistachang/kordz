import { Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { api } from "../utils/api";
import { getItemsForSale } from "../utils/state";
var FormData = require("form-data");

export default function Home() {
  // const data = new FormData();
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  // data.append("name", "hello");
  // data.append("description", "hello");

  const testFunction = async () => {
    getItemsForSale(chainId, library);
    // const response = await api.post("/upload", data, {
    //   headers: {
    //     "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    //   },
    // });
    // console.log(response);
  };
  return (
    <div align="center">
      <Button onClick={testFunction}>Click Me</Button>
    </div>
  );
}
