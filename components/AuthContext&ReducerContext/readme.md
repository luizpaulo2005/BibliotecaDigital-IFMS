Aqui estão localizadas as funções na qual a rota login precisa para espalhar o estado do usuário para a aplicação inteira.

A função AuthCotenxt Provider vai ser resposanvel por distribuir para a aplicação se ha um usuario logado, para que a Administração fique disponivel para uso.
usando o useState e o useReducer, no momento que o login for confirmado, após passar pela a autenticação, ele vai cair no authreducer,
que consciste em um switch de 2 casos. no caso 1 que vai ser o "LOGIN", seria a confirmação que ha um usuario autenticado, onde ira passar isso pra função AuthContext Provider
A consts USUARIO INICIAL é o estado padrão do usuario quando o serviço web for iniciado.
o authContext é a variavel que armazenara o usuario logado e é nela que o contexto do usuario é consolidado e armazenado.