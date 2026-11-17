import Footer from "@/components/layout/Footer";

/** El marco y el pie de cada página de primer nivel. */
export default function PageShell({ t, current = null, children }) {
  return (
    <>
      <main id="main" className="page" data-page={current ?? "home"}>
        {children}
      </main>
      <div className="page">
        <Footer t={t} />
      </div>
    </>
  );
}
