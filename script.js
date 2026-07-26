// -------- Partículas bioluminiscentes --------
  const contenedorParticulas = document.getElementById('particulas');
  const totalParticulas = 26;
  for(let i=0;i<totalParticulas;i++){
    const p = document.createElement('div');
    p.className = 'particula';
    const tam = 4 + Math.random()*10;
    p.style.width = tam+'px';
    p.style.height = tam+'px';
    p.style.left = Math.random()*100+'vw';
    p.style.setProperty('--drift', (Math.random()*80-40)+'px');
    p.style.animationDuration = (14 + Math.random()*18)+'s';
    p.style.animationDelay = (Math.random()*20)+'s';
    contenedorParticulas.appendChild(p);
  }

  // -------- Fade de la introducción al bajar (efecto "hundirse") --------
  const inicioWrap = document.getElementById('inicio');
  function actualizarIntro(){
    const rect = inicioWrap.getBoundingClientRect();
    const vh = window.innerHeight;
    // progreso: 0 cuando el bloque está centrado, 1 cuando ya salió por arriba
    const progreso = Math.min(Math.max((vh*0.15 - rect.top) / (rect.height*0.9), 0), 1);
    inicioWrap.style.opacity = 1 - progreso;
    inicioWrap.style.transform = `translateY(${progreso*40}px) scale(${1 - progreso*0.04})`;
  }
  window.addEventListener('scroll', actualizarIntro, {passive:true});
  actualizarIntro();

  // -------- Reveal on scroll --------
  const observados = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entradas)=>{
    entradas.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold:0.15});
  observados.forEach(el=>observer.observe(el));

  // -------- Datos para las fichas en movimiento --------
  const datosCuriosos = [
    "En 1964, Randy Gardner, de 17 años, permaneció despierto 264 horas (11 días) como proyecto de feria científica, bajo supervisión de investigadores del sueño.",
    "El Libro Guinness dejó de aceptar intentos de récord por privación de sueño debido a los riesgos graves para la salud que implican.",
    "Pasamos aproximadamente un tercio de la vida durmiendo: aun así, sigue siendo de las funciones corporales menos comprendidas por el público general.",
    "Existen relatos virales sobre un supuesto 'experimento soviético de privación del sueño'; en realidad es una leyenda de internet (creepypasta), no un estudio real documentado.",
    "Durante el sueño profundo, el cerebro activa un sistema de limpieza (el sistema glinfático) que elimina desechos metabólicos acumulados durante el día.",
    "Los adolescentes tienen un reloj circadiano naturalmente retrasado: no es 'pereza' que les cueste dormir temprano, es biología."
  ];
  const recursos = [
    "Libro: 'Por qué dormimos', de Matthew Walker — divulgación accesible sobre neurociencia del sueño.",
    "Busca documentales o charlas TED sobre privación del sueño para complementar esta sección con video.",
    "Sleep Foundation publica guías breves y actualizadas sobre higiene del sueño en distintos grupos de edad.",
    "Una meditación guiada corta antes de dormir puede sustituir el hábito de revisar el celular en la cama.",
    "Revisa estudios sobre el reloj circadiano adolescente si tu público objetivo son estudiantes.",
    "Un podcast de ciencia accesible es una buena forma de introducir el tema a públicos jóvenes."
  ];

  function crearFicha(texto, tipo, indice){
    const div = document.createElement('div');
    div.className = 'ficha ' + tipo;
    const label = tipo === 'dato' ? 'Dato curioso' : 'Recurso';
    div.innerHTML = `<span class="eyebrow">${label} ${String(indice).padStart(2,'0')}</span><p>${texto}</p>`;
    return div;
  }

  function llenarFila(id, lista, tipo){
    const fila = document.getElementById(id);
    // se duplica el contenido para lograr el loop continuo sin salto
    [...lista, ...lista].forEach((texto, i)=>{
      fila.appendChild(crearFicha(texto, tipo, (i % lista.length) + 1));
    });
  }

  llenarFila('fila-datos', datosCuriosos, 'dato');
  llenarFila('fila-recursos', recursos, 'recurso');