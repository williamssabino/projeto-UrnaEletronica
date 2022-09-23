let seuVoto = document.querySelector('.nameVoto')
let cargo = document.querySelector('.cargo')
let descricao = document.querySelector('.descricao')
let telaInfe = document.querySelector('.tela-inf')
let fts = document.querySelector('.sup2')
let numeros = document.querySelector('.numero')

let etpAtual=0
let numCand = ''
let numArray = []
let votoBranco=false;
let fim=false

function comecarEtapa(){
    numCand=''
    let divNum = '';

    if(etpAtual===0){
        cargo.innerHTML=`
           <div class="cargo ">
                VEREADOR
           </div>
        `  
    }
    else{
        cargo.innerHTML=`
        <div class="cargo ">
            PREFEITO
        </div>
     `  
    }

    numeros.style.display='flex'
    seuVoto.style.display='none'
    descricao.innerHTML=''
    telaInfe.style.display='none'
    fts.innerHTML=''

    for(let c=0;c<etapas[etpAtual].numVoto;c++){
        if(c==0){
            divNum = '<div class="num1 pisca"></div>'
        }else{
            divNum += '<div class="num1"></div>'
        } 
    }
    numeros.innerHTML=divNum

    
}

function clicou(n){
    let numbers = document.querySelector('.num1.pisca')

    if(numbers!==null){//quando a div estiver criada
        numbers.innerHTML=n 

        numbers.classList.remove('pisca')
        numCand += `${n}`

        if(numbers.nextElementSibling !== null){//teste se existe o proximo elemento 
            
            numbers.nextElementSibling.classList.add('pisca') //coloca no proximo elemento a classe pisca 
        
        }else{
           
            atualizarInterface()
        }
    }
}


function atualizarInterface(){
    
    let etapa=etapas[etpAtual]
    let candidato = etapa.candidatos.filter((item)=>{
       
        numArray.push(item.numero)
        
        if(numArray.indexOf(numCand) == -1){
            descricao.innerHTML=`
               <div class="numErrado">NÚMERO ERRADO</div>
               <div class="nomeGrande pisca">VOTO NULO</div>
            `
            telaInfe.style.display='block'
            seuVoto.style.display='block'
        }
       
        else{
            let posicao = numArray.indexOf(numCand)
           
            seuVoto.style.display='block'
            telaInfe.style.display='block'
            
            let desciption = descricao.innerHTML=`
                <div class="nome">NOME: ${etapa.candidatos[posicao].nome}</div> 
            
                <div class="partido">
                   <div>PARTIDO:</div>
                   <div class="nomePartido">${etapa.candidatos[posicao].partido}</div>
                </div>
            `
            
            fts.innerHTML=`
                <div class="fts" id="ftPref">
                    <div>
                        <img src=${etapa.candidatos[posicao].foto} alt="">
                        <p>Veredor</p>
                    </div>
                    
                </div>
            ` 
            if(etpAtual==1){
                descricao.innerHTML=`${desciption} 
                    <div class="vice">
                    <div><br>vice-prefeito:</div>
                    <div class="nomeVice"><br>${etapa.candidatos[posicao].vice}</div>
                    </div>
                `
                fts.innerHTML=`
                    <div class="fts" id="ftPref">
                        <div>
                            <img src=${etapa.candidatos[posicao].foto[0].url} alt="">
                            <p>${etapa.candidatos[posicao].foto[0].legenda}</p>
                        </div>
                    </div>

                    <div class="fts" id="ftVice">
                        <div>
                        <img src="${etapa.candidatos[posicao].foto[1
                        ].url}" alt="">
                        <p>${etapa.candidatos[posicao].foto[1].legenda}</p>
                        </div>
                    </div>
                `
            }  
        }
        
    })

}

function branco(){
    
    if(numCand==''){
        descricao.innerHTML=`
          <div class="nomeGrande pisca">VOTO BRANCO</div>
        `
        seuVoto.style.display='block'
        telaInfe.style.display='block'
        numeros.innerHTML=''
        votoBranco=true
    }else{
        window.alert(`Para votar Branco os campos devem estar vazios.`)
    }

}

function corrige(){
    
    if(fim==false){
        comecarEtapa()
        numCand = ''
    }
    else{
        window.alert(`A votação terminou`)
    }


}

function confirma(){
    let confirmaVoto=false

    if(votoBranco==true){
        confirmaVoto=true
    }
    else if(numCand==''){
        confirmaVoto=false
    }

    else{
        let listaNum=numCand.split('')
        
        if(listaNum.length==5){
            confirmaVoto=true
        } 
        else if(etpAtual==1){
            if(listaNum.length==2){
                confirmaVoto=true
            }
        }
    }

    if(confirmaVoto==true){
        if(etpAtual==0){
           etpAtual+=1
           numArray=[]
           comecarEtapa()
        }
        else if(etpAtual==1){
            terminarVotacao()
        }
    }
    else{
        window.alert(`O campo eta vazio digite o numero do candidato`)
    }
}


function terminarVotacao(){
    fim=true
    numeros.style.display='none'
    seuVoto.style.display='none'
    telaInfe.style.display='none'
    descricao.style.display='none'
    fts.style.display='none'
    cargo.innerHTML=`<div class="fim pisca">FIM</div>`
}

comecarEtapa()