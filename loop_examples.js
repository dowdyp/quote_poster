

var a = ['a', 'b', 'c'];


// vanilla js
// be SURE you download this library for this to work: http://vanilla-js.com/ (it's a joke, but i think a funny one)
var b = [];
for(var i = 0; i < a.length; i++){
	b.push(a[i]);
}
console.log(b);



// jQuery
var c = [];
$.each(a, function(index, value){
	c.push(value);
})
console.log(c);



// angular
var d = [];
angular.forEach(
	a, 
	function(value, index){
		this.push(value);
	},
	d
)
console.log(d);