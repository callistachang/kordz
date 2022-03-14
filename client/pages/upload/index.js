import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import UploadItem from "../../components/UploadItem";
import { useEagerConnect } from "../../utils/hooks";
import { getMarketplaceContract, getTokenContract } from "../../utils/state";

export default function Upload() {
  const triedEager = useEagerConnect();
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  const [tokenContract, setTokenContract] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  useEffect(() => {
    const init = async () => {
      try {
        setTokenContract(await getTokenContract(chainId, library));
        setMarketplaceContract(await getMarketplaceContract(chainId, library));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    init();
  }, [library]);

  return (
    <div>
      <UploadItem
        tokenContract={tokenContract}
        marketplaceContract={marketplaceContract}
      />
    </div>
  );
}
