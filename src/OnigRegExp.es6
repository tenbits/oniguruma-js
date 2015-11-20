var OnigRegExp;
(function(){

	OnigRegExp = class_create({
		constructor (pattern) {
			this.rgx = new Regex(pattern);
		},
		search (input, index, cb) {
			var arr = this.searchSync(input, index);
			cb(null, arr);
		},
		searchSync (input, index) {
			if (isNaN(index)) {
				index = 0;
			}
			this.rgx.lastIndex = index;
			var match = this.rgx.match(input);
			if (match == null) {
				return null;
			}
			var groups = match.groups,
				imax = groups.length,
				i = -1,
				result = new Array(imax + 1);

			result[0] = createMatch(match, 0);
			while( ++i < imax ) {
				result[i + 1] = createMatch(groups[i], i + 1);
			}
			return result;
		},

		test (input, index, cb) {
			var matched = this.testSync(input, index);
			cb(null, matched);
		},
		testSync (input, index = 0) {
			return this.searchSync(input, index) != 0;
		}
	});

	function createMatch(x, index) {
		return {
			index: index,
			match: x.value,
			start: x.index,
			end: x.value.length + x.index,
			length: x.value.length
		};
	}

}());
