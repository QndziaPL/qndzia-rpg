import {setPlayer} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export const PlayerPositionChange = () => {

    const playerData = useSelector(p => p.player);
    const dispatch = useDispatch();

    const updatePositionToDispatch = (direction) =>{
        switch (direction){
            case "up":
                playerData.position.y -= 1;
                return playerData

            case "down":
                playerData.position.y += 1;
                return playerData

            case "left":
                playerData.position.x -= 1;
                return playerData

            case "right":
                playerData.position.x += 1;
                return playerData

            default:
                return playerData

        }
    }

    dispatch(setPlayer(updatePositionToDispatch("up")))

    return null
}
