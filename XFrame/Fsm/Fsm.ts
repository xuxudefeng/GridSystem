//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------

import { TypeNamePair } from "../ClassUtils";
import { FsmBase } from "./FsmBase";
import { FsmState } from "./FsmState";
import { IFsm } from "./IFsm";
import { Variable } from "./Variable";

/**
 * 有限状态机。
 *? T有限状态机持有者类型。
 */
export class Fsm<T> extends FsmBase implements IFsm<T>{

    private owner: T | null;
    private readonly states: Map<string, FsmState<T>>;
    private datas!: Map<string, Variable> | null;
    private currentState!: FsmState<T> | null;
    private currentStateTime: number;
    private isDestroyed: boolean;

    /**
     * 初始化有限状态机的新实例。
     */
    constructor() {
        super();
        this.owner = null;
        this.states = new Map<string, FsmState<T>>();
        this.datas = null;
        this.currentState = null;
        this.currentStateTime = 0;
        this.isDestroyed = true;
    }
    /**
     * 获取有限状态机持有者。
     */
    public get Owner(): T | null {
        return this.owner;
    }

    /**
     * 获取有限状态机持有者类型。
     */
    public override get OwnerType(): string {
        return TypeNamePair.toString(this.owner);
    }

    /**
     * 获取有限状态机中状态的数量。
     */
    public override get FsmStateCount(): number {
        return this.states.size;
    }

    /**
     * 获取有限状态机是否正在运行。
     */
    public override get IsRunning(): boolean {
        return this.currentState != null;
    }

    /**
     * 获取有限状态机是否被销毁。
     */
    public override get IsDestroyed(): boolean {
        return this.isDestroyed;
    }

    /**
     * 获取当前有限状态机状态。
     */
    public get CurrentState(): FsmState<T> | null {
        return this.currentState;
    }

    /**
     * 获取当前有限状态机状态名称。
     */
    public override get CurrentStateName(): string {
        return this.currentState != null ? TypeNamePair.toString(this.currentState) : null;
    }

    /**
     * 获取当前有限状态机状态持续时间。
     */
    public override get CurrentStateTime(): number {
        return this.currentStateTime;
    }

    /**
     * 创建有限状态机。
     * @param name 有限状态机名称。
     * @param owner 有限状态机持有者。
     * @param T 
     * @param states 有限状态机状态集合。
     * @returns 创建的有限状态机。
     */
    public static Create<T>(name: string, owner: T, states: Set<FsmState<T>>): Fsm<T> {
        if (owner == null || undefined) {
            throw new Error("FSM owner is invalid.");
        }

        if (states == null || undefined || states.size < 1) {
            throw new Error("FSM states is invalid.");
        }

        // todo 引用池
        const fsm: Fsm<T> = new Fsm<T>();//ReferencePool.Acquire<Fsm<T>>();
        fsm.Name = name;
        fsm.owner = owner;
        fsm.isDestroyed = false;

        states.forEach(state => {
            if (state == null || undefined) {
                throw new Error("FSM states is invalid.");
            }
            const stateType: string = TypeNamePair.toString(state);
            //如果存在，抛出异常
            if (fsm.states.has(stateType)) {
                throw new Error("FSM '{0}' state '{1}' is already exist.");
            }
            //不存在则添加到列表中
            fsm.states.set(stateType, state);
            state.OnInit(fsm);
        })

        return fsm;
    }

    /// <summary>
    /// 清理有限状态机。
    /// </summary>
    public Clear(): void {
        if (this.currentState != null) {
            this.currentState.OnLeave(this, true);
        }

        this.states.forEach(state => {
            state.OnDestroy(this);
        })

        this.Name = null;
        this.owner = null;
        this.states.clear();

        if (this.datas != null) {
            for (const data of this.datas) {
                if (data) {
                    continue;
                }
                //ReferencePool.Release(data.Value);
            }
            this.datas.clear();
        }

        this.currentState = null;
        this.currentStateTime = 0;
        this.isDestroyed = true;
    }

    /**
     * 开始有限状态机。
     * @param TState 要开始的有限状态机状态类型。
     */
    public Start<TState extends FsmState<T>>(c: new () => TState): void {
        if (this.IsRunning) {
            throw new Error("FSM is running, can not start again.");
        }

        const state: FsmState<T> | null = this.GetState<TState>(c);
        if (state == null) {
            throw new Error(`FSM '${TypeNamePair.toString(c, this.Name as string)}' can not start state '${TypeNamePair.toString(c)}' which is not exist.`);
        }

        this.currentStateTime = 0;
        this.currentState = state;
        this.currentState.OnEnter(this);
    }

