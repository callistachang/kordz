import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected } from "./connectors";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        setTimeout(
          () =>
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            }),
          2000
        );
      } else {
        setTried(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
