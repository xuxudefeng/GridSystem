import { LinkedListNode } from "./LinkedListNode";

  /** Type used for filter and find methods, returning a boolean */
  export type TTestFunction<T> = (
    data: T,
    index: number,
    list: LinkedList<T>,
  ) => boolean;

  /** Type used for map and forEach methods, returning anything */
  export type TMapFunction<T> = (
    data: any,
    index: number,
    list: LinkedList<T>,
  ) => any;

  /**
   * A doubly linked list
   * ```ts
   * const list = new LinkedList(1, 2, 3);
   * const listFromArray = LinkedList.from([1, 2, 3]);
   * ```
   */
  export class LinkedList<T> {

    /**
     * The length of the list
     */
    public get length(): number {
      return this.size;
    }

    /**
     * Convert any iterable to a new linked list
     * ```javascript
     * const array = [1, 2, 3];
     * const list = LinkedList.from(array);
     * ```
     * @param iterable Any iterable datatype like Array or Map
     */
    public static from<T>(iterable: Iterable<T>): LinkedList<T> {
      return new LinkedList(...iterable);
    }

    /** The first of the list, the first node */
    public first: LinkedListNode<T> | null;

    /** The last of the list, the last node */
    public last: LinkedListNode<T> | null;

    /** Internal size reference */
    private size: number;

    constructor(...args: T[]) {
      this.first = null;
      this.last = null;
      this.size = 0;

      for (let i = 0; i < arguments.length; i++) {
        this.append(arguments[i]);
      }
    }

    /**
     * Get the node data at a specified index, zero based
     * ```ts
     * new LinkedList(1, 2, 3).get(0); // 1
     * ```
     * @param index to retrieve data at
     */
    public get(index: number): T | undefined {
      const node = this.getNode(index);
      return node !== undefined ? node.data : undefined;
    }

    /**
     * Get the node at index, zero based
     * ```ts
     * new LinkedList(1, 2, 3).getNode(0);
     * // { prev: null, data: 1, next: LinkedListNode }
     * ```
     */
    public getNode(index: number): LinkedListNode<T> | undefined {
      if (this.first === null || index < 0 || index >= this.length) { return undefined; }
      const asc = index < this.length / 2;
      const stopAt = asc ? index : this.length - index - 1;
      const nextNode = asc ? 'next' : 'prev';
      let currentNode = asc ? this.first : this.last;
      for (let currentIndex = 0; currentIndex < stopAt; currentIndex++) {
        currentNode = currentNode![nextNode];
      }
      return currentNode!;
    }

    /**
     * Return the first node and its index in the list that
     * satisfies the testing function
     * ```ts
     * new LinkedList(1, 2, 3).findNodeIndex(data => data === 1);
     * // { node: LinkedListNode, index: 0 }
     * ```
     * @param f A function to be applied to the data of each node
     */
    public findNodeIndex(f: TTestFunction<T>): ({
      node: LinkedListNode<T>,
      index: number,
    }) | undefined {
      let currentIndex = 0;
      let currentNode = this.first;
      while (currentNode) {
        if (f(currentNode.data, currentIndex, this)) {
          return {
            index: currentIndex,
            node: currentNode,
          };
        }
        currentNode = currentNode.next;
        currentIndex += 1;
      }
      return undefined;
    }

    /**
     * Returns the first node in the list that
     * satisfies the provided testing function. Otherwise undefined is returned.
     * ```ts
     * new LinkedList(1, 2, 3).findNode(data => data === 1);
     * // { prev: null, data: 1, next: LinkedListNode }
     * ```
     * @param f Function to test data against
     */
    public findNode(f: TTestFunction<T>): LinkedListNode<T> | undefined {
      const nodeIndex = this.findNodeIndex(f);
      return nodeIndex !== undefined ? nodeIndex.node : undefined;
    }

    /**
     * Returns the value of the first element in the list that
     * satisfies the provided testing function. Otherwise undefined is returned.
     * ```ts
     * new LinkedList(1, 2, 3).find(data => data === 1); // 1
     * ```
     * @param f Function to test data against
     */
    public find(f: TTestFunction<T>): T | undefined {
      const nodeIndex = this.findNodeIndex(f);
      return nodeIndex !== undefined ? nodeIndex.node.data : undefined;
    }

    /**
     * Returns the index of the first node in the list that
     * satisfies the provided testing function. Ohterwise -1 is returned.
     * ```ts
     * new LinkedList(1, 2, 3).findIndex(data => data === 3); // 2
     * ```
     * @param f Function to test data against
     */
    public findIndex(f: TTestFunction<T>): number {
      const nodeIndex = this.findNodeIndex(f);
      return nodeIndex !== undefined ? nodeIndex.index : -1;
    }

    /**
     * Append one or any number of nodes to the end of the list.
     * This modifies the list in place and returns the list itself
     * to make this method chainable.
     * ```ts
     * new LinkedList(1).append(2).append(3, 4); // 1 <=> 2 <=> 3 <=> 4
     * ```
     * @param data Data to be stored in the node, takes any number of arguments
     */
    public append(...args: T[]): LinkedList<T> {
      for (const data of args) {
        const node = new LinkedListNode(data, this.last, null, this);
        if (this.first === null) { this.first = node; }
        if (this.last !== null) { this.last.next = node; }
        this.last = node;
        this.size += 1;
      }
      return this;
    }

    /**
     * Synonym for append
     * ```ts
     * new LinkedList(1).push(2).push(3, 4); // 1 <=> 2 <=> 3 <=> 4
     * ```
     * @param data Data to be stored, takes any number of arguments
     */
    public push(...args: T[]): number {
      this.append(...args);
      return this.length;
    }

    /**
     * Prepend any number of data arguments to the list. The
     * argument list is prepended as a block to reduce confusion:
     * ```javascript
     * new LinkedList(3, 4).prepend(0, 1, 2); // [0, 1, 2, 3, 4]
     * ```
     * @param data Data to be stored in the node, accepts any number of arguments
     */
    public prepend(...args: T[]): LinkedList<T> {
      const reverseArgs = Array.from(args).reverse();
      for (const data of reverseArgs) {
        const node = new LinkedListNode(data, null, this.first, this);
        if (this.last === null) { this.last = node; }
        if (this.first !== null) { this.first.prev = node; }
        this.first = node;
        this.size += 1;
      }
      return this;
    }

    /**
     * Insert a new node at a given index position. If index is
     * out of bounds, the node is appended, if index is negative
     * or 0, it will be prepended.
     * ```ts
     * new LinkedList(1, 3).insertAt(1, 2); // 1 <=> 2 <=> 3
     * ```
     * @param index The index to insert the new node at
     * @param data Data to be stored on the new node
     */
    public insertAt(index: number, data: T): LinkedList<T> {
      if (this.first === null) { return this.append(data); }
      if (index <= 0) { return this.prepend(data); }

      let currentNode = this.first;
      let currentIndex = 0;
      while (currentIndex < index - 1 && currentNode.next !== null) {
        currentIndex += 1;
        currentNode = currentNode.next;
      }
      currentNode.insertAfter(data);
      return this;
    }

    /**
     * Remove the specified node from the list and return the removed
     * node afterwards.
     * ```ts
     * const list = new LinkedList(1, 2, 3);
     * list.removeNode(list.last); // { prev: null, data: 3, next: null, list: null }
     * ```
     * @param node The node to be removed
     */
    public removeNode(node: LinkedListNode<T>): LinkedListNode<T> {
      if (node.list !== this) {
        throw new ReferenceError('Node does not belong to this list');
      }

      if (node.prev !== null) {
        node.prev.next = node.next;
      }

      if (node.next !== null) {
        node.next.prev = node.prev;
      }

      if (this.first === node) {
        this.first = node.next;
      }

      if (this.last === node) {
        this.last = node.prev;
      }

      this.size -= 1;
      node.next = null;
      node.prev = null;
      node.list = null;
      return node;
    }

    /**
     * Remove the node at the specified index
     * ```ts
     * new LinkedList(1, 2, 3).removeAt(2); // { prev: null, data: 3, next: null, list: null }
     * ```
     * @param index Index at which to remove
     */
    public removeAt(index: number): LinkedListNode<T> | undefined {
      const node = this.getNode(index);
      return node !== undefined ? this.removeNode(node) : undefined;
    }

    /**
     * Insert a new node before the reference node
     * ```ts
     * const list = new LinkedList(1, 3);
     * list.insertBefore(list.last, 2); // 1 <=> 2 <=> 3
     * ```
     * @param referenceNode The node reference
     * @param data Data to save in the node
     */
    public insertBefore(
      referenceNode: LinkedListNode<T>,
      data: T,
    ): LinkedList<T> {
      const node = new LinkedListNode(data, referenceNode.prev, referenceNode, this);
      if (referenceNode.prev === null) { this.first = node; }
      if (referenceNode.prev !== null) { referenceNode.prev.next = node; }
      referenceNode.prev = node;
      this.size += 1;
      return this;
    }

    /**
     * Sorts the linked list using the provided compare function
     * @param compare A function used to compare the data of two nodes. It should return
     *                a boolean. True will insert a before b, false will insert b before a.
     *                (a, b) => a < b or (1, 2) => 1 < 2 === true, 2 will be inserted after 1,
     *                the sort order will be ascending.
     */
    public sort(compare: (a: T, b: T) => boolean): LinkedList<T> {
      if (this.first === null || this.last === null) { return this; }
      if (this.length < 2) { return this; }

      const quicksort = (
        start: LinkedListNode<T>,
        end: LinkedListNode<T>,
      ) => {
        if (start === end) {
          return;
        }
        const pivotData = end.data;
        let current: LinkedListNode<T> | null = start;
        let split: LinkedListNode<T> = start;
        while (current && current !== end) {
          const sort = compare(current.data, pivotData);
          if (sort) {
            if (current !== split) {
              const temp = split.data;
              split.data = current.data;
              current.data = temp;
            }
            split = split.next!;
          }
          current = current.next;
        }
        end.data = split.data;
        split.data = pivotData;

        if (start.next === end.prev) { return; }

        if (split.prev && split !== start) {
          quicksort(start, split.prev);
        }
        if (split.next && split !== end) {
          quicksort(split.next, end);
        }
      };

      quicksort(this.first, this.last);
      return this;
    }

    /**
     * Insert a new node after this one
     * ```ts
     * const list = new LinkedList(2, 3);
     * list.insertAfter(list.first, 1); // 1 <=> 2 <=> 3
     * ```
     * @param referenceNode The reference node
     * @param data Data to be saved in the node
     */
    public insertAfter(
      referenceNode: LinkedListNode<T>,
      data: T,
    ): LinkedList<T> {
      const node = new LinkedListNode(data, referenceNode, referenceNode.next, this);
      if (referenceNode.next === null) { this.last = node; }
      if (referenceNode.next !== null) { referenceNode.next.prev = node; }
      referenceNode.next = node;
      this.size += 1;
      return this;
    }

    /**
     * Remove the first node from the list and return the data of the removed node
     * or undefined
     * ```ts
     * new LinkedList(1, 2, 3).shift(); // 1
     * ```
     */
    public shift(): T | undefined {
      return this.removeFromAnyEnd(this.first);
    }

    /**
     * Remove the last node from the list and return the data of the removed node
     * or undefined if the list was empty
     * ```ts
     * new LinkedList(1, 2, 3).pop(); // 3
     * ```
     */
    public pop(): T | undefined {
      return this.removeFromAnyEnd(this.last);
    }

    /**
     * Merge the current list with another. Both lists will be
     * equal after merging.
     * ```ts
     * const list = new LinkedList(1, 2);
     * const otherList = new LinkedList(3);
     * list.merge(otherList);
     * (list === otherList); // true
     * ```
     * @param list The list to be merged
     */
    public merge(list: LinkedList<T>): void {
      if (this.last !== null) {
        this.last.next = list.first;
      }
      if (list.first !== null) {
        list.first.prev = this.last;
      }
      this.first = this.first || list.first;
      this.last = list.last || this.last;
      this.size += list.size;
      list.size = this.size;
      list.first = this.first;
      list.last = this.last;
    }

    /**
     * Removes all nodes from a list
     *
     * ```ts
     * list.clear();
     * ```
     */
    public clear() {
      this.first = null;
      this.last = null;
      this.size = 0;
      return this;
    }

    /**
     * The slice() method returns a shallow copy of a
     * portion of a list into a new list object selected
     * from start to end (end not included).
     * The original list will not be modified.
     * ```ts
     * const list = new LinkedList(1, 2, 3, 4, 5);
     * const newList = list.slice(0, 3); // 1 <=> 2 <=> 3
     * ```
     * @param start Start index
     * @param end End index, optional
     */
    public slice(start: number, end?: number): LinkedList<T | {}> {
      const list = new LinkedList<T>();
      let finish = end;

      if (this.first === null || this.last === null) { return list; }
      if (finish === undefined || finish < start) { finish = this.length; }

      let first: LinkedListNode<T> | null | undefined = this.getNode(start);
      for (let i = 0; i < finish - start && first !== null && first !== undefined; i++) {
        list.append(first.data);
        first = first.next;
      }
      return list;
    }

    /**
     * The reverse() function reverses the list in place and returns the list
     * itself.
     * ```ts
     * new LinkedList(1, 2, 3).reverse(); // 3 <=> 2 <=> 1
     * ```
     */
    public reverse(): LinkedList<T> {
      let currentNode = this.first;
      while (currentNode) {
        const next = currentNode.next;
        currentNode.next = currentNode.prev;
        currentNode.prev = next;
        currentNode = currentNode.prev;
      }
      const last = this.last;
      this.last = this.first;
      this.first = last;
      return this;
    }

    /**
     * The forEach() method executes a provided function once for each list node.
     * ```ts
     * new LinkedList(1, 2, 3).forEach(data => log(data)); // 1 2 3
     * ```
     * @param f Function to execute for each element, taking up to three arguments.
     * @param reverse Indicates if the list should be walked in reverse order, default is false
     */
    public forEach(f: TMapFunction<T>, reverse = false): void {
      let currentIndex = reverse ? this.length - 1 : 0;
      let currentNode = reverse ? this.last : this.first;
      const modifier = reverse ? -1 : 1;
      const nextNode = reverse ? 'prev' : 'next';
      while (currentNode) {
        f(currentNode.data, currentIndex, this);
        currentNode = currentNode[nextNode];
        currentIndex += modifier;
      }
    }

    /**
     * The map() method creates a new list with the results of
     * calling a provided function on every node in the calling list.
     * ```ts
     * new LinkedList(1, 2, 3).map(data => data + 10); // 11 <=> 12 <=> 13
     * ```
     * @param f Function that produces an node of the new list, taking up to three arguments
     * @param reverse Indicates if the list should be mapped in reverse order, default is false
     */
    public map(f: TMapFunction<T>, reverse = false): LinkedList<T | {}> {
      const list = new LinkedList<T>();
      this.forEach((data, index) => list.append(f(data, index, this)), reverse);
      return list;
    }

    /**
     * The filter() method creates a new list with all nodes
     * that pass the test implemented by the provided function.
     * ```ts
     * new LinkedList(1, 2, 3, 4, 5).filter(data => data < 4); // 1 <=> 2 <=> 3
     * ```
     * @param f Function to test each node data in the list. Return true to keep the node
     * @param reverse Indicates if the list should be filtered in reverse order, default is false
     */
    public filter(f: TTestFunction<T>, reverse = false): LinkedList<T | {}> {
      const list = new LinkedList<T>();
      this.forEach((data, index) => {
        if (f(data, index, this)) { list.append(data); }
      }, reverse);
      return list;
    }

    /**
     * Reduce over each node in the list
     * ```ts
     * new LinkedList(1, 2, 3).reduce(n => n += 1, 0); // 3
     * ```
     * @param f A reducer function
     * @param start An initial value
     * @returns The final state of the accumulator
     */
    public reduce(
      f: (
        accumulator: any,
        currentNode: T,
        index: number,
        list: LinkedList<T>,
      ) => any,
      start?: any,
      reverse = false,
    ): any {
      let currentIndex = reverse ? this.length - 1 : 0;
      const modifier = reverse ? -1 : 1;
      const nextNode = reverse ? 'prev' : 'next';
      let currentElement = reverse ? this.last : this.first;
      let result;

      if (start !== undefined) {
        result = start;
      } else if (currentElement) {
        result = currentElement.data;
        currentElement = currentElement[nextNode];
      } else {
        throw new TypeError('Reduce of empty LinkedList with no initial value');
      }

      while (currentElement) {
        result = f(result, currentElement.data, currentIndex, this);
        currentIndex += modifier;
        currentElement = currentElement[nextNode];
      }

      return result;
    }

    /**
     * Convert the linked list to an array
     * ```ts
     * new LinkedList(1, 2, 3).toArray(); // [1, 2, 3]
     * ```
     */
    public toArray(): T[] {
      return [...this];
    }

    /**
     * Convert a linked list to string
     * ```ts
     * new LinkedList('one', 'two', 'three').toString(' <=> ') === 'one <=> two <=> three';
     * ```
     * @param separator Optional string to be placed in between data nodes, default is one space
     */
    public toString(separator = ' '): string {
      return this.reduce((s, data) => `${s}${separator}${data}`);
    }

    /**
     * The iterator implementation
     * ```ts
     * const list = new LinkedList(1, 2, 3);
     * for (const data of list) { log(data); } // 1 2 3
     * ```
     */
    public *[Symbol.iterator](): IterableIterator<T> {
      let element = this.first;

      while (element !== null) {
        yield element.data;
        element = element.next;
      }
    }

    /** Private helper function to reduce duplication of pop() and shift() methods */
    private removeFromAnyEnd(node: LinkedListNode<T> | null) {
      return node !== null ? this.removeNode(node).data : undefined;
    }
  }

