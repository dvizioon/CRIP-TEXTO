# CripTexto
<img src="./Assets/Screenshots/01.png" alt="" />

## Descrição
O **CripTexto** é uma aplicação web desenvolvida para criptografar e descriptografar textos, além de oferecer funcionalidades adicionais como importação de arquivos PDF e TXT, manipulação de templates e geração de documentos em PDF, você pode usar Temas já prontos ou pode criar seu propios tema usando AI, isso usando um estilo propio de cbt ou seja com base no tema fonercido a AI gerar um tema usando um findTunner Especifico.

## Funcionalidades

- **Criptografar e Descriptografar:** Permite aos usuários inserir texto e realizar operações de criptografia e descriptografia utilizando métodos seguros.
- **Importação de Arquivos:** Suporta importação de arquivos nos formatos PDF e TXT para visualização e manipulação de conteúdo.
- **Templates de Documentos:** Oferece modelos pré-definidos para facilitar a criação de documentos padronizados.
- **Exportação em PDF:** Permite salvar documentos criados como arquivos PDF, com opção de proteção por senha para garantir a segurança dos documentos.
- **Desenho de Templates Personalizados:** Funcionalidade para desenhar templates personalizados diretamente na aplicação, permitindo a criação de layouts únicos.
- **Histórico de Templates:** Mantém um registro de templates criados, facilitando o acesso e a gestão de documentos anteriores.

## Tecnologias Utilizadas

- **Front-end:** HTML, CSS, JavaScript (ES6+)
- **Bibliotecas Externas:**
  - jsPDF: Para geração de documentos em PDF no navegador.
  - pdf.js: Para visualização e extração de texto de arquivos PDF.
  - SweetAlert2: Para exibição de alertas e prompts personalizados.
- **Armazenamento Local:** LocalDB.js para gerenciamento de banco de dados local no navegador, facilitando o armazenamento e recuperação de templates e configurações.

## FLuxo de Segurança
<img src="./Assets/Screenshots/02.png" alt="" />

## Fluxo de Rederização AI
- Entre no `Assistent.js` e Mude Logica eo temperamento da AI para gerar os temas

>[!IMPORTANT]
>Para Criar um FIndTunner bom é necessario adptar esse plugin de assistencia é criar um filtro mais especifico assim criar um filtro mais especifico.

```javascript
btn_search.addEventListener('click', function () {
    
    const question = `
    Por favor, crie uma página de convite em HTML e CSS com as seguintes características
    Quero uma página unica, com o seguinte tema ${input_search.value}:

    obs1:quero as cores que codizem como o tema ${input_search.value} e os Textos também:

    obs2:Quero o codigo entre """ Codigo Aqui dentro """
    1 **Faça o Estilo usando de ${input_search.value} é use <style></style> faça o body padrão é 
        -Faça a Font se adptar de acordo com o tema para os <p> adptar as cores por exemplo se o tema for dark usar cores white
        -Para cada elemento ultizar o display:Flex;
        -Para cada elmento coloque o width:100%:
        -para cada elemento use o Gap;
        -para cada elemento use class unicas e estilos unicos
    **
    - No Estilo não quero estilo nem **Body**

    2**Dentro do Body Coloque esse Codigo aqui porem vc vai adptar ao tema que a pessoa pediu que é ${input_search.value} **:
    '
        <div class='cartao'>
            <!-- Aqui Colocar Titulo -->
            <h1>[]</h1>
            <!-- Aqui Sobre o tema : Pequeno Texto -->
            <p>[]</p>
            <!-- Aqui Colocar Msg para Descriptgrafar -->
            <p>[]</p>
            <textarea id='texto_codificado' class='texto_codificado' placeholder='Digite o texto codificado aqui' disabled></textarea>
            <input type='password' class='password' id='senha' placeholder='Digite a senha'>
            <button class='descriptografar'>Descriptografar 🔓</button>
            <textarea id='texto_decifrado' class='texto_decifrado' placeholder='Texto decifrado aparecerá aqui' readonly></textarea>
        </div>
    '

    Aguardo o código completo. Obrigado!
`

  ...

})
```


## Instalação

1. Clone o repositório: `git clone https://github.com/dvizioon/CRIP-TEXTO.git`
2. Abra o diretório do projeto: `cd CRIP-TEXTO`
3. Abra o arquivo `index.html` no seu navegador web.


## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
