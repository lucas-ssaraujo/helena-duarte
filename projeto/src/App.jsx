import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Leaf, Drop, User, List, X, CaretDown, Check, Copy, MapPin, CalendarBlank } from '@phosphor-icons/react';

const services = [
  { Icon: Leaf, title: 'Dermatologia clínica', text: 'Acne, sensibilidade ou uma mudança na pele? Suas dúvidas merecem atenção, avaliação e orientação.', more: 'Um espaço para avaliar suas dúvidas e alterações na pele. O cuidado começa com uma conversa e uma avaliação individual.' },
  { Icon: Drop, title: 'Saúde dos cabelos', text: 'Quando seus fios pedem atenção, o primeiro passo é entender o que está acontecendo.', more: 'A consulta considera sua rotina e seu histórico para entender as necessidades dos cabelos e do couro cabeludo.' },
  { Icon: User, title: 'Cuidado individual', text: 'Sua pele, sua rotina, seu momento. Um plano de cuidado construído com você e para você.', more: 'Orientações para uma rotina de cuidado que faça sentido para você, construída a partir da avaliação em consulta.' },
];
const faqs = [
  ['Como funciona a primeira consulta?', 'Ela começa com uma conversa sobre suas dúvidas, seu histórico e sua rotina. Depois da avaliação, os próximos passos são definidos de forma individual.'],
  ['Posso conversar sobre pele e cabelos na mesma consulta?', 'Você pode apresentar suas dúvidas no atendimento. A avaliação considera suas necessidades e pode indicar acompanhamento específico.'],
  ['O que levar para a consulta?', 'Organize suas dúvidas, exames anteriores e a lista dos produtos e medicamentos que utiliza. As orientações de preparação devem ser confirmadas com a clínica.'],
  ['Como funciona o agendamento neste site?', 'Este é um projeto demonstrativo com uma médica fictícia. O formulário prepara uma mensagem de exemplo, sem enviar dados ou reservar um horário real.'],
];
function CTA({children='Agendar consulta', className='', ...props}) {return <a href="#consulta" className={`button ${className}`} {...props}>{children}<ArrowRight size={21} aria-hidden="true" /></a>}
function Label({number, children}) {return <div className="section-label" data-reveal><span>{number}</span><span>{children}</span><i/></div>}

