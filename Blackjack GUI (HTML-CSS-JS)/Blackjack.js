var bankr=50;
var total = 0;
var pc;
var aux;
var carta;
var valor;
var a;
var i;
var j;
var apuesta;
var meta = 250;
document.getElementById("bankr").innerHTML=bankr;
document.getElementById("jugador").style.visibility="hidden";

carta = document.getElementsByClassName("card");
valor = document.getElementsByClassName("number");
var cartapc = document.getElementsByClassName("card2");
var valor2 = document.getElementsByClassName("number2");

function dificultad(num) {
	if (num == 1) {
		meta = 250;
		alert("Seleccionado modo facil!");
	}
	else if (num == 2) {
		meta = 500;
		alert("Seleccionado modo medio!");
	}
	else {
		meta = 1000;
		alert("Seleccionado modo dificil!");
	}
}


function check(x) {
	switch (x) {
		case 11:
			x = 10;
			valor[i].innerHTML="J";
			break;
		case 12:
			x = 10;
			valor[i].innerHTML="Q";
			break;
		case 13:
			x = 10;
			valor[i].innerHTML="K";
			break;
		case 1:
			x = 11;
			valor[i].innerHTML="A";
			break;
		default:
			x=x;
			valor[i].innerHTML=x;
			break;
	}

	return x;
}

function checkpc(x) {
	switch (x) {
		case 11:
			x = 10;
			valor2[j].innerHTML="J";
			break;
		case 12:
			x = 10;
			valor2[j].innerHTML="Q";
			break;
		case 13:
			x = 10;
			valor2[j].innerHTML="K";
			break;
		case 1:
			x = 11;
			valor2[j].innerHTML="A";
			break;
		default:
			x=x;
			valor2[j].innerHTML=x;
			break;
	}

	return x;
}


function jugar() {

		for (i = 0; i<carta.length; i++) {
			carta[i].style.visibility="hidden";
			cartapc[i].style.visibility="hidden";
		}
		document.getElementById("totalpc").style.visibility="hidden";
		document.getElementById("bienvenida").style.visibility="hidden";
		document.getElementById("dinero").style.visibility="visible";
		document.getElementById("meta").innerHTML=meta;
		if (bankr != 0 && bankr < meta) {
			document.getElementById("jugador").style.visibility="hidden";
			i = 0;
			a=false;
			b=false;
			j=0;
			pc=0;
			total=0;
			apuesta = prompt("Cuanto quieres apostar? Tienes " + bankr);
			if (apuesta > bankr) {
				alert("No tienes tanto dinero");
				jugar();
			}

			else {
				bankr-=apuesta;
				document.getElementById("jugador").style.visibility="visible";
				document.getElementById("bankr").innerHTML=bankr;
				aux = Math.floor(Math.random(13)*13)+1;
				if (aux == 1) {a=true;}
				aux = check(aux);
				carta[i].style.visibility="visible";
				total += aux;

				i++;

				aux = Math.floor(Math.random(13)*13)+1;
				if (aux == 1) {a=true;}
				aux = check(aux);
				carta[i].style.visibility="visible";
				total += aux;
				if (total > 21 && a==true) {total -= 10;} 
				document.getElementById("total").innerHTML=total;
				i++;
			}
		}
		else if (bankr == 0) {
			alert("Te quedaste sin dinero! Refresca la pagina si quieres volver a jugar");
		}
		else if (bankr >= meta) {
			alert("Ganaste!");
		}
	}

function pedir() {
	aux = Math.floor(Math.random(13)*13)+1;
	if (aux == 1) {a=true;}
	aux = check(aux);
	total += aux;
	document.getElementById("total").innerHTML=total;
	carta[i].style.visibility="visible";
	i++;
	if (total > 21 && a==true) {
		total -= 10; 
		a=false;
		document.getElementById("total").innerHTML=total;
	} 
	if (total>21) {
		alert("Sacaste "+ aux +", tienes " + total + ", te pasaste!");
		jugar();
	}
}

function quedarse() {
	document.getElementById("totalpc").style.visibility="visible";
	while (pc < 17) {
		aux = Math.floor(Math.random(13)*13)+1;
		if (aux == 1) {b=true;}
		aux=checkpc(aux);
		pc+=aux;
		cartapc[j].style.visibility="visible";
		j++;
		if (pc > 21 && b==true) {pc -= 10; b=false;} 

	}
	document.getElementById("totalpc").innerHTML=pc;
	if (pc>21) {
		document.getElementById("totalpc").innerHTML=pc;
		setTimeout(function(){alert("Tu ganas!");bankr+=apuesta*2;document.getElementById("bankr").innerHTML=bankr;jugar();},1000);
	}
	else {
		document.getElementById("totalpc").style.visibility="visible";
		document.getElementById("totalpc").innerHTML=pc;
		comparar(pc,total);
	}
}

function comparar(pc,total) {
	if (pc>total) {
		setTimeout(function(){alert("Tu pierdes!");jugar();},1000);
	}
	else if (total > pc) {
		setTimeout(function(){alert("Tu ganas!");bankr+=apuesta*2;document.getElementById("bankr").innerHTML=bankr;jugar();},1000);

	}
	else if (total == pc) {
		setTimeout(function(){alert("Empate!");bankr+=apuesta*1;document.getElementById("bankr").innerHTML=bankr;jugar();},1000);
	}
}
