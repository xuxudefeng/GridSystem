//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------

import { Fsm } from "./Fsm";
import { IFsm } from "./IFsm"

/**
 * 有限状态机状态基类。
 * ?T 有限状态机持有者类型。
 */
export abstract class FsmState<T>
{
    /**
     * 初始化有限状态机状态基类的新实例。
     */
    constructor() {

    }

    /**
     * 有限状态机状态初始化时调用。
     * @param fsm 有限状态机引用。
     */
    abstract OnInit(fsm: IFsm<T>): void;

    /**
     * 有限状态机状态进入时调用。
     * @param fsm 有限状态机引用。
     */
    abstract OnEnter(fsm: IFsm<T>): void;

    /**
     * 有限状态机状态轮询时调用。
     * @param fsm 有限状态机引用。
     * @param elapseSeconds 逻辑流逝时间，以秒为单位。
     * @param realElapseSeconds 真实流逝时间，以秒为单位。
     */
    abstract OnUpdate(fsm: IFsm<T>, elapseSeconds: number, realElapseSeconds: number): void;

    /**
     * 有限状态机状态离开时调用。
     * @param fsm 有限状态机引用。
     * @param isShutdown 是否是关闭有限状态机时触发。
     */
    abstract OnLeave(fsm: IFsm<T>, isShutdown: boolean): void;

    /**
     * 有限状态机状态销毁时调用。
     * @param fsm 有限状态机引用。
     */
    abstract OnDestroy(fsm: IFsm<T>): void;

    /**
     * 切换当前有限状态机状态。
     * @param TState 要切换到的有限状态机状态类型。
     * @param fsm 有限状态机引用。
     */
    ChangeState<TState extends FsmState<T>>(c: new () => TState, fsm: IFsm<T>): void {
        if (fsm instanceof Fsm<T>) {
            const fsmImplement: Fsm<T> = fsm as Fsm<T>;
            if (fsmImplement == null) {
                throw new Error("FSM is invalid.");
            }
            fsmImplement.ChangeState<TState>(c);
        }
    }
}

