var OnigRegExp;
(function(){

	OnigRegExp = class_create({
		constructor (pattern) {
			this.source = pattern;
			this.rgx = new Regex(pattern);
			this.cache = {};
		},
		search (input, index, cb) {
			var arr = this.searchSync(input, index);
			cb(null, arr);
		},
		searchSync (input, index) {
			if (isNaN(index)) {
				index = 0;
			}

			var result = this.getCached(input, index);
			if (result !== void 0)
				return result;


			this.rgx.lastIndex = index;
			var match = this.rgx.match(input);
			if (match == null) {
				this.addCached(input, index, null);
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
			this.addCached(input, index, result);
			return result;
		},

		getCached (input, index) {
			var cache = this.cache[input];
			if (cache == null) {
				return void 0;
			}
			
			var imax = cache.length,
				i = imax;
			while(--i > -1) {
				var item = cache[i];				
				if (index >= item.start && index <= item.end) {						
					return item.result;
				}
			}
			
			return void 0;
		},

		addCached (input, index, result) {
			var cache = this.cache[input];
			if (cache == null)
				cache = this.cache[input] = [];

			cache.push({
				start: index,
				end: result == null ? input.length : result[0].start,
				result: result
			});
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
		if (x == null || x.value == null)  {
			return {
				index: index,
				start: 0,
				end: 0,
				match: '',
				length: 0
			};
		}
		var value = x.value || '';
		return {
			index: index,
			match: value,
			start: x.index,
			end: value.length + x.index,
			length: value.length
		};
	}

}());
