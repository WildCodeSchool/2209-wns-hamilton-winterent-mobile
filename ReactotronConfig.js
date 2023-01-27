import Reactotron, { asyncStorage } from "reactotron-react-native";
Reactotron.configure() // controls connection & communication settings
  .useReactNative(asyncStorage()) // add all built-in react native plugins
  .connect({
    enabled: true,
    port: 9090,
  });