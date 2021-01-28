import {RandomNumberBetween} from "../helpers/randomNumberBetween";
import {lootIDs} from "./lootIDs";


export const treasureBaseModel = () => {
   return {
   coins: RandomNumberBetween(15, 5),
   loot: RandomNumberBetween(1, 0) === 1 ? lootIDs[RandomNumberBetween(lootIDs.length - 1, 0)] : null
};
}