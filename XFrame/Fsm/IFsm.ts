//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------

import { FsmState } from "./FsmState";
import { Variable } from "./Variable";

/**
 * 有限状态机接口。
 * ? T有限状态机持有者类型。
 */
export interface IFsm<T> {
    /**
     * 获取有限状态机名称。
     */
    get Name(): string | null;

    /**
     * 获取有限状态机完整名称。
     */
    get FullName(): string;

    /**
     * 获取有限状态机持有者。
     */
    get Owner(): T | null;

    /**
     * 获取有限状态机中状态的数量。
     */
    get FsmStateCount(): number;

    /**
     * 获取有限状态机是否正在运行。
     */
    get IsRunning(): boolean;

    /**
     * 获取有限状态机是否被销毁。
     */
    get IsDestroyed(): boolean;

    /**
     * 获取当前有限状态机状态。
     */
    get CurrentState(): FsmState<T> | null;

    /**
     * 获取当前有限状态机状态持续时间。
     */
    get CurrentStateTime(): number;

    /**
     * 开始有限状态机。
     */
    Start<TState extends FsmState<T>>(c: new () => TState): void;
    /**
     * 是否存在有限状态机状态。
     */
    HasState<TState>(state: new () => TState): boolean;

    /// <summary>
    /// 获取有限状态机状态。
    /// </summary>
    /// <typeparam name="TState">要获取的有限状态机状态类型。</typeparam>
    /// <returns>要获取的有限状态机状态。</returns>
    GetState<TState>(state: new () => TState): TState | null;

    /// <summary>
    /// 获取有限状态机的所有状态。
    /// </summary>
    /// <returns>有限状态机的所有状态。</returns>
    GetAllStates(): FsmState<T>[];


    /// <summary>
    /// 是否存在有限状态机数据。
    /// </summary>
    /// <param name="name">有限状态机数据名称。</param>
    /// <returns>有限状态机数据是否存在。</returns>
    HasData(name: string): boolean;

    /// <summary>
    /// 获取有限状态机数据。
    /// </summary>
    /// <typeparam name="TData">要获取的有限状态机数据的类型。</typeparam>
    /// <param name="name">有限状态机数据名称。</param>
    /// <returns>要获取的有限状态机数据。</returns>
    GetData<TData extends Variable>(name: string): TData | null;


    /// <summary>
    /// 设置有限状态机数据。
    /// </summary>
    /// <typeparam name="TData">要设置的有限状态机数据的类型。</typeparam>
    /// <param name="name">有限状态机数据名称。</param>
    /// <param name="data">要设置的有限状态机数据。</param>
    SetData<TData extends Variable>(name: string, data: TData): void;

    /// <summary>
    /// 移除有限状态机数据。
    /// </summary>
    /// <param name="name">有限状态机数据名称。</param>
    /// <returns>是否移除有限状态机数据成功。</returns>
    RemoveData(name: string): boolean;
}

