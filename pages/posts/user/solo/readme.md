
# Documentação do diretório user/todos

Basicamente todas as páginas desse diretório, só se diferenciam no que será buscado e mostrado na tela, resultando em poucas modificações de código entre elas

Outra diferença é que comparado com o diretório ``` todos ```, é que o solo utiliza o ``` Dynamic Routes ``` do ``` NextJS ```, que serve para receber rodas com dados específicos, que no nosso caso seria o ``` ID ```

Começando pelas importações, nós utilizamos o componente ``` Head ``` do NextJS para inserirmos na página o equivalente a seção ``` head ``` do HTML. 
Também foi utilizado a biblioteca ``` axios ``` do ReactJS para requisições na API, o ``` HDPagInicial ``` seria um componente feito por nós para servir de cabeçalho das nossas páginas, o ``` format ``` e ``` parseISO ``` são componentes da biblioteca ``` date-fns ``` que traduz as datas para um formato que possa ser de fácil entendimento de todos, e por fim o ``` Link ``` do NextJS que tem a mesma função da tag ``` a href ``` do HTML.

A primeira função chamada de ``` getServerSideProps ``` serve para realizar o tratamento dos dados recebidos da API,a primeira variável declarada é o id que tem como função receber o ID solicitado a partir do context, sua segunda variável chamada de ``` response ``` tem como objetivo receber os dados brutos da API, a segunda váriavel ``` attributes ``` fica com o trabalho de transformar os dados recebidos pelo axios para JSON, e, por fim, a função retorna a variável ``` attributes ``` como ``` props ``` para poder ser utilizada na função principal da página, e como ultimo atributo, temos o ``` revalidate ``` que serve para atualizar os dados da página a cada 300 segundos ou 5 minutos.

A função ``` TodasPesquisa ``` tem como intuito renderizar a página, como um HTML ou ``` jsx ``` do prórpio ReactJS, primeiramente foram declaradas as constantes ``` consulta ```, ``` itensporPagina ``` e ``` paginasRecorrentes ``` e foram feitas em formado de ``` estado ``` que é criado usando o componente ``` useState ``` importado acima. A quarta variável é chamada de ``` keys ```, que armazena a string que será usada como atributo da função de filtragem.


E por fim a função retorna a parte que será renderizada na página, contendo todo o conteúdo HTML.
