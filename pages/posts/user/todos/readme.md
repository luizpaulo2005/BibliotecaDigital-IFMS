# Documentação do diretório user/todos

Básicamente todas as páginas desse diretório, só se diferenciam no que será buscado e mostrado na tela, resultando em poucas modificações de código entre elas

Começando pelas importações, nós utilizamos o componente ``` Head ``` do NextJS para inserirmos na página o equivalente a seção ``` head ``` do HTML. 
Também foi utilizado a biblioteca ``` axios ``` do ReactJS para requisições na API, o ``` HDPagInicial ``` seria um componente feito por nós para servir de cabeçalho das nossas páginas, o ``` format ``` e ``` parseISO ``` são componentes da biblioteca date-fns que traduz as datas para um formato que possa ser de fácil entendimento de todos, o ``` useState ``` e ``` useEffect ``` para podermos criar váriavel e funções para manipular dados recebidos da API e por fim o ``` Link ``` do NextJS que tem a mesma função da tag ``` a href ``` do HTML.

A primeira função chamada de ``` getServerSideProps ``` serve para realizar o tratamento dos dados recebidos da API, sua primeira variável chamada de ``` response ``` tem como objetivo receber os dados brutos da API, a segunda váriavel ``` attributes ``` fica com o trabalho de transformar os dados recebidos pelo axios para JSON, e, por fim, a função retorna a variável ``` attributes ``` como ``` props ``` para poder ser utilizada na função principal da página.

A função ``` TodasPesquisa ``` tem como intuito renderizar a página, como um HTML ou ``` jsx ``` do prórpio ReactJS, primeiramente foram declaradas as constantes ``` consulta ```, ``` itensporPagina ``` e ``` paginasRecorrentes ``` e foram feitas em formado de ``` estado ``` que é criado usando o componente ``` useState ``` importado acima. A quarta variável é chamada de ``` keys ```, que armazena a string que será usada como atributo da função de filtragem.


E por fim a função retorna a parte que será renderizada na página, contendo todo o conteúdo HTML 