import {Magic} from "@magic-sdk/react-native-expo";
import {config} from "@/util/config";

export function useMagic() {
  return new Magic(config.MAGIC_PUBLISHABLE_KEY);
}