export function App() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [message,setMessage]=useState('');
  const [copied,setCopied]=useState(false);
  const [copyError,setCopyError]=useState(false);
  const dialog=useRef(null);
  useEffect(()=>{const close=e=>{if(e.key==='Escape')setMenuOpen(false)};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[]);
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = [...document.querySelectorAll('[data-reveal]')];
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const range = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', range > 0 ? Math.min(1, window.scrollY / range) : 0);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    let observer;
    if (!reduced.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      root.classList.add('motion-enabled');
      targets.forEach(target => observer.observe(target));
    }
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      observer?.disconnect();
      root.classList.remove('motion-enabled');
      root.style.removeProperty('--scroll-progress');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  function prepare(e) {
    e.preventDefault(); const data=new FormData(e.currentTarget);
    const name=String(data.get('name')).trim();
    setMessage(`Olá! ${name ? `Meu nome é ${name}. ` : ''}Gostaria de informações sobre ${data.get('type')==='Retorno'?'uma consulta de retorno':'uma primeira consulta'} com a Dra. Helena Duarte. Tenho preferência pelo período da ${data.get('period').toLowerCase()}. Poderiam informar a disponibilidade e os detalhes do atendimento?`);
    setCopied(false); setCopyError(false); dialog.current.showModal();
  }
  async function copyMessage() {try{await navigator.clipboard.writeText(message);setCopied(true);setCopyError(false)}catch{setCopied(false);setCopyError(true)}}
  return <>
    <div className="reading-progress" aria-hidden="true"/><a className="skip-link" href="#principal">Ir para o conteúdo</a>
    <header className="header container">
      <a href="#inicio" aria-label="Helena Duarte — início" className="wordmark">Helena <span>Duarte</span></a>
      <nav aria-label="Navegação principal" className={menuOpen?'nav is-open':'nav'}>
        <a href="#sobre" onClick={()=>setMenuOpen(false)}>Sobre</a><a href="#cuidados" onClick={()=>setMenuOpen(false)}>Cuidados</a><a href="#consulta" onClick={()=>setMenuOpen(false)}>Consulta</a>
      </nav>
      <CTA className="nav-cta" />
      <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen?'Fechar menu':'Abrir menu'}>{menuOpen?<X size={24}/>:<List size={24}/>}</button>
    </header>
    <main id="principal">
      <section className="hero" id="inicio">
        <img className="hero-photo" src="/images/doctor-hero.webp" alt="Dra. Helena Duarte, personagem fictícia, em um consultório acolhedor" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow"><i/> Dermatologia · Belém</p>
          <h1>Sua pele merece<br/>um <em>cuidado</em> que<br/>começa <em>por você.</em></h1>
          <p className="hero-description">Não deixe suas dúvidas para depois.<br className="desktop-break"/> Um espaço para ser ouvida e entender a sua pele.</p>
          <CTA className="hero-cta">Comece seu cuidado</CTA>
        </div>
      </section>
      <section id="cuidados" className="services container">
        <Label number="01">Cuidados</Label>
        <div className="services-grid">
          {services.map(({Icon,title,text,more},index)=><details className="service" key={title} data-reveal style={{'--reveal-delay': `${index * 90}ms`}}>
            <summary><Icon className="service-icon" size={46} weight="thin" aria-hidden="true"/><span className="service-copy"><span className="service-title">{title}</span><span className="service-text">{text}</span></span><CaretDown className="service-chevron" size={16} aria-hidden="true"/></summary>
            <p className="service-more">{more}</p>
          </details>)}
        </div>
        <p className="demo-note">Projeto demonstrativo · médica fictícia</p>
      </section>
      <section className="about section container" id="sobre">
        <Label number="02">Um olhar individual</Label>
        <div className="about-grid">
          <div className="about-image" data-reveal><img src="/images/doctor-hero.webp" alt="Retrato ilustrativo da Dra. Helena Duarte" loading="lazy"/><span>Dra. Helena Duarte <small>Dermatologia</small></span></div>
          <div className="about-copy" data-reveal><p className="eyebrow">Você no centro do cuidado</p><h2>Antes de cuidar da sua pele,<br/><em>quero conhecer você.</em></h2><p>Você não precisa chegar com todas as respostas. Pode chegar com dúvidas, com uma queixa que vem adiando ou com vontade de entender melhor a sua pele.</p><p>Aqui, a conversa vem primeiro. Conhecer sua história, olhar para sua rotina e explicar cada orientação fazem parte do cuidado. Para que você participe das decisões e saiba por onde começar.</p><CTA>Quero dar o primeiro passo</CTA><p className="small-note">Perfil e consultório criados para demonstração.</p></div>
        </div>
      </section>
      <section className="journey section" id="experiencia">
        <div className="container"><Label number="03">Sua consulta</Label><div className="journey-grid"><div data-reveal><h2>Você fala.<br/><em>O cuidado começa.</em></h2><p className="section-intro">Uma consulta deve trazer mais do que orientações: deve abrir espaço para perguntas e ajudar você a entender os próximos passos.</p></div><ol className="steps">
          <li data-reveal><span>01</span><div><h3>Uma conversa sem pressa</h3><p>Entender suas dúvidas, conhecer seu histórico e ouvir o que é importante para você.</p></div></li>
          <li data-reveal style={{'--reveal-delay':'90ms'}}><span>02</span><div><h3>Um olhar para o seu momento</h3><p>Avaliar suas necessidades e explicar os próximos passos de um jeito claro.</p></div></li>
          <li data-reveal style={{'--reveal-delay':'180ms'}}><span>03</span><div><h3>Um cuidado para continuar</h3><p>Construir orientações para sua rotina e planejar o acompanhamento quando necessário.</p></div></li>
        </ol></div></div>
      </section>
      <section className="consultation section container" id="consulta">
        <Label number="04">Vamos conversar</Label>
        <div className="consultation-grid"><div data-reveal><p className="eyebrow">O primeiro passo é seu</p><h2>O primeiro passo<br/><em>é cuidar de você.</em></h2><p className="section-intro">Tem algo na sua pele ou nos seus cabelos que merece atenção? Dê o primeiro passo e prepare sua solicitação de informações.</p><p className="location"><MapPin size={19}/> Belém, Pará <span>· cenário ilustrativo</span></p><div className="consultation-note"><CalendarBlank size={26}/><p>Este formulário é uma demonstração.<br/>Nenhum dado será enviado ou horário reservado.</p></div></div>
        <form data-reveal className="appointment-form" onSubmit={prepare}>
          <h3>Seu cuidado começa aqui.</h3><p>Uma mensagem simples. Um primeiro passo importante.</p>
          <label htmlFor="name">Seu nome <span>(opcional)</span></label><input id="name" name="name" autoComplete="given-name" maxLength={80} placeholder="Como você gosta de ser chamado?"/>
          <label htmlFor="type">Tipo de consulta</label><select id="type" name="type"><option>Primeira consulta</option><option>Retorno</option></select>
          <fieldset><legend>Qual período você prefere?</legend><div className="periods"><label><input type="radio" name="period" value="Manhã" defaultChecked/><span>Manhã</span></label><label><input type="radio" name="period" value="Tarde"/><span>Tarde</span></label></div></fieldset>
          <button type="submit" className="button">Preparar solicitação <ArrowRight size={21}/></button><small>Simulação local. Seus dados não são armazenados.</small>
        </form>
        </div>
      </section>
      <section className="faq section container" id="faq"><Label number="05">Perguntas frequentes</Label><div className="faq-grid"><div data-reveal><h2>Ficou alguma<br/><em>dúvida?</em></h2><p className="section-intro">Algumas respostas para ajudar você a dar o primeiro passo.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} data-reveal><summary><span className="faq-number">0{i+1}</span><h3>{q}</h3><CaretDown size={20}/></summary><p>{a}</p></details>)}</div></div></section>
      <section className="last-cta container" data-reveal><p className="eyebrow">Cuidado que começa por você</p><h2>Sua pele faz parte<br/><em>da sua história.</em></h2><p className="closing-copy">Reserve espaço para cuidar dela. E de você.</p><CTA>Vamos começar?</CTA></section>
    </main>
    <footer className="footer container"><div><a href="#inicio" className="wordmark">Helena <span>Duarte</span></a><p>Dermatologia · Belém, Pará</p></div><nav aria-label="Rodapé"><a href="#sobre">Sobre</a><a href="#cuidados">Cuidados</a><a href="#faq">Perguntas frequentes</a></nav><p className="footer-demo">Projeto demonstrativo. Médica, consultório e imagens fictícios.<br/>Não oferece atendimento médico real.</p><span className="copyright">© 2026 · Helena Duarte — conceito de website</span></footer>
    <dialog ref={dialog} className="message-dialog" aria-labelledby="message-title"><button className="dialog-close" onClick={()=>dialog.current.close()} aria-label="Fechar mensagem"><X size={23}/></button><p className="eyebrow">Prévia de agendamento</p><h2 id="message-title">Sua mensagem<br/><em>está pronta.</em></h2><p className="dialog-description">Confira o texto da sua solicitação.</p><blockquote>{message}</blockquote><button className="button" onClick={copyMessage}>{copied?<Check size={20}/>:<Copy size={20}/>} {copied?'Mensagem copiada':'Copiar mensagem'}</button><p role="status" className="dialog-note">{copied?'Texto copiado para a área de transferência. ':copyError?'Não foi possível copiar automaticamente. Selecione e copie o texto acima. ':'Esta é apenas uma prévia. '}Nenhuma consulta foi agendada.</p></dialog>
  </>
}
