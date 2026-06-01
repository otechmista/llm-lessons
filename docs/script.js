const REPOSITORY_URL = "https://github.com/otechmista/mini-gpt-study";

// Brand icons removed from recent Lucide versions — inline SVGs
const ICON_GITHUB   = `<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
const ICON_LINKEDIN = `<svg viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const ICON_X        = `<svg viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;

const LESSONS = [
  { file: "index.html", icon: "book-open", en: ["Course Index", "Start"], pt: ["Índice das Aulas", "Início"] },
  { file: "00_course_guide.html", icon: "map", en: ["Course Guide", "Course"], pt: ["Guia das Aulas", "Aula"] },
  { file: "01_introduction.html", icon: "sparkles", en: ["Introduction", "Course"], pt: ["Introdução", "Aula"] },
  { file: "02_how_llms_work.html", icon: "brain-circuit", en: ["How LLMs Work", "Course"], pt: ["Como LLMs Funcionam", "Aula"] },
  { file: "15_simple_context_model.html", icon: "message-square", en: ["Simple Context Model", "Course"], pt: ["Modelo Simples de Contexto", "Aula"] },
  { file: "03_tokenization.html", icon: "binary", en: ["Tokenization", "Course"], pt: ["Tokenização", "Aula"] },
  { file: "04_embeddings.html", icon: "orbit", en: ["Embeddings", "Course"], pt: ["Embeddings", "Aula"] },
  { file: "05_self_attention.html", icon: "network", en: ["Self Attention", "Course"], pt: ["Autoatenção", "Aula"] },
  { file: "06_transformer_blocks.html", icon: "layers", en: ["Transformer Blocks", "Course"], pt: ["Blocos Transformer", "Aula"] },
  { file: "07_forward_pass.html", icon: "play", en: ["Forward Pass", "Course"], pt: ["Forward Pass", "Aula"] },
  { file: "08_loss_and_backpropagation.html", icon: "rotate-ccw", en: ["Loss And Backpropagation", "Course"], pt: ["Loss e Backpropagation", "Aula"] },
  { file: "09_training_loop.html", icon: "repeat", en: ["Training Loop", "Course"], pt: ["Loop de Treino", "Aula"] },
  { file: "11_checkpoint_and_weights.html", icon: "save", en: ["Checkpoint And Weights", "Course"], pt: ["Checkpoint e Pesos", "Aula"] },
  { file: "10_inference.html", icon: "mouse-pointer-click", en: ["Inference", "Course"], pt: ["Inferência", "Aula"] },
  { file: "12_openai_api_layer.html", icon: "terminal", en: ["OpenAI API Layer", "Course"], pt: ["Camada de API OpenAI", "Aula"] },
  { file: "13_limitations_of_the_model.html", icon: "shield-alert", en: ["Limitations Of The Model", "Course"], pt: ["Limitações do Modelo", "Aula"] },
  { file: "14_file_by_file_lessons.html", icon: "file-code", en: ["File By File Lessons", "Course"], pt: ["Aulas Arquivo por Arquivo", "Aula"] },
  { file: "16_ai_for_young_builders.html", icon: "graduation-cap", en: ["AI For Young Builders", "Course"], pt: ["IA para Jovens Criadores", "Aula"] },
  { file: "diagrams/README.html", icon: "bar-chart-3", en: ["Diagrams Index", "Diagrams"], pt: ["Índice dos Diagramas", "Diagramas"] },
  { file: "diagrams/training_flow.html", icon: "route", en: ["Training Flow", "Diagrams"], pt: ["Fluxo de Treino", "Diagramas"] },
  { file: "diagrams/inference_flow.html", icon: "send", en: ["Inference Flow", "Diagrams"], pt: ["Fluxo de Inferência", "Diagramas"] },
  { file: "diagrams/context_tokens_flow.html", icon: "braces", en: ["Context Tokens Flow", "Diagrams"], pt: ["Fluxo de Contexto e Tokens", "Diagramas"] },
  { file: "diagrams/checkpoint_flow.html", icon: "archive", en: ["Checkpoint Flow", "Diagrams"], pt: ["Fluxo de Checkpoint", "Diagramas"] },
  { file: "diagrams/attention_flow.html", icon: "scan-eye", en: ["Attention Flow", "Diagrams"], pt: ["Fluxo de Atenção", "Diagramas"] },
  { file: "diagrams/transformer_flow.html", icon: "workflow", en: ["Transformer Flow", "Diagrams"], pt: ["Fluxo Transformer", "Diagramas"] },
];

const INTERACTIVE_LABELS = {
  en: {
    subtitle: "Minimal AI Lesson",
    focus: "Focus",
    print: "Print",
    repo: "GitHub project",
    map: "Lesson Map",
    filter: "Filter lessons...",
    collapse: "Collapse",
    expand: "Expand",
    complete: "Mark lesson as complete",
    completed: "Lesson complete",
    uncomplete: "Unmark lesson",
    progress: "lesson progress",
    labTitle: "Learning lab",
    reset: "Reset",
    check: "Quick check",
    reveal: "Reveal answer",
    hide: "Hide answer",
    choose: "Choose one option",
    correct: "Correct",
    tryAgain: "Try again",
  },
  pt: {
    subtitle: "Aula Minimalista de IA",
    focus: "Foco",
    print: "Imprimir",
    repo: "Projeto no GitHub",
    map: "Mapa das Aulas",
    filter: "Filtrar aulas...",
    collapse: "Recolher",
    expand: "Expandir",
    complete: "Marcar aula como concluída",
    completed: "Aula concluída",
    uncomplete: "Desmarcar aula",
    progress: "progresso das aulas",
    labTitle: "Laboratório de aprendizagem",
    reset: "Reiniciar",
    check: "Cheque rápido",
    reveal: "Revelar resposta",
    hide: "Ocultar resposta",
    choose: "Escolha uma opção",
    correct: "Correto",
    tryAgain: "Tente de novo",
  },
};

const QUICK_CHECKS = {
  "03_tokenization.html": {
    en: { question: "Why does a model need tokenization before it can learn from text?", options: ["Neural networks work with numbers, so text must become token IDs.", "Tokenization makes the model factual.", "Tokenization replaces training.", "Tokenization removes the need for embeddings."], correct: 0, answer: "Text must become token IDs before embeddings and neural layers can process it." },
    pt: { question: "Por que um modelo precisa de tokenização antes de aprender com texto?", options: ["Redes neurais trabalham com números, então o texto vira IDs de tokens.", "Tokenização torna o modelo factual.", "Tokenização substitui o treino.", "Tokenização remove a necessidade de embeddings."], correct: 0, answer: "O texto precisa virar IDs de tokens antes de passar por embeddings e camadas neurais." },
  },
  "04_embeddings.html": {
    en: { question: "What changes when a token ID becomes an embedding?", options: ["It becomes a learnable vector that can carry meaning.", "It becomes a full sentence.", "It becomes the final answer.", "It becomes a database row."], correct: 0, answer: "An embedding is a learned vector, like coordinates for meaning." },
    pt: { question: "O que muda quando um ID de token vira embedding?", options: ["Ele vira um vetor aprendível que pode carregar significado.", "Ele vira uma frase completa.", "Ele vira a resposta final.", "Ele vira uma linha de banco de dados."], correct: 0, answer: "Um embedding é um vetor aprendido, como coordenadas de significado." },
  },
  "05_self_attention.html": {
    en: { question: "Why does causal attention block future tokens?", options: ["So the model predicts honestly without peeking ahead.", "So the model can ignore all previous tokens.", "So training becomes supervised by humans only.", "So embeddings are no longer needed."], correct: 0, answer: "The causal mask keeps future answers hidden during training and generation." },
    pt: { question: "Por que a atenção causal bloqueia tokens futuros?", options: ["Para o modelo prever honestamente sem espiar o futuro.", "Para o modelo ignorar todos os tokens anteriores.", "Para o treino depender só de humanos.", "Para embeddings não serem mais necessários."], correct: 0, answer: "A máscara causal mantém respostas futuras escondidas no treino e na geração." },
  },
  "07_forward_pass.html": {
    en: { question: "Why do logits need softmax before sampling?", options: ["Softmax turns raw scores into probabilities.", "Softmax saves the checkpoint.", "Softmax tokenizes the prompt.", "Softmax deletes unlikely words from the dataset."], correct: 0, answer: "Logits are raw scores; softmax turns them into a probability distribution." },
    pt: { question: "Por que logits precisam de softmax antes do sampling?", options: ["Softmax transforma pontuações brutas em probabilidades.", "Softmax salva o checkpoint.", "Softmax tokeniza o prompt.", "Softmax apaga palavras improváveis do dataset."], correct: 0, answer: "Logits são pontuações brutas; softmax transforma isso em distribuição de probabilidades." },
  },
  "08_loss_and_backpropagation.html": {
    en: { question: "What does backpropagation send backward through the model?", options: ["Gradients that show how weights should change.", "The final user answer.", "The original dataset file.", "Only the model name."], correct: 0, answer: "Backpropagation computes gradients, then the optimizer uses them to update weights." },
    pt: { question: "O que a backpropagation envia de volta pelo modelo?", options: ["Gradientes que mostram como os pesos devem mudar.", "A resposta final do usuário.", "O arquivo original do dataset.", "Apenas o nome do modelo."], correct: 0, answer: "Backpropagation calcula gradientes, e o otimizador usa isso para ajustar pesos." },
  },
  "09_training_loop.html": {
    en: { question: "What is the training loop trying to improve each round?", options: ["It reduces loss by adjusting weights.", "It makes the HTML prettier.", "It adds more tokens to the prompt forever.", "It changes user messages into images."], correct: 0, answer: "The loop predicts, measures loss, backpropagates, and updates weights." },
    pt: { question: "O que o loop de treino tenta melhorar a cada rodada?", options: ["Ele reduz a loss ajustando os pesos.", "Ele deixa o HTML mais bonito.", "Ele adiciona tokens ao prompt para sempre.", "Ele transforma mensagens em imagens."], correct: 0, answer: "O loop prevê, mede a loss, faz backpropagation e atualiza pesos." },
  },
  "10_inference.html": {
    en: { question: "Why does inference generate one token at a time?", options: ["Each new token becomes context for the next prediction.", "The model can only print one letter per minute.", "Training is still happening at every click.", "The tokenizer refuses full sentences."], correct: 0, answer: "Autoregressive inference feeds each generated token back into the context." },
    pt: { question: "Por que a inferência gera um token por vez?", options: ["Cada token novo vira contexto para a próxima previsão.", "O modelo só imprime uma letra por minuto.", "O treino acontece de novo a cada clique.", "O tokenizer recusa frases completas."], correct: 0, answer: "Inferência autoregressiva coloca cada token gerado de volta no contexto." },
  },
  "13_limitations_of_the_model.html": {
    en: { question: "Why is RAG different from training?", options: ["RAG retrieves notes for the prompt; it does not change weights.", "RAG always retrains the model.", "RAG removes the context window.", "RAG replaces tokenization."], correct: 0, answer: "RAG gives the model external notes at answer time without updating weights." },
    pt: { question: "Por que RAG é diferente de treino?", options: ["RAG busca notas para o prompt; não muda os pesos.", "RAG sempre retreina o modelo.", "RAG remove a janela de contexto.", "RAG substitui tokenização."], correct: 0, answer: "RAG entrega notas externas na hora da resposta sem atualizar pesos." },
  },
  "15_simple_context_model.html": {
    en: { question: "Why can a model forget earlier parts of a long chat?", options: ["Only tokens inside the context window are visible.", "The model deletes its checkpoint after each answer.", "Embeddings only work for short words.", "Softmax blocks old messages."], correct: 0, answer: "A model can only attend to the tokens that fit inside its current context window." },
    pt: { question: "Por que um modelo pode esquecer partes antigas de uma conversa longa?", options: ["Só tokens dentro da janela de contexto ficam visíveis.", "O modelo apaga o checkpoint após cada resposta.", "Embeddings só funcionam para palavras curtas.", "Softmax bloqueia mensagens antigas."], correct: 0, answer: "O modelo só consegue atender aos tokens que cabem na janela de contexto atual." },
  },
  default: {
    en: { question: "What is the main idea of this lesson?", options: ["A GPT is a pipeline of tokens, vectors, attention, prediction, and learning.", "A GPT is a fixed list of hand-written answers.", "A GPT understands text without numbers.", "A GPT works without context."], correct: 0, answer: "The useful mental model is the pipeline: text becomes tokens, tokens become vectors, attention mixes context, and the model predicts." },
    pt: { question: "Qual é a principal ideia desta aula?", options: ["Um GPT é um fluxo de tokens, vetores, atenção, previsão e aprendizado.", "Um GPT é uma lista fixa de respostas escritas à mão.", "Um GPT entende texto sem números.", "Um GPT funciona sem contexto."], correct: 0, answer: "O modelo mental útil é o fluxo: texto vira tokens, tokens viram vetores, atenção mistura contexto e o modelo prevê." },
  },
};

function pageInfo() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const isDiagram = parts.includes("diagrams");
  const currentFile = parts.at(-1) || "index.html";
  return { parts, isDiagram, currentFile, lang: "en" };
}

function relativePrefix(isDiagram) {
  return isDiagram ? "../" : "";
}

function lessonHref(file, info = pageInfo()) {
  const prefix = relativePrefix(info.isDiagram);
  return `${prefix}${file}`;
}

function currentLessonKey(info = pageInfo()) {
  const file = info.isDiagram ? `diagrams/${info.currentFile}` : info.currentFile;
  return `en/${file}`;
}


function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function pizzaApiBase() {
  const h = location.hostname;
  return (h === "localhost" || h === "127.0.0.1")
    ? "http://localhost:8000"
    : "https://api.camilomelo.com";
}

function renderChatStatusBadge(badge, status) {
  if (!badge) return;
  badge.classList.remove("is-on", "is-off", "is-checking");
  badge.classList.add(`is-${status}`);
  const label = status === "on" ? "demo live" : "demo offline";
  badge.title = `Slice Pizza ${label}`;
  badge.setAttribute("aria-label", `Slice Pizza ${label}`);
  badge.querySelector(".chat-status-text").textContent = label;
}

async function checkPizzaApiStatus() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(pizzaApiBase() + "/health", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.status === "ok" ? "on" : "off";
  } catch {
    return "off";
  } finally {
    clearTimeout(timeout);
  }
}

class LessonHeader extends HTMLElement {
  connectedCallback() {
    const info = pageInfo();
    const labels = INTERACTIVE_LABELS[info.lang];
    const homeHref = lessonHref("index.html", info);

    this.innerHTML = `
      <header class="sticky top-0 z-40 border-b border-line/80 bg-page/90 backdrop-blur-xl no-print">
        <div class="mx-auto flex w-[min(1220px,calc(100%-28px))] items-center justify-between gap-3 py-3">
          <a href="${homeHref}" class="flex min-w-0 items-center gap-3 no-underline">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ink text-page shadow-lift">
              <i data-lucide="brain-circuit" class="h-5 w-5"></i>
            </span>
            <span class="min-w-0">
              <strong class="block truncate text-sm font-black leading-none">LLM Lessons</strong>
              <span class="mt-1 block truncate text-xs font-bold text-soft">${labels.subtitle}</span>
            </span>
          </a>
          <div class="flex items-center gap-2">
            <button id="pizza-chat-btn" class="inline-flex h-10 items-center gap-2 rounded-xl bg-coral px-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90" type="button" title="Live example — chat with the Slice Pizza AI trained in this course">
              <i data-lucide="bot" class="h-4 w-4"></i>
              <span class="hidden sm:inline"><span translate="no">Slice Pizza</span> · <span id="header-chat-demo-label" class="font-normal opacity-90 text-xs">demo offline</span></span>
              <span id="header-chat-api-status" class="chat-status chat-status-compact is-off" aria-live="polite">
                <span class="chat-status-text">demo offline</span>
              </span>
            </button>
            <div id="gt-header-widget" style="display:none"></div>
            <select id="lang-select" class="h-10 rounded-xl border border-line bg-white px-3 text-sm font-black text-ink shadow-sm outline-none transition hover:border-honey cursor-pointer">
              <option value="en">🇺🇸 EN</option>
              <option value="pt">🇧🇷 PT</option>
              <option value="es">🇪🇸 ES</option>
              <option value="zh-CN">🇨🇳 ZH</option>
            </select>
            <button id="focus-toggle" class="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-honey" type="button" title="${labels.focus}">
              <i data-lucide="focus" class="h-4 w-4"></i>
            </button>
            <button id="print-button" class="hidden h-10 w-10 place-items-center rounded-xl bg-ink text-page shadow-sm transition hover:-translate-y-0.5 hover:opacity-80 sm:grid" type="button" title="${labels.print}">
              <i data-lucide="printer" class="h-4 w-4"></i>
            </button>
            <a href="${REPOSITORY_URL}" class="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink no-underline shadow-sm transition hover:-translate-y-0.5 hover:border-honey" target="_blank" rel="noreferrer" title="${labels.repo}">
              ${ICON_GITHUB}
            </a>
          </div>
        </div>
      </header>
    `;

    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({ pageLanguage: "en", includedLanguages: "pt,es,zh-CN" }, "gt-header-widget");
    };
    if (!document.querySelector("#gt-sdk")) {
      const s = document.createElement("script");
      s.id = "gt-sdk";
      s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(s);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }

    const langSelect = this.querySelector("#lang-select");

    const getActiveLang = () => {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      return match ? match[1] : "en";
    };

    const syncSelect = () => {
      if (langSelect) langSelect.value = getActiveLang();
    };

    langSelect?.addEventListener("change", (e) => {
      if (e.target.value === "en") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
        location.reload();
        return;
      }
      const gtSelect = document.querySelector("#gt-header-widget select");
      if (!gtSelect) return;
      gtSelect.value = e.target.value;
      gtSelect.dispatchEvent(new Event("change"));
    });

    // Sync once GT widget is ready, then keep in sync
    const waitForGT = setInterval(() => {
      const gtSelect = document.querySelector("#gt-header-widget select");
      if (gtSelect) {
        clearInterval(waitForGT);
        syncSelect();
        gtSelect.addEventListener("change", syncSelect);
      }
    }, 200);

    this.querySelector("#focus-toggle")?.addEventListener("click", async (event) => {
      const layout = document.querySelector("#layout");
      const sidebar = document.querySelector("lesson-sidebar");
      const button = event.currentTarget;
      const enteringFocus = !button.classList.contains("border-honey");

      sidebar?.classList.toggle("lg:block", !enteringFocus);
      sidebar?.classList.toggle("lg:hidden", enteringFocus);
      layout?.classList.toggle("lg:grid-cols-[300px_minmax(0,1fr)]", !enteringFocus);
      layout?.classList.toggle("lg:grid-cols-1", enteringFocus);
      button.classList.toggle("border-honey", enteringFocus);

      try {
        if (enteringFocus && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen?.();
        } else if (!enteringFocus && document.fullscreenElement) {
          await document.exitFullscreen?.();
        }
      } catch {
        // Browsers may block fullscreen in some contexts; focus layout still works.
      }
    });

    document.addEventListener("fullscreenchange", () => {
      const button = this.querySelector("#focus-toggle");
      const layout = document.querySelector("#layout");
      const sidebar = document.querySelector("lesson-sidebar");
      const isFullscreen = Boolean(document.fullscreenElement);
      sidebar?.classList.toggle("lg:block", !isFullscreen);
      sidebar?.classList.toggle("lg:hidden", isFullscreen);
      layout?.classList.toggle("lg:grid-cols-[300px_minmax(0,1fr)]", !isFullscreen);
      layout?.classList.toggle("lg:grid-cols-1", isFullscreen);
      button?.classList.toggle("border-honey", isFullscreen);
    });

    this.querySelector("#print-button")?.addEventListener("click", () => window.print());

    checkPizzaApiStatus().then((status) => {
      renderChatStatusBadge(this.querySelector("#header-chat-api-status"), status);
      const label = this.querySelector("#header-chat-demo-label");
      if (label) label.textContent = status === "on" ? "demo live" : "demo offline";
    });

    this.querySelector("#pizza-chat-btn")?.addEventListener("click", () => {
      let chat = document.querySelector("pizza-chat");
      if (!chat) {
        chat = document.createElement("pizza-chat");
        document.body.appendChild(chat);
      } else {
        chat.toggle();
      }
    });

    refreshIcons();
  }
}

class LessonSidebar extends HTMLElement {
  connectedCallback() {
    this.className = "no-print hidden lg:block lg:w-72 lg:shrink-0";
    this.render();
  }

  render() {
    const info = pageInfo();
    const labels = INTERACTIVE_LABELS[info.lang];
    const completed = this.completedKeys();
    const count = LESSONS.filter((lesson) => completed.has(`en/${lesson.file}`)).length;
    const currentPath = info.isDiagram ? `diagrams/${info.currentFile}` : info.currentFile;

    this.innerHTML = `
      <aside id="sidebar" aria-label="${labels.map}">
        <div class="fixed bottom-2 top-[88px] flex w-72 flex-col overflow-hidden rounded-3xl border border-line bg-page p-4 shadow-lift">
          <div class="mb-4 border-b border-line pb-4">
            <div class="flex items-center justify-between gap-2">
              <div class="flex min-w-0 items-center gap-2">
                <i data-lucide="list-tree" class="h-4 w-4 text-coral"></i>
                <p class="text-xs font-black uppercase tracking-[0.16em] text-soft">${labels.map}</p>
              </div>
            </div>
            <div class="mt-3 rounded-2xl bg-white p-3 text-xs font-black text-soft">
              <div class="flex items-center justify-between">
                <span>${count}/${LESSONS.length} ${labels.progress}</span>
                <i data-lucide="check-circle-2" class="h-4 w-4 text-mint"></i>
              </div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-shell">
                <div class="h-full bg-mint" style="width:${Math.round((count / LESSONS.length) * 100)}%"></div>
              </div>
            </div>
            <label class="mt-4 block">
              <span class="sr-only">${labels.filter}</span>
              <input id="lesson-filter" class="h-10 w-full rounded-xl border border-line bg-white px-3 text-sm font-bold outline-none transition focus:border-honey" type="search" placeholder="${labels.filter}" />
            </label>
          </div>
          <nav id="section-nav" class="grid min-h-0 flex-1 content-start gap-1 overflow-y-auto overflow-x-hidden pr-1 text-sm font-bold text-soft" aria-label="${labels.map}">
            ${LESSONS.map((lesson, index) => this.lessonLink(lesson, index, info, currentPath, completed)).join("")}
          </nav>
          <div class="mt-4 border-t border-line pt-4">
            <p class="text-xs font-black text-ink leading-none">Camilo T. de Melo</p>
            <div class="mt-2 flex items-center gap-2">
              <a href="https://camilomelo.com" target="_blank" rel="noreferrer" class="grid h-7 w-7 place-items-center rounded-lg border border-line bg-white text-soft transition hover:border-honey hover:text-ink" title="Website">
                <i data-lucide="globe" class="h-3.5 w-3.5"></i>
              </a>
              <a href="https://linkedin.com/in/camilo-de-melo" target="_blank" rel="noreferrer" class="grid h-7 w-7 place-items-center rounded-lg border border-line bg-white text-soft transition hover:border-honey hover:text-ink" title="LinkedIn">
                ${ICON_LINKEDIN}
              </a>
              <a href="https://github.com/otechmista" target="_blank" rel="noreferrer" class="grid h-7 w-7 place-items-center rounded-lg border border-line bg-white text-soft transition hover:border-honey hover:text-ink" title="GitHub">
                ${ICON_GITHUB}
              </a>
              <a href="https://x.com/otechmista" target="_blank" rel="noreferrer" class="grid h-7 w-7 place-items-center rounded-lg border border-line bg-white text-soft transition hover:border-honey hover:text-ink" title="X">
                ${ICON_X}
              </a>
            </div>
          </div>
        </div>
      </aside>
    `;

    this.querySelector("#lesson-filter")?.addEventListener("input", (event) => {
      const query = event.currentTarget.value.trim().toLowerCase();
      this.querySelectorAll(".section-link").forEach((link) => {
        link.style.display = link.dataset.title.toLowerCase().includes(query) ? "flex" : "none";
      });
    });

    refreshIcons();
  }

  lessonLink(lesson, index, info, currentPath, completed) {
    const [title, group] = lesson[info.lang];
    const href = lessonHref(lesson.file, info);
    const active = currentPath === lesson.file;
    const key = `en/${lesson.file}`;
    const done = completed.has(key);
    const number = String(index + 1).padStart(2, "0");

    return `
      <a class="section-link ${active ? "is-active" : ""} flex min-w-0 items-start gap-3 rounded-2xl border border-transparent px-3 py-2 transition hover:bg-white" href="${href}" data-title="${title}">
        <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white ${done ? "text-mint" : "text-coral"}">
          <i data-lucide="${done ? "check-circle-2" : lesson.icon}" class="h-4 w-4"></i>
        </span>
        <span class="min-w-0">
          <span class="block truncate text-ink">${number}. ${title}</span>
          <span class="block truncate text-xs text-soft">${group}</span>
        </span>
      </a>
    `;
  }

  completedKeys() {
    try {
      return new Set(JSON.parse(localStorage.getItem("llm-lessons-complete") || "[]"));
    } catch {
      return new Set();
    }
  }
}

class LessonComplete extends HTMLElement {
  connectedCallback() {
    const info = pageInfo();
    const labels = INTERACTIVE_LABELS[info.lang];
    const key = currentLessonKey(info);
    const completed = this.completedKeys();
    const isDone = completed.has(key);

    this.innerHTML = `
      <section class="no-print mt-8 rounded-2xl border border-line bg-white p-4 shadow-sm">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 place-items-center rounded-2xl ${isDone ? "bg-mint" : "bg-[#fff7df]"} text-ink">
              <i data-lucide="${isDone ? "check-circle-2" : "lightbulb"}" class="h-5 w-5"></i>
            </span>
            <p class="m-0 text-sm font-black text-ink">${isDone ? labels.completed : labels.complete}</p>
          </div>
          <button id="complete-lesson" class="inline-flex h-10 items-center justify-center gap-2 rounded-xl ${isDone ? "bg-mint" : "bg-ink"} px-4 text-sm font-black text-page transition hover:-translate-y-0.5" type="button">
            <i data-lucide="${isDone ? "circle-x" : "check-circle-2"}" class="h-4 w-4"></i>${isDone ? labels.uncomplete : labels.complete}
          </button>
        </div>
      </section>
    `;

    this.querySelector("#complete-lesson")?.addEventListener("click", () => {
      const next = this.completedKeys();
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      localStorage.setItem("llm-lessons-complete", JSON.stringify([...next]));
      this.connectedCallback();
      document.querySelector("lesson-sidebar")?.render();
    });

    refreshIcons();
  }

  completedKeys() {
    try {
      return new Set(JSON.parse(localStorage.getItem("llm-lessons-complete") || "[]"));
    } catch {
      return new Set();
    }
  }
}

class LearningLab extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute("type");
    const info = pageInfo();
    const labels = INTERACTIVE_LABELS[info.lang];
    const content = this.labContent(type, info.lang);
    if (!content) return;

    this.innerHTML = `
      <section class="not-prose mt-8 rounded-2xl border border-line bg-white p-4 shadow-sm">
        <div class="mb-4 flex items-center gap-3">
          <span class="grid h-10 w-10 place-items-center rounded-2xl bg-[#fff7df] text-ink">
            <i data-lucide="${content.icon}" class="h-5 w-5"></i>
          </span>
          <div>
            <p class="m-0 text-xs font-black uppercase tracking-[0.16em] text-soft">${labels.labTitle}</p>
            <h2 class="m-0 border-0 p-0 text-xl font-black leading-tight text-ink">${content.title}</h2>
          </div>
        </div>
        ${content.html}
      </section>
    `;

    this.bind(type, info.lang);
    refreshIcons();
  }

  labContent(type, lang) {
    const pt = lang === "pt";
    const labs = {
      tokenization: {
        icon: "binary",
        title: pt ? "Compare caracteres e subwords" : "Compare characters and subwords",
        html: `
          <label class="grid gap-2 text-sm font-black text-soft">
            ${pt ? "Digite uma palavra" : "Type a word"}
            <input data-token-input class="h-11 rounded-xl border border-line px-3 text-ink outline-none focus:border-honey" value="running" />
          </label>
          <p class="mt-4 text-xs font-black uppercase tracking-[0.16em] text-soft">Character tokens</p>
          <div data-token-output class="mt-2 flex flex-wrap gap-2"></div>
          <p class="mt-4 text-xs font-black uppercase tracking-[0.16em] text-soft">Subword-style chunks</p>
          <div data-subword-output class="mt-2 flex flex-wrap gap-2"></div>
        `,
      },
      embeddings: {
        icon: "orbit",
        title: pt ? "Veja proximidade por similaridade" : "See similarity as closeness",
        html: `
          <div class="relative h-56 rounded-2xl border border-line bg-page p-3">
            ${[
              ["pizza", 18, 42], ["cheese", 34, 34], ["menu", 58, 44], ["car", 22, 76], ["vehicle", 36, 80], ["syntax", 76, 22]
            ].map(([word, left, top], index) => `<button data-embed="${index}" class="absolute rounded-xl border border-line bg-white px-3 py-2 text-xs font-black text-ink shadow-sm transition hover:border-honey" style="left:${left}%;top:${top}%" type="button">${word}</button>`).join("")}
          </div>
          <p data-embed-output class="mt-4 rounded-2xl bg-[#fff7df] p-3 text-sm font-bold text-soft">${pt ? "Clique em uma palavra para ver vizinhos e uma similaridade aproximada." : "Click a word to see neighbors and an approximate similarity."}</p>
        `,
      },
      attention: {
        icon: "network",
        title: pt ? "Veja a máscara causal" : "See the causal mask",
        html: `
          <button data-mask-toggle class="inline-flex h-10 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-black text-page" type="button"><i data-lucide="scan-eye" class="h-4 w-4"></i>${pt ? "Alternar máscara" : "Toggle mask"}</button>
          <div data-mask-grid class="mt-4 grid grid-cols-4 gap-2 text-center text-xs font-black"></div>
          <div class="mt-4 grid gap-2 sm:grid-cols-3">
            ${["Head 1: nearby tokens", "Head 2: role markers", "Head 3: repeated words"].map((label, index) => `<button data-head="${index}" class="rounded-xl border border-line bg-page p-3 text-xs font-black text-ink transition hover:border-honey" type="button">${label}</button>`).join("")}
          </div>
          <p data-head-output class="mt-3 rounded-2xl bg-[#fff7df] p-3 text-sm font-bold text-soft">${pt ? "Clique em uma cabeça para imaginar uma relação aprendida." : "Click a head to imagine one learned relationship."}</p>
        `,
      },
      softmax: {
        icon: "bar-chart-3",
        title: pt ? "Transforme logits em probabilidades" : "Turn logits into probabilities",
        html: `
          <div class="grid gap-3 sm:grid-cols-3">
            ${["z", "a", "x"].map((token, index) => `<label class="grid gap-2 rounded-2xl border border-line bg-page p-3 text-sm font-black text-soft">${token}<input data-logit="${token}" class="h-10 rounded-xl border border-line px-3 text-ink" type="number" step="0.5" value="${[8, 3, 0][index]}" /></label>`).join("")}
          </div>
          <div data-softmax-bars class="mt-4 grid gap-3"></div>
        `,
      },
      training: {
        icon: "repeat",
        title: pt ? "Passe pelo loop de treino" : "Step through the training loop",
        html: `
          <div data-step-output class="rounded-2xl bg-[#fff7df] p-4 text-sm font-bold text-soft"></div>
          <div class="mt-3 flex gap-2">
            <button data-step-prev class="h-10 rounded-xl border border-line bg-white px-4 text-sm font-black text-ink" type="button">Back</button>
            <button data-step-next class="h-10 rounded-xl bg-ink px-4 text-sm font-black text-page" type="button">Next</button>
          </div>
          <label class="mt-4 grid gap-2 text-sm font-black text-soft">
            Batch size
            <input data-batch-size class="w-full accent-coral" type="range" min="1" max="32" value="16" />
          </label>
          <p data-batch-output class="mt-2 rounded-2xl bg-page p-3 text-sm font-bold text-soft"></p>
        `,
      },
      gradient: {
        icon: "trending-down",
        title: pt ? "Desça a colina da loss" : "Walk down the loss hill",
        html: `
          <div class="rounded-2xl border border-line bg-page p-4">
            <div class="relative h-24">
              <div class="absolute left-0 right-0 top-1/2 h-2 rounded-full bg-line"></div>
              <div data-gradient-dot class="absolute top-6 grid h-10 w-10 place-items-center rounded-full bg-coral text-xs font-black text-white shadow-sm" style="left:78%">loss</div>
            </div>
            <p data-gradient-output class="rounded-2xl bg-white p-3 text-sm font-bold text-soft"></p>
            <button data-gradient-step class="mt-3 h-10 rounded-xl bg-ink px-4 text-sm font-black text-page" type="button">optimizer.step()</button>
          </div>
        `,
      },
      inference: {
        icon: "mouse-pointer-click",
        title: pt ? "Ajuste o sampling e veja o cache" : "Tune sampling and see the cache",
        html: `
          <div class="rounded-2xl bg-ink p-4 font-mono text-sm text-page"><span data-generation>Slice Pizza is</span><span class="animate-pulse">_</span></div>
          <label class="mt-4 grid gap-2 text-sm font-black text-soft">
            Temperature
            <input data-temperature class="w-full accent-coral" type="range" min="0" max="100" value="40" />
          </label>
          <div class="mt-3 flex flex-wrap gap-2">
            ${["greedy", "top-k", "top-p"].map((mode) => `<button data-sampling="${mode}" class="h-10 rounded-xl border border-line bg-white px-4 text-sm font-black text-ink" type="button">${mode}</button>`).join("")}
            <button data-generate-next class="h-10 rounded-xl bg-ink px-4 text-sm font-black text-page" type="button">${pt ? "Próximo token" : "Next token"}</button>
            <button data-generate-reset class="h-10 rounded-xl border border-line bg-white px-4 text-sm font-black text-ink" type="button">${INTERACTIVE_LABELS[lang].reset}</button>
          </div>
          <p data-sampling-output class="mt-3 rounded-2xl bg-[#fff7df] p-3 text-sm font-bold text-soft"></p>
          <div data-kv-cache class="mt-3 grid gap-2 text-xs font-black text-soft"></div>
        `,
      },
      "context-window": {
        icon: "scan-text",
        title: pt ? "Veja a janela de contexto" : "Watch the context window",
        html: `
          <label class="grid gap-2 text-sm font-black text-soft">
            Long prompt
            <textarea data-context-input class="min-h-24 rounded-xl border border-line px-3 py-2 text-ink outline-none focus:border-honey">Customer asks about Slice Pizza delivery, then asks about pepperoni, then asks about dessert, then asks about the old delivery detail again.</textarea>
          </label>
          <div data-context-output class="mt-4 flex flex-wrap gap-2"></div>
        `,
      },
      rag: {
        icon: "search",
        title: pt ? "RAG: buscar notas antes de responder" : "RAG: retrieve notes before answering",
        html: `
          <div class="grid gap-2 sm:grid-cols-3">
            ${["What is the price?", "Where is the shop?", "What is the weather?"].map((q, index) => `<button data-rag="${index}" class="rounded-2xl border border-line bg-page p-3 text-sm font-black text-ink transition hover:border-honey" type="button">${q}</button>`).join("")}
          </div>
          <div data-rag-output class="mt-4 rounded-2xl bg-[#fff7df] p-3 text-sm font-bold text-soft"></div>
        `,
      },
    };
    return labs[type];
  }

  bind(type, lang) {
    if (type === "tokenization") this.bindTokenization();
    if (type === "embeddings") this.bindEmbeddings(lang);
    if (type === "attention") this.bindAttention(lang);
    if (type === "softmax") this.bindSoftmax();
    if (type === "gradient") this.bindGradient(lang);
    if (type === "training") this.bindTraining(lang);
    if (type === "inference") this.bindInference();
    if (type === "context-window") this.bindContextWindow(lang);
    if (type === "rag") this.bindRag(lang);
  }

  bindTokenization() {
    const input = this.querySelector("[data-token-input]");
    const output = this.querySelector("[data-token-output]");
    const subwordOutput = this.querySelector("[data-subword-output]");
    const splitSubwords = (text) => {
      const examples = {
        running: ["run", "ning"],
        ChatGPT: ["Chat", "G", "PT"],
        pizzeria: ["pizza", "ria"],
        pepperoni: ["pep", "per", "oni"],
        tokenizer: ["token", "izer"],
      };
      if (examples[text]) return examples[text];
      return text.match(/.{1,3}/g) || [];
    };
    const render = () => {
      output.innerHTML = [...input.value].map((char, index) => `
        <span class="rounded-xl border border-line bg-page px-3 py-2 text-sm font-black text-ink">${char || "space"} <span class="text-soft">#${char.charCodeAt(0) + index}</span></span>
      `).join("");
      if (subwordOutput) {
        subwordOutput.innerHTML = splitSubwords(input.value.trim()).map((chunk) => `
          <span class="rounded-xl border border-honey bg-[#fff7df] px-3 py-2 text-sm font-black text-ink">${chunk}</span>
        `).join("");
      }
    };
    input.addEventListener("input", render);
    render();
  }

  bindEmbeddings(lang) {
    const output = this.querySelector("[data-embed-output]");
    const messages = lang === "pt"
      ? [
        "pizza fica perto de cheese e menu: mesma vizinhança semântica.",
        "cheese fica perto de pizza: aparecem juntos em muitas frases.",
        "menu fica perto de pizza e price: fala sobre escolhas da pizzaria.",
        "car fica perto de vehicle, mas longe do cardápio.",
        "vehicle fica perto de car: quase a mesma ideia em outra palavra.",
        "syntax fica longe da pizzaria: outro assunto, outra vizinhança.",
      ]
      : [
        "pizza sits near cheese and menu: same semantic neighborhood.",
        "cheese sits near pizza because they often appear together.",
        "menu sits near pizza and price because it describes shop choices.",
        "car sits near vehicle, but far from the menu cluster.",
        "vehicle sits near car: nearly the same idea in another word.",
        "syntax is far from the pizza shop: different topic, different neighborhood.",
      ];
    this.querySelectorAll("[data-embed]").forEach((button) => {
      button.addEventListener("click", () => {
        output.textContent = messages[Number(button.dataset.embed)];
      });
    });
  }

  bindAttention(lang) {
    const grid = this.querySelector("[data-mask-grid]");
    const tokens = ["Slice", "Pizza", "is", "open"];
    let masked = true;
    const render = () => {
      grid.innerHTML = tokens.flatMap((row, rowIndex) => tokens.map((col, colIndex) => {
        const allowed = !masked || colIndex <= rowIndex;
        const text = allowed ? "can look" : "blocked";
        const ptText = allowed ? "pode olhar" : "bloqueado";
        return `<span class="rounded-xl border ${allowed ? "border-mint bg-[#eaf7f2]" : "border-line bg-shell"} p-2">${row} → ${col}<br><small>${lang === "pt" ? ptText : text}</small></span>`;
      })).join("");
    };
    this.querySelector("[data-mask-toggle]").addEventListener("click", () => {
      masked = !masked;
      render();
    });
    const headOutput = this.querySelector("[data-head-output]");
    const heads = lang === "pt"
      ? [
        "Head 1 procura pistas locais: palavras vizinhas que ajudam a continuar a frase.",
        "Head 2 observa papéis de conversa, como Customer e Assistant.",
        "Head 3 acompanha termos repetidos do menu, preços e preferências.",
      ]
      : [
        "Head 1 watches local clues: nearby words that help continue the sentence.",
        "Head 2 watches conversation roles such as Customer and Assistant.",
        "Head 3 tracks repeated menu terms, prices, and preferences.",
      ];
    this.querySelectorAll("[data-head]").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = Number(button.dataset.head) - 1;
        headOutput.textContent = heads[selected];
        this.querySelectorAll("[data-head]").forEach((item) => item.classList.toggle("border-coral", item === button));
      });
    });
    render();
  }

  bindSoftmax() {
    const inputs = [...this.querySelectorAll("[data-logit]")];
    const bars = this.querySelector("[data-softmax-bars]");
    const render = () => {
      const entries = inputs.map((input) => ({ token: input.dataset.logit, value: Number(input.value || 0) }));
      const max = Math.max(...entries.map((entry) => entry.value));
      const exps = entries.map((entry) => Math.exp(entry.value - max));
      const sum = exps.reduce((total, value) => total + value, 0);
      bars.innerHTML = entries.map((entry, index) => {
        const probability = exps[index] / sum;
        return `
          <div class="grid gap-1">
            <div class="flex items-center justify-between text-xs font-black text-soft">
              <span>${entry.token}</span><span>${(probability * 100).toFixed(1)}%</span>
            </div>
            <div class="h-3 overflow-hidden rounded-full bg-line">
              <span class="block h-full rounded-full bg-coral" style="width:${Math.max(3, probability * 100)}%"></span>
            </div>
          </div>
        `;
      }).join("");
    };
    inputs.forEach((input) => input.addEventListener("input", render));
    render();
  }

  bindGradient(lang) {
    const dot = this.querySelector("[data-loss-dot]");
    const output = this.querySelector("[data-loss-output]");
    const button = this.querySelector("[data-gradient-step]");
    const positions = [
      { left: 78, top: 32, loss: 3.2 },
      { left: 64, top: 38, loss: 2.4 },
      { left: 50, top: 50, loss: 1.7 },
      { left: 37, top: 64, loss: 1.1 },
      { left: 25, top: 77, loss: 0.7 },
    ];
    let index = 0;
    const render = () => {
      const point = positions[index];
      dot.style.left = `${point.left}%`;
      dot.style.top = `${point.top}%`;
      output.textContent = lang === "pt"
        ? `Passo ${index + 1}: loss aproximada ${point.loss}. O otimizador move os pesos um pouco na direção melhor.`
        : `Step ${index + 1}: approximate loss ${point.loss}. The optimizer nudges weights in a better direction.`;
    };
    button.addEventListener("click", () => {
      index = Math.min(positions.length - 1, index + 1);
      render();
    });
    render();
  }

  bindTraining(lang) {
    const output = this.querySelector("[data-step-output]");
    const batchSize = this.querySelector("[data-batch-size]");
    const batchOutput = this.querySelector("[data-batch-output]");
    const steps = lang === "pt"
      ? ["Dataset: frases simples da Slice Pizza entram no treino.", "Forward: o modelo tenta prever o próximo token.", "Loss: medimos o tamanho do erro.", "Backprop: o erro volta pelo modelo e ajusta os pesos.", "Checkpoint: salvamos o que foi aprendido."]
      : ["Dataset: simple Slice Pizza sentences enter training.", "Forward: the model tries to predict the next token.", "Loss: we measure how large the mistake was.", "Backprop: the mistake travels backward and adjusts weights.", "Checkpoint: we save what the model learned."];
    let index = 0;
    const render = () => output.textContent = `${index + 1}/${steps.length} - ${steps[index]}`;
    const renderBatch = () => {
      if (!batchSize || !batchOutput) return;
      const size = Number(batchSize.value);
      batchOutput.textContent = lang === "pt"
        ? `Batch size ${size}: o modelo estuda ${size} janelas de texto antes de um ajuste de gradiente.`
        : `Batch size ${size}: the model studies ${size} text windows before one gradient update.`;
    };
    this.querySelector("[data-step-prev]").addEventListener("click", () => {
      index = Math.max(0, index - 1);
      render();
    });
    this.querySelector("[data-step-next]").addEventListener("click", () => {
      index = Math.min(steps.length - 1, index + 1);
      render();
    });
    batchSize?.addEventListener("input", renderBatch);
    render();
    renderBatch();
  }

  bindInference() {
    const output = this.querySelector("[data-generation]");
    const samplingOutput = this.querySelector("[data-sampling-output]");
    const kvCache = this.querySelector("[data-kv-cache]");
    const temperature = this.querySelector("[data-temperature]");
    const tokenSets = {
      greedy: [" a", " tiny", " pizza", " assistant", "."],
      "top-k": [" a", " helpful", " menu", " guide", "."],
      "top-p": [" a", " playful", " pizzeria", " tutor", "."],
    };
    const base = "Slice Pizza is";
    let mode = "greedy";
    let index = 0;
    const renderMode = () => {
      const temp = (Number(temperature?.value || 40) / 100).toFixed(2);
      samplingOutput.textContent = `${mode}: temperature ${temp}. Lower is steadier; higher gives weaker tokens more chance.`;
      this.querySelectorAll("[data-sampling]").forEach((button) => {
        button.classList.toggle("border-coral", button.dataset.sampling === mode);
        button.classList.toggle("bg-[#fff7df]", button.dataset.sampling === mode);
      });
    };
    const renderCache = () => {
      const generated = output.textContent.slice(base.length).trim().split(/\s+/).filter(Boolean);
      kvCache.innerHTML = generated.map((token, tokenIndex) => `
        <span class="rounded-xl border border-line bg-white px-3 py-2">cached K/V ${tokenIndex + 1}: ${token}</span>
      `).join("") || `<span class="rounded-xl border border-line bg-white px-3 py-2">KV cache is empty before generation starts.</span>`;
    };
    this.querySelectorAll("[data-sampling]").forEach((button) => {
      button.addEventListener("click", () => {
        mode = button.dataset.sampling;
        output.textContent = base;
        index = 0;
        renderMode();
        renderCache();
      });
    });
    temperature?.addEventListener("input", renderMode);
    this.querySelector("[data-generate-next]").addEventListener("click", () => {
      const tokens = tokenSets[mode];
      if (index < tokens.length) {
        output.textContent += tokens[index];
        index += 1;
      }
      renderCache();
    });
    this.querySelector("[data-generate-reset]").addEventListener("click", () => {
      output.textContent = base;
      index = 0;
      renderCache();
    });
    renderMode();
    renderCache();
  }

  bindContextWindow(lang) {
    const input = this.querySelector("[data-context-input]");
    const output = this.querySelector("[data-context-output]");
    const render = () => {
      const tokens = input.value.trim().split(/\s+/).filter(Boolean);
      const kept = tokens.slice(-12);
      const dropped = tokens.slice(0, Math.max(0, tokens.length - kept.length));
      output.innerHTML = `
        ${dropped.map((token) => `<span class="rounded-xl border border-line bg-shell px-3 py-2 text-xs font-black text-soft opacity-45">${token}</span>`).join("")}
        ${kept.map((token) => `<span class="rounded-xl border border-mint bg-[#eaf7f2] px-3 py-2 text-xs font-black text-ink">${token}</span>`).join("")}
        <p class="basis-full text-sm font-bold text-soft">${lang === "pt" ? "Tokens antigos ficam fora quando a janela enche." : "Older tokens fall out when the context window is full."}</p>
      `;
    };
    input.addEventListener("input", render);
    render();
  }

  bindRag(lang) {
    const output = this.querySelector("[data-rag-output]");
    const flows = [
      ["Question", "What is the price?", "Retrieved note", "Slice Pizza menu card: cheese slice is $3.", "Answer", "Use the note to answer with the price."],
      ["Question", "Where is the shop?", "Retrieved note", "No trusted shop address was found in the notes.", "Answer", "Say you do not know instead of inventing."],
      ["Question", "What is the weather?", "Retrieved note", "No pizza-related document matches.", "Answer", "Refuse the off-domain question."],
    ];
    const render = (selectedIndex) => {
      const flow = flows[selectedIndex];
      output.innerHTML = `
        <div class="grid gap-2 sm:grid-cols-3">
          <span class="rounded-xl bg-white p-3"><strong>${flow[0]}:</strong><br>${flow[1]}</span>
          <span class="rounded-xl bg-white p-3"><strong>${flow[2]}:</strong><br>${flow[3]}</span>
          <span class="rounded-xl bg-white p-3"><strong>${flow[4]}:</strong><br>${flow[5]}</span>
        </div>
      `;
    };
    this.querySelectorAll("[data-rag]").forEach((button) => {
      button.addEventListener("click", () => render(Number(button.dataset.rag)));
    });
    render(0);
  }
}

