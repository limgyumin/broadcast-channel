import { useBroadcastChannel } from "@/utils/hooks/useBroadcastChannel";
import { CSSProperties, useState } from "react";

type BroadcastChannelData = {
  count: number;
};

const BROADCAST_CHANNEL_NAME = "test";

export const SubPage = () => {
  const [count, setCount] = useState<number>(0);

  useBroadcastChannel<BroadcastChannelData>(
    { name: BROADCAST_CHANNEL_NAME },
    (data) => {
      setCount(data.count);
    }
  );

  return (
    <div style={containerCss}>
      <p>서브 페이지 카운팅</p>

      <h1>count: {count}</h1>
    </div>
  );
};

const containerCss: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const buttonAreaCss: CSSProperties = {
  display: "flex",
  gap: "10px",
};
