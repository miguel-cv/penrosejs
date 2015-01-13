
/*function drawing() {
		ctx.fillRect(0, 0, 150, 100);
			ctx.fillStyle = '#cc0000';
			ctx.fillRect(10, 10, 100, 70);      

*/

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
	for	(i = 0; i < numerodetriangulos; i++) {
		A = math.complex(0, 0);
		B = math.complex(0, 0);
		C = math.complex(0, 0);
		color = 0;
		B.re = Math.cos(((2 * i - 1) * math.pi) / 10);
		B.im = Math.sin(((2 * i - 1) * math.pi) / 10);
		C.re = Math.cos(((2 * i+  1) * math.pi) / 10);
		C.im = Math.sin(((2 * i + 1) * math.pi) / 10);
		if ( i % 2 === 0) {
			T = B;
			B = C;
			C = T;    
		}
		triangles[i]=[color,A,B,C];
		console.log(triangles[i]);
	}
}

function PaintTriangles(arrayoftriangles) {
	console.log('En painttriangles');
	for	(i = 0; i < arrayoftriangles.length; i++) {
		console.log('Iteracion:',i)
		x1=translatex(arrayoftriangles[i][1].re);
		y1=translatey(arrayoftriangles[i][1].im);
		ctx.beginPath();
        if (arrayoftriangles[i][0] == 0) {
			ctx.fillStyle="#FF0000";
		} else {
			ctx.fillStyle="#0000FF";
		}
		ctx.lineWidth="5";
		ctx.strokeStyle="green";
		console.log('1-',x1,'-',y1);
		ctx.moveTo(x1,y1);
		x1=translatex(arrayoftriangles[i][2].re);
		y1=translatey(arrayoftriangles[i][2].im);
		console.log('2-',x1,y1);
		ctx.lineTo(x1,y1);
		x1=translatex(arrayoftriangles[i][3].re);
		y1=translatey(arrayoftriangles[i][3].im);
		console.log('3-',x1,y1);
		ctx.lineTo(x1,y1);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}

function translatex (x) {return ((x+1)*(500-1))/2 ; } 

function translatey (y) {return ((500-1)-(y+1)*(500-1))/2+255;}

function subdivide (arrayoftriangles) {
	console.log('En subdivide')
	triangles2=[];
    counter=0;
	for	(i = 0; i < arrayoftriangles.length-1; i++); {
        console.log('i es',i);
		A=math.complex(arrayoftriangles[i][1]); 
		B=math.complex(arrayoftriangles[i][2]);
		C=math.complex(arrayoftriangles[i][3]);
        console.log('Después de asignar,i es',i);
		if (arrayoftriangles[i][0] === 0) {
			P=math.complex(0,0);
			console.log('P es ',P);
			//P=math.add(A,(math.substract(B,A)))/goldenRatio;
			P=math.add(B,(-A));
			console.log('P es ',P);
			P=math.add(P,A);
			P=math.divide(P,goldenRatio);
			triangles2[counter]=[0,C,P,B];
            counter=counter+1;
			triangles2[counter]=[1,P,C,A];
		} else {
			Q=math.complex(0,0);
			R=math.complex(0,0);
			//Q=(B+(A-B))/goldenRatio;
			Q=math.substract(A-B);
			Q=math.add(Q,B);
			Q=math.divide(Q,goldenRatio);
			//R=(B+(C-B))/goldenRatio;
			R=C-B;
			R=math.add(R,B);
			R=math.divide(R,goldenRatio);
            counter=counter+1;
			triangles2[counter]=[1,R,C,A];
            counter=counter+1;
            triangles2[counter]=[1,Q,R,B];
            counter=counter+1;
            triangles2[counter]=[0,R,Q,A];
		}
	}
	console.log('Result:',triangles2);
return;


}

