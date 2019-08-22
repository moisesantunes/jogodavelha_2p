let turno= "X";
const possiveis =[
 	["1","2","3"],
 	["4","5","6"],
 	["7","8","9"],
 	["1","4","7"],
 	["2","5","8"],
 	["3","6","9"],
 	["1","5","9"],
 	["3","5","7"],	
 ];

let jog_x=[];
let jog_o=[];
let alguem_ganhou= false;
let pt_x = 0;
let pt_o = 0;
let ept=0;
const reseta ="<button id='reseta'onclick='resetar()' >Reiniciar</button>"
/*
função checa:
essa função vai fazer um looping três níveis,
 o primeiro vai ler todas as linhas de possibilidades, e para cada uma delas,
 no segundo nível o poop lê minha lista de jogadas e  o "se" o método includes() (que também é um loop)
 vai retornar true se as linhas terem alguma das minhas jogadas
 então o contador c será incrementado e chegando a 3 alguém ganha
*/
function checa(e, lista){
	let c=0
	for(let linha of possiveis){
		for(let j of lista){
			if(linha.includes(j)){
				c=c+1
			}	
		}
		if(c == 3){ 
			vitoria(e , linha)		
		}
		c=0
	}
}


/*
Função vitória:
essa função exibe o ganhador na interface
o único trecho mais misterioso é o loop feito nas .caixas
e na linha em que chega a 3 no c na função checa, 
e confirmo se meu quais são as coincidências 
e nessas eu acrescento um classe para mudar o estilo
*/
function vitoria(e , vitoriosa){
	alguem_ganhou=true;	
	let caixas_vencedoras = document.getElementsByClassName("caixa") 
	for( let cxs of caixas_vencedoras ){	
		if(vitoriosa.includes(cxs.classList.item(1))){
		 cxs.classList.add("vitoria")
		 cxs.classList.add(turno)	 
		}	
	}
	document.getElementById("resultado").innerHTML="<p id='res'>O ganhador é "+turno+ " 👍</p><button id='limpa' onclick='limpa()' >Jogar novamente</button>"+reseta
	if(turno == "X"){
		pt_x = pt_x+1;
		document.getElementById("pt_x").innerHTML="X: "+pt_x
	}else{
		pt_o = pt_o+1;
		document.getElementById("pt_o").innerHTML="O: "+pt_o
	}
}

function empate(e){
	if( jog_o.length+jog_x.length==9 && !alguem_ganhou){ 
	//	alert("empate")
		let empatado= document.getElementsByClassName("caixa")
		for(let emp of empatado){
			emp.classList.add("empatado")
		}
		document.getElementById("resultado").innerHTML="<p id='res'>Deu Ruim!! 😱 Empatou!!</p><button id='limpa' onclick='limpa()' >Jogar novamente</button>"+reseta;
		ept =ept+1;
		document.getElementById('ept').innerHTML="Ept: "+ept;
	}
}

function jogada(e){
	if(turno == "X" && !e.target.hasChildNodes() && !alguem_ganhou ){
		document.getElementsByClassName(e.target.classList.item(1))[0].innerHTML= "X"
		jog_x.push(e.target.classList.item(1))
		checa(e, jog_x)
		turno = "O"	
	}else if(turno=="O" && !e.target.hasChildNodes() && !alguem_ganhou){
		document.getElementsByClassName(e.target.classList.item(1))[0].innerHTML= "O"
		jog_o.push(e.target.classList.item(1))
		checa(e, jog_o)
		turno = "X"	
	}
}

const campo =document.getElementById("campo")
campo.addEventListener("click", function (e) {
	jogada(e)
	empate(e)
})

function limpa(){
	let a_ser_limpo= document.getElementsByClassName("caixa")
	for(sujeira of a_ser_limpo){
		sujeira.innerHTML="";
		sujeira.classList.remove("vitoria")
		sujeira.classList.remove("X")
		sujeira.classList.remove("O")
		sujeira.classList.remove("empatado")		
	}
	jog_o=[];
	jog_x=[];
	turno = "X";
	alguem_ganhou = false
	document.getElementById("resultado").innerHTML=""
	
	

} 
function resetar(){
limpa()
pt_o =0
pt_x =0
ept =0 
document.getElementById('ept').innerHTML="Ept: "+ept;
document.getElementById('pt_o').innerHTML="O: "+pt_o;
document.getElementById('pt_x').innerHTML="X: "+pt_x;
	
}