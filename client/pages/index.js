import Hero from "../components/Hero";
import { useEagerConnect } from "../utils/hooks";
import Head from "next/head";

export default function Home() {
  // const { active, account, library, connector, activate, deactivate, chainId } =
  //   useWeb3React();
  const triedEager = useEagerConnect();

  return (
    <div>
      <Head>
        <title>Kordz (Beta)</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Hero />
    </div>
  );
}
