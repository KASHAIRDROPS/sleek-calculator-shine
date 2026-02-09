import { useEffect } from "react";
import Calculator from "@/components/Calculator";

const Index = () => {
  useEffect(() => {
    import("@farcaster/miniapp-sdk")
      .then((mod) => mod.default?.actions?.ready?.())
      .catch(() => {});
  }, []);

  return <Calculator />;
};

export default Index;