    /**
     * 是否存在有限状态机状态。
     * @param state 要检查的有限状态机状态类型。
     * @returns 是否存在有限状态机状态。
     */
    public HasState<TState>(state: new () => TState): boolean {
        return this.states.has(TypeNamePair.toString(state));
    }

    /**
     * 获取有限状态机状态。
     * @param state 要获取的有限状态机状态类型。
     * @returns 要获取的有限状态机状态。
     */
    public GetState<TState>(state: new () => TState): TState | null {

        const typeNameStr: string = TypeNamePair.toString(state)
        if (this.states.has(typeNameStr)) {
            return <TState>this.states.get(typeNameStr);
        }
        return null;
    }

    /**
     * 获取有限状态机的所有状态。
     * @returns 有限状态机的所有状态。
     */
    public GetAllStates(): FsmState<T>[] {
        let index: number = 0;
        let results: FsmState<T>[] = [];

        this.states.forEach((state: FsmState<T>) => {
            results[index++] = state;
        })

        return results;
    }

    /// <summary>
    /// 是否存在有限状态机数据。
    /// </summary>
    /// <param name="name">有限状态机数据名称。</param>
    /// <returns>有限状态机数据是否存在。</returns>
    public HasData(name: string): boolean {
        if (!name) {
            throw new Error("Data name is invalid.");
        }

        if (this.datas == null) {
            return false;
        }

        return this.datas.has(name);
    }

    /// <summary>
    /// 获取有限状态机数据。
    /// </summary>
    /// <typeparam name="TData">要获取的有限状态机数据的类型。</typeparam>
    /// <param name="name">有限状态机数据名称。</param>
    /// <returns>要获取的有限状态机数据。</returns>
    public GetData<TData extends Variable>(name: string): TData | null {
        if (!name) {
            throw new Error("Data name is invalid.");
        }

        if (this.datas == null) {
            return null;
        }

        if (this.datas.has(name)) {
            return this.datas.get(name) as TData;
        }

        return null;
    }

    /// <summary>
    /// 设置有限状态机数据。
    /// </summary>
    /// <typeparam name="TData">要设置的有限状态机数据的类型。</typeparam>
    /// <param name="name">有限状态机数据名称。</param>
    /// <param name="data">要设置的有限状态机数据。</param>
    public SetData<TData extends Variable>(name: string, data: TData): void {
        if (!name) {
            throw new Error("Data name is invalid.");
        }

        if (this.datas == null) {
            this.datas = new Map<string, Variable>();
        }

        const oldData: Variable | null = this.GetData(name);
        if (oldData != null) {
            // ReferencePool.Release(oldData);
        }

        this.datas.set(name, data);
    }


    /// <summary>
    /// 移除有限状态机数据。
    /// </summary>
    /// <param name="name">有限状态机数据名称。</param>
    /// <returns>是否移除有限状态机数据成功。</returns>
    public RemoveData(name: string): boolean {
        if (!name) {
            throw new Error("Data name is invalid.");
        }

        if (this.datas == null) {
            return false;
        }

        const oldData: Variable | null = this.GetData(name);
        if (oldData != null) {
            // ReferencePool.Release(oldData);
        }

        return this.datas.delete(name);
    }

    /// <summary>
    /// 有限状态机轮询。
    /// </summary>
    /// <param name="elapseSeconds">逻辑流逝时间，以秒为单位。</param>
    /// <param name="realElapseSeconds">真实流逝时间，以秒为单位。</param>
    override  Update(elapseSeconds: number, realElapseSeconds: number): void {
        if (this.currentState == null) {
            return;
        }

        this.currentStateTime += elapseSeconds;
        this.currentState.OnUpdate(this, elapseSeconds, realElapseSeconds);
    }

    /// <summary>
    /// 关闭并清理有限状态机。
    /// </summary>
    override  Shutdown(): void {
        //ReferencePool.Release(this);
    }


    /// <summary>
    /// 切换当前有限状态机状态。
    /// </summary>
    /// <param name="stateType">要切换到的有限状态机状态类型。</param>
    ChangeState<TState extends FsmState<T>>(c: new () => TState): void {
        if (this.currentState == null) {
            throw new Error("Current state is invalid.");
        }

        const state: FsmState<T> | null = this.GetState<TState>(c);
        if (state == null) {
            throw new Error("FSM '{0}' can not change state to '{1}' which is not exist.");
        }

        this.currentState.OnLeave(this, false);
        this.currentStateTime = 0;
        this.currentState = state;
        this.currentState.OnEnter(this);
    }
}

