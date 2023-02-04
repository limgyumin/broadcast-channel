### Broadcast Channel API

브라우저 탭 또는 웹뷰 간에서 데이터를 주고 받을 채널을 생성하여, post-message와 message event-listener 기반으로 데이터를 주고 받을 수 있습니다.
https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API

### useBroadcastChannel

React에서 브라우저 탭 또는 웹뷰 간의 데이터를 주고 받을 수 있도록 기능을 제공하는 custom hook입니다.

첫 번째 인자의 options 객체에 name 프로퍼티를 전달하면 해당 식별자를 가진 채널을 생성합니다.
그 외에 broadcast-channel에 필요한 다양한 옵션들을 추가로 제어할 수 있습니다.
https://github.com/pubkey/broadcast-channel

```ts
useBroadcastChannel({ name: BROADCAST_CHANNEL_NAME });
```

hook의 반환 객체의 sendMessage 함수를 사용하여 원하는 데이터를 해당 채널로 전달할 수 있습니다.

```ts
const { sendMessage } = useBroadcastChannel({ name: BROADCAST_CHANNEL_NAME });
```

두 번째 인자의 callback 함수를 통해 다른 브라우저 탭으로부터 전달받은 값에 대한 별도의 처리를 할 수 있습니다.

```ts
type BroadcastChannelData = {
  count: number;
};

const [count, setCount] = useState<number>(0);

useBroadcastChannel<BroadcastChannelData>({ name: BROADCAST_CHANNEL_NAME }, (data) => {
  setCount(data.count);
});
```
callback은 optional 하기 때문에, 필요에 따라 전달만 하거나, 전달 받기만 할 수도 있습니다.

### Result

https://user-images.githubusercontent.com/52942566/216793630-7e1ce94a-6b36-4818-9a12-9c874651685f.mov
