import type { IObject } from './typescript/interfaces';
/**
 * Create a DataBit class.
 * @class
 * @param {Array<Object>} [flags] - The list of flags.
 * @param {Bits} [bits = 0] - Actual flags of data manager.
 */
declare class DataBit {
    /**
 * Return the flags of member as a number.
 * @type {number} Return the bits of the flags of data manager.
 */
    bits: bigint;
    /**
 * Return the flags of member as a number.
 * @type {Array<IObject>} All data of manager.
 */
    private data;
    constructor(data: Array<IObject>, bits?: bigint);
    /**
     * The default flag.
     * @type {number} The default flag as a bit.
     */
    get default(): number;
    /**
     * Return all flags as a integer.
     * @type {number} The bits flags.
     */
    get MAX(): string;
    /**
     * Get the value of the flag required.
     * @param {string|number|Array<string|number>} flags The flag(s).
     * @returns {number} The value of flag(s) as a number.
     */
    find(data: string | number | Array<string | number>): IObject;
    /**
     * Return the flags of data manager as an array
     * @returns {Array<string>} An array of flags as a string.
     */
    toArray(): Array<string>;
    /**
     * The data as a string.
     * @returns {string} A string representation of data separated by `, `.
     */
    toString(): string;
    /**
     * Calcul the bits of data
     * @returns {Array}
     */
    private calculate;
    /**
     * Check if the data manager have flag.
     * @returns {boolean} true if the data manager has flag
     */
    hasAnyflag(): boolean;
    /**
     * Check if the data manager has a specific bit.
     * @param {Array<string>|String|Number} [flag] The flag required.
     * @returns {boolean} Return true if data manager has the specified flag.
     */
    has(flag: any): boolean;
    /**
     * Check if the data manager have specified flags.
     * @param {string|Array<string|number>|number} dataMissingList The flags list.
     * @returns {null|flags} Return null if data manager have all flags or the missings flags.
     */
    missing(dataMissingList: (string | string[] | number)): string | number | string[];
    /**
     *
     * @param {string|number|Array<string|number>} flagsother The flag(s) to compare.
     * @returns {boolean} true if the flags specified are the same of data manager and false otherwise.
     */
    equals(other: string | number | Array<string | number>): Array<string | bigint> | boolean;
    /**
     * Add all flags to the data manager.
     * @returns {number} the new flags bits.
     */
    addAllFlags(): string;
    /**
     * Add a flag to a data manager.
     * @param {string|Array<string>|number} flagToAdd The new flag for data manager.
     * @returns {number} the new bits of flags.
     */
    add(flagToAdd: (string | string[] | number)): (string | TypeError | boolean);
    /**
     * Remove all flags of the data manager.
     * @returns {number} the new bits of flags.
     */
    removeAllFlags(): string;
    /**
     * Remove a flag to data manager.
     * @param {string|Array<string>|number} flagToAdd The flag to remove for data manager.
     * @returns {number} the new bits of flags.
     */
    remove(flagToRemove: (string | string[] | number)): (string | TypeError | boolean);
}
export { DataBit };
