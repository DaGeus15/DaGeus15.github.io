/**
 * Arranca en el documento inicial de Inicio, antes del primer pintado.
 * La salida tiene un límite aunque se demoren las descargas.
 */
export function homeIntroScript(home) {
  return `(() => {
    if (location.pathname !== ${JSON.stringify(home)}) return;

    const local = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
    const preview = local && new URLSearchParams(location.search).get("intro") === "1";
    if (!preview && location.hash && location.hash !== "#top") return;

    const navigation = performance.getEntriesByType("navigation")[0];
    const previous = document.referrer && new URL(document.referrer);
    const fromPortfolio = previous && previous.origin === location.origin && previous.pathname !== "/";
    if (!preview && (navigation?.type === "back_forward" || (fromPortfolio && navigation?.type !== "reload"))) return;

    const root = document.documentElement;
    const reduced = !preview && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = () => {
      clearTimeout(deadline);
      document.querySelector(".hero-intro")?.setAttribute("data-leaving", "");
      delete root.dataset.homeIntro;
      document.removeEventListener("pointerdown", reveal, true);
      document.removeEventListener("focusin", onFocus);
    };
    const onFocus = (event) => {
      if (event.target.matches(":focus-visible")) reveal();
    };
    const deadline = setTimeout(reveal, reduced ? 650 : 2400);

    if (preview) root.dataset.homeIntroPreview = "";
    root.dataset.homeIntro = "playing";
    document.addEventListener("pointerdown", reveal, true);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("DOMContentLoaded", async () => {
      if (root.dataset.homeIntro !== "playing") return;

      const intro = document.querySelector(".hero-intro");
      const homePage = document.querySelector('[data-page="home"]');
      const images = Array.from(homePage?.querySelectorAll('img[loading="eager"]') ?? []);
      const loaded = document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => addEventListener("load", resolve, { once: true }));
      const animationFinished = Promise.allSettled(
        (intro?.getAnimations({ subtree: true }) ?? []).map((animation) => animation.finished),
      );
      await Promise.allSettled([
        animationFinished.then(() => new Promise((resolve) => setTimeout(resolve, 180))),
        loaded,
        document.fonts?.ready,
        ...images.map((image) => image.decode()),
      ]);
      if (root.dataset.homeIntro === "playing") reveal();
    }, { once: true });
  })();`;
}
