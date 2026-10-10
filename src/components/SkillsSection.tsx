import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimationWrapper from './AnimationWrapper';
import StaggeredAnimationGroup from './StaggeredAnimationGroup';
import { useServices, useSkills } from '@/hooks/useContent';

const defaultSkills = [
  { name: "Python", level: 90, icon: "🐍" },
  { name: "JavaScript", level: 85, icon: "JS" },
  { name: "HTML / CSS", level: 95, icon: "◇" },
  { name: "Logic & Systems", level: 88, icon: "◆" },
];

const defaultServices = [
  { num: "01", title: "UI/UX Strategy" },
  { num: "02", title: "Web Systems" },
  { num: "03", title: "Game Architecture" },
  { num: "04", title: "Cloud Solutions" },
];

const SkillsSection = () => {
  const { data: skillRows } = useSkills();
  const { data: serviceRows } = useServices();
  const skills = skillRows?.length
    ? skillRows.map((s) => ({ name: s.name, level: s.level, icon: s.icon }))
    : defaultSkills;
  const services = serviceRows?.length
    ? serviceRows.map((s) => ({ num: s.num, title: s.title }))
    : defaultServices;


  return (
    <section id="skills" className="section-padding relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-14">
          <AnimationWrapper animation="fadeUp">
            <div>
              <div className="eyebrow">// What We Do</div>
              <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
                Comprehensive<br />
                Digital <span className="accent-italic">Excellence</span>
              </h2>
            </div>
          </AnimationWrapper>
          <AnimationWrapper animation="fadeUp" delay={150}>
            <p className="text-muted-foreground max-w-md lg:ml-auto">
              A range of creative and digital services designed to help your brand stand
              out in an increasingly competitive digital landscape.
            </p>
          </AnimationWrapper>
        </div>

        {/* Services list */}
        <div className="surface-card divide-y divide-border overflow-hidden">
          <StaggeredAnimationGroup animation="fadeUp" staggerDelay={80}>
            {services.map((s) => (
              <Link
                key={s.num}
                to={`/booking?service=${encodeURIComponent(s.title)}`}
                className="group flex items-center justify-between px-6 md:px-10 py-6 md:py-8 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="font-mono text-sm text-muted-foreground">{s.num}</span>
                  <span className="font-display font-bold text-2xl md:text-3xl">
                    {s.title}
                  </span>
                </div>
                <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                  →
                </span>
              </Link>
            ))}
          </StaggeredAnimationGroup>
        </div>

        {/* Toolkit */}
        <div className="mt-20">
          <AnimationWrapper animation="fadeUp">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="font-display font-bold text-3xl md:text-4xl">Current Toolkit</h3>
              <p className="mt-3 text-muted-foreground">
                The technologies we use and continually master across the IT landscape.
              </p>
            </div>
          </AnimationWrapper>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <AnimationWrapper key={skill.name} animation="fadeUpScale" delay={150 + i * 100}>
                <SkillCard skill={skill} />
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill }: { skill: { name: string; level: number; icon: string } }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(skill.level), 300);
    return () => clearTimeout(t);
  }, [skill.level]);

  return (
    <div className="surface-card p-6 text-center">
      <div className="w-12 h-12 mx-auto rounded-lg bg-muted flex items-center justify-center border border-border">
        <span className="font-mono font-bold text-primary text-sm">{skill.icon}</span>
      </div>
      <div className="mt-4 font-display font-semibold text-lg">{skill.name}</div>
      <div className="mt-4 skill-bar">
        <div className="skill-progress" style={{ width: `${width}%` }} />
      </div>
      <div className="mt-2 text-[11px] font-mono text-muted-foreground tracking-widest">
        {skill.level}% PROFICIENCY
      </div>
    </div>
  );
};

export default SkillsSection;
