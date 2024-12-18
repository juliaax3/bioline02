import { database, storage } from "./firebase.js";
// as significa um apelido ou seja databaseRef é o apelido de ref que é uma função do firebase
import { set, ref as databaseRef, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"

document.addEventListener('DOMContentLoaded', () => {
    // Declarando as variáveis
    const formPost = document.querySelector('.form-post')
    const tituloPost = document.querySelector('.titulo-post')
    const imagemPost = document.querySelector('.imagem-post')
    const mensagemPost = document.querySelector('.mensagem-post')
    const dataPublicacaoPost = document.querySelector('.data-publicacao-post')
    const autorPost = document.querySelector('.autor-post')
    const sendPost = document.querySelector('.send-post')
    const divConteudos = document.querySelector('.conteudos')
    const gerenciadorConteudos = document.querySelector('.gerenciador-conteudos')
    const postCategoria = document.querySelector('.post-categoria')
    const amazonia = document.querySelector('.amazonia')
    const mataAtlantica = document.querySelector('.mataAtlantica')
    const caatinga = document.querySelector('.caatinga')
    const cerrado = document.querySelector('.cerrado')
    const pantanal = document.querySelector('.pantanal')
    


   const dadosPost = (postElement, post) => {
    const dataFormatada = new Date(post.data).toLocaleDateString('pt-BR');
    postElement.innerHTML = `
    <h2 class="mt-5 fw-bold text-center text-success" >${post.titulo}</h2>
    <div class="decoration-bar" ></div>
    <img src="${post.imagemUrl}" alt="imagem de ${post.titulo}" class="img-blog d-block mx-auto my-5 img-fluid" />
    <p>${post.mensagem.replace(/\n/g, '<br>')}</p>
    <p class="align-self-center mt-5 text-and" ><b>Publicado em:</b> ${dataFormatada} por ${post.autor}.</p>
    <hr/>
`
}
    const postsRef = databaseRef(database, `posts`)

    if (sendPost && tituloPost && mensagemPost && dataPublicacaoPost && autorPost && imagemPost && postCategoria) {
        // Grava as informações
        const enviarPost = (postId, titulo, mensagem, data, autor, imagemUrl, categoria) => {
            return set(databaseRef(database, `posts/${postId}`), {
                titulo,
                mensagem,
                data,
                autor,
                imagemUrl,
                categoria

            })
        }

        //Envia os dados gravados
        sendPost.addEventListener('click', () => {
            const postId = new Date().getTime().toString() // Um identificador baseado em milisegundos
            const titulo = tituloPost.value
            const mensagem = mensagemPost.value
            const data = dataPublicacaoPost.value
            const autor = autorPost.value
            const imagem = imagemPost.files[0]
            const categoria = postCategoria.value

            if (imagem) {
                const imagemRef = storageRef(storage, `posts/${postId}/${imagem.name}`)
                uploadBytes(imagemRef, imagem)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then((url) => {
                                enviarPost(postId, titulo, mensagem, data, autor, url, categoria)
                                    .then(() => {
                                        tituloPost.value = ''
                                        mensagemPost.value = ''
                                        dataPublicacaoPost.value = ''
                                        autorPost.value = ''
                                        imagemPost.value = ''
                                        postCategoria.value = ''
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            })
                    })
            }

        })
    }

    const listarPosts = (conteudos, categoria) => {
        onValue(postsRef, (snapshot) => {
            const posts = snapshot.val()
            if (conteudos) {
                conteudos.innerHTML = ''
            }

            if (posts) {
                const postsIds = Object.keys(posts).sort((a, b) => b - a)
                postsIds.forEach((postId) => {
                    const post = posts[postId]
                    const postElement = document.createElement('div')
                    if (categoria === 'geral' || post.categoria === categoria) {
                        dadosPost(postElement, post)


                    }

                    if (conteudos) {
                        conteudos.appendChild(postElement)
                    }

                })
            }else {
                if (conteudos) {
                    conteudos.innerHTML = '<p class="mt-5">Nenhum post encontrado.</p>'
                }


            }
        })
    }
    const gerenciarPosts = (conteudos) => {
        onValue(postsRef, (snapshot) => {
            const posts = snapshot.val()
            conteudos.innerHTML = ''
            if (posts) {
                const postIds = Object.keys(posts).sort((a, b) => b - a)
                postIds.forEach((postId) => {
                    const post = posts[postId]
                    const postElement = document.createElement('div')
                    postElement.innerHTML = `
                        <button class="btn btn-danger btn-sm mx-3 mb-3 delete-post" data-id="${postId}"><i class="bi bi-trash3"></i></button>
                        <span class="fw-bold h6" >${post.titulo}</span>
                        <hr>
                    `
                    conteudos.appendChild(postElement)
                })
                document.querySelectorAll('.delete-post').forEach((button) => {
                    button.addEventListener('click', (e) => {
                        const postId = e.target.getAttribute('data-id')
                        apagarPost(postId)

                    })
                }
                )
            } else {
                conteudos.innerHTML = '<p class="mt-5"> Nenhum post encontrado.<p/>'
            }
        })
    }

    const apagarPost = (postId) => {
        remove(databaseRef(database, `posts/${postId}`))
            .then(() => {
                alert('Post removido com sucesso!')
                listarPosts(divConteudos)
                gerenciarPosts(gerenciadorConteudos)
                console.log(postId)
            })
            .catch((error) => {
                console.log(`Erro ao tentatar publicar o post: ${error}.`)
                alert('Erro ao tentar removor o post')
            })
    }


    if (divConteudos) {
        listarPosts(divConteudos, 'geral')
    }
    if(amazonia){
        listarPosts(amazonia, 'amazonia')
    }
    if(mataAtlantica){
        listarPosts(mataAtlantica, 'mataAtlantica')
    }
    if(caatinga){
        listarPosts(caatinga, 'caatinga')
    }
    if(cerrado){
        listarPosts(cerrado, 'cerrado')
    }
    if(pantanal){
        listarPosts(pantanal, 'pantanal')
    }
    if (gerenciadorConteudos){
        gerenciarPosts(gerenciadorConteudos)

    }


})

