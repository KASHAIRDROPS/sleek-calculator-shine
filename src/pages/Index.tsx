import { useEffect } from "react";
import Calculator from "@/components/Calculator";
import sdk from "@farcaster/miniapp-sdk";

const Index = () => {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return <Calculator />;
};

export default Index;
