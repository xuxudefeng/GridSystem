import { IVersionHelper } from "../XFrame/Version/IVersionHelper";

export class GameVersion implements IVersionHelper{
    get GameVersion(): string {
        return "0.1.0"
    }
}