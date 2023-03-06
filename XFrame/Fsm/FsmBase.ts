//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------


/**
 * 有限状态机基类。
 */
export abstract class FsmBase {
    private name: string | null;

    /**
     * 初始化有限状态机基类的新实例。
     */
    constructor() {
        this.name = "";
    }

    /**
     * 获取有限状态机名称。
     */
    public get Name(): string | null {
        return this.name;
    }

    /**
     * 设置有限状态机名称。
     */
    protected set Name(value: string | null) {
        this.name = value ?? "";
    }


    /**
     * 获取有限状态机完整名称。
     */
    public get FullName(): string {
        return this.OwnerType + this.name;
    }

    /**
     * 获取有限状态机持有者类型。
     */
    public abstract get OwnerType(): string;

    /**
     * 获取有限状态机中状态的数量。
     */
    public abstract get FsmStateCount(): number;

    /**
     * 获取有限状态机是否正在运行。
     */
    public abstract get IsRunning(): boolean;

    /**
     * 获取有限状态机是否被销毁。
     */
    public abstract get IsDestroyed(): boolean;

    /**
     * 获取当前有限状态机状态名称。
     */
    public abstract get CurrentStateName(): string;

    /**
     * 获取当前有限状态机状态持续时间。
     */
    public abstract get CurrentStateTime(): number;

    /**
     * 有限状态机轮询。
     * @param elapseSeconds 逻辑流逝时间，以秒为单位。
     * @param realElapseSeconds 当前已流逝时间，以秒为单位。
     */
    abstract Update(elapseSeconds: number, realElapseSeconds: number): void;

    /**
     * 关闭并清理有限状态机。
     */
    abstract Shutdown(): void;
}

