//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------

import { Fsm } from "./Fsm";
import { FsmBase } from "./FsmBase";
import { FsmState } from "./FsmState";
import { IFsm } from "./IFsm";

/// <summary>
/// 有限状态机管理器。
/// </summary>
export interface IFsmManager {
    /// <summary>
    /// 获取有限状态机数量。
    /// </summary>
    get Count(): number;


    /// <summary>
    /// 检查是否存在有限状态机。
    /// </summary>
    /// <typeparam name="T">有限状态机持有者类型。</typeparam>
    /// <returns>是否存在有限状态机。</returns>
    HasFsm(name:string): boolean;

    /// <summary>
    /// 获取有限状态机。
    /// </summary>
    /// <typeparam name="T">有限状态机持有者类型。</typeparam>
    /// <returns>要获取的有限状态机。</returns>
    GetFsm<T>(type: new () => T): Fsm<T> | null;

    
    /// <summary>
    /// 获取所有有限状态机。
    /// </summary>
    /// <returns>所有有限状态机。</returns>
    GetAllFsms(): Set<FsmBase>;

    /**
     * 创建有限状态机。
     * @param type 有限状态机持有者类型。
     * @param name 有限状态机名称。
     * @param owner 有限状态机持有者。
     * @param states 有限状态机状态集合。
     * @param returns 要创建的有限状态机。
     */
    CreateFsm<T>(type: new () => T, name: string, owner: T, states: Set<FsmState<T>>): IFsm<T>;

    /**
     * 销毁有限状态机。
     * @param name 要销毁的有限状态机名称。
     * @param T 有限状态机持有者类型。
     * @param returns 是否销毁有限状态机成功。
     */
    DestroyFsm<T>(type: new () => T, name: string): boolean;
}

