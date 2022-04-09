
const tagAPI = {
	sortBy(attr, rev) {
		if (rev == undefined) { rev = 1 } else { (rev) ? 1 : -1; }
		return (a, b) => {
			a = a[attr];
			b = b[attr];
			if (a < b) { return rev * -1 }
			if (a > b) { return rev * 1 }
			return 0;
		}
	}
}

export default tagAPI