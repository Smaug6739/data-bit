import type { IObject } from './typescript/interfaces';

/**
 * Create a DataBit class.
 * @class 
 * @param {Array<Object>} [flags] - The list of flags.
 * @param {Bits} [bits = 0] - Actual flags of data manager.
 */
class DataBit {
	/**
 * Return the flags of member as a number.
 * @type {number} Return the bits of the flags of data manager.
 */
	public bits: bigint = 0n; // data manager bits flags
	/**
 * Return the flags of member as a number.
 * @type {Array<IObject>} All data of manager.
 */
	private data: Array<IObject>;
	constructor(data: Array<IObject>, bits?: bigint) {
		if (!data) throw new TypeError("Data must be specified.")
		if (bits) this.bits = BigInt(bits);
		const permsArray: Array<IObject> = [];
		data.forEach((p, i) => {
			permsArray.push({
				name: p,
				value: BigInt(1 << i)
			})
		})
		this.data = permsArray;
	}
	/**
	 * The default flag.
	 * @type {number} The default flag as a bit.
	 */

	get default() {
		return 0
	}
	/**
	 * Return all flags as a integer.
	 * @type {number} The bits flags.
	 */

	get MAX() {
		let bit = BigInt(0);
		for (let flag of this.data) {
			bit += flag.value
		}
		return bit.toString()
	}


	/**
	 * Get the value of the flag required.
	 * @param {string|number|Array<string|number>} flags The flag(s).
	 * @returns {number} The value of flag(s) as a number.
	 */
	public find(data: string | number | Array<string | number>) {
		if (typeof data === 'string' || typeof data === 'number') {
			const flag = this.data.find(f => f.name === data.toString() || f.value === data);
			return flag ? flag : undefined;
		}
		if (Array.isArray(data)) {
			let result: Array<IObject> = [];
			data.map(p => {
				const flag = this.data.find(perm => perm.name === p.toString() || perm.value === p)
				if (flag) result.push(flag);
			})
			return result
		}
	}

	/**
	 * Return the flags of data manager as an array
	 * @returns {Array<string>} An array of flags as a string.
	 */
	public toArray(): Array<string> {

		let requestedData: string[] = []
		for (const data of this.data) {
			if (this.bits & data.value) requestedData.push(data.name)
		}
		return requestedData
	}

	/**
	 * The data as a string.
	 * @returns {string} A string representation of data separated by `, `.
	 */
	public toString(): string {
		return this.toArray().join(', ')
	}
	/**
	 * Calcul the bits of data
	 * @returns {Array}
	 */
	private calculate() {
		let bits = this.bits;
		const flags = [...this.data].reverse()
		const requestedBits: any[] = []
		for (const data of flags) {
			const rest = bits % data.value;
			if (rest == 0n && bits != 0n) {
				requestedBits.push(data);
				break;
			}
			if (rest < bits) {
				requestedBits.push(data);
				bits = rest
			}
		}
		return requestedBits
	}
	/**
	 * Check if the data manager have flag.
	 * @returns {boolean} true if the data manager has flag
	 */
	public hasAnyflag(): boolean {
		if (this.bits > 0) return true;
		return false;
	}

	/**
	 * Check if the data manager has a specific bit.
	 * @param {Array<string>|String|Number} [flag] The flag required.
	 * @returns {boolean} Return true if data manager has the specified flag.
	 */
	public has(flag: any): boolean {
		if (Array.isArray(flag)) return flag.every(p => this.has(p))
		const dataArray = this.toArray();
		if (dataArray.includes('ADMINISTRATOR')) return true;
		if (typeof flag === 'string') {
			if (dataArray.includes(flag)) return true;
			else return false;
		}
		if (typeof flag === 'number') {
			let hasflags = false;
			this.calculate().map(p => {
				if (p.value === flag) hasflags = true;
			})
			return hasflags;
		}
		return false
	}

