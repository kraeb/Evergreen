function grabCharCode( evt ) {
	evt = (evt) ? evt : ((window.event) ? event : null); /* for mozilla and IE */
	if( evt ) {
		return (evt.charCode ? evt.charCode : 
			((evt.which) ? evt.which : evt.keyCode ));
	} else { 
		return -1;
	}
}

var orgTree = null;
function grabOrgTree() {

	if( orgTree == null ) {
		debug("Grabbing orgTree");

		/* go ahead and grab the org tree asynchrously. */
		var request = new RemoteRequest( "open-ils.search", 
			"open-ils.search.actor.org_tree.retrieve" );
		var func = function(req) {
			orgTree = req.getResultObject();
			debug("orgTree Loaded!");
		}

		request.setCompleteCallback(func);
		request.send();
	}
}


var reg = /Mozilla/;
var ismoz = false;
if(reg.exec(navigator.userAgent)) 
	ismoz = true;

var DEBUG = true;

function debug(message) {
	if(DEBUG) {
		try {
			dump(" -|*|- Debug: " + message + "\n" );
		} catch(E) {}
	}
}

/* finds or builds the requested row id, adding any intermediate rows along the way */
function table_row_find_or_create( table, index ) {

	if(table == null || index == null || index < 0 || index > 10000 ) {
		throw "table_row_find_or_create with invalid " +
			"params.  table: " + table + " index: " + index + "\n";
	}

	if(table.rows[index] != null)
		return table.rows[index];

	for( var x = 0; x!= index; x++ ) {
		if(table.rows[x] == null) {
			//var row = document.createElement("tr");
			//table.childNodes[x] = row;
			//table.rows[x] = row;
			table.insertRow(x);
		}
	}

	//var row = document.createElement("tr");
	//table.childNodes[index] = row;
	//table.rows[index] = row;
	//return row;
	return table.insertRow(index);
}

/* finds or builds the requested cell,  adding any intermediate cells along the way */
function table_cell_find_or_create( row, index ) {

	if(row == null || index == null || index < 0 || index > 10000 ) {
		throw "table_cell_find_or_create with invalid " +
			"params.  row: " + row + " index: " + index + "\n";
	}

	if(row.cells[index] != null)
		return row.cells[index];

	for( var x = 0; x!= index; x++ ) {
		if(row.cells[x] == null) 
			row.insertCell(x);
	}

	return row.insertCell(index);
}
	


// -----------------------------------------------------------------------
// Generic cookie libarary copied from 
// http://webreference.com/js/column8/functions.html
// -----------------------------------------------------------------------

/*
	name - name of the cookie
   value - value of the cookie
   [expires] - expiration date of the cookie
   (defaults to end of current session)
   [path] - path for which the cookie is valid
   (defaults to path of calling document)
   [domain] - domain for which the cookie is valid
   (defaults to domain of calling document)
	[secure] - Boolean value indicating if the cookie transmission requires
	a secure transmission
   * an argument defaults when it is assigned null as a placeholder
   * a null placeholder is not required for trailing omitted arguments
	*/

function setCookie(name, value, expires, path, domain, secure) {
	var curCookie = name + "=" + escape(value) +
   ((expires) ? "; expires=" + expires.toGMTString() : "") +
   ((path) ? "; path=" + path : "") +
   ((domain) ? "; domain=" + domain : "") +
   ((secure) ? "; secure" : "");
	document.cookie = curCookie;
}


/*
	name - name of the desired cookie
   return string containing value of specified cookie or null
   if cookie does not exist
*/

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
	   if (begin != 0) return null;
	} else {
	    begin += 2;
	}

	var end = document.cookie.indexOf(";", begin);
   if (end == -1) end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}


/*
	name - name of the cookie
	[path] - path of the cookie (must be same as path used to create cookie)
	[domain] - domain of the cookie (must be same as domain used to
   create cookie)
   path and domain default if assigned null or omitted if no explicit
   argument proceeds
*/

function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

