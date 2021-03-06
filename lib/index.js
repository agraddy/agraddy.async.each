require('setimmediate');

var mod;

mod = function(list, fn, cb) {
	var index = 0;
	var finish = cb;

	function loop() {
		if(fn.length == 3) {
			fn(list[index], index, function(err) {
				index++;

				if(err) {
					setImmediate(function() {
						//console.log('err');
						cb(err);
					});
				} else {
					if(index < list.length) {
						setImmediate(function() {
							loop();
						});
					} else {
						setImmediate(function() {
							cb();
						});
					}
				}
			});
		} else {
			fn(list[index], function(err) {
				index++;

				if(err) {
					setImmediate(function() {
						//console.log('err');
						cb(err);
					});
				} else {
					if(index < list.length) {
						setImmediate(function() {
							loop();
						});
					} else {
						setImmediate(function() {
							cb();
						});
					}
				}
			});
		}
	}

	if(Array.isArray(list) && list.length) {
		loop();
	} else {
		setImmediate(function() {
			cb();
		});
	}
}

module.exports = mod;
