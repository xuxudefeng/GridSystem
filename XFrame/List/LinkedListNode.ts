import { LinkedList } from "./LinkedList";

  /**
   * The class which represents one link or node in a linked list
   * ```ts
   * const node = new LinkedListNode(1, null, null, null);
   * ```
   */
  export class LinkedListNode<T> {
    constructor(
      /** Data stored on the node */
      public data: T,

      /** The previous node in the list */
      public prev: LinkedListNode<T> | null,

      /** The next link in the list */
      public next: LinkedListNode<T> | null,

      /** The list this node belongs to */
      public list: LinkedList<T> | null,
    ) { }

    /**
     * Alias to .data
     * ```ts
     * new LinkedList(1, 2, 3).head.value; // 1
     * ```
     */
    public get value(): T {
      return this.data;
    }

    /**
     * Get the index of this node
     * ```ts
     * new LinkedList(1, 2, 3).head.index; // 0
     * ```
     */
    public get index() {
      if (!this.list) { return undefined; }
      return this.list.findIndex((value: T) => value === this.value);
    }

    /**
     * Insert a new node before this one
     * ```ts
     * new LinkedList(2, 3).head.insertBefore(1); // 1 <=> 2 <=> 3
     * ```
     * @param data Data to save in the node
     */
    public insertBefore(data: T): LinkedList<T> {
      return this.list !== null
        ? this.list.insertBefore(this, data)
        : new LinkedList<T>(data, this.data);
    }

    /**
     * Insert new data after this node
     * ```ts
     * new LinkedList(1, 2).tail.insertAfter(3); // 1 <=> 2 <=> 3
     * ```
     * @param data Data to be saved in the node
     */
    public insertAfter(data: T): LinkedList<T> {
      return this.list !== null
        ? this.list.insertAfter(this, data)
        : new LinkedList<T>(this.data, data);
    }

    /**
     * Remove this node
     * ```ts
     * new LinkedList(1, 2, 3, 4).tail.remove(); // 1 <=> 2 <=> 3
     * ```
     */
    public remove(): LinkedListNode<T> {
      if (this.list === null) {
        throw new ReferenceError('Node does not belong to any list');
      }
      return this.list.removeNode(this);
    }
  }