	/**
	 * Check if the data manager have specified flags.
	 * @param {string|Array<string|number>|number} dataMissingList The flags list.
	 * @returns {null|flags} Return null if data manager have all flags or the missings flags.
	 */
	public missing(dataMissingList: (string | string[] | number)) {
		if (Array.isArray(dataMissingList)) dataMissingList.every(pl => this.missing(pl));
		if (!this.has(dataMissingList)) return dataMissingList;
		return null;
	}

	/**
	 * 
	 * @param {string|number|Array<string|number>} flagsother The flag(s) to compare.
	 * @returns {boolean} true if the flags specified are the same of data manager and false otherwise.
	 */
	public equals(other: string | number | Array<string | number>): Array<string | bigint> | boolean {
		let total = 0;
		if (Array.isArray(other)) {
			let total = 0n;
			other.forEach(pl => {
				const flag = this.find(pl);
				console.log(flag);

				if (flag) total += flag.value;
			})


			if (total === BigInt(this.bits)) return true;
			return false
		}
		if (typeof other === 'string') {
			if (this.toArray().join(' ') === other) return true;
		}
		if (typeof other === 'number') {
			if (this.bits == BigInt(other)) return true;
		}
		if (BigInt(total) === this.bits) return true;
		return false;
	}

	/**
	 * Add all flags to the data manager.
	 * @returns {number} the new flags bits.
	 */
	public addAllFlags() {
		this.bits = BigInt(this.MAX);
		return this.bits.toString()
	}

	/**
	 * Add a flag to a data manager.
	 * @param {string|Array<string>|number} flagToAdd The new flag for data manager.
	 * @returns {number} the new bits of flags.
	 */
	public add(flagToAdd: (string | string[] | number)): (string | TypeError | boolean) {
		const type = typeof flagToAdd

		if (Array.isArray(flagToAdd)) return flagToAdd.every(pta => this.add(pta));
		if (type === 'string') {
			const flag = this.data.find(p => p.name === flagToAdd)

			const has: any = this.calculate().filter(p => p.name === flag?.name);
			if (has && has.length) return this.bits.toString();
			if (!flag) throw new TypeError('flag does not exist.');
			this.bits += flag.value;

			return this.bits.toString();
		}
		if (type === 'number') {
			const flag = this.data.find(p => p.value === flagToAdd);
			const has: any = this.calculate().filter(p => p.value === flag?.value);
			if (has || !has.length) return this.bits.toString();
			if (!flag) throw new TypeError('The flag does not exist.');
			this.bits += flag.value;
			return this.bits.toString();
		}
		return new TypeError('The flag must be a string, an array or a number.');
	}

	/**
	 * Remove all flags of the data manager.
	 * @returns {number} the new bits of flags.
	 */
	public removeAllFlags() {
		this.bits = 0n;
		return this.bits.toString()
	}

	/**
	 * Remove a flag to data manager.
	 * @param {string|Array<string>|number} flagToAdd The flag to remove for data manager.
	 * @returns {number} the new bits of flags.
	 */
	public remove(flagToRemove: (string | string[] | number)): (string | TypeError | boolean) {
		const type = typeof flagToRemove
		if (Array.isArray(flagToRemove)) return flagToRemove.every(pta => this.remove(pta));
		if (type === 'string') {
			const flag = this.data.find(p => p.name === flagToRemove);
			const has: any = this.calculate().filter(p => p.name === flag?.name);
			if (!has || !has.length) return this.bits.toString();
			if (!flag) return new TypeError('The flag does not exist.');
			this.bits -= flag.value;
			return this.bits.toString();
		}
		if (type === 'number') {
			const flag = this.data.find(p => p.value === flagToRemove);
			const has: any = this.calculate().filter(p => p.value === flag?.value);
			if (!has || !has.length) return this.bits.toString();
			if (!flag) return new TypeError('The flag does not exist.');
			this.bits -= flag.value;
			return this.bits.toString();
		}
		return new TypeError('The flag must be a string, an array or a number.')
	}
}

export { DataBit };