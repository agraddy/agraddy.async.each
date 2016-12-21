var tap = require('agraddy.test.tap')(__filename);

var each = require('../');

var list = ['one', 'two', 'three'];
var output = [];

var i = 0;
each(list, function(item, cb) {
	i++;
	output.push(item + i);
	cb();
}, function(err, two, three) {
	console.log('finished');
	tap.assert.equal(output.length, 3, 'Should push each list item.');
	tap.assert.equal(output[0], 'one1', 'Should run the function.');
	tap.assert.equal(output[1], 'two2', 'Should run the function.');
	tap.assert.equal(output[2], 'three3', 'Should run the function.');
});

var j = 0;
each(list, function(item, cb) {
	j++;
	if(j == 2) {
		console.log('throw error');
		cb(new Error('End early'));
	} else {
		cb();
	}
}, function(err) {
	console.log('finished');
	tap.assert.equal(err.message, 'End early', 'An error should short circuit.');
});

var k;
var list2 = [];
var order;
for(k = 0; k < 100; k++) {
	list2.push(k);
}

order = 'before';
each(list2, function(item, cb) {
	cb();
}, function(err) {
	tap.assert.equal(order, 'after', 'Make sure it is actually async.');
});
order = 'after';