class LessonQuickCheck extends HTMLElement {
  connectedCallback() {
    const info = pageInfo();
    const labels = INTERACTIVE_LABELS[info.lang];
    const key = info.isDiagram ? "default" : info.currentFile;
    const check = (QUICK_CHECKS[key] || QUICK_CHECKS.default)[info.lang];

    this.innerHTML = `
      <section class="no-print mt-8 rounded-2xl border border-line bg-white p-4 shadow-sm">
        <div class="flex items-start gap-3">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#fff7df] text-ink">
            <i data-lucide="circle-help" class="h-5 w-5"></i>
          </span>
          <div class="min-w-0 flex-1">
            <p class="m-0 text-xs font-black uppercase tracking-[0.16em] text-soft">${labels.check}</p>
            <p class="mt-1 text-sm font-black text-ink">${check.question}</p>
            <p class="mt-1 text-xs font-bold text-soft">${labels.choose}</p>
            <div class="mt-3 grid gap-2 sm:grid-cols-2">
              ${check.options.map((option, index) => `
                <button data-option="${index}" class="quick-option min-h-12 rounded-2xl border border-line bg-page px-4 py-3 text-left text-sm font-black text-ink transition hover:border-honey hover:bg-[#fff7df]" type="button">
                  <span class="mr-2 text-coral">${String.fromCharCode(65 + index)}.</span>${option}
                </button>
              `).join("")}
            </div>
            <p data-answer class="mt-3 hidden rounded-2xl bg-shell p-3 text-sm font-bold text-soft"></p>
          </div>
        </div>
      </section>
    `;

    const answerEl = this.querySelector("[data-answer]");
    this.querySelectorAll("[data-option]").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = Number(button.dataset.option);
        const isCorrect = selected === check.correct;
        this.querySelectorAll("[data-option]").forEach((optionButton) => {
          optionButton.classList.remove("border-coral", "border-mint", "bg-[#eaf7f2]", "bg-[#fff7df]");
        });
        button.classList.add(isCorrect ? "border-mint" : "border-coral", isCorrect ? "bg-[#eaf7f2]" : "bg-[#fff7df]");
        answerEl.classList.remove("hidden");
        answerEl.innerHTML = `
          <span class="inline-flex items-center gap-2 font-black text-ink">
            <i data-lucide="${isCorrect ? "check-circle-2" : "rotate-ccw"}" class="h-4 w-4 ${isCorrect ? "text-mint" : "text-coral"}"></i>
            ${isCorrect ? labels.correct : labels.tryAgain}
          </span>
          <span class="mt-1 block">${check.answer}</span>
        `;
        refreshIcons();
      });
    });

    this.querySelector(`[data-option="${check.correct}"]`)?.addEventListener("focus", () => {
      refreshIcons();
    });

    refreshIcons();
  }
}

