import { auth } from './firebase.js'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

document.addEventListener('DOMContentLoaded', () => {
    // Declarando as variaveis
    const emailInput = document.querySelector('.email-admin')
    const senhaInput = document.querySelector('.senha-admin')
    const formLogin = document.querySelector('.form-login')
    const linkSair = document.querySelector('.link-sair')
    const formPost = document.querySelector('.form-post')
    const tituloLogin = document.querySelector('.titulo-login')
    const mensagens = document.querySelector('.mensagens')
    const gerenciadorConteudos = document.querySelector('.gerenciador-conteudos')
    
    // Função de alerta
    const alertaUsuario = (alerta) =>{
        mensagens.innerHTML = alerta
    }

    //Limpar mensagem
    const limparMensagem = () =>{
        setInterval(()=> {
            mensagens.innerHTML = ''
        }, 3500)
    }


    // Evento de login
    if(formLogin){
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault()
            
            const email = emailInput.value  
            const password = senhaInput.value 
    
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user
                        alertaUsuario('Usuário logado com sucesso.')
                        emailInput.value = ''
                        senhaInput.value = ''                
                    })
                    .catch(()=> {
                        alertaUsuario('Verifique a sua conexão, email ou senha.')
                        limparMensagem()
                    })
                        
        })
    }
    
    if (linkSair){
        linkSair.addEventListener('click', () =>{
            signOut(auth)
            .then(()=>{
                alertaUsuario('Logout realizado com sucesso.')
                limparMensagem()
            })
            .catch(()=>{
                alertaUsuario('Ocorreu um erro inesperado.')
                limparMensagem()
            })
        })
    }

    // Mudança de estado
      onAuthStateChanged(auth, (user)=>{
        if(user){
            const uid = user.uid

            // Verificacões de elementos ()
            if(linkSair) linkSair.classList.remove('hide')
            if(formLogin) formLogin.classList.add('hide')
            if(formPost) formPost.classList.remove('hide')
            if(tituloLogin) tituloLogin.innerHTML = 'ACESSO AO ADMINISTRADOR LIBERADO'
            if(gerenciadorConteudos) gerenciadorConteudos.classList.remove('hide')
        }else{
            if(linkSair) linkSair.classList.add('hide')
            if(formLogin) formLogin.classList.remove('hide')
            if(formPost) formPost.classList.add('hide')
            if(tituloLogin) tituloLogin.innerHTML = 'FAÇA LOGIN COMO ADMINISTRADOR'
            if(gerenciadorConteudos)gerenciadorConteudos.classList.add('hide')
        }       
        })     
})
