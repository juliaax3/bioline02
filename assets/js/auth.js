import { auth } from './firebase.js'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

document.addEventListener('DOMContentLoaded', () => {

    const emailInput = document.querySelector('.email-admin')
    const senhaInput = document.querySelector('.senha-admin')
    const formLogin = document.querySelector('.form-login')
    const linkSair = document.querySelector('.link-sair')
    const formPost = document.querySelector('.form-post')
    const tituloLogin = document.querySelector('.titulo-login')
    const mensagens = document.querySelector('.mensagens')

    //mensagens
    const logadoSucesso = () =>{
        mensagens.innerHTML = 'Usuário logado com sucesso.'
    }

    const verifiqueConexao = () =>{
        mensagens.innerHTML = 'Verifique a sua conexão, email ou senha.'
    }

    const logoutSucesso = () =>{
        mensagens.innerHTML = 'Logout realizado com sucesso.'
    }

    const erroInesperado = () =>{
        mensagens.innerHTML = 'Ocorreu um erro inesperado.'
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
                        logadoSucesso()
                        emailInput.value = ''
                        senhaInput.value = ''                
                    })
                    .catch(()=> {
                        verifiqueConexao()
                    })
                        
        })
    }
    
    if (linkSair){
        linkSair.addEventListener('click', () =>{
            signOut(auth)
            .then(()=>{
                logoutSucesso()
            })
            .catch(()=>{
                erroInesperado()
            })
        })
    }
      onAuthStateChanged(auth, (user)=>{
        if(user){
            const uid = user.uid

            if(linkSair) linkSair.classList.remove('hide')
            if(formLogin) formLogin.classList.add('hide')
            if(formPost) formPost.classList.remove('hide')
            if(tituloLogin) tituloLogin.innerHTML = 'ACESSO AO ADMINISTRADOR LIBERADO'
        }else{
            if(linkSair) linkSair.classList.add('hide')
            if(formLogin) formLogin.classList.remove('hide')
            if(formPost) formPost.classList.add('hide')
            if(tituloLogin) tituloLogin.innerHTML = 'FAÇA LOGIN COMO ADMINISTRADOR'
        }       
        })     
})