function setupProgressBar() {
  const progressBar = document.querySelector("#progress-bar");
  if (!progressBar) return;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

function injectCompletionCard() {
  const main = document.querySelector("main");
  const nav = main?.querySelector(":scope > nav");
  if (!main) return;
  if (!main.querySelector("lesson-quick-check")) {
    const quickCheck = document.createElement("lesson-quick-check");
    main.insertBefore(quickCheck, nav || null);
  }
  if (main.querySelector("lesson-complete")) return;
  const completion = document.createElement("lesson-complete");
  main.insertBefore(completion, nav || null);
}

// ── Pizza Chat web component ──────────────────────────────

const PIZZA_SUGGESTIONS = [
  "What's on the menu?",
  "What do you recommend?",
  "Which pizzas have no meat?",
  "Do you deliver?",
];

class PizzaChat extends HTMLElement {
  constructor() {
    super();
    this._open = false;
    this._apiStatus = "off";
    this._welcome = { role: "assistant", content: "Hi! I'm the Slice Pizza AI 🍕 Ask me anything about the menu, prices, or ingredients.\n\n⚠️ English only.\n⚠️ This is a tiny experimental model — it may give wrong or unexpected answers." };
    this._history = this.loadHistory();
  }

  connectedCallback() {
    this._open = true;
    this.render();
    this.scrollToBottom();
  }

  toggle() {
    this._open = !this._open;
    if (this._open) {
      this.render();
      this.scrollToBottom();
    } else {
      const panel = this.querySelector("#pizza-chat-panel");
      if (panel) {
        panel.classList.add("closing");
        setTimeout(() => this.remove(), 200);
      }
    }
  }

  render() {
    this.innerHTML = `
      <div id="pizza-chat-panel" class="fixed bottom-5 right-5 z-50 flex w-[min(380px,calc(100vw-2rem))] flex-col rounded-3xl border border-line bg-page shadow-paper overflow-hidden" style="height:560px">
        <div class="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
          <div class="flex items-center gap-3">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-coral text-white">
              <i data-lucide="bot" class="h-5 w-5"></i>
            </span>
            <div class="min-w-0">
              <p class="text-sm font-black text-ink leading-none">Slice Pizza AI</p>
              <div class="mt-1 flex flex-wrap items-center gap-2">
                <p class="text-xs text-soft leading-none">Slice Pizza · <span id="chat-demo-label" class="font-black text-coral">demo offline</span></p>
                <span id="chat-api-status" class="chat-status is-off" aria-live="polite">
                  <span class="chat-status-text">demo offline</span>
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="chat-reset" class="grid h-8 w-8 place-items-center rounded-xl border border-line text-soft transition hover:border-honey hover:text-ink" type="button" title="Clear chat context">
              <i data-lucide="rotate-ccw" class="h-4 w-4"></i>
            </button>
            <button id="chat-close" class="grid h-8 w-8 place-items-center rounded-xl border border-line text-soft transition hover:border-coral hover:text-coral" type="button">
              <i data-lucide="x" class="h-4 w-4"></i>
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2 border-b border-line bg-[#fff7df] px-4 py-2 text-xs font-bold text-soft">
          <i data-lucide="triangle-alert" class="h-3.5 w-3.5 shrink-0 text-honey"></i>
          Tiny experimental model · may give wrong answers · English only
        </div>
        <div id="chat-messages" class="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          ${this._history.map((m) => `<div class="${m.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}">${m.content}</div>`).join("")}
        </div>
        <div id="chat-suggestions" class="flex flex-wrap gap-2 border-t border-line bg-page px-3 py-2">
          ${PIZZA_SUGGESTIONS.map((s) => `<button class="chat-suggestion rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-black text-ink transition hover:border-coral hover:text-coral" type="button">${s}</button>`).join("")}
        </div>
        <form id="chat-form" class="flex gap-2 border-t border-line bg-white p-3" autocomplete="off">
          <input id="chat-input" class="h-10 flex-1 rounded-xl border border-line bg-shell px-3 text-sm font-bold text-ink outline-none transition focus:border-honey" type="text" placeholder="Ask in English…" />
          <button id="chat-submit" class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-page transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-45" type="submit">
            <i data-lucide="send" class="h-4 w-4"></i>
          </button>
        </form>
      </div>
    `;

    refreshIcons();
    this.updateApiStatusBadge();
    this.checkApiStatus();
    this.querySelector("#chat-close")?.addEventListener("click", () => this.toggle());
    this.querySelector("#chat-reset")?.addEventListener("click", () => {
      this._history = [this._welcome];
      this.saveHistory();
      this.render();
      this.scrollToBottom();
    });
    this.querySelector("#chat-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.querySelector("#chat-input");
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      this.addMessage("user", text);
      this.fetchReply(text);
    });

    this.querySelectorAll(".chat-suggestion").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.addMessage("user", btn.textContent);
        this.fetchReply(btn.textContent);
      });
    });
  }

  addMessage(role, content) {
    this._history.push({ role, content });
    this.saveHistory();
    const messages = this.querySelector("#chat-messages");
    if (!messages) return;
    const div = document.createElement("div");
    div.className = role === "user" ? "chat-bubble-user" : "chat-bubble-bot";
    div.textContent = content;
    messages.appendChild(div);
    this.scrollToBottom();
  }

  addTyping() {
    const messages = this.querySelector("#chat-messages");
    if (!messages) return null;
    const div = document.createElement("div");
    div.className = "chat-bubble-bot chat-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(div);
    this.scrollToBottom();
    return div;
  }

  apiBase() {
    return pizzaApiBase();
  }

  setApiStatus(status) {
    this._apiStatus = status;
    this.updateApiStatusBadge();
  }

  updateApiStatusBadge() {
    const badge = this.querySelector("#chat-api-status");
    renderChatStatusBadge(badge, this._apiStatus);
    const label = this.querySelector("#chat-demo-label");
    if (label) label.textContent = this._apiStatus === "on" ? "demo live" : "demo offline";
  }

  async checkApiStatus() {
    this.setApiStatus(await checkPizzaApiStatus());
  }

  chatMessagesForApi() {
    return this._history
      .filter((message) => message !== this._welcome)
      .filter((message) => !(message.role === "assistant" && message.content === this._welcome.content))
      .map((message) => ({ role: message.role, content: message.content }));
  }

  loadHistory() {
    try {
      const saved = JSON.parse(localStorage.getItem("llm-lessons-chat-history") || "[]");
      if (Array.isArray(saved) && saved.length > 0) return saved;
    } catch {
      // Ignore corrupted local state and start a fresh chat.
    }
    return [this._welcome];
  }

  saveHistory() {
    localStorage.setItem("llm-lessons-chat-history", JSON.stringify(this._history.slice(-16)));
  }

  async fetchReply() {
    const typing = this.addTyping();
    try {
      const res = await fetch(this.apiBase() + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: this.chatMessagesForApi(),
          temperature: 0.05,
          max_tokens: 120,
        }),
      });
      const data = await res.json();
      typing?.remove();
      this.setApiStatus(res.ok ? "on" : "off");
      const reply = data.reply ?? data.choices?.[0]?.message?.content ?? data.response ?? JSON.stringify(data);
      this.addMessage("assistant", reply);
    } catch {
      typing?.remove();
      this.setApiStatus("off");
      this.addMessage("assistant", "Could not reach the Slice Pizza API. Status: off.");
    }
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      const messages = this.querySelector("#chat-messages");
      if (messages) messages.scrollTop = messages.scrollHeight;
    });
  }
}

