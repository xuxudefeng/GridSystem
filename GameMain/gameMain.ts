import { GameEntry } from "../XFrame/Base/GameEntry";
import { FsmManager } from "../XFrame/Fsm/FsmManager";
import { Version } from "../XFrame/Version/Version";
import { GameVersion } from "./gameVersion";

export class GameMain extends GameEntry{

    fsmManager:FsmManager;
    /**
     *
     */
    constructor() {
        super();
        Version.SetVersionHelper(new GameVersion());
        this.fsmManager = GameMain.GetModule(FsmManager);
    }
}