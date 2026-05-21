# AGENTS.md

## Objetivo

Este arquivo é a fonte de verdade do projeto para agentes de IA e pessoas desenvolvedoras.

Atualize este documento quando mudarem:

- arquitetura
- fluxos
- regras de negócio
- contratos públicos
- comandos
- decisões importantes
- integrações externas

Regra principal:

- A IA não deve gerar código antes de entender este arquivo e os documentos de view relevantes.

---

## Resumo do projeto

- Nome do projeto: LLM Lessons.
- O que ele faz: crie um modelo de dados para IA generativa e teta usando a api da propria solução.
- Público-alvo: uso pessoal/estudo.
- Objetivo de negócio: modelo simples, frases simples sobre pizzas de uma pizzaria chamada Slice Pizza.
- Estado atual: studies.

---

## Documentos de contexto

- Context view: `docs/contexts/01_CONTEXT_VIEW.md`.
- Container view: `docs/contexts/02_CONTAINER_VIEW.md`.
- Component view: `docs/contexts/03_COMPONENT_VIEW.md`.
- Code view: `docs/contexts/04_CODE_VIEW.md`.

Regras:

- `AGENTS.md` resume o contexto vivo do projeto.
- As views detalham decisões por fase.
- Se houver conflito, pare e peça decisão antes de implementar.

---

## Stack

- Frontend: não aplicável no momento.
- Backend: Python com FastAPI para camada HTTP compatível com OpenAI.
- Banco de dados: não aplicável; persistência local em arquivos.
- Infra/deploy: execução local e deploy da API em Kubernetes via GitHub Actions.
- Filas/jobs/workers: não aplicável.
- Machine learning: PyTorch.
- Testes: pytest.
- Lint/format: ruff e black.
- Observabilidade: logs legíveis em console.

---

## Estrutura do repositório

| Caminho | Função | Observações |
|---|---|---|
| `app/` | Código da aplicação, scripts e testes | Todos os módulos de aplicação devem permanecer aqui |
| `app/dataset.txt` | Dataset pequeno de estudo | Dados artificiais sobre a pizzaria Slice Pizza |
| `app/context.py` | Montagem de contexto de chat | Serializa mensagens no mesmo padrão do dataset |
| `app/train.py` | Entrada do fluxo de treino | Deve orquestrar treino, perda, backpropagation e checkpoint |
| `app/infer.py` | Entrada do fluxo de inferência | Deve usar checkpoint e tokenizer compatíveis |
| `app/api.py` | Camada FastAPI | Deve permanecer fina e delegar para inferência |
| `docs/` | Documentação educacional | Explica conceitos, fluxo e limitações do modelo |
| `docs/README.md` | Índice e rota de estudo | Capa do curso, promessa didática e links para todos os documentos |
| `docs/contexts/` | Views de contexto, container, componente e código | Fonte de decisão arquitetural por fase |
| `checkpoints/llm_lessons.pt` | Checkpoint treinado do modelo | Artefato pequeno de estudo; deve entrar no versionamento para a API funcionar após clone |
| `Dockerfile` | Imagem da API | Empacota código, dependências e checkpoint para execução no Kubernetes |
| `k8s/llm-lessons-api.yaml` | Manifest Kubernetes da API | Expõe a API em `62.171.156.26:8000` e encaminha para o container `8000` |
| `.github/workflows/deploy-k8s.yml` | Pipeline de deploy | Testa, publica imagem no GHCR e aplica o manifest no host Kubernetes via SSH |
| `requirements.txt` | Dependências Python | Não adicionar dependências fora da lista aprovada sem decisão |
| `.gitignore` | Arquivos ignorados | Não deve ignorar `checkpoints/llm_lessons.pt`; outros artefatos temporários continuam fora do versionamento |

---

## Como rodar