// ── Scroll position persistence ──────────────────────────

function setupScrollPersistence() {
  const key = "llm-scroll:" + (pageInfo().currentFile);
  const saved = localStorage.getItem(key);
  if (saved) window.scrollTo({ top: parseInt(saved, 10), behavior: "instant" });
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        localStorage.setItem(key, Math.round(window.scrollY));
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── Offline indicator ─────────────────────────────────────

function setupOfflineIndicator() {
  const header = document.querySelector("lesson-header header");
  if (!header) return;
  const badge = document.createElement("div");
  badge.id = "offline-badge";
  badge.className = "hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-black text-soft shadow-paper no-print";
  badge.innerHTML = '<i data-lucide="wifi-off" class="h-3.5 w-3.5 text-coral"></i> Offline — reading from cache';
  document.body.appendChild(badge);
  const update = () => {
    badge.classList.toggle("hidden", navigator.onLine);
    refreshIcons();
  };
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
  update();
}

// ── Service Worker registration ───────────────────────────

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const swPath = location.pathname.includes("/diagrams/") ? "../sw.js" : "./sw.js";
  navigator.serviceWorker.register(swPath).catch(() => {});
}

// ── Text annotations ─────────────────────────────────────

const ICON_NOTE = `<svg viewBox="0 0 14 14" fill="currentColor" width="11" height="11" aria-hidden="true"><path d="M9.5 1a1 1 0 0 1 .707.293l2.5 2.5A1 1 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 11.5v-9A1.5 1.5 0 0 1 2.5 1h7zm-.207 1H2.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4.707L9.293 2zM4 8.5a.5.5 0 0 1 0-1h6a.5.5 0 0 1 0 1H4zm0-2a.5.5 0 0 1 0-1h6a.5.5 0 0 1 0 1H4zm0-2a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1H4z"/></svg>`;

