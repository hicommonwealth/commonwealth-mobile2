import {useContext} from "react";
import {RemounterContext} from "@/components/Remounter/RemounterContext";

export function useRemounter() {
  return useContext(RemounterContext)
}
