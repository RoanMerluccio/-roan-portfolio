const SERVICES = [
  { n: '01', title: 'Motorsport', desc: 'F1, Formula SAE, track days, and racing series coverage.' },
  { n: '02', title: 'Rolling Shots', desc: 'Two-car rolling and cinematic motion photography on the road.' },
  { n: '03', title: 'Dealership', desc: 'Vehicle listings, showroom, and brand media for dealers.' },
  { n: '04', title: 'Aerial', desc: 'Drone photography and video for events, properties, and automotive.' },
  { n: '05', title: 'Events', desc: 'Car shows, meets, launches, and automotive gatherings.' },
]

export function ServiceBlocks() {
  return (
    <section className="px-6 pb-8">
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-xs tracking-widest uppercase text-accent">What I Shoot</p>
        <p className="text-xs tracking-widest uppercase text-muted">5 Disciplines</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {SERVICES.slice(0, 3).map((s, i) => (
          <div
            key={s.n}
            className="bg-background p-6"
            style={{ borderTop: `2px solid ${i === 0 ? 'var(--color-accent)' : 'transparent'}` }}
          >
            <p className="text-xs tracking-widest text-accent mb-2">{s.n}</p>
            <h3 className="text-sm font-bold uppercase text-white mb-2">{s.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mt-px">
        {SERVICES.slice(3).map(s => (
          <div
            key={s.n}
            className="bg-background p-6"
            style={{ borderTop: '2px solid transparent' }}
          >
            <p className="text-xs tracking-widest text-accent mb-2">{s.n}</p>
            <h3 className="text-sm font-bold uppercase text-white mb-2">{s.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
