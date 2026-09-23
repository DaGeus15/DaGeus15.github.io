import SectionHeading from "./SectionHeading";
import Timeline from "@/components/ui/Timeline";

export default function Experience({ t }) {
  const { ui } = t;

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading id="experience" title={t.sections.experience.title} />
      <div className="reveal">
        <Timeline
          experience={t.experience}
          labels={{ currentRole: ui.currentRole, roleStack: ui.roleStack }}
        />
      </div>
    </section>
  );
}