function setupAnnotations() {
  const STORE = "llm-annotations:" + pageInfo().currentFile;
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE) || "[]"); } catch { return []; } };
  const save = (list) => localStorage.setItem(STORE, JSON.stringify(list));

  // ── Tooltip ─────────────────────────────────────────────
  const tip = document.createElement("div");
  tip.id = "annotation-tooltip";
  tip.style.display = "none";
  document.body.appendChild(tip);

  function showTooltip(clientX, clientY, note) {
    tip.textContent = note;
    tip.style.display = "block";
    tip.style.top = (clientY - tip.offsetHeight - 12) + "px";
    tip.style.left = Math.min(clientX, window.innerWidth - 256) + "px";
  }
  function hideTooltip() { tip.style.display = "none"; }
  document.addEventListener("mousemove", (e) => {
    if (tip.style.display === "block") {
      tip.style.top = (e.clientY - tip.offsetHeight - 12) + "px";
      tip.style.left = Math.min(e.clientX, window.innerWidth - 256) + "px";
    }
  });

  // ── Popover ──────────────────────────────────────────────
  // anchorEl: DOM element used to position the popover
  // existingNote: string if editing, null if new
  // onSave(newNote): called with the typed note text
  // onDelete(): called when user clicks Delete (only shown when existingNote is set)
  function showPopover(anchorEl, existingNote, onSave, onDelete) {
    removePopover();
    const pop = document.createElement("div");
    pop.id = "annotation-popover";

    const rect = anchorEl.getBoundingClientRect();
    pop.style.top = Math.min(rect.bottom + 8, window.innerHeight - 240) + "px";
    pop.style.left = Math.min(rect.left, window.innerWidth - 316) + "px";

    pop.innerHTML = `
      <p class="mb-2 text-xs font-black uppercase tracking-widest text-soft">${existingNote !== null ? "Edit note" : "Add note"}</p>
      <textarea id="ann-input" class="w-full rounded-xl border border-line bg-shell p-2 text-sm font-bold text-ink outline-none focus:border-honey resize-none" rows="3" placeholder="Your note…">${existingNote ?? ""}</textarea>
      <div class="mt-3 flex items-center justify-between gap-2">
        ${onDelete ? `<button id="ann-delete" class="text-xs font-black text-coral hover:underline" type="button">Delete</button>` : `<span></span>`}
        <div class="flex gap-2">
          <button id="ann-cancel" class="h-8 rounded-lg border border-line px-3 text-xs font-black text-soft" type="button">Cancel</button>
          <button id="ann-save" class="h-8 rounded-lg bg-ink px-3 text-xs font-black text-page" type="button">Save</button>
        </div>
      </div>
    `;
    document.body.appendChild(pop);
    pop.querySelector("#ann-input").focus();
    pop.querySelector("#ann-cancel").addEventListener("click", removePopover);
    pop.querySelector("#ann-save").addEventListener("click", () => {
      const val = pop.querySelector("#ann-input").value.trim();
      if (!val) return;
      removePopover();
      onSave(val);
    });
    pop.querySelector("#ann-delete")?.addEventListener("click", () => {
      removePopover();
      onDelete();
    });
    setTimeout(() => document.addEventListener("click", removePopover, { once: true }), 0);
  }

  function removePopover() { document.getElementById("annotation-popover")?.remove(); }

  // ── Text-range highlight (select + right-click) ─────────
  function highlightRange(root, searchText, id, note) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const idx = node.textContent.indexOf(searchText);
      if (idx === -1) continue;
      try {
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + searchText.length);
        const mark = document.createElement("mark");
        mark.className = "annotation-highlight";
        mark.dataset.id = id;
        range.surroundContents(mark);
        attachMarkHandlers(mark, id, note);
      } catch { /* selection crossed element boundaries — skip */ }
      return;
    }
  }

  function attachMarkHandlers(mark, id, note) {
    const btn = document.createElement("button");
    btn.className = "annotation-note-btn";
    btn.type = "button";
    btn.title = note;
    btn.innerHTML = ICON_NOTE;
    mark.appendChild(btn);

    mark.addEventListener("mouseenter", (e) => showTooltip(e.clientX, e.clientY, note));
    mark.addEventListener("mouseleave", hideTooltip);

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const list = load();
      const item = list.find((a) => a.id === id);
      if (!item) return;
      showPopover(btn, item.note,
        (newNote) => {
          item.note = newNote;
          save(list);
          btn.title = newNote;
          mark.removeEventListener("mouseenter", null);
          mark.addEventListener("mouseenter", (ev) => showTooltip(ev.clientX, ev.clientY, newNote));
        },
        () => {
          save(list.filter((a) => a.id !== id));
          mark.replaceWith(document.createTextNode(mark.textContent.replace(/​/g, "").trimEnd()));
        }
      );
    });
  }

  // Right-click on selected text inside .doc-content
  document.addEventListener("contextmenu", (e) => {
    const sel = window.getSelection();
    const text = sel?.toString().trim();
    if (!text || text.length < 3) return;
    if (!sel.anchorNode?.parentElement?.closest(".doc-content")) return;
    e.preventDefault();
    const capturedText = text;
    // Use a fake anchor at cursor position
    const fakeAnchor = { getBoundingClientRect: () => ({ bottom: e.clientY, left: e.clientX }) };
    showPopover(fakeAnchor, null,
      (note) => {
        const id = Date.now().toString(36);
        const list = load();
        list.push({ id, type: "text", text: capturedText, note, createdAt: new Date().toISOString() });
        save(list);
        sel.removeAllRanges();
        const content = document.querySelector(".doc-content");
        if (content) highlightRange(content, capturedText, id, note);
      },
      null
    );
  });

  // ── Paragraph + button ───────────────────────────────────
  function setupParaButtons() {
    const content = document.querySelector(".doc-content");
    if (!content) return;

    content.querySelectorAll(":scope > p, :scope > h2, :scope > h3").forEach((el) => {
      const paraKey = el.textContent.trim().slice(0, 80);

      // + button (visible on hover via CSS)
      const addBtn = document.createElement("button");
      addBtn.className = "para-annotate-btn";
      addBtn.type = "button";
      addBtn.title = "Add note";
      addBtn.innerHTML = `<svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M8 1.5a.75.75 0 0 1 .75.75v5h5a.75.75 0 0 1 0 1.5h-5v5a.75.75 0 0 1-1.5 0v-5h-5a.75.75 0 0 1 0-1.5h5v-5A.75.75 0 0 1 8 1.5z"/></svg>`;
      el.appendChild(addBtn);

      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const list = load();
        const existing = list.find((a) => a.type === "para" && a.paraKey === paraKey);
        showPopover(addBtn, existing?.note ?? null,
          (note) => {
            const freshList = load();
            const item = freshList.find((a) => a.type === "para" && a.paraKey === paraKey);
            if (item) {
              item.note = note;
              save(freshList);
              const badge = el.querySelector(".para-annotation-badge");
              if (badge) badge.title = note;
            } else {
              const id = Date.now().toString(36);
              freshList.push({ id, type: "para", paraKey, note, createdAt: new Date().toISOString() });
              save(freshList);
              insertParaBadge(el, id, note);
              el.classList.add("has-annotation");
            }
          },
          existing ? () => {
            save(load().filter((a) => !(a.type === "para" && a.paraKey === paraKey)));
            el.querySelector(".para-annotation-badge")?.remove();
            el.classList.remove("has-annotation");
          } : null
        );
      });

      // Show badge if annotation already exists
      const list = load();
      const existing = list.find((a) => a.type === "para" && a.paraKey === paraKey);
      if (existing) {
        insertParaBadge(el, existing.id, existing.note);
        el.classList.add("has-annotation");
      }
    });
  }

  function insertParaBadge(el, id, note) {
    if (el.querySelector(".para-annotation-badge")) return;
    const badge = document.createElement("button");
    badge.className = "para-annotation-badge";
    badge.type = "button";
    badge.title = note;
    badge.innerHTML = ICON_NOTE;
    // Insert before the + button (last child)
    el.insertBefore(badge, el.querySelector(".para-annotate-btn"));

    badge.addEventListener("mouseenter", (e) => showTooltip(e.clientX, e.clientY, note));
    badge.addEventListener("mouseleave", hideTooltip);
    badge.addEventListener("click", (e) => {
      e.stopPropagation();
      const list = load();
      const item = list.find((a) => a.id === id);
      if (!item) return;
      showPopover(badge, item.note,
        (newNote) => {
          item.note = newNote;
          save(list);
          badge.title = newNote;
        },
        () => {
          save(list.filter((a) => a.id !== id));
          badge.remove();
        }
      );
    });
  }

  // ── Apply saved annotations on page load ─────────────────
  function applyAll() {
    const content = document.querySelector(".doc-content");
    if (content) {
      load().forEach((ann) => {
        if (ann.type === "text" || !ann.type) highlightRange(content, ann.text, ann.id, ann.note);
      });
    }
    setupParaButtons();
  }

  applyAll();
}

// ── Scroll reveal ─────────────────────────────────────────

function setupScrollReveal() {
  const targets = document.querySelectorAll(
    ".doc-content h2, .doc-content h3, .doc-content p, .doc-content pre, .doc-content blockquote, .doc-content table, .doc-content ul, learning-lab, lesson-complete, lesson-quick-check"
  );
  targets.forEach((el) => el.classList.add("reveal"));
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
    { threshold: 0.08 }
  );
  targets.forEach((el) => observer.observe(el));
}

customElements.define("lesson-header", LessonHeader);
customElements.define("lesson-sidebar", LessonSidebar);
customElements.define("lesson-complete", LessonComplete);
customElements.define("learning-lab", LearningLab);
customElements.define("lesson-quick-check", LessonQuickCheck);
customElements.define("pizza-chat", PizzaChat);

document.addEventListener("DOMContentLoaded", () => {
  registerServiceWorker();
  setupProgressBar();
  setupScrollReveal();
  setupScrollPersistence();
  setupAnnotations();
  injectCompletionCard();
  refreshIcons();
  setTimeout(setupOfflineIndicator, 0);
});


