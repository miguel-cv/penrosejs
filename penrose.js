/*
 * 
 * // create a complex number from polar coordinates
console.log('create complex numbers with polar coordinates');
var c = math.complex({r: math.sqrt(2), phi: math.pi / 4});
print(c);                      // 1 + i

// get polar coordinates of a complex number
var d = math.complex(3, 4);
console.log(d.toPolar());
 * 
 * 
 */

function CreateWheel() {
    var i = 0;
	for	(i = 0; i !== numerodetriangulos; i++) {
		var A = math.complex(0, 0);
		var B = math.complex(0, 0);
		var C = math.complex(0, 0);
		var color = 0;
		B.re = Math.cos(((2 * i - 1) * math.pi) / 10);
		B.im = Math.sin(((2 * i - 1) * math.pi) / 10);
		C.re = Math.cos(((2 * i + 1) * math.pi) / 10);
		C.im = Math.sin(((2 * i + 1) * math.pi) / 10);
		if (i % 2 === 0) {
            var T = math.complex(0, 0);
			T = B;
			B = C;
			C = T;
		}
		triangles[i] = [color, A, B, C];
		//console.log(i,'-',triangles[i]);
	}
}
function translatex(x) { return ((x + 1) * (xres - 1) / 2); } //500=canvas/2

function translatey(y) {return (yres - 1) - (y + 1) * (yres - 1) / 2; }

function PaintTriangles(arrayoftriangles) {
	console.log('En painttriangles');
    var color1 = '#'+Math.floor(Math.random()*8388607).toString(16);
    var color2 = '#'+Math.floor((Math.random()*8388607)+8388607).toString(16);
    //ctx.lineWidth = 0.25;
    var i = 0;
	for	(i = 0; i !== arrayoftriangles.length; i++) {
        if (arrayoftriangles[i][0] === 0) {
			ctx.fillStyle = color1; //"#FF0000";
            ctx.strokeStyle = color1; //"#FF0000";
		} else {
			ctx.fillStyle = color2; //"#0000FF";
            ctx.strokeStyle = color2; //"#0000FF";
		}
		//ctx.lineWidth = "0.25";
		ctx.beginPath();
		//console.log('1-',x1,'-',y1);
        var x1 = translatex(arrayoftriangles[i][1].re);
		var y1 = translatey(arrayoftriangles[i][1].im);
		ctx.moveTo(x1, y1);
		x1 = translatex(arrayoftriangles[i][2].re);
		y1 = translatey(arrayoftriangles[i][2].im);
		//console.log('2-',x1,y1);
		ctx.lineTo(x1, y1);
		x1 = translatex(arrayoftriangles[i][3].re);
		y1 = translatey(arrayoftriangles[i][3].im);
		//console.log('3-',x1,y1);
		ctx.lineTo(x1, y1);
        ctx.stroke();
		ctx.closePath();
		ctx.fill();
	}
}

function subdivide(arrayoftriangles) {
	console.log('En subdivide');
	var triangles2 = [];
    var counter = 0;
    var i = 0;
	for	(i = 0; i !== arrayoftriangles.length; i++) {
        var color = arrayoftriangles[i][0];
        var A = math.complex(arrayoftriangles[i][1].re, arrayoftriangles[i][1].im);
		var B = math.complex(arrayoftriangles[i][2].re, arrayoftriangles[i][2].im);
		var C = math.complex(arrayoftriangles[i][3].re, arrayoftriangles[i][3].im);
		if (color === 0) {
			var P = math.complex(0, 0);
			//P=math.add(A,(math.substract(B,A)))/goldenRatio;
            P.re =  (B.re - A.re);
            P.im =  (B.im - A.im);
            P = math.divide(P, goldenRatio);
            P = math.add(P, A);
			triangles2[counter] = [0, C, P, B];
            //console.log(counter,'-',triangles2[counter]);
            counter = counter + 1;
			triangles2[counter] = [1, P, C, A];
            //console.log(counter,'-',triangles2[counter]);
            counter = counter + 1;
		} else {
			var Q = math.complex(0, 0);
			var R = math.complex(0, 0);
            Q.re = A.re - B.re;
            Q.im = A.im - B.im;
			Q = math.divide(Q, goldenRatio);
            Q = math.add(Q, B);
            R.re = C.re - B.re;
            R.im = C.im - B.im;
			R = math.divide(R, goldenRatio);
            R = math.add(R, B);
			triangles2[counter] = [1, R, C, A];
            counter = counter + 1;
            triangles2[counter] = [1, Q, R, B];
            counter = counter + 1;
            triangles2[counter] = [0, R, Q, A];
            counter = counter + 1;
		}
	}
	//console.log('Result:',triangles2);
    return triangles2;

}

function PaintLines(arrayoftriangles) {
    console.log('En PaintLines');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.50
    var i = 0;
    console.log('Pintando ',arrayoftriangles.length);
    for	(i = 0; i !== arrayoftriangles.length-1; i++) {
        ctx.beginPath();
        ctx.closePath();
        ctx.moveTo(translatex(arrayoftriangles[i][3].re), translatey(arrayoftriangles[i][3].im));
        ctx.lineTo(translatex(arrayoftriangles[i][1].re), translatey(arrayoftriangles[i][1].im));
        ctx.lineTo(translatex(arrayoftriangles[i][2].re), translatey(arrayoftriangles[i][2].im));
        ctx.stroke();
        if (i % (arrayoftriangles.length/10) == 0 ) {
            
            //console.log('Pintando');
            }
    }
    //ctx.stroke();
}