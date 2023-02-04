/* eslint-disable react-hooks/exhaustive-deps */

import { BroadcastChannel, BroadcastChannelOptions } from "broadcast-channel";
import { useCallback, useEffect, useMemo } from "react";

type BroadcastChannelCallback<T> = (data: T) => void | Promise<void>;

type UseBroadcastChannelOptions = Omit<BroadcastChannelOptions, "node"> & {
  name: string;
};

export const useBroadcastChannel = <T>(
  options: UseBroadcastChannelOptions,
  callback?: BroadcastChannelCallback<T>
) => {
  const channel = useMemo(() => createBroadcastChannel<T>(options), []);

  const sendMessage = (payload: T) => channel?.postMessage(payload);

  const registerMessageListener = useCallback(() => {
    if (!callback) {
      return;
    }

    if (!channel) {
      return;
    }

    const handleMessage = (data: T) => callback(data);

    channel.onmessage = handleMessage;
  }, [callback]);

  useEffect(() => {
    registerMessageListener();
  }, [registerMessageListener]);

  useEffect(() => {
    return () => {
      channel?.close();
    };
  }, []);

  return {
    sendMessage,
  };
};

const isSSR = () => typeof window === "undefined";

const createBroadcastChannel = <T>({
  name,
  type = "native",
  ...restOptions
}: UseBroadcastChannelOptions): BroadcastChannel<T> | undefined => {
  if (isSSR()) {
    return;
  }

  return new BroadcastChannel<T>(name, { type, ...restOptions });
};
