// const DUMMY = [
// 	{
// 		"packageName": "module-1",
// 		"size": 200,
// 		"children": [
// 			{
// 				"packageName": "part-1",
// 				"size": 50,
// 				"children": [],
// 			},
// 			{
// 				"packageName": "part-2",
// 				"size": 60,
// 				"children": [],
// 			},
// 			{
// 				"packageName": "part-3",
// 				"size": 40,
// 				"children": [
// 					{
// 						"packageName": "nested",
// 						"size": 30,
// 						"children": [],
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		"packageName": "module-2",
// 		"size": 200,
// 		"children": [
// 			{
// 				"packageName": "part-1",
// 				"size": 50,
// 				"children": [],
// 			},
// 		],
// 	},
// ];

// describe('summarise', () => {
// 	let size_tree;
// 	let summerise;
// 	let result;

// 	before(() => {
// 		clearModule('webpack-bundle-size-analyzer/build/src/size_tree');

// 		size_tree = require('webpack-bundle-size-analyzer/build/src/size_tree')
// 		size_tree.dependencySizeTree = () => DUMMY;
// 		summerise = require('.');
// 		result = summerise();
// 	});
// 	after(() => clearModule('webpack-bundle-size-analyzer/build/src/size_tree'));

// 	it('Should calculate percentages', () => {
// 		const module1 = result['module-1'];
// 		expect(module1['part-1'].percent).to.equal(25);
// 		expect(module1['part-2'].percent).to.equal(30);
// 		expect(module1['part-3'].percent).to.equal(20);
// 	});
// 	it('Should apply the remainder of bytes to self', () => {
// 		const _self = result['module-1']['self'];
// 		expect(_self.size).to.equal(50);
// 		expect(_self.percent).to.equal(25);
// 	});
// 	it('Should drop nested children data', () => {
// 		expect(result['module-1']['part-3']).to.have.all.keys(['size', 'percent']);
// 	});
// 	it('Should add total size as a non enumerable property', () => {
// 		const module1 = result['module-1'];
// 		console.log(module1);
// 		expect(module1.__TOTAL_SIZE__).to.be.a('number');
// 	});
// 	it('Should summarise multiple modules', () => {
// 		expect(result).to.have.all.keys(['module-1', 'module-2']);
// 	});
// });
