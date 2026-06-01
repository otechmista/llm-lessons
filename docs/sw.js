const CACHE = "llm-lessons-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./00_course_guide.html",
  "./01_introduction.html",
  "./02_how_llms_work.html",
  "./03_tokenization.html",
  "./04_embeddings.html",
  "./05_self_attention.html",
  "./06_transformer_blocks.html",
  "./07_forward_pass.html",
  "./08_loss_and_backpropagation.html",
  "./09_training_loop.html",
  "./10_inference.html",
  "./11_checkpoint_and_weights.html",
  "./12_openai_api_layer.html",
  "./13_limitations_of_the_model.html",
  "./14_file_by_file_lessons.html",
  "./15_simple_context_model.html",
  "./16_ai_for_young_builders.html",
  "./diagrams/README.html",
  "./diagrams/training_flow.html",
  "./diagrams/inference_flow.html",
  "./diagrams/context_tokens_flow.html",
  "./diagrams/checkpoint_flow.html",
  "./diagrams/attention_flow.html",
  "./diagrams/transformer_flow.html",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Only handle GET requests for same-origin or CDN assets
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      // Cache-first for local assets, network-first for CDN
      const isLocal = new URL(e.request.url).origin === self.location.origin;
      return isLocal ? (cached || network) : (network || cached);
    })
  );
});
