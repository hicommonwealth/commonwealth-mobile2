import {Magic} from "@magic-sdk/react-native-expo";
import {config} from "@/util/config";
import MAGIC_PUBLISHABLE_KEY = config.MAGIC_PUBLISHABLE_KEY;

export function useMagic() {
  return new Magic(MAGIC_PUBLISHABLE_KEY);
}
