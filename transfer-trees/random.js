
function compute(form){
E =14;  //total number of input spaces
var NX = 0;
var SUMN = 0.0;
var SUMX = 0.0;
var SUMY = 0.0;
var meanp = 0.0;
var varp = 0.0;
var DF = 0.0;

  // calculate sum of presenting values of "X" and their count
    for(i = 0; i <= 13; i++)
    {
		if((form.elements[i].value != null) && (!isNaN(parseFloat(form.elements[i].value)))) {
			SUMN += ((form.elements[i].value) *1);
			NX++;
			}
		if((form.elements[i].value != null) && (!isNaN(parseFloat(form.elements[i+14].value)))) {
SUMX += ((form.elements[i+14].value)*(form.elements[i].value));
			}
		if((form.elements[i].value != null) &&  (!isNaN(parseFloat(form.elements[i+28].value))))  {
SUMY += (form.elements[i+28].value)*((form.elements[i].value)-1);
			}
    }

//check for insufficient data
		if(NX<=1) {
        	alert("Insufficient data."); }
		else {
 //"else" statement for this "if" is at the end of code with alert error.

				meanp = SUMX / SUMN;
		//truncating the number
				var MX1 = Math.round(10000000*meanp);
				var MX2 = MX1/10000000;
				form.MEAN_X.value = MX2;
				var varp = SUMY/(SUMN - NX);
		 //truncating the number
				var MY1 = Math.round(10000000*varp);
				var MY2 = MY1/10000000;
				form.MEAN_Y.value = MY2;
			} //closing for sufficiency data check
	 }

<!-- done hiding from old browsers -->
