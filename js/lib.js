// Dane Miller, 01/20/2022
// Host this .js file on GitHub.

// Format money with commas (text field)
// Run inside the afterLoad() block
function initMoneyCommas() {
    function registerMoneyCommas() {
    	[].forEach.call(document.querySelectorAll('input[data-bind]'), function(element) {
			if (element.getAttribute('data-bind').includes("money") && !element.getAttribute('sd-money-listener')) {
				console.log(element.getAttribute('id') + '==' + element.getAttribute('data-bind'));
    			element.addEventListener('change', function() { triggerMoneyCommas(this); }, false);
				element.setAttribute('sd-money-listener', 'yes');
    		}
    	});
    }
    function triggerMoneyCommas(elem) {
    	formatMoneyCommas(elem);
    	[].forEach.call(document.querySelectorAll('input[data-bind]'), function(element) {
    		if (element.getAttribute('data-bind').includes("money") && element.getAttribute('data-bind').includes("calculate")) {
    			formatMoneyCommas(element);
    		}
    	});
    }
    function formatMoneyCommas(elem) {
    	var val = elem.value;
    	var parts = val.toString().split(".");
    	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	elem.value = parts.join(".");
    }
    [].forEach.call(document.querySelectorAll('button'), function(element) {
    	console.log(element.getAttribute('id') + '==' + element.getAttribute('data-bind') && !element.getAttribute('sd-money-listener'));
    	element.addEventListener('click', function() { registerMoneyCommas(); }, false);
		element.setAttribute('sd-money-listener', 'yes');
    });
    registerMoneyCommas();
}

// Format email address as ___@ksu.edu (text field)
// Run inside the afterLoad() block
function initEmailKSU() {
	function registerEmailKSU() {
		[].forEach.call(document.querySelectorAll('.maskemail'), function(element) {
			if (!element.getAttribute('sd-email-listener')) {
				element.addEventListener('change', function() { formatEmailKSU(this); }, false);
			}
		});
	}
	function formatEmailKSU(elem) {
		var val = elem.value;
		if (val == null || val.toString() == "") { return; }
		var parts = val.toString().split('@');
		if (parts.length == 1 || parts[1].toString() == 'k-state.edu') {
			elem.value = parts[0] + "@ksu.edu";
		}
	}
	[].forEach.call(document.querySelectorAll('button'), function(element) {
		if (!element.getAttribute('sd-email-listener')) {
			console.log(element.getAttribute('id') + '==' + element.getAttribute('data-bind'));
			element.addEventListener('click', function() { registerEmailKSU(); }, false);
			element.setAttribute('sd-email-listener', 'yes');
		}
	});
	registerEmailKSU();
}

// Return unique text array
function uniqueTxtArray(txtArray) {
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}
	var unique = txtArray.filter(onlyUnique);
	return unique;
}

// Return unique object array
// Also works for a text array
function uniqueObjArray(arr) {
	var a = [];
	var unique = [];
	for (i = 0; i < arr.length; i++) {
		var v = JSON.stringify(arr[i]);
		if (a.indexOf(v) == -1) {
			a.push(v);
			var o = arr[i];
			unique.push(o);
		}
	}
	return unique;
}

// Prevents form suggestion
// Run inside the afterLoad() block
function disableAutocomplete() {
	$( document ).on( 'focus', 'input', function(){ 
		$( this ).attr( 'autocomplete', 'chrome-off' ); 
	});
}

// Shows a loading message that will disappear when the default values finish loading.
// Run showFormLoadingMessage(true); in vm.viewmodel().
// Run showFormLoadingMessage(false); at the end of vm.setDefaults().
function showFormLoadingMessage(boolEnable) {
	if (boolEnable == true) {
		if (document.getElementById("softdocsLoadingBar")) {
		   $( '#softdocsLoadingBar' ).css('display', '');
		} else {
			$( 'body' ).prepend('<div id="softdocsLoadingBar" style="display: block; position: fixed; width: 50%; text-align: center; margin: 25% 25% 25% 25%; background: white; z-index: 999; font-size: 26px; font-weight: bold; padding: 20px; border: 4px solid black;">Loading form, please wait...</div>');
		}
	} else {
		$( '#softdocsLoadingBar' ).css('display', 'none');
	}
}
