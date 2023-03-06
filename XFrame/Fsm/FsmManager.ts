//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------

import { Module } from "../Base/Module";
import { TypeNamePair } from "../ClassUtils";
import { Fsm } from "./Fsm";
import { FsmBase } from "./FsmBase";
import { FsmState } from "./FsmState";
import { IFsm } from "./IFsm";
import { IFsmManager } from "./IFsmManager";


/// <summary>
/// 有限状态机管理器。
/// </summary>
export class FsmManager extends Module implements IFsmManager {

    private readonly fsms: Map<string, FsmBase>;
    // private readonly tempFsms: Set<FsmBase>;


    /**
     *初始化有限状态机管理器的新实例。
     */
    constructor() {
        super();
        this.fsms = new Map<string, FsmBase>();
        // this.tempFsms = new Set<FsmBase>();
    }

    /**
     * 获取游戏框架模块优先级。
     */
    override get Priority(): number {
        return 1;
    }

    /**
     * 获取有限状态机数量。
     */
    public get Count() {
        return this.fsms.size;
    }

    /**
     * 有限状态机管理器轮询。
     * @param elapseSeconds 逻辑流逝时间，以秒为单位。
     * @param realElapseSeconds 真实流逝时间，以秒为单位。
     * @returns 
     */
    override  Update(elapseSeconds: number, realElapseSeconds: number): void {

        // this.tempFsms.clear();

        if (this.fsms.size <= 0) {
            return;
        }

        // this.fsms.forEach((fsm: FsmBase) => {
        //     this.tempFsms.add(fsm)
        // });

        for (const fsm of this.fsms) {
            if (fsm[1].IsDestroyed) {
                continue;
            }
            fsm[1].Update(elapseSeconds, realElapseSeconds);
        }
    }


    /**
     * 关闭并清理有限状态机管理器。
     */
    override  Shutdown(): void {

        for (let fsm of this.fsms) {
            fsm[1].Shutdown();
        }

        this.fsms.clear();
        // this.tempFsms.clear();
    }

    /// <summary>
    /// 检查是否存在有限状态机。
    /// </summary>
    /// <typeparam name="T">有限状态机持有者类型。</typeparam>
    /// <returns>是否存在有限状态机。</returns>
    public HasFsm(name: string): boolean {
        return this.fsms.has(name);
    }

    /// <summary>
    /// 获取有限状态机。
    /// </summary>
    /// <typeparam name="T">有限状态机持有者类型。</typeparam>
    /// <returns>要获取的有限状态机。</returns>
    public GetFsm<T>(type: new () => T): Fsm<T> | null {

        let key = TypeNamePair.toString(type);
        if (this.fsms.has(key)) {
            return this.fsms.get(key) as Fsm<T>;
        }

        return null;
    }


    /// <summary>
    /// 获取所有有限状态机。
    /// </summary>
    /// <returns>所有有限状态机。</returns>
    public GetAllFsms(): Set<FsmBase> {
        const fsmsList = new Set<FsmBase>();
        for (const fsm of this.fsms) {
            fsmsList.add(fsm[1]);
        }
        return fsmsList;
    }

    /**
     * 创建有限状态机。
     * @param type 有限状态机持有者类型。
     * @param name 有限状态机名称。
     * @param owner 有限状态机持有者。
     * @param states 有限状态机状态集合。
     * @returns 要创建的有限状态机。
     */
    CreateFsm<T>(type: new () => T, name: string, owner: T, states: Set<FsmState<T>>): IFsm<T> {
        const typeNameStr = TypeNamePair.toString(type, name);
        if (this.HasFsm(typeNameStr)) {
            throw new Error(`Already exist FSM '{0}'.", ${typeNameStr}`);
        }

        const fsm: Fsm<T> = Fsm.Create(name, owner, states);
        this.fsms.set(typeNameStr, fsm);
        return fsm;
    }

    /**
     * 销毁有限状态机。
     * @param type 有限状态机持有者类型。
     * @param name 是否销毁有限状态机成功。
     * @returns 是否销毁有限状态机成功。
     */
    DestroyFsm<T>(type: new () => T, name: string = ""): boolean {
        const typeName: string = TypeNamePair.toString(type, name)
        if (this.fsms.has(typeName)) {
            const fsm: FsmBase = this.fsms.get(typeName) as FsmBase;
            fsm.Shutdown();
            return this.fsms.delete(typeName);
        }
        return false;
    }


}