// date - any instance of the Date object
// * hand all instances of the Date object to this function for "repairs"

function fixDate(date) {
	var base = new Date(0);
	var skew = base.getTime();
	if (skew > 0)
		date.setTime(date.getTime() - skew);
}

// -----------------------------------------------------------------------

function ProgressBar( div_id, color, interval ) {

	alert("hello");
	this.progressEnd			= 9;				

	if( color != null)
		this.progressColor		= color;
	else 
		this.progressColor		= 'blue';	

	if(interval != null)
		this.progressInterval	= interval;
	else
		this.progressInterval	= 200;	

	this.progressAt = progressEnd;
	this.progressTimer;

	var location = document.getElementById(div_id);
	location.innerHTML = "";
	for( var x = 0; x!= this.progressEnd; x++ ) {
		location.innerHTML += "<span id='progress" + x + "'>Here&nbsp;</span>";
	}
}

ProgressBar.prototype.progressStart = function() {
	alert("hello");
	this.progressUpdate();
}

ProgressBar.prototype.progressClear = function() {
	for (var i = 1; i <= this.progressEnd; i++) 
		document.getElementById('progress'+i).style.backgroundColor = 'transparent';
	progressAt = 0;
}

ProgressBar.prototype.progressUpdate = function() {
	this.progressAt++;
	if (this.progressAt > this.progressEnd) 
		this.progressClear();
	else 
		document.getElementById('progress'+progressAt).style.backgroundColor = this.progressColor;
	this.progressTimer = setTimeout('progressUpdate()',this.progressInterval);
}

ProgressBar.prototype.progressStop = function() {
	this.clearTimeout(this.progressTimer);
	this.progressClear();
}

//progressUpdate();		// start progress bar


function add_css_class(w,c) {
	var e;
	if (typeof(w) == 'object') {
		e = w;
	} else {
		e = document.getElementById(w);
	}
	var css_class_string = e.className;
	var css_class_array;

	if(css_class_string)
		css_class_array = css_class_string.split(/\s+/);

	var string_ip = ""; /*strip out nulls*/
	for (var css_class in css_class_array) {
		if (css_class_array[css_class] == c) { return; }
		if(css_class_array[css_class] !=null)
			string_ip += css_class_array[css_class] + " ";
	}
	string_ip = string_ip + c;
	e.className = string_ip;
}

function remove_css_class(w,c) {
	var e;
	if(w==null)
		return;

	debug("css: " + typeof(w))

	if (typeof(w) == 'object') {
		e = w;
	} else {
		e = document.getElementById(w);
	}
	var css_class_string = '';

	var css_class_array = e.className;
	if( css_class_array )
		css_class_array = css_class_array.split(/\s+/);

	var first = 1;
	for (var css_class in css_class_array) {
		if (css_class_array[css_class] != c) {
			if (first == 1) {
				css_class_string = css_class_array[css_class];
				first = 0;
			} else {
				css_class_string = css_class_string + ' ' +
					css_class_array[css_class];
			}
		}
	}
	e.className = css_class_string;
}




/* takes an array of the form [ key, value, key, value, ..] and 
	redirects the page to the current host/path plus the key
	value pairs provided 
	*/
function url_redirect(key_value_array) {

	if( key_value_array == null || 
			(key_value_array.length %2))  {
		throw new EXArg( 
				"AdvancedSearchPage.redirect has invalid args" );
	}

	//var fullpath = globalRootURL + globalRootPath;
	var fullpath = "";
	var x = 0;

	for( var x = 0; x!= key_value_array.length; x++ ) {
		if( x == 0 )
			fullpath += "?" + encodeURIComponent(key_value_array[x]);
		else {
			if((x%2) == 0)
				fullpath += "&" + encodeURIComponent(key_value_array[x]);
			if((x%2) != 0)
				fullpath += "=" + encodeURIComponent(key_value_array[x]);
		}
	}

	debug("Redirecting to " + fullpath );
	location.href = fullpath;

}
	
