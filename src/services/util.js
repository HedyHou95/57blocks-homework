function Util() {

}

/**
 * Function random
 *
 * get random number
 *
 * @param Number max
 * @param Number min
 *
 * @return Number
 */

Util.prototype.random = function(max,min=0) {
	let randomNumber = Math.random() * max + min;
	return randomNumber;
}

/**
 * Function isPropsChanged
 *
 * to check if any difference between two objects
 *
 * @param { Object } obj1
 * @param { Object } obj2
 *
 * @return { Boolean }
 */
Util.prototype.isPropsChanged = function(obj1, obj2){
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

export default new Util();