| Ação | Comando |
|---|---|
| Setup | `pip install -r requirements.txt` |
| Setup via Make | `make setup` |
| Treino | `python app/train.py` |
| Treino via Make | `make train` |
| Inferência | `python app/infer.py` |
| Inferência via Make | `make infer` |
| API | `uvicorn app.api:app --reload` |
| API via Make | `make api` |
| Listar modelos da API | `GET /v1/models` |
| Chat completion | `POST /v1/chat/completions` |
| Testes | `python -m pytest` |
| Testes via Make | `make test` |
| Lint/check | `python -m ruff check . && python -m black --check app` |
| Lint/check via Make | `make check` |
| Format | `python -m black app` |
| Format via Make | `make format` |
| Build | `none` |
| Build Docker | `docker build -t llm-lessons-api .` |
| Deploy | GitHub Actions: `Deploy API to Kubernetes` |

Notas:

- Sistema operacional esperado: qualquer sistema com Python e pip.
- Variáveis de ambiente obrigatórias: nenhuma no estado atual.
- Serviços locais necessários: nenhum.
- Segredos de deploy no GitHub Actions: `K8S_SSH_USER` e `K8S_SSH_PRIVATE_KEY`.

---

## Regras para agentes de IA

- Leia este arquivo antes de editar.
- Leia as views relevantes antes de implementar.
- Não invente regra de negócio.
- Não altere arquitetura sem justificar e registrar.
- Não adicione dependência sem necessidade clara.
- Preserve padrões existentes do projeto.
- Faça mudanças pequenas, revisáveis e reversíveis.
- Atualize testes junto com mudanças de comportamento.
- Atualize documentação quando alterar fluxo, regra, contrato ou comando.
- Liste suposições quando algo não estiver explícito.
- Pare se faltar decisão de produto, segurança, dados ou arquitetura.

---

## Padrões de código

- Nomeie coisas por intenção de negócio.
- Prefira clareza antes de abstração.
- Evite arquivos grandes demais.
- Cada módulo deve ter uma responsabilidade clara.
- Evite duplicação.
- Mantenha direção de dependência consistente.
- Validação deve ficar na camada definida pela arquitetura.
- Persistência deve ficar no componente dono dos dados.
- Erros devem ser tratados no formato definido pelo projeto.
- Logs não devem expor segredos ou dados sensíveis.

---

## Arquitetura

- Estilo arquitetural: monólito modular / sistema educacional baseado em scripts.
- Principais blocos:
  - Dataset Loader: carrega dataset local pequeno.
  - Tokenizer: converte texto em IDs e IDs em texto.
  - Batch Builder: cria sequências de entrada e alvo para predição causal.
  - Mini GPT Model: executa embeddings, posição, blocos transformer e logits.
  - Training Loop: executa forward, loss, backpropagation e atualização de pesos.
  - Checkpoint Manager: salva e carrega pesos e metadados.
  - Inference Loop: gera texto token por token.
  - API Layer: expõe contrato HTTP compatível com OpenAI.
- Fluxo principal:
  1. O usuário executa o treino.
  2. O dataset é tokenizado e transformado em batches.
  3. O modelo prevê o próximo token e calcula loss.
  4. Backpropagation ajusta os pesos.
  5. Um checkpoint `.pt` é salvo.
  6. A inferência/API recarrega o checkpoint para gerar texto.
- Decisões arquiteturais:
  - Usar PyTorch -> mostra tensores, autograd e treino sem esconder o modelo.
  - Usar tokenizer por caractere inicialmente -> facilita inspeção e aprendizado.
  - Manter tudo em `app/` -> preserva navegação simples e explícita.

---

## Dados e domínio

| Entidade / Termo | Significado | Campos / Estados importantes | Invariantes |
|---|---|---|---|
| Token | Representação numérica de texto | `token_id` | Deve existir no vocabulário |
| Vocabulary | Mapeamento entre texto e IDs | `stoi`, `itos` | Deve ser compatível com o checkpoint |
| Checkpoint | Pesos e metadados persistidos | `model_state`, `vocabulary`, `config` | Deve ser recarregável para inferência |
| Prompt | Texto de entrada para geração | texto cru, tokens | Não deve estar vazio |

Regras de negócio críticas:

- O treino usa predição causal do próximo token.
- O modelo deve gerar checkpoint serializável e recarregável.
- O projeto prioriza clareza educacional em vez de performance.
- Dados de treino devem ser artificiais e não sensíveis.
- O domínio de resposta é a pizzaria fictícia Slice Pizza.
- O dataset e as respostas públicas devem usar inglês.
- Perguntas fora do domínio da pizzaria devem responder: `I do not know how to answer that.`

