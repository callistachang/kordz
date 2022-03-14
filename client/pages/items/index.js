import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Marketplace from "../../components/Marketplace";
import { useEagerConnect } from "../../utils/hooks";
import { getItemsForSale } from "../../utils/state";

export default function Home() {
  const triedEager = useEagerConnect();
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  const [itemList, setItemList] = useState([]);
  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       setItemList(await getItemsForSale());
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   if (active) {
  //     init();
  //   }
  // }, [library]);

  return (
    <div>
      <Marketplace items={itemList} />
    </div>
  );
}
