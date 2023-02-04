import { useBroadcastChannel } from "@/utils/hooks/useBroadcastChannel";
import { CSSProperties, useState } from "react";

type BroadcastChannelData = {
  count: number;
};

const BROADCAST_CHANNEL_NAME = "test";

export const MainPage = () => {
  const [count, setCount] = useState<number>(0);

  const { sendMessage } = useBroadcastChannel<BroadcastChannelData>(
    { name: BROADCAST_CHANNEL_NAME },
    (data) => {
      setCount(data.count);
    }
  );

  const handleIncreaseClick = () => {
    const increased = count + 1;

    setCount(increased);
    sendMessage({ count: increased });
  };

  const handleDecreaseClick = () => {
    const decreased = count - 1;

    setCount(decreased);
    sendMessage({ count: decreased });
  };

  return (
    <div style={containerCss}>
      <p>메인 페이지 카운팅</p>

      <h1>count: {count}</h1>

      <div style={buttonAreaCss}>
        <button onClick={handleIncreaseClick}>Increase</button>
        <button onClick={handleDecreaseClick}>Increase</button>
      </div>
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