Campos sensíveis:

- Nenhum campo sensível no estado atual.

---

## Integrações externas

| Serviço | Uso | Protocolo/SDK | Autenticação | Falhas esperadas |
|---|---|---|---|---|
| PyTorch | Tensores, camadas, autograd e otimizador | Python SDK | nenhuma | treino/inferência não executam |
| Sistema de arquivos local | Ler dataset e salvar checkpoint | File I/O | permissões do sistema | dataset/checkpoint indisponível |

Regras:

- Timeouts: não aplicável no estado atual.
- Retries: não aplicável no estado atual.
- Rate limits: não aplicável no estado atual.
- Fallback: falhas devem ser explícitas e legíveis.

---

## Segurança

- Validar entradas.
- Proteger segredos.
- Verificar autenticação e autorização.
- Evitar dados sensíveis em logs.
- Revisar redirects, uploads, queries e integrações externas.
- Não assumir que o framework resolve tudo sozinho.

Regras específicas do projeto:

- Não fazer chamadas externas.
- Não executar código dinâmico.
- Não registrar dados sensíveis.
- Rejeitar checkpoints inválidos ou incompatíveis.

---

## Testes

- Todo bug corrigido deve ter teste de regressão.
- Toda feature relevante deve ter teste.
- Preferir testes rápidos e determinísticos.
- Mockar integrações externas quando fizer sentido.
- Não concluir tarefa sem rodar os testes relevantes.

Cobertura esperada:

- Regras de negócio: testar máscara causal, geração autoregressiva e restauração de checkpoint.
- Edge cases: testar prompt vazio, estouro de contexto e token inválido.
- Falhas: testar checkpoint ausente, loss NaN e tokenizer incompatível.
- Contratos públicos: testar scripts de treino/inferência e `POST /v1/chat/completions`.

---

## Hurdles conhecidos

| Problema | Impacto | Solução / Workaround |
|---|---|---|
| `docs/contexts/03_COMPONENT_VIEW.md` está vazio | Implementação de comportamento pode ficar sem detalhamento de componentes | Preencher a component view antes de implementar regras internas |

---

## Decisões importantes

| Decisão | Motivo | Data / Contexto |
|---|---|---|
| Criar estrutura inicial sem comportamento completo | Component view está vazia; estrutura já está definida em `04_CODE_VIEW.md` | 2026-05-18 / scaffolding inicial |
| Manter código em `app/` | Regra explícita da code view | 2026-05-18 / scaffolding inicial |
| Documentar o projeto como aula arquivo por arquivo | O projeto é educacional e deve explicar como o modelo funciona | 2026-05-18 / documentação de estudo |
| Nomear o projeto como LLM Lessons | Nome mais autoral e didático; mantém o domínio fictício Slice Pizza e comunica laboratório de estudo | 2026-05-18 / identidade do projeto |
| Versionar `checkpoints/llm_lessons.pt` | O site/API de estudo deve funcionar após clone sem exigir treino local antes do primeiro teste | 2026-05-21 / decisão de distribuição do modelo gerado |
| Adicionar deploy Kubernetes para a API | Permitir publicar a API em `62.171.156.26:8000` usando imagem GHCR e apply remoto via SSH | 2026-05-21 / deploy GitHub Actions |

---

## Critério de pronto

Uma tarefa só está pronta quando:

- O comportamento esperado foi implementado.
- Os testes relevantes passam.
- A documentação necessária foi atualizada.
- Não houve aumento desnecessário de complexidade.
- O impacto em produção foi considerado.
- As suposições foram registradas.
- Qualquer divergência das views foi justificada.

---

## Stop conditions para IA

Pare e peça decisão se:

- Regra de negócio estiver ambígua.
- Contrato público estiver incompleto.
- Arquitetura documentada entrar em conflito com o código.
- Alteração exigir nova dependência sem aprovação.
- Dados sensíveis, autenticação ou autorização estiverem indefinidos.
- Testes ou comandos obrigatórios não estiverem claros.


