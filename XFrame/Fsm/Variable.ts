//------------------------------------------------------------
// XFrame
// author：徐振升
//------------------------------------------------------------


/// <summary>
/// 变量。
/// </summary>
export abstract class Variable {
    /// <summary>
    /// 初始化变量的新实例。
    /// </summary>
    public Variable() {
    }

    /// <summary>
    /// 获取变量类型。
    /// </summary>
    public abstract get Type(): string;

    /// <summary>
    /// 获取变量值。
    /// </summary>
    /// <returns>变量值。</returns>
    public abstract GetValue(): object;

    /// <summary>
    /// 设置变量值。
    /// </summary>
    /// <param name="value">变量值。</param>
    public abstract SetValue(value: object): void;

    /// <summary>
    /// 清理变量值。
    /// </summary>
    public abstract Clear(): void;
}

