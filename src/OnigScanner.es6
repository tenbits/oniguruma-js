var OnigScanner;
(function(){
	OnigScanner = class_create({
		regexs: null,
		constructor (patterns) {
			var imax = patterns.length,
				i = -1;
			this.regexs = new Array(imax);
			while (++i < imax) {
				this.regexs[i] = new OnigRegExp(patterns[i]);
			}
		},
		findNextMatch (input, index, cb) {
			var match = this.findNextMatchSync(input, index);
			cb(null, match);
		},
		findNextMatchSync (input, index = 0) {
			var imax = this.regexs.length,
				i = -1, best, bestIndex;
			while (++i < imax) {
				var match = this.regexs[i].searchSync(input, index);
				if (match == null) {
					continue;
				}
				if (best == null) {
					best = match;
					bestIndex = i;
				}
				if (match[0].start === index) {
					best = match;
					bestIndex = i;
					break;
				}
				if (match != best && match[0].start < best[0].start) {
					best = match;
					bestIndex = i;
				}
			}
			if (best == null) {
				return null;
			}

			return {
				index: bestIndex,
				captureIndices: best,
				scanner: this
			};
		}
	})
}());