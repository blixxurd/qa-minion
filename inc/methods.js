module.exports = (function($) {
	return {
		stripTags: function(str) {
			return String(str).replace(/<\/?[^>]+(>|$)/g, '');
		},
		findElem: function(element, attribute, output) {
			//////// ADD ELEMENT DOM WALK OUTPUT SO DEVS CAN FIND THE EXCEPTIONS & FIX THEM
			$(element).each(function() {
				if ($(this).attr(attribute) != ('' || null)) {
					switch (typeof output) {
						case 'number':
							output++;
							break;
						default:
							output = true;
					}
				} else {
					switch (typeof output) {
						case 'number':
							output++;
							break;
						default:
							output = false;
					}
				}
			});
			return output;
		}
	};
});