import "reflect-metadata";

// @ts-ignore
// prettier-ignore
import store from "@/redux/post/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
