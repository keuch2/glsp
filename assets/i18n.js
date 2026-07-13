/* GLSP i18n — text-node walker with ES→EN/PT dictionary
   Persists choice in localStorage; updates html[lang] and <title>.
   Strings keyed by trimmed Spanish text. Only translates entries present in DICT. */
(function () {
  'use strict';

  // ---------------- Dictionary ----------------
  // Each key is a trimmed Spanish string. Values: { en, pt }
  const DICT = {
    // Topbar / utility
    'Año Masónico': { en: 'Masonic Year', pt: 'Ano Maçônico' },
    'Área de Hermanos': { en: 'Brethren Area', pt: 'Área dos Irmãos' },

    // Nav / mobile menu
    'Gran Logia': { en: 'Grand Lodge', pt: 'Grande Loja' },
    'Mensaje del Gran Maestro': { en: 'Message from the Grand Master', pt: 'Mensagem do Grão-Mestre' },
    'Actualidad': { en: 'Current Affairs', pt: 'Atualidade' },
    'Gran Cuadro': { en: 'Grand Officers Board', pt: 'Quadro de Grandes Oficiais' },
    'Histórico de Grandes Maestros': { en: 'Past Grand Masters', pt: 'Histórico de Grão-Mestres' },
    'Historia': { en: 'History', pt: 'História' },
    'Noticias': { en: 'News', pt: 'Notícias' },
    'Centro Cultural': { en: 'Cultural Center', pt: 'Centro Cultural' },
    'Eventos': { en: 'Events', pt: 'Eventos' },
    'Filantropía': { en: 'Philanthropy', pt: 'Filantropia' },
    'Masonería': { en: 'Freemasonry', pt: 'Maçonaria' },
    'Contacto': { en: 'Contact', pt: 'Contato' },
    'Artículos': { en: 'Articles', pt: 'Artigos' },
    'Grandes Maestros': { en: 'Grand Masters', pt: 'Grão-Mestres' },

    // Common / breadcrumbs / chapter labels
    'Inicio': { en: 'Home', pt: 'Início' },
    'Editorial': { en: 'Editorial', pt: 'Editorial' },
    'Doctrina': { en: 'Doctrine', pt: 'Doutrina' },
    'Principios': { en: 'Principles', pt: 'Princípios' },
    'Mensaje': { en: 'Message', pt: 'Mensagem' },
    'Patrimonio': { en: 'Heritage', pt: 'Patrimônio' },
    'Acción social': { en: 'Social Action', pt: 'Ação social' },
    'Linaje': { en: 'Lineage', pt: 'Linhagem' },
    'La Institución': { en: 'The Institution', pt: 'A Instituição' },
    'Gran Cuadro 2025/2027': { en: 'Grand Officers 2025/2027', pt: 'Quadro 2025/2027' },
    'Linaje institucional': { en: 'Institutional Lineage', pt: 'Linhagem institucional' },
    '1869 — Presente': { en: '1869 — Present', pt: '1869 — Presente' },
    'Logias fundadas': { en: 'Founded Lodges', pt: 'Lojas fundadas' },
    'Documentales': { en: 'Documentaries', pt: 'Documentários' },
    'Biblioteca': { en: 'Library', pt: 'Biblioteca' },
    'Comunicación institucional': { en: 'Institutional Communication', pt: 'Comunicação institucional' },
    'Acceso restringido': { en: 'Restricted Access', pt: 'Acesso restrito' },
    'Simbolismo': { en: 'Symbolism', pt: 'Simbolismo' },
    'Lema': { en: 'Motto', pt: 'Lema' },
    'Cinco preguntas esenciales': { en: 'Five essential questions', pt: 'Cinco perguntas essenciais' },
    '¿Cómo ingresar?': { en: 'How to join?', pt: 'Como ingressar?' },
    'Programas': { en: 'Programs', pt: 'Programas' },
    '48 años de obra': { en: '48 years of work', pt: '48 anos de obra' },
    'Próximamente': { en: 'Coming soon', pt: 'Em breve' },
    'Sobre el museo': { en: 'About the museum', pt: 'Sobre o museu' },
    'Galería de fotos': { en: 'Photo gallery', pt: 'Galeria de fotos' },
    'Parte del Centro Cultural': { en: 'Part of the Cultural Center', pt: 'Parte do Centro Cultural' },
    'El acervo en imágenes': { en: 'The collection in images', pt: 'O acervo em imagens' },
    'Reproductor': { en: 'Player', pt: 'Reprodutor' },
    'Cómo funciona': { en: 'How it works', pt: 'Como funciona' },

    // Hero index
    'Masonería ': { en: 'Freemasonry ', pt: 'Maçonaria ' },
    'en Paraguay': { en: 'in Paraguay', pt: 'no Paraguai' },
    'La Gran Logia Simbólica del Paraguay es el origen y la continuidad de la verdadera masonería paraguaya — una obediencia regular reconocida en todo el mundo desde su constitución en 1923.':
      { en: 'The Grand Symbolic Lodge of Paraguay is the origin and continuity of true Paraguayan Freemasonry — a regular obedience recognized worldwide since its constitution in 1923.',
        pt: 'A Grande Loja Simbólica do Paraguai é a origem e a continuidade da verdadeira maçonaria paraguaia — uma obediência regular reconhecida em todo o mundo desde sua constituição em 1923.' },
    'Conocer nuestra historia': { en: 'Discover our history', pt: 'Conhecer nossa história' },
    '¿Qué es la Masonería?': { en: 'What is Freemasonry?', pt: 'O que é a Maçonaria?' },
    'Fomentamos ': { en: 'We foster ', pt: 'Fomentamos ' },
    'la sabiduría': { en: 'wisdom', pt: 'a sabedoria' },
    'La masonería es una institución esencialmente filantrópica, filosófica y progresista. Tiene por objeto la búsqueda de la verdad, el estudio de la moral y la práctica de la solidaridad.':
      { en: 'Freemasonry is an essentially philanthropic, philosophical and progressive institution. Its purpose is the pursuit of truth, the study of morality and the practice of solidarity.',
        pt: 'A maçonaria é uma instituição essencialmente filantrópica, filosófica e progressista. Tem por objeto a busca da verdade, o estudo da moral e a prática da solidariedade.' },
    'Profundizar': { en: 'Learn more', pt: 'Aprofundar' },
    'Libertad, Igualdad ': { en: 'Liberty, Equality ', pt: 'Liberdade, Igualdade ' },
    'y Fraternidad': { en: 'and Fraternity', pt: 'e Fraternidade' },
    'La forma concreta de entender y aplicar esos principios no está marcada — y cada masón debe buscarla y realizarla personalmente, en libertad de conciencia.':
      { en: 'The concrete way of understanding and applying these principles is not prescribed — each Mason must seek and realize it personally, in freedom of conscience.',
        pt: 'A forma concreta de entender e aplicar esses princípios não está marcada — e cada maçom deve buscá-la e realizá-la pessoalmente, em liberdade de consciência.' },
    'Descubrir': { en: 'Discover', pt: 'Descobrir' },
    'Edición Digital ': { en: 'Digital Edition ', pt: 'Edição Digital ' },

    // Stats
    'Logias': { en: 'Lodges', pt: 'Lojas' },
    'Talleres en actividad regular': { en: 'Workshops in regular activity', pt: 'Oficinas em atividade regular' },
    'Hermanos': { en: 'Brethren', pt: 'Irmãos' },
    'Activos en territorio nacional': { en: 'Active in the national territory', pt: 'Ativos em território nacional' },
    'Templos': { en: 'Temples', pt: 'Templos' },
    'Patrimonio masónico': { en: 'Masonic heritage', pt: 'Patrimônio maçônico' },
    'Reconocimientos': { en: 'Recognitions', pt: 'Reconhecimentos' },
    'Obediencias regulares del mundo': { en: 'Regular obediences worldwide', pt: 'Obediências regulares do mundo' },

    // News index
    'Tenidas, ceremonias internacionales, presencia regional y vida institucional. La actualidad de la Gran Logia Simbólica del Paraguay, mes a mes.':
      { en: 'Lodge meetings, international ceremonies, regional presence and institutional life. The current affairs of the Grand Symbolic Lodge of Paraguay, month by month.',
        pt: 'Sessões, cerimônias internacionais, presença regional e vida institucional. A atualidade da Grande Loja Simbólica do Paraguai, mês a mês.' },
    'La GLSP, presente en el 70° Aniversario de la Muy Respetable Gran Logia de Santa Catarina':
      { en: 'The GLSP at the 70th Anniversary of the Most Worshipful Grand Lodge of Santa Catarina',
        pt: 'A GLSP presente no 70º Aniversário da Mui Respeitável Grande Loja de Santa Catarina' },
    'La Gran Logia Simbólica del Paraguay estuvo presente en la Ceremonia de Posesión de Cargo del Serenísimo Gran Maestro de la jurisdicción brasileña, reafirmando los lazos de fraternidad regional que vinculan a las obediencias regulares del Cono Sur.':
      { en: 'The Grand Symbolic Lodge of Paraguay attended the Installation Ceremony of the Most Serene Grand Master of the Brazilian jurisdiction, reaffirming the regional ties of fraternity that bind the regular obediences of the Southern Cone.',
        pt: 'A Grande Loja Simbólica do Paraguai esteve presente na Cerimônia de Posse do Sereníssimo Grão-Mestre da jurisdição brasileira, reafirmando os laços de fraternidade regional que unem as obediências regulares do Cone Sul.' },
    'Leer noticia': { en: 'Read article', pt: 'Ler notícia' },
    'Tenida Magna Histórica — ¡3 logias levantaron columnas!':
      { en: 'Historic Grand Meeting — 3 lodges raised their columns!',
        pt: 'Sessão Magna Histórica — 3 lojas levantaram colunas!' },
    'El viernes 20 de marzo, el Templo Génesis del Solar Génesis fue escenario de una noche que quedará en la memoria…':
      { en: 'On Friday March 20th, the Génesis Temple at Solar Génesis was the stage for a night that will remain in memory…',
        pt: 'Na sexta-feira 20 de março, o Templo Génesis do Solar Génesis foi palco de uma noite que ficará na memória…' },
    'La GLSP fortalece su presencia internacional en Estados Unidos':
      { en: 'The GLSP strengthens its international presence in the United States',
        pt: 'A GLSP fortalece sua presença internacional nos Estados Unidos' },
    'Durante el mes de febrero, la GLSP desarrolló una activa agenda internacional con visitas a obediencias norteamericanas…':
      { en: 'During February, the GLSP carried out an active international agenda with visits to North American obediences…',
        pt: 'Durante o mês de fevereiro, a GLSP desenvolveu uma agenda internacional ativa com visitas a obediências norte-americanas…' },
    'Apertura Oficial de los Trabajos del Año Masónico 2026':
      { en: 'Official Opening of the 2026 Masonic Year', pt: 'Abertura Oficial dos Trabalhos do Ano Maçônico 2026' },
    'La GLSP inauguró oficialmente el año masónico con una ceremonia que reunió a hermanos de todo el país…':
      { en: 'The GLSP officially inaugurated the masonic year with a ceremony that brought together brethren from across the country…',
        pt: 'A GLSP inaugurou oficialmente o ano maçônico com uma cerimônia que reuniu irmãos de todo o país…' },
    'Juramento del nuevo Serenísimo Vice Gran Maestro':
      { en: 'Oath of the new Most Serene Deputy Grand Master', pt: 'Juramento do novo Sereníssimo Vice Grão-Mestre' },
    'Juramento del nuevo Serenísimo Vice Gran Maestro de la G∴L∴S∴P∴':
      { en: 'Oath of the new Most Serene Deputy Grand Master of the G∴L∴S∴P∴',
        pt: 'Juramento do novo Sereníssimo Vice Grão-Mestre da G∴L∴S∴P∴' },
    'En una ceremonia solemne, la GLSP tomó juramento al nuevo Vice Gran Maestro de la institución…':
      { en: 'In a solemn ceremony, the GLSP swore in the new Deputy Grand Master of the institution…',
        pt: 'Em uma cerimônia solene, a GLSP empossou o novo Vice Grão-Mestre da instituição…' },
    'Ver todas las noticias': { en: 'View all news', pt: 'Ver todas as notícias' },
    'Noticias de la Orden': { en: 'Order News', pt: 'Notícias da Ordem' },
    'Noticias ': { en: 'News ', pt: 'Notícias ' },
    'de la Orden': { en: 'of the Order', pt: 'da Ordem' },
    'Buscar en noticias…': { en: 'Search news…', pt: 'Buscar notícias…' },

    // GM message section
    'Mis apreciados hermanos, la Masonería en nuestro país cumple este año 130 años de existencia desde la Constitución del Gran Oriente del Paraguay en 1895, que diera origen posterior a la Gran Logia Simbólica del Paraguay en 1923, institución que cumple 102 años de vida institucional.':
      { en: 'My dear brethren, Freemasonry in our country marks this year 130 years of existence since the Constitution of the Grand Orient of Paraguay in 1895, which later gave rise to the Grand Symbolic Lodge of Paraguay in 1923, an institution that completes 102 years of institutional life.',
        pt: 'Meus estimados irmãos, a Maçonaria em nosso país completa este ano 130 anos de existência desde a Constituição do Grande Oriente do Paraguai em 1895, que deu origem posteriormente à Grande Loja Simbólica do Paraguai em 1923, instituição que completa 102 anos de vida institucional.' },
    '"Nos abrimos al mundo a través de este espacio informático para contribuir, con todas las otras Grandes Logias Regulares del Mundo, en el incansable objetivo de superación personal y social."':
      { en: '"We open ourselves to the world through this digital space to contribute, alongside all other Regular Grand Lodges of the World, to the tireless goal of personal and social betterment."',
        pt: '"Abrimo-nos ao mundo através deste espaço informático para contribuir, com todas as outras Grandes Lojas Regulares do Mundo, no incansável objetivo de superação pessoal e social."' },
    'La Masonería ha hecho posible la evolución de la humanidad mediante la superación personal y los aportes que cada uno de los hermanos han hecho en diferentes épocas apostando por la libertad, la igualdad y la fraternidad. Seguiremos en la misma línea cumpliendo nuestra misión filantrópica.':
      { en: 'Freemasonry has made possible the evolution of humanity through personal betterment and the contributions of each of the brethren across different eras, championing liberty, equality and fraternity. We shall continue along the same path, fulfilling our philanthropic mission.',
        pt: 'A Maçonaria tornou possível a evolução da humanidade mediante a superação pessoal e os aportes que cada um dos irmãos fizeram em diferentes épocas apostando na liberdade, na igualdade e na fraternidade. Seguiremos na mesma linha cumprindo nossa missão filantrópica.' },
    'Leer el mensaje completo': { en: 'Read the full message', pt: 'Ler a mensagem completa' },
    'Gran Maestro · 2025 / 2027': { en: 'Grand Master · 2025 / 2027', pt: 'Grão-Mestre · 2025 / 2027' },

    // Index history section
    'Historia de la Masonería ': { en: 'History of Freemasonry ', pt: 'História da Maçonaria ' },
    'Desde 1869 hasta nuestros días — siglo y medio de presencia masónica en suelo paraguayo, atravesando reconstrucciones, guerras y la fundación de la república moderna.':
      { en: 'From 1869 to our days — a century and a half of Masonic presence on Paraguayan soil, through reconstructions, wars and the founding of the modern republic.',
        pt: 'De 1869 até nossos dias — um século e meio de presença maçônica em solo paraguaio, atravessando reconstruções, guerras e a fundação da república moderna.' },
    'Levantamiento de columnas de la Logia Fe, primera en territorio paraguayo.':
      { en: 'Raising of columns of Lodge Fe, the first on Paraguayan territory.',
        pt: 'Levantamento de colunas da Loja Fé, a primeira em território paraguaio.' },
    'Constitución del Serenísimo Gran Oriente del Paraguay.':
      { en: 'Constitution of the Most Serene Grand Orient of Paraguay.',
        pt: 'Constituição do Sereníssimo Grande Oriente do Paraguai.' },
    'Adquisición del Templo Masónico de Palma.':
      { en: 'Acquisition of the Masonic Temple of Palma.', pt: 'Aquisição do Templo Maçônico de Palma.' },
    'Reconocimiento de la Gran Logia Unida de Inglaterra.':
      { en: 'Recognition by the United Grand Lodge of England.', pt: 'Reconhecimento da Grande Loja Unida da Inglaterra.' },
    'Fundación de la Gran Logia Simbólica del Paraguay.':
      { en: 'Founding of the Grand Symbolic Lodge of Paraguay.', pt: 'Fundação da Grande Loja Simbólica do Paraguai.' },
    'Restauración del Templo Histórico de Palma. Patrimonio Histórico.':
      { en: 'Restoration of the Historic Temple of Palma. Historic Heritage.',
        pt: 'Restauração do Templo Histórico de Palma. Patrimônio Histórico.' },
    'Recorrer la historia completa': { en: 'Browse the full history', pt: 'Percorrer a história completa' },

    // Cultural center index
    'Centro Cultural ': { en: 'Cultural Center ', pt: 'Centro Cultural ' },
    'Masónico': { en: 'Masonic', pt: 'Maçônico' },
    'Un espacio para conservar, exhibir y abrir al público el patrimonio histórico, documental y cultural de la Masonería paraguaya.':
      { en: 'A space to preserve, exhibit and open to the public the historic, documentary and cultural heritage of Paraguayan Freemasonry.',
        pt: 'Um espaço para conservar, exibir e abrir ao público o patrimônio histórico, documental e cultural da Maçonaria paraguaia.' },
    'Visita virtual disponible': { en: 'Virtual tour available', pt: 'Visita virtual disponível' },
    'Museo': { en: 'Museum', pt: 'Museu' },
    'Gran Archivo': { en: 'Grand Archive', pt: 'Grande Arquivo' },
    'Visitar el Centro Cultural': { en: 'Visit the Cultural Center', pt: 'Visitar o Centro Cultural' },

    // Masonería section index/page
    '¿Qué es ': { en: 'What is ', pt: 'O que é ' },
    'la Masonería': { en: 'Freemasonry', pt: 'a Maçonaria' },
    'Una Institución Universal, esencialmente educadora, humanista, filosófica, iniciática, progresista y filantrópica — unida por el vínculo de la fraternidad, el amor a la humanidad y a la verdad.':
      { en: 'A Universal Institution, essentially educational, humanist, philosophical, initiatory, progressive and philanthropic — united by the bond of fraternity, love of humanity and of truth.',
        pt: 'Uma Instituição Universal, essencialmente educadora, humanista, filosófica, iniciática, progressista e filantrópica — unida pelo vínculo da fraternidade, do amor à humanidade e à verdade.' },
    'Conocer la Orden': { en: 'Get to know the Order', pt: 'Conhecer a Ordem' },

    // Filantropía index
    'Filantropía — ': { en: 'Philanthropy — ', pt: 'Filantropia — ' },
    'Fundación Esperanza': { en: 'Esperanza Foundation', pt: 'Fundação Esperanza' },
    '"La Masonería es una institución esencialmente filantrópica" — y desde 1978, la Fundación Esperanza es el brazo concreto de esa vocación.':
      { en: '"Freemasonry is an essentially philanthropic institution" — and since 1978, the Esperanza Foundation has been the concrete arm of that vocation.',
        pt: '"A Maçonaria é uma instituição essencialmente filantrópica" — e desde 1978, a Fundação Esperanza é o braço concreto dessa vocação.' },
    'Educación a sectores vulnerables': { en: 'Education for vulnerable sectors', pt: 'Educação para setores vulneráveis' },
    'Capacitación académica, técnica, moral y conductual orientada a la productividad. Desarrollo de actividades culturales, educacionales y sociales que promueven el crecimiento de valores positivos.':
      { en: 'Academic, technical, moral and behavioral training oriented to productivity. Development of cultural, educational and social activities that promote the growth of positive values.',
        pt: 'Capacitação acadêmica, técnica, moral e comportamental orientada à produtividade. Desenvolvimento de atividades culturais, educacionais e sociais que promovem o crescimento de valores positivos.' },
    'Acción Social Proactiva': { en: 'Proactive Social Action', pt: 'Ação Social Proativa' },
    'Generación de acciones eficientes con personas físicas y jurídicas, nacionales o internacionales, públicas o privadas. Programas y proyectos de investigación.':
      { en: 'Generation of efficient actions with individuals and legal entities, national or international, public or private. Research programs and projects.',
        pt: 'Geração de ações eficientes com pessoas físicas e jurídicas, nacionais ou internacionais, públicas ou privadas. Programas e projetos de pesquisa.' },
    'Brindamos salud a la comunidad': { en: 'We bring health to the community', pt: 'Levamos saúde à comunidade' },
    'Servicios odontológicos a los niños de la escuela de Itá. Articulación de donaciones de medicamentos, antiparasitarios y donación de sangre.':
      { en: 'Dental services for the children of Itá school. Coordination of donations of medicines, antiparasitics and blood donation.',
        pt: 'Serviços odontológicos para as crianças da escola de Itá. Articulação de doações de medicamentos, antiparasitários e doação de sangue.' },
    'Fundada el 21 de Setiembre': { en: 'Founded on September 21', pt: 'Fundada em 21 de Setembro' },
    'La Fundación Esperanza fue fundada el 21 de Setiembre de 1978, reconocida su personería jurídica por Decreto N° 1.437 del Poder Ejecutivo de la Nación. Desde entonces, materializa la vocación filantrópica de la Gran Logia Simbólica del Paraguay.':
      { en: 'The Esperanza Foundation was founded on September 21, 1978, its legal status recognized by Decree No. 1,437 of the National Executive. Since then, it has embodied the philanthropic vocation of the Grand Symbolic Lodge of Paraguay.',
        pt: 'A Fundação Esperanza foi fundada em 21 de Setembro de 1978, com sua personalidade jurídica reconhecida pelo Decreto Nº 1.437 do Poder Executivo da Nação. Desde então, materializa a vocação filantrópica da Grande Loja Simbólica do Paraguai.' },
    'Conocer la Fundación Esperanza': { en: 'Learn about the Esperanza Foundation', pt: 'Conhecer a Fundação Esperanza' },

    // Grandes Maestros section index
    'Histórico de ': { en: 'Past ', pt: 'Histórico de ' },
    'Más de un siglo y medio de continuidad institucional — desde Zerakhial en 1869 hasta el Ser∴ Gran Maestro Carlos Sosa Jovellanos en el período 2025 / 2027.':
      { en: 'More than a century and a half of institutional continuity — from Zerakhial in 1869 to M∴W∴ Grand Master Carlos Sosa Jovellanos in the 2025/2027 term.',
        pt: 'Mais de um século e meio de continuidade institucional — desde Zerakhial em 1869 até o Ser∴ Grão-Mestre Carlos Sosa Jovellanos no período 2025 / 2027.' },
    'En funciones': { en: 'In office', pt: 'Em exercício' },
    'Período 2025 / 2027 — Año Masónico vigente':
      { en: '2025 / 2027 term — Current Masonic Year', pt: 'Período 2025 / 2027 — Ano Maçônico vigente' },
    'Ver el listado completo de 43 Grandes Maestros':
      { en: 'View the full list of 43 Grand Masters', pt: 'Ver a listagem completa dos 43 Grão-Mestres' },

    // Footer
    'Fundada en 1923': { en: 'Founded in 1923', pt: 'Fundada em 1923' },
    'La obediencia masónica regular del Paraguay — origen y continuidad de la verdadera masonería paraguaya. Reconocida por más de 70 Grandes Logias regulares en todo el mundo.':
      { en: 'The regular Masonic obedience of Paraguay — origin and continuity of true Paraguayan Freemasonry. Recognized by more than 70 regular Grand Lodges around the world.',
        pt: 'A obediência maçônica regular do Paraguai — origem e continuidade da verdadeira maçonaria paraguaia. Reconhecida por mais de 70 Grandes Lojas regulares em todo o mundo.' },
    'La obediencia masónica regular del Paraguay.':
      { en: 'The regular Masonic obedience of Paraguay.', pt: 'A obediência maçônica regular do Paraguai.' },
    'La obediencia masónica regular del Paraguay — origen y continuidad de la verdadera masonería paraguaya.':
      { en: 'The regular Masonic obedience of Paraguay — origin and continuity of true Paraguayan Freemasonry.',
        pt: 'A obediência maçônica regular do Paraguai — origem e continuidade da verdadeira maçonaria paraguaia.' },
    'Secciones': { en: 'Sections', pt: 'Seções' },
    'Dirección': { en: 'Address', pt: 'Endereço' },
    'Correo': { en: 'Email', pt: 'E-mail' },
    'Teléfono': { en: 'Phone', pt: 'Telefone' },
    'Síguenos': { en: 'Follow us', pt: 'Siga-nos' },
    'Todos los derechos reservados': { en: 'All rights reserved', pt: 'Todos os direitos reservados' },
    'Diseño & desarrollo ': { en: 'Design & development ', pt: 'Design & desenvolvimento ' },

    // Gran Logia page
    'La Gran Logia ': { en: 'The Grand ', pt: 'A Grande Loja ' },
    'Simbólica del Paraguay': { en: 'Symbolic Lodge of Paraguay', pt: 'Simbólica do Paraguai' },
    'Obediencia masónica regular del Paraguay desde 1923. Heredera del Gran Oriente del Paraguay (1894), reúne 82 logias bajo una misma jurisdicción reconocida por más de 70 obediencias del mundo.':
      { en: 'Regular Masonic obedience of Paraguay since 1923. Heir to the Grand Orient of Paraguay (1894), it gathers 82 lodges under a single jurisdiction recognized by more than 70 obediences worldwide.',
        pt: 'Obediência maçônica regular do Paraguai desde 1923. Herdeira do Grande Oriente do Paraguai (1894), reúne 82 lojas sob uma mesma jurisdição reconhecida por mais de 70 obediências do mundo.' },
    'Palabras del ': { en: 'Words of the ', pt: 'Palavras do ' },
    'Ser∴ Gran Maestro': { en: 'M∴W∴ Grand Master', pt: 'Ser∴ Grão-Mestre' },
    'Mis apreciados hermanos, la Masonería en nuestro país cumple este año, 130 años de existencia desde la Constitución del Gran Oriente del Paraguay (GOP), como Asociación Civil de utilidad Pública, ocurrida en 1895 y que diera origen posterior a la Gran Logia Simbólica del Paraguay (GLSP) en el año 1923, institución que cumple 102 años de vida institucional.':
      { en: 'My dear brethren, Freemasonry in our country marks this year 130 years of existence since the Constitution of the Grand Orient of Paraguay (GOP), as a Civil Association of Public Utility, in 1895, which later gave rise to the Grand Symbolic Lodge of Paraguay (GLSP) in 1923, an institution that completes 102 years of institutional life.',
        pt: 'Meus estimados irmãos, a Maçonaria em nosso país completa este ano 130 anos de existência desde a Constituição do Grande Oriente do Paraguai (GOP), como Associação Civil de utilidade Pública, ocorrida em 1895 e que deu origem posteriormente à Grande Loja Simbólica do Paraguai (GLSP) em 1923, instituição que completa 102 anos de vida institucional.' },
    'Durante todos estos años transcurridos, el GOP y la GLSP han venido cumpliendo un rol esencial en la formación de hermanos con valores destinados a perfeccionar nuestra sociedad y las instituciones de nuestro país, con el fin de lograr la evolución de la humanidad hacia un destino universal de superación constante.':
      { en: 'Throughout all these years, the GOP and GLSP have fulfilled an essential role in forming brethren with values aimed at perfecting our society and the institutions of our country, in order to achieve the evolution of humanity toward a universal destiny of constant betterment.',
        pt: 'Durante todos estes anos, o GOP e a GLSP têm cumprido um papel essencial na formação de irmãos com valores destinados a aperfeiçoar nossa sociedade e as instituições de nosso país, com o fim de alcançar a evolução da humanidade rumo a um destino universal de superação constante.' },
    'Tampoco hemos abandonado nuestro lema de amor a la humanidad y en tal sentido la Fundación Esperanza ha venido educando niños, jóvenes y adultos mayores para superar los límites que su realidad les impone.':
      { en: 'Nor have we abandoned our motto of love for humanity, and in that sense the Esperanza Foundation has been educating children, youth and elders to overcome the limits imposed on them by their reality.',
        pt: 'Tampouco abandonamos nosso lema de amor à humanidade e nesse sentido a Fundação Esperanza tem educado crianças, jovens e idosos para superar os limites que sua realidade lhes impõe.' },
    'La Masonería ha hecho posible la evolución de la humanidad mediante la superación personal, social y los aportes que cada uno de los hermanos han hecho en diferentes épocas apostando por la libertad, la igualdad y la fraternidad. Seguiremos en la misma línea cumpliendo nuestra misión filantrópica.':
      { en: 'Freemasonry has made possible the evolution of humanity through personal and social betterment and the contributions of each of the brethren across different eras, championing liberty, equality and fraternity. We shall continue along the same path, fulfilling our philanthropic mission.',
        pt: 'A Maçonaria tornou possível a evolução da humanidade mediante a superação pessoal, social e os aportes que cada um dos irmãos fizeram em diferentes épocas apostando na liberdade, na igualdade e na fraternidade. Seguiremos na mesma linha cumprindo nossa missão filantrópica.' },
    '— Ser∴ Gran Maestro Carlos Sosa Jovellanos': { en: '— M∴W∴ Grand Master Carlos Sosa Jovellanos', pt: '— Ser∴ Grão-Mestre Carlos Sosa Jovellanos' },
    'Cuadro de ': { en: 'Board of ', pt: 'Quadro de ' },
    'Grandes Oficiales': { en: 'Grand Officers', pt: 'Grandes Oficiais' },
    'Los Grandes Oficiales electos para el período 2025–2027 que conforman el gobierno institucional de la Gran Logia Simbólica del Paraguay.':
      { en: 'The Grand Officers elected for the 2025–2027 term who form the institutional government of the Grand Symbolic Lodge of Paraguay.',
        pt: 'Os Grandes Oficiais eleitos para o período 2025–2027 que compõem o governo institucional da Grande Loja Simbólica do Paraguai.' },
    '— Cargo principal —': { en: '— Principal office —', pt: '— Cargo principal —' },
    '43° Gran Maestro de la Gran Logia Simbólica del Paraguay. Período 2025–2027.':
      { en: '43rd Grand Master of the Grand Symbolic Lodge of Paraguay. 2025–2027 term.',
        pt: '43º Grão-Mestre da Grande Loja Simbólica do Paraguai. Período 2025–2027.' },
    'Vice Gran Maestro': { en: 'Deputy Grand Master', pt: 'Vice Grão-Mestre' },
    'Asume la representación institucional en ausencia del Gran Maestro.':
      { en: 'Assumes institutional representation in the absence of the Grand Master.',
        pt: 'Assume a representação institucional na ausência do Grão-Mestre.' },
    'Gran Secretario': { en: 'Grand Secretary', pt: 'Grão-Secretário' },
    'Responsable de la documentación oficial y comunicaciones de la GLSP.':
      { en: 'Responsible for the official documentation and communications of the GLSP.',
        pt: 'Responsável pela documentação oficial e comunicações da GLSP.' },
    'Gran Tesorero': { en: 'Grand Treasurer', pt: 'Grão-Tesoureiro' },
    'Administración financiera y patrimonial de la institución.':
      { en: 'Financial and asset administration of the institution.',
        pt: 'Administração financeira e patrimonial da instituição.' },
    'Otros Grandes Oficiales': { en: 'Other Grand Officers', pt: 'Outros Grandes Oficiais' },
    'Gran Orador': { en: 'Grand Orator', pt: 'Grão-Orador' },
    'Gran 1er Vigilante': { en: '1st Grand Warden', pt: '1º Grão-Vigilante' },
    'Gran 2do Vigilante': { en: '2nd Grand Warden', pt: '2º Grão-Vigilante' },
    'Gran Hospitalario': { en: 'Grand Almoner', pt: 'Grão-Hospitaleiro' },
    'Gran Maestro de Ceremonias': { en: 'Grand Master of Ceremonies', pt: 'Grão-Mestre de Cerimônias' },
    'Gran Experto': { en: 'Grand Expert', pt: 'Grão-Perito' },
    'Gran Guarda Templos': { en: 'Grand Tyler', pt: 'Grão-Guarda-Templo' },
    'Gran Bibliotecario': { en: 'Grand Librarian', pt: 'Grão-Bibliotecário' },
    '43 Grandes Maestros han presidido la Gran Logia Simbólica del Paraguay desde Zerakhial en 1869 hasta el actual Ser∴ Gran Maestro Carlos Sosa Jovellanos.':
      { en: '43 Grand Masters have presided over the Grand Symbolic Lodge of Paraguay from Zerakhial in 1869 to the current M∴W∴ Grand Master Carlos Sosa Jovellanos.',
        pt: '43 Grão-Mestres presidiram a Grande Loja Simbólica do Paraguai desde Zerakhial em 1869 até o atual Ser∴ Grão-Mestre Carlos Sosa Jovellanos.' },
    'Ver el listado completo': { en: 'View the full list', pt: 'Ver a listagem completa' },

    // Historia page
    'Desde el levantamiento de columnas de la Logia Fe en 1869 hasta nuestros días — siglo y medio de presencia masónica en suelo paraguayo, atravesando reconstrucciones, guerras y la fundación de la república moderna.':
      { en: 'From the raising of columns of Lodge Fe in 1869 to our days — a century and a half of Masonic presence on Paraguayan soil, through reconstructions, wars and the founding of the modern republic.',
        pt: 'Desde o levantamento de colunas da Loja Fé em 1869 até nossos dias — um século e meio de presença maçônica em solo paraguaio, atravessando reconstruções, guerras e a fundação da república moderna.' },
    'Toda la línea': { en: 'Full timeline', pt: 'Linha completa' },
    'Siglo XXI': { en: '21st Century', pt: 'Século XXI' },
    'Levantamiento de columnas de la Logia Fe — primera en territorio paraguayo':
      { en: 'Raising of columns of Lodge Fe — the first on Paraguayan territory',
        pt: 'Levantamento de colunas da Loja Fé — a primeira em território paraguaio' },
    'El acta de constitución de esta Logia primigenia dice:':
      { en: 'The act of constitution of this earliest Lodge reads:',
        pt: 'A ata de constituição desta Loja primigênia diz:' },
    'Su primer cuadro logial fue presidido por el Coronel Francisco Vieira Faria Rocha como Ven∴ Maest∴, con el Mayor Jorge Lopes da Costa Moreira como 1er. Vigilante.':
      { en: 'Its first lodge board was presided over by Colonel Francisco Vieira Faria Rocha as Worshipful Master, with Major Jorge Lopes da Costa Moreira as 1st Warden.',
        pt: 'Seu primeiro quadro logial foi presidido pelo Coronel Francisco Vieira Faria Rocha como Ven∴ Mestre, com o Major Jorge Lopes da Costa Moreira como 1º Vigilante.' },
    'La Masonería paraguaya se independiza de la brasileña':
      { en: 'Paraguayan Freemasonry becomes independent from the Brazilian',
        pt: 'A Maçonaria paraguaia se independiza da brasileira' },
    'Se produce la independencia del Gran Oriente del Brasil y el Gran Oriente y el Supremo Consejo del Rito Escocés Antiguo y Aceptado nacen en la ciudad capital de Asunción de la República del Paraguay.':
      { en: 'Independence from the Grand Orient of Brazil takes place, and the Grand Orient and the Supreme Council of the Ancient and Accepted Scottish Rite are born in the capital city of Asunción, Republic of Paraguay.',
        pt: 'Ocorre a independência do Grande Oriente do Brasil e o Grande Oriente e o Supremo Conselho do Rito Escocês Antigo e Aceito nascem na cidade capital de Assunção da República do Paraguai.' },
    'Las fuerzas de ocupación abandonan el Paraguay':
      { en: 'The occupation forces leave Paraguay', pt: 'As forças de ocupação abandonam o Paraguai' },
    'Con la terminación de la ocupación del país, las instituciones masónicas, así como las fuerzas brasileñas, dejan el país. Las Logias cesan su labor, con la excepción de algunas pocas que trabajaban bajo diferentes jurisdicciones.':
      { en: 'With the end of the occupation, Masonic institutions, like the Brazilian forces, leave the country. The Lodges cease their work, except for a few that operated under different jurisdictions.',
        pt: 'Com o fim da ocupação do país, as instituições maçônicas, assim como as forças brasileiras, deixam o país. As Lojas cessam seu trabalho, com exceção de algumas poucas que trabalhavam sob diferentes jurisdições.' },
    'La masonería uruguaya en Paraguay': { en: 'Uruguayan Freemasonry in Paraguay', pt: 'A maçonaria uruguaia no Paraguai' },
    'El movimiento de la masonería uruguaya en Paraguay se originó a partir del regreso de los trofeos de la guerra paraguaya en 1885, arreglado por el Presidente Máximo Santos y orquestado por su comisión, compuesta por el Gran Maestro Carlos de Castro, quien favoreció la concesión del Grado 33° al Hermano Bernardino Caballero, Presidente del Paraguay durante 1880-1886, quien tuvo un rol preponderante en la fundación y desarrollo de la Masonería paraguaya.':
      { en: 'The Uruguayan Masonic movement in Paraguay originated with the return of the Paraguayan war trophies in 1885, arranged by President Máximo Santos and orchestrated by his commission, including Grand Master Carlos de Castro, who supported granting the 33rd Degree to Brother Bernardino Caballero, President of Paraguay during 1880–1886, who played a preponderant role in the founding and development of Paraguayan Freemasonry.',
        pt: 'O movimento da maçonaria uruguaia no Paraguai se originou a partir do regresso dos troféus da guerra paraguaia em 1885, arranjado pelo Presidente Máximo Santos e orquestrado por sua comissão, composta pelo Grão-Mestre Carlos de Castro, que favoreceu a concessão do Grau 33º ao Irmão Bernardino Caballero, Presidente do Paraguai durante 1880-1886, que teve um papel preponderante na fundação e desenvolvimento da Maçonaria paraguaia.' },
    'De la mano de los masones uruguayos, renace la Masonería en el Paraguay':
      { en: 'With the support of the Uruguayan Masons, Freemasonry is reborn in Paraguay',
        pt: 'Pelas mãos dos maçons uruguaios, renasce a Maçonaria no Paraguai' },
    'Levanta columnas, bajo los auspicios del Oriente del Uruguay, llevando el número de orden 66, la Logia Aurora del Paraguay.':
      { en: 'Lodge Aurora del Paraguay raises its columns under the auspices of the Orient of Uruguay, bearing serial number 66.',
        pt: 'Levanta colunas, sob os auspícios do Oriente do Uruguai, com o número de ordem 66, a Loja Aurora del Paraguay.' },
    'Decreto del Serenísimo Gran Oriente del Uruguay':
      { en: 'Decree of the Most Serene Grand Orient of Uruguay', pt: 'Decreto do Sereníssimo Grande Oriente do Uruguai' },
    'El Templo Masónico de Palma, considerado uno de los más bellos de Sudamérica, es adquirido el 6 de septiembre de 1899 en Asunción. Se trata del templo masónico perteneciente al Gran Oriente del Paraguay de la antigua Gran Logia Simbólica del Paraguay, ubicado sobre la calle Palma.':
      { en: 'The Masonic Temple of Palma, considered one of the most beautiful in South America, is acquired on September 6, 1899 in Asunción. It is the Masonic temple belonging to the Grand Orient of Paraguay of the old Grand Symbolic Lodge of Paraguay, located on Palma Street.',
        pt: 'O Templo Maçônico de Palma, considerado um dos mais belos da América do Sul, é adquirido em 6 de setembro de 1899 em Assunção. Trata-se do templo maçônico pertencente ao Grande Oriente do Paraguai da antiga Grande Loja Simbólica do Paraguai, localizado na rua Palma.' },
    'Adquirido bajo la gestión del Gran Maestro Dr. Cecilio Báez, fue diseñado por Ricardo Lloret y construido por José Vilá. Fue sede de actividades filantrópicas y centro de ayuda durante la Gripe Española de 1918, y Hospital de Sangre durante la Guerra del Chaco.':
      { en: 'Acquired under the leadership of Grand Master Dr. Cecilio Báez, it was designed by Ricardo Lloret and built by José Vilá. It served as a venue for philanthropic activities and an aid center during the 1918 Spanish Flu, and a Field Hospital during the Chaco War.',
        pt: 'Adquirido sob a gestão do Grão-Mestre Dr. Cecilio Báez, foi projetado por Ricardo Lloret e construído por José Vilá. Foi sede de atividades filantrópicas e centro de ajuda durante a Gripe Espanhola de 1918, e Hospital de Sangue durante a Guerra do Chaco.' },
    'La Gran Logia Unida de Inglaterra reconoce a la GLSP':
      { en: 'The United Grand Lodge of England recognizes the GLSP',
        pt: 'A Grande Loja Unida da Inglaterra reconhece a GLSP' },
    'En su reunión Trimestral, la Gran Logia Unida de Inglaterra reconoce a la Gran Logia Simbólica del Paraguay como Autoridad Independiente y Soberana de la Franc-Masonería Gremial de la República.':
      { en: 'At its Quarterly Communication, the United Grand Lodge of England recognizes the Grand Symbolic Lodge of Paraguay as the Independent and Sovereign Authority of Craft Freemasonry of the Republic.',
        pt: 'Em sua reunião Trimestral, a Grande Loja Unida da Inglaterra reconhece a Grande Loja Simbólica do Paraguai como Autoridade Independente e Soberana da Franco-Maçonaria Gremial da República.' },
    'Fundación de la Gran Logia Simbólica del Paraguay':
      { en: 'Founding of the Grand Symbolic Lodge of Paraguay', pt: 'Fundação da Grande Loja Simbólica do Paraguai' },
    'La Gran Logia Simbólica del Paraguay (GLSP) queda formalmente constituida el 13 de mayo de 1923, consolidando la estructura jurisdiccional simbólica de la masonería regular paraguaya. Esta institución continúa hasta hoy como la obediencia regular reconocida en todo el mundo.':
      { en: 'The Grand Symbolic Lodge of Paraguay (GLSP) is formally constituted on May 13, 1923, consolidating the symbolic jurisdictional structure of regular Paraguayan Freemasonry. This institution continues today as the regular obedience recognized worldwide.',
        pt: 'A Grande Loja Simbólica do Paraguai (GLSP) é formalmente constituída em 13 de maio de 1923, consolidando a estrutura jurisdicional simbólica da maçonaria regular paraguaia. Esta instituição continua até hoje como a obediência regular reconhecida em todo o mundo.' },
    'Restauración del Templo de Palma — Patrimonio Histórico':
      { en: 'Restoration of the Palma Temple — Historic Heritage',
        pt: 'Restauração do Templo de Palma — Patrimônio Histórico' },
    'Adquisición del Templo Masónico de Palma':
      { en: 'Acquisition of the Masonic Temple of Palma', pt: 'Aquisição do Templo Maçônico de Palma' },
    'El Templo Histórico de Palma fue restaurado y reinaugurado en julio de 2018 con presencia de autoridades masónicas y municipales, bajo la administración del Gran Maestro Benigno Villasanti. Ese mismo año fue declarado Patrimonio Histórico del Paraguay por su valor arquitectónico e histórico.':
      { en: 'The Historic Temple of Palma was restored and reopened in July 2018 with the presence of Masonic and municipal authorities, under the administration of Grand Master Benigno Villasanti. That same year it was declared Historic Heritage of Paraguay for its architectural and historic value.',
        pt: 'O Templo Histórico de Palma foi restaurado e reinaugurado em julho de 2018 com presença de autoridades maçônicas e municipais, sob a administração do Grão-Mestre Benigno Villasanti. Nesse mesmo ano foi declarado Patrimônio Histórico do Paraguai por seu valor arquitetônico e histórico.' },
    'Las 82 Logias ': { en: 'The 82 Lodges ', pt: 'As 82 Lojas ' },
    'de la jurisdicción': { en: 'of the jurisdiction', pt: 'da jurisdição' },
    'Listado histórico de logias regularizadas bajo la Gran Logia Simbólica del Paraguay, organizadas por década de fundación.':
      { en: 'Historical list of lodges regularized under the Grand Symbolic Lodge of Paraguay, organized by decade of foundation.',
        pt: 'Listagem histórica de lojas regularizadas sob a Grande Loja Simbólica do Paraguai, organizadas por década de fundação.' },
    'Décadas fundacionales · 1880–1920': { en: 'Founding decades · 1880–1920', pt: 'Décadas fundacionais · 1880–1920' },
    'Década de 1970–1980': { en: '1970s–1980s', pt: 'Década de 1970–1980' },
    'Década de 1990': { en: '1990s', pt: 'Década de 1990' },
    'Década de 2000': { en: '2000s', pt: 'Década de 2000' },
    'Década de 2010': { en: '2010s', pt: 'Década de 2010' },
    'Ver listado completo de las 82 logias': { en: 'View full list of the 82 lodges', pt: 'Ver listagem completa das 82 lojas' },
    'Memoria ': { en: 'Audiovisual ', pt: 'Memória ' },
    'audiovisual': { en: 'memory', pt: 'audiovisual' },
    'Recorridos documentales por los espacios y la memoria de la Masonería paraguaya.':
      { en: 'Documentary tours through the spaces and memory of Paraguayan Freemasonry.',
        pt: 'Percursos documentais pelos espaços e pela memória da Maçonaria paraguaia.' },
    'Museo de la Gran Logia Simbólica del Paraguay':
      { en: 'Museum of the Grand Symbolic Lodge of Paraguay', pt: 'Museu da Grande Loja Simbólica do Paraguai' },
    'El Museo de la francmasonería paraguaya en la sede del Gran Oriente — Luís Alberto de Herrera Nº 1071 c/ Brasil, Asunción.':
      { en: 'The Museum of Paraguayan Freemasonry at the headquarters of the Grand Orient — Luís Alberto de Herrera Nº 1071 c/ Brasil, Asunción.',
        pt: 'O Museu da maçonaria paraguaia na sede do Grande Oriente — Luís Alberto de Herrera Nº 1071 c/ Brasil, Assunção.' },
    'Templo Histórico de Palma': { en: 'Historic Temple of Palma', pt: 'Templo Histórico de Palma' },
    'Considerado uno de los más bellos de Sudamérica, adquirido el 6 de septiembre de 1899. Hospital de Sangre durante la Guerra del Chaco. Patrimonio Histórico desde 2018.':
      { en: 'Considered one of the most beautiful in South America, acquired on September 6, 1899. Field Hospital during the Chaco War. Historic Heritage since 2018.',
        pt: 'Considerado um dos mais belos da América do Sul, adquirido em 6 de setembro de 1899. Hospital de Sangue durante a Guerra do Chaco. Patrimônio Histórico desde 2018.' },

    // Centro Cultural page
    'Conservar, exhibir y abrir al público el patrimonio histórico, documental y arquitectónico de la Masonería paraguaya — un siglo y medio de objetos, documentos y memoria reunidos en un solo espacio.':
      { en: 'Preserve, exhibit and open to the public the historic, documentary and architectural heritage of Paraguayan Freemasonry — a century and a half of objects, documents and memory gathered in a single space.',
        pt: 'Conservar, exibir e abrir ao público o patrimônio histórico, documental e arquitetônico da Maçonaria paraguaia — um século e meio de objetos, documentos e memória reunidos em um único espaço.' },
    'El museo masónico más completo del Paraguay':
      { en: "Paraguay's most complete Masonic museum", pt: 'O museu maçônico mais completo do Paraguai' },
    'Museo de la Francmasonería Paraguaya': { en: 'Museum of Paraguayan Freemasonry', pt: 'Museu da Maçonaria Paraguaia' },
    'Situado en la sede del Gran Oriente del Paraguay — calle Luís Alberto de Herrera Nº 1071 c/ Brasil, Asunción — el Museo conserva la colección más extensa y completa del país sobre la tradición masónica paraguaya.':
      { en: 'Located at the headquarters of the Grand Orient of Paraguay — Luís Alberto de Herrera Nº 1071 c/ Brasil, Asunción — the Museum preserves the most extensive and complete collection in the country on the Paraguayan Masonic tradition.',
        pt: 'Localizado na sede do Grande Oriente do Paraguai — rua Luís Alberto de Herrera Nº 1071 c/ Brasil, Assunção — o Museu conserva a coleção mais extensa e completa do país sobre a tradição maçônica paraguaia.' },
    'Un siglo y medio ': { en: 'A century and a half ', pt: 'Um século e meio ' },
    'de memoria viva': { en: 'of living memory', pt: 'de memória viva' },
    'El Museo de la Francmasonería Paraguaya reúne objetos rituales, mobiliario, regalia, obras de arte, fotografías y documentos que abarcan desde la fundación de la Logia Fe en 1869 hasta nuestros días.':
      { en: 'The Museum of Paraguayan Freemasonry gathers ritual objects, furniture, regalia, works of art, photographs and documents spanning from the founding of Lodge Fe in 1869 to the present day.',
        pt: 'O Museu da Maçonaria Paraguaia reúne objetos rituais, mobiliário, regalia, obras de arte, fotografias e documentos que abrangem desde a fundação da Loja Fé em 1869 até nossos dias.' },
    'Cada vitrina, cada sala, cada pieza expuesta narra un capítulo de la historia masónica del país — un patrimonio único que combina valor histórico, artístico y simbólico.':
      { en: 'Each display case, each room, each exhibited piece narrates a chapter of the country\'s Masonic history — a unique heritage combining historic, artistic and symbolic value.',
        pt: 'Cada vitrine, cada sala, cada peça exposta narra um capítulo da história maçônica do país — um patrimônio único que combina valor histórico, artístico e simbólico.' },
    'El Museo está abierto a visitas guiadas con cita previa, tanto para hermanos como para el público no iniciado interesado en conocer este patrimonio cultural paraguayo.':
      { en: 'The Museum is open for guided visits by appointment, both for brethren and for the uninitiated public interested in this Paraguayan cultural heritage.',
        pt: 'O Museu está aberto a visitas guiadas com agendamento prévio, tanto para irmãos como para o público não iniciado interessado em conhecer este patrimônio cultural paraguaio.' },
    'Recorrido ': { en: 'Visual ', pt: 'Percurso ' },
    'visual': { en: 'tour', pt: 'visual' },
    'Sala principal': { en: 'Main hall', pt: 'Sala principal' },
    'Vitrina histórica': { en: 'Historic display case', pt: 'Vitrine histórica' },
    'Sala de los símbolos': { en: 'Hall of symbols', pt: 'Sala dos símbolos' },
    'Sala de símbolos': { en: 'Symbols hall', pt: 'Sala de símbolos' },
    'Documentos fundacionales': { en: 'Founding documents', pt: 'Documentos fundacionais' },
    'Documentos': { en: 'Documents', pt: 'Documentos' },
    'Biblioteca histórica': { en: 'Historic library', pt: 'Biblioteca histórica' },
    'Galería de retratos': { en: 'Portrait gallery', pt: 'Galeria de retratos' },
    'Detalle arquitectónico': { en: 'Architectural detail', pt: 'Detalhe arquitetônico' },
    'Foto del museo': { en: 'Museum photo', pt: 'Foto do museu' },
    'Agendar una visita guiada': { en: 'Book a guided visit', pt: 'Agendar uma visita guiada' },
    'El Gran ': { en: 'The Grand ', pt: 'O Grande ' },
    'Archivo': { en: 'Archive', pt: 'Arquivo' },
    'El Gran Archivo es uno de los pilares del Centro Cultural Masónico. Custodia miles de textos, documentos y objetos que forman parte de la historia de la masonería paraguaya — desde las primeras actas del siglo XIX hasta el material institucional contemporáneo.':
      { en: 'The Grand Archive is one of the pillars of the Masonic Cultural Center. It safeguards thousands of texts, documents and objects that are part of the history of Paraguayan Freemasonry — from the first 19th-century records to contemporary institutional material.',
        pt: 'O Grande Arquivo é um dos pilares do Centro Cultural Maçônico. Custodia milhares de textos, documentos e objetos que fazem parte da história da maçonaria paraguaia — desde as primeiras atas do século XIX até o material institucional contemporâneo.' },
    'Entre sus fondos se conservan cartas patentes, balaustres originales, correspondencia diplomática con obediencias del mundo entero, fotografías históricas, libros antiguos, sellos institucionales, mobiliario ritual y objetos personales de los Grandes Maestros que precedieron al actual.':
      { en: 'Its holdings include charters of patent, original lodge minutes, diplomatic correspondence with obediences worldwide, historical photographs, old books, institutional seals, ritual furniture and personal objects of past Grand Masters.',
        pt: 'Entre seus fundos conservam-se cartas patentes, balaústres originais, correspondência diplomática com obediências de todo o mundo, fotografias históricas, livros antigos, selos institucionais, mobiliário ritual e objetos pessoais dos Grão-Mestres que precederam o atual.' },
    'Es, en esencia, la memoria documental de un siglo y medio de masonería en suelo paraguayo — un patrimonio que se preserva, se cataloga y se pone a disposición de la investigación histórica.':
      { en: 'It is, in essence, the documentary memory of a century and a half of Freemasonry on Paraguayan soil — a heritage that is preserved, cataloged and made available for historical research.',
        pt: 'É, em essência, a memória documental de um século e meio de maçonaria em solo paraguaio — um patrimônio que se preserva, se cataloga e se coloca à disposição da pesquisa histórica.' },
    'Documentos, libros ': { en: 'Documents, books ', pt: 'Documentos, livros ' },
    'y objetos': { en: 'and objects', pt: 'e objetos' },
    'Actas históricas': { en: 'Historic records', pt: 'Atas históricas' },
    'Biblioteca masónica': { en: 'Masonic library', pt: 'Biblioteca maçônica' },
    'Cartas patentes': { en: 'Charters of patent', pt: 'Cartas patentes' },
    'Fotografías históricas': { en: 'Historic photographs', pt: 'Fotografias históricas' },
    'Objetos rituales': { en: 'Ritual objects', pt: 'Objetos rituais' },
    'Correspondencia': { en: 'Correspondence', pt: 'Correspondência' },
    'Sellos institucionales': { en: 'Institutional seals', pt: 'Selos institucionais' },
    'El Gran Archivo se conserva en condiciones de archivo histórico y está abierto a investigadores con autorización previa de la Secretaría Ejecutiva.':
      { en: 'The Grand Archive is preserved under historical-archive conditions and is open to researchers with prior authorization from the Executive Secretariat.',
        pt: 'O Grande Arquivo é conservado em condições de arquivo histórico e está aberto a pesquisadores com autorização prévia da Secretaria Executiva.' },
    '28 Templos ': { en: '28 Temples ', pt: '28 Templos ' },
    'en territorio paraguayo': { en: 'in Paraguayan territory', pt: 'em território paraguaio' },
    'Patrimonio arquitectónico masónico de Paraguay — desde el histórico Templo de Palma de 1899 hasta los talleres contemporáneos.':
      { en: 'Paraguayan Masonic architectural heritage — from the historic 1899 Palma Temple to contemporary workshops.',
        pt: 'Patrimônio arquitetônico maçônico do Paraguai — desde o histórico Templo de Palma de 1899 até as oficinas contemporâneas.' },
    'Solar Génesis': { en: 'Solar Génesis', pt: 'Solar Génesis' },
    'Templo José Félix Bogado · Solar Aurora': { en: 'José Félix Bogado Temple · Solar Aurora', pt: 'Templo José Félix Bogado · Solar Aurora' },
    'Solar Aurora': { en: 'Solar Aurora', pt: 'Solar Aurora' },
    'Solar Herrera': { en: 'Solar Herrera', pt: 'Solar Herrera' },
    'Templo Ernesto Reinecke': { en: 'Ernesto Reinecke Temple', pt: 'Templo Ernesto Reinecke' },
    'Templo de Villarrica': { en: 'Villarrica Temple', pt: 'Templo de Villarrica' },
    'Templo de Concepción': { en: 'Concepción Temple', pt: 'Templo de Concepción' },
    'Solar Luz y Progreso': { en: 'Solar Luz y Progreso', pt: 'Solar Luz y Progreso' },
    'Templo Km. 4': { en: 'Km. 4 Temple', pt: 'Templo Km. 4' },
    'Templo Km. 7': { en: 'Km. 7 Temple', pt: 'Templo Km. 7' },
    'Templo Km. 13': { en: 'Km. 13 Temple', pt: 'Templo Km. 13' },
    'Templo Km. 14': { en: 'Km. 14 Temple', pt: 'Templo Km. 14' },
    'Solar Primero de Marzo': { en: 'Solar Primero de Marzo', pt: 'Solar Primero de Marzo' },
    'Templo PJC I': { en: 'PJC I Temple', pt: 'Templo PJC I' },
    'Templo PJC II': { en: 'PJC II Temple', pt: 'Templo PJC II' },
    'Nuevas ': { en: 'New ', pt: 'Novas ' },
    'experiencias culturales': { en: 'cultural experiences', pt: 'experiências culturais' },
    'Dos proyectos en desarrollo que ampliarán la forma en que el público se relaciona con el patrimonio masónico paraguayo — uno desde tu casa, otro durante la visita al museo.':
      { en: 'Two projects in development that will expand the ways the public engages with Paraguayan Masonic heritage — one from your home, the other during the museum visit.',
        pt: 'Dois projetos em desenvolvimento que ampliarão a forma como o público se relaciona com o patrimônio maçônico paraguaio — um a partir de sua casa, outro durante a visita ao museu.' },
    'Recorrido Virtual': { en: 'Virtual Tour', pt: 'Percurso Virtual' },
    'Recorré el Museo Masónico desde tu navegador. Una visita inmersiva en alta resolución para conocer las salas, vitrinas y piezas más destacadas sin moverte de tu casa.':
      { en: 'Tour the Masonic Museum from your browser. An immersive high-resolution visit to explore the most outstanding halls, display cases and pieces without leaving home.',
        pt: 'Percorra o Museu Maçônico a partir do seu navegador. Uma visita imersiva em alta resolução para conhecer as salas, vitrines e peças mais destacadas sem sair de casa.' },
    'En desarrollo · 360° · Compatible con visores VR': { en: 'In development · 360° · VR-headset compatible', pt: 'Em desenvolvimento · 360° · Compatível com visores VR' },
    'Tour Autoguiado al Museo': { en: 'Self-Guided Museum Tour', pt: 'Tour Autoguiado ao Museu' },
    'Una playlist de audio diseñada para acompañar al visitante presencial del Museo de la Masonería. Cada sala, vitrina y objeto contará con su propia explicación narrada.':
      { en: 'An audio playlist designed to accompany the in-person visitor to the Masonic Museum. Each hall, display case and object will have its own narrated explanation.',
        pt: 'Uma playlist de áudio desenhada para acompanhar o visitante presencial do Museu da Maçonaria. Cada sala, vitrine e objeto terá sua própria explicação narrada.' },
    'Acceso vía código QR en el museo · Reproducción gratuita': { en: 'Access via QR code at the museum · Free playback', pt: 'Acesso via código QR no museu · Reprodução gratuita' },
    'Ver vista previa': { en: 'View preview', pt: 'Ver pré-visualização' },
    'Información': { en: 'Information', pt: 'Informação' },
    'Título': { en: 'Title', pt: 'Título' },
    'Descripción': { en: 'Description', pt: 'Descrição' },

    // Masonería page
    'Conocer la Orden — ': { en: 'Get to know the Order — ', pt: 'Conhecer a Ordem — ' },
    'en sus propias palabras': { en: 'in its own words', pt: 'em suas próprias palavras' },
    'La Masonería es una Institución Universal, esencialmente educadora, humanista, filosófica, iniciática, progresista y filantrópica a la cual pueden asociarse personas de todas las naciones que pueblan la Tierra, unidos por el vínculo de solidaridad, encarnado en los principios de fraternidad, amor a la humanidad y a la verdad. Su estructura fundamental la constituye un sistema educativo, tradicional y simbólico. Tiene por objetivo la investigación de la verdad, el estudio de la moral universal, de la ciencia, las artes y la práctica de las virtudes para mejorar la condición social del ser humano.':
      { en: 'Freemasonry is a Universal Institution, essentially educational, humanist, philosophical, initiatory, progressive and philanthropic, open to people of all nations on Earth, united by the bond of solidarity embodied in the principles of fraternity, love of humanity and of truth. Its fundamental structure is a traditional and symbolic educational system. Its objective is the investigation of truth, the study of universal morality, of science and the arts, and the practice of the virtues to improve the social condition of the human being.',
        pt: 'A Maçonaria é uma Instituição Universal, essencialmente educadora, humanista, filosófica, iniciática, progressista e filantrópica à qual podem associar-se pessoas de todas as nações que povoam a Terra, unidos pelo vínculo de solidariedade, encarnado nos princípios de fraternidade, amor à humanidade e à verdade. Sua estrutura fundamental constitui-se em um sistema educativo, tradicional e simbólico. Tem por objetivo a investigação da verdade, o estudo da moral universal, da ciência, das artes e a prática das virtudes para melhorar a condição social do ser humano.' },
    'Origen y evolución de la Masonería': { en: 'Origin and evolution of Freemasonry', pt: 'Origem e evolução da Maçonaria' },
    'Desciende directa o indirectamente de la organización de masones operativos que construyeron los castillos y catedrales de la Edad Media en Europa. El 24 de junio de 1717 se reunieron en la taberna "El Ganso y la Parrilla" cuatro logias de Londres y fundaron la "Gran Logia de Londres y Westminster", que evolucionó hasta ser la Gran Logia Unida de Inglaterra. En 1725 se creó en Francia la primera logia en suelo francés. La masonería se extendió luego a las colonias en América.':
      { en: 'It descends directly or indirectly from the organization of operative masons who built the castles and cathedrals of medieval Europe. On June 24, 1717, four London lodges met at the "Goose and Gridiron" tavern and founded the "Grand Lodge of London and Westminster", which evolved into the United Grand Lodge of England. In 1725, the first lodge on French soil was created in France. Freemasonry then spread to the colonies in America.',
        pt: 'Descende direta ou indiretamente da organização de maçons operativos que construíram os castelos e catedrais da Idade Média na Europa. Em 24 de junho de 1717 reuniram-se na taverna "O Ganso e a Grelha" quatro lojas de Londres e fundaram a "Grande Loja de Londres e Westminster", que evoluiu para a Grande Loja Unida da Inglaterra. Em 1725 foi criada na França a primeira loja em solo francês. A maçonaria estendeu-se depois às colônias na América.' },
    'Propósitos y principios de la Masonería': { en: 'Purposes and principles of Freemasonry', pt: 'Propósitos e princípios da Maçonaria' },
    'La Masonería persigue el perfeccionamiento, la emancipación, la unión y la felicidad de los seres humanos. Considera la libertad de pensamiento y expresión como derechos innatos. Sustenta como lema LIBERTAD, IGUALDAD Y FRATERNIDAD y propugna la justicia social, el progreso, la democracia, la igualdad y la tolerancia.':
      { en: 'Freemasonry pursues the perfection, emancipation, union and happiness of human beings. It considers freedom of thought and expression as innate rights. It upholds the motto LIBERTY, EQUALITY AND FRATERNITY and advocates social justice, progress, democracy, equality and tolerance.',
        pt: 'A Maçonaria persegue o aperfeiçoamento, a emancipação, a união e a felicidade dos seres humanos. Considera a liberdade de pensamento e expressão como direitos inatos. Sustenta como lema LIBERDADE, IGUALDADE E FRATERNIDADE e propugna a justiça social, o progresso, a democracia, a igualdade e a tolerância.' },
    'La Masonería no es una religión': { en: 'Freemasonry is not a religion', pt: 'A Maçonaria não é uma religião' },
    'La Masonería, como institución, no forma parte de ninguna religión ni interfiere en las creencias religiosas de sus miembros; no les impone ninguna idea religiosa ni anti religiosa y tienen la libertad absoluta de practicar la religión que más les guste.':
      { en: 'Freemasonry, as an institution, does not belong to any religion nor interfere with its members\' religious beliefs; it imposes no religious or anti-religious idea on them, and they have absolute freedom to practice the religion they prefer.',
        pt: 'A Maçonaria, como instituição, não faz parte de nenhuma religião nem interfere nas crenças religiosas de seus membros; não lhes impõe nenhuma ideia religiosa nem antirreligiosa e têm a liberdade absoluta de praticar a religião que mais gostarem.' },
    '¿Quiénes pueden ingresar a la Masonería?': { en: 'Who can join Freemasonry?', pt: 'Quem pode ingressar na Maçonaria?' },
    'Los hombres libres y de buenas costumbres con la edad mínima de 25 años. "Hombre Libre" es aquel en condiciones de expresar libremente sus pensamientos, que no acepta imposiciones contra sus principios ni está sujeto a la voluntad de un tercero. "Hombre de Buenas Costumbres" es aquel que obedece las leyes, honra a su patria y familia, es tolerante y respetuoso con las ideas de sus semejantes.':
      { en: 'Free men of good morals, at least 25 years of age. A "Free Man" is one able to freely express his thoughts, who accepts no imposition against his principles and is not subject to the will of a third party. A "Man of Good Morals" is one who obeys the laws, honors his country and family, and is tolerant and respectful of the ideas of his fellow human beings.',
        pt: 'Os homens livres e de bons costumes com idade mínima de 25 anos. "Homem Livre" é aquele em condições de expressar livremente seus pensamentos, que não aceita imposições contra seus princípios nem está sujeito à vontade de um terceiro. "Homem de Bons Costumes" é aquele que obedece as leis, honra sua pátria e família, é tolerante e respeitoso com as ideias de seus semelhantes.' },
    'Tres principios — ': { en: 'Three principles — ', pt: 'Três princípios — ' },
    'una sola tradición': { en: 'a single tradition', pt: 'uma só tradição' },
    'Libertad': { en: 'Liberty', pt: 'Liberdade' },
    'Libertad de pensamiento, de conciencia y de expresión. Derechos innatos del ser humano que la Masonería defiende como base de toda dignidad.':
      { en: 'Freedom of thought, conscience and expression. Innate rights of the human being that Freemasonry defends as the basis of all dignity.',
        pt: 'Liberdade de pensamento, de consciência e de expressão. Direitos inatos do ser humano que a Maçonaria defende como base de toda dignidade.' },
    'Igualdad': { en: 'Equality', pt: 'Igualdade' },
    'Igualdad esencial entre todos los seres humanos, sin distinción de raza, credo, origen o condición social. La fraternidad sólo es real entre iguales.':
      { en: 'Essential equality among all human beings, without distinction of race, creed, origin or social condition. Fraternity is only real among equals.',
        pt: 'Igualdade essencial entre todos os seres humanos, sem distinção de raça, credo, origem ou condição social. A fraternidade só é real entre iguais.' },
    'Fraternidad': { en: 'Fraternity', pt: 'Fraternidade' },
    'Vínculo universal entre los hombres como hijos de un mismo Gran Arquitecto del Universo. La fraternidad es el ejercicio cotidiano de la solidaridad.':
      { en: 'Universal bond among human beings as children of one same Great Architect of the Universe. Fraternity is the daily practice of solidarity.',
        pt: 'Vínculo universal entre os homens como filhos de um mesmo Grande Arquiteto do Universo. A fraternidade é o exercício cotidiano da solidariedade.' },
    'Símbolos ': { en: 'Essential ', pt: 'Símbolos ' },
    'esenciales': { en: 'symbols', pt: 'essenciais' },
    'La Masonería es un sistema educativo de carácter simbólico. Estos son algunos de los símbolos centrales de la tradición — herramientas para la reflexión moral y filosófica.':
      { en: 'Freemasonry is an educational system of symbolic character. These are some of the central symbols of the tradition — tools for moral and philosophical reflection.',
        pt: 'A Maçonaria é um sistema educativo de caráter simbólico. Estes são alguns dos símbolos centrais da tradição — ferramentas para a reflexão moral e filosófica.' },
    'Compás y Escuadra': { en: 'Compass and Square', pt: 'Compasso e Esquadro' },
    'Símbolos universales de la Orden — el compás traza el círculo del espíritu; la escuadra rectifica las acciones humanas.':
      { en: 'Universal symbols of the Order — the compass traces the circle of the spirit; the square rectifies human actions.',
        pt: 'Símbolos universais da Ordem — o compasso traça o círculo do espírito; o esquadro retifica as ações humanas.' },
    'Letra G': { en: 'Letter G', pt: 'Letra G' },
    'Representa al Gran Arquitecto del Universo, principio creador, y a la Geometría, ciencia sagrada de la construcción.':
      { en: 'Represents the Great Architect of the Universe, creative principle, and Geometry, the sacred science of construction.',
        pt: 'Representa o Grande Arquiteto do Universo, princípio criador, e a Geometria, ciência sagrada da construção.' },
    'Sol y Luna': { en: 'Sun and Moon', pt: 'Sol e Lua' },
    'Las dos grandes luminarias que iluminan los trabajos del taller — equilibrio entre razón y sensibilidad.':
      { en: 'The two great luminaries that illuminate the work of the lodge — balance between reason and sensibility.',
        pt: 'As duas grandes luminárias que iluminam os trabalhos da oficina — equilíbrio entre razão e sensibilidade.' },
    'Delta luminoso': { en: 'Luminous Delta', pt: 'Delta luminoso' },
    'Triángulo radiante — símbolo del Gran Arquitecto, presencia espiritual que preside todo trabajo masónico.':
      { en: 'Radiant triangle — symbol of the Great Architect, spiritual presence that presides over all Masonic work.',
        pt: 'Triângulo radiante — símbolo do Grande Arquiteto, presença espiritual que preside todo trabalho maçônico.' },
    'Solicitar el ': { en: 'Apply for ', pt: 'Solicitar o ' },
    'ingreso': { en: 'membership', pt: 'ingresso' },
    'El ingreso a la Masonería se realiza por iniciativa personal del solicitante. La GLSP recibe consultas serenas y respetuosas a través de su Secretaría Ejecutiva.':
      { en: 'Joining Freemasonry happens by personal initiative of the applicant. The GLSP welcomes serene and respectful inquiries through its Executive Secretariat.',
        pt: 'O ingresso na Maçonaria realiza-se por iniciativa pessoal do solicitante. A GLSP recebe consultas serenas e respeitosas através de sua Secretaria Executiva.' },
    'Contactar a la Secretaría': { en: 'Contact the Secretariat', pt: 'Contatar a Secretaria' },

    // Filantropía page
    'Fundación ': { en: '', pt: 'Fundação ' },
    'Esperanza': { en: 'Esperanza Foundation', pt: 'Esperanza' },
    'Desde 1978, el brazo filantrópico de la Gran Logia Simbólica del Paraguay materializa el lema masónico de amor a la humanidad — educación, salud y acción social para los sectores más vulnerables de la sociedad paraguaya.':
      { en: 'Since 1978, the philanthropic arm of the Grand Symbolic Lodge of Paraguay has embodied the Masonic motto of love for humanity — education, health and social action for the most vulnerable sectors of Paraguayan society.',
        pt: 'Desde 1978, o braço filantrópico da Grande Loja Simbólica do Paraguai materializa o lema maçônico de amor à humanidade — educação, saúde e ação social para os setores mais vulneráveis da sociedade paraguaia.' },
    'Una vocación ': { en: 'A philanthropic ', pt: 'Uma vocação ' },
    'filantrópica': { en: 'vocation', pt: 'filantrópica' },
    'La Fundación Esperanza fue fundada el 21 de Setiembre de 1978, reconocida su personería jurídica por Decreto N° 1.437 del Poder Ejecutivo de la Nación. Desde entonces, materializa la vocación filantrópica de la GLSP.':
      { en: 'The Esperanza Foundation was founded on September 21, 1978, its legal status recognized by Decree No. 1,437 of the National Executive. Since then, it has embodied the philanthropic vocation of the GLSP.',
        pt: 'A Fundação Esperanza foi fundada em 21 de Setembro de 1978, com sua personalidade jurídica reconhecida pelo Decreto Nº 1.437 do Poder Executivo da Nação. Desde então, materializa a vocação filantrópica da GLSP.' },
    'Años de obra': { en: 'Years of work', pt: 'Anos de obra' },
    'Niños beneficiados': { en: 'Children benefited', pt: 'Crianças beneficiadas' },
    'Programas activos': { en: 'Active programs', pt: 'Programas ativos' },
    'Año fundacional': { en: 'Founding year', pt: 'Ano fundacional' },
    'Líneas ': { en: 'Lines ', pt: 'Linhas ' },
    'de acción': { en: 'of action', pt: 'de ação' },
    'La Fundación opera a través de programas estructurados que articulan recursos, voluntariado de los hermanos y alianzas con instituciones públicas y privadas.':
      { en: 'The Foundation operates through structured programs that combine resources, brethren volunteering, and partnerships with public and private institutions.',
        pt: 'A Fundação opera através de programas estruturados que articulam recursos, voluntariado dos irmãos e alianças com instituições públicas e privadas.' },
    'Escuela de Itá': { en: 'Itá School', pt: 'Escola de Itá' },
    'Capacitación académica integral para niños y jóvenes de la comunidad de Itá. Educación primaria y media con foco en valores cívicos y formación técnica.':
      { en: 'Comprehensive academic training for children and youth of the Itá community. Primary and secondary education focused on civic values and technical training.',
        pt: 'Capacitação acadêmica integral para crianças e jovens da comunidade de Itá. Educação primária e média com foco em valores cívicos e formação técnica.' },
    'Beneficiarios:': { en: 'Beneficiaries:', pt: 'Beneficiários:' },
    '850 niños y jóvenes anualmente.': { en: '850 children and youth annually.', pt: '850 crianças e jovens anualmente.' },
    'Programa de salud bucodental': { en: 'Oral health program', pt: 'Programa de saúde bucodental' },
    'Servicios odontológicos gratuitos para niños de la escuela de Itá. Profilaxis, tratamientos restaurativos y educación sanitaria.':
      { en: 'Free dental services for children of the Itá school. Prophylaxis, restorative treatments and health education.',
        pt: 'Serviços odontológicos gratuitos para crianças da escola de Itá. Profilaxia, tratamentos restaurativos e educação sanitária.' },
    'Cobertura:': { en: 'Coverage:', pt: 'Cobertura:' },
    '100% del alumnado.': { en: '100% of students.', pt: '100% do alunado.' },
    'Articulación de donaciones': { en: 'Donation coordination', pt: 'Articulação de doações' },
    'Coordinación de donaciones de medicamentos, antiparasitarios y donación de sangre con hospitales públicos del país.':
      { en: 'Coordination of donations of medicines, antiparasitics and blood donation with public hospitals across the country.',
        pt: 'Coordenação de doações de medicamentos, antiparasitários e doação de sangue com hospitais públicos do país.' },
    'Alianzas:': { en: 'Partnerships:', pt: 'Parcerias:' },
    'Hospital de Itá, Hospital de Clínicas, Cruz Roja Paraguaya.':
      { en: 'Itá Hospital, Hospital de Clínicas, Paraguayan Red Cross.',
        pt: 'Hospital de Itá, Hospital de Clínicas, Cruz Vermelha Paraguaia.' },
    'Educación para adultos mayores': { en: 'Education for older adults', pt: 'Educação para idosos' },
    'Talleres de alfabetización digital, lectura y desarrollo personal para adultos mayores en situación de vulnerabilidad.':
      { en: 'Workshops on digital literacy, reading and personal development for older adults in vulnerable situations.',
        pt: 'Oficinas de alfabetização digital, leitura e desenvolvimento pessoal para idosos em situação de vulnerabilidade.' },
    'Modalidad:': { en: 'Format:', pt: 'Modalidade:' },
    'Presencial y a distancia.': { en: 'In-person and remote.', pt: 'Presencial e a distância.' },
    'Sumarse a la ': { en: 'Join the ', pt: 'Juntar-se à ' },
    'La obra filantrópica se sostiene con el aporte solidario de hermanos, instituciones y particulares que comparten la convicción de que la educación y la salud son derechos esenciales.':
      { en: 'The philanthropic work is sustained by the solidary contribution of brethren, institutions and individuals who share the conviction that education and health are essential rights.',
        pt: 'A obra filantrópica sustenta-se com o aporte solidário de irmãos, instituições e particulares que compartilham a convicção de que a educação e a saúde são direitos essenciais.' },
    'Hacer una donación': { en: 'Make a donation', pt: 'Fazer uma doação' },
    'Voluntariado': { en: 'Volunteering', pt: 'Voluntariado' },

    // Grandes Maestros page
    'Más de un siglo y medio de continuidad institucional registrado en una sola línea — desde Zerakhial en junio de 1869 hasta el Ser∴ Gran Maestro Carlos Sosa Jovellanos en el período 2025/2027.':
      { en: 'More than a century and a half of institutional continuity recorded in a single line — from Zerakhial in June 1869 to M∴W∴ Grand Master Carlos Sosa Jovellanos in the 2025/2027 term.',
        pt: 'Mais de um século e meio de continuidade institucional registrado em uma única linha — desde Zerakhial em junho de 1869 até o Ser∴ Grão-Mestre Carlos Sosa Jovellanos no período 2025/2027.' },
    '— Gran Maestro Nº 43 · En funciones —':
      { en: '— Grand Master No. 43 · In office —', pt: '— Grão-Mestre Nº 43 · Em exercício —' },
    'Electo por la Asamblea General de la Gran Logia Simbólica del Paraguay para el período 2025–2027, asume la conducción institucional con el compromiso de continuar la apertura digital y el fortalecimiento internacional de la jurisdicción.':
      { en: 'Elected by the General Assembly of the Grand Symbolic Lodge of Paraguay for the 2025–2027 term, he assumes institutional leadership with the commitment to continue the digital openness and international strengthening of the jurisdiction.',
        pt: 'Eleito pela Assembleia Geral da Grande Loja Simbólica do Paraguai para o período 2025–2027, assume a condução institucional com o compromisso de continuar a abertura digital e o fortalecimento internacional da jurisdição.' },
    'Registro completo · ': { en: 'Full registry · ', pt: 'Registro completo · ' },
    '43 Grandes Maestros': { en: '43 Grand Masters', pt: '43 Grão-Mestres' },
    'Nº': { en: 'No.', pt: 'Nº' },
    'Nombre': { en: 'Name', pt: 'Nome' },
    'Período': { en: 'Term', pt: 'Período' },
    '— en funciones': { en: '— in office', pt: '— em exercício' },

    // Contacto page
    'Escribir a la ': { en: 'Write to the ', pt: 'Escrever à ' },
    'La Secretaría Ejecutiva atiende consultas institucionales, solicitudes de información y comunicaciones formales. Para visitas al Templo Histórico de Palma, agendar con anticipación.':
      { en: 'The Executive Secretariat handles institutional inquiries, requests for information and formal communications. For visits to the Historic Temple of Palma, please book in advance.',
        pt: 'A Secretaria Executiva atende consultas institucionais, solicitações de informação e comunicações formais. Para visitas ao Templo Histórico de Palma, agendar com antecedência.' },
    'Sede principal': { en: 'Main headquarters', pt: 'Sede principal' },
    'Gran Oriente del Paraguay': { en: 'Grand Orient of Paraguay', pt: 'Grande Oriente do Paraguai' },
    'Secretaría Ejecutiva': { en: 'Executive Secretariat', pt: 'Secretaria Executiva' },
    'Comunicación oficial': { en: 'Official communication', pt: 'Comunicação oficial' },
    'Horario': { en: 'Hours', pt: 'Horário' },
    'Atención al público': { en: 'Public service', pt: 'Atendimento ao público' },
    'Redes sociales': { en: 'Social networks', pt: 'Redes sociais' },
    'Enviar un mensaje': { en: 'Send a message', pt: 'Enviar uma mensagem' },
    'Nombre completo': { en: 'Full name', pt: 'Nome completo' },
    'Apellido': { en: 'Last name', pt: 'Sobrenome' },
    'Correo electrónico': { en: 'Email address', pt: 'E-mail' },
    'Tipo de consulta': { en: 'Inquiry type', pt: 'Tipo de consulta' },
    'Consulta institucional': { en: 'Institutional inquiry', pt: 'Consulta institucional' },
    'Solicitud de visita al museo': { en: 'Museum visit request', pt: 'Solicitação de visita ao museu' },
    'Información sobre la Masonería': { en: 'Information about Freemasonry', pt: 'Informação sobre a Maçonaria' },
    'Donación a Fundación Esperanza': { en: 'Donation to Esperanza Foundation', pt: 'Doação à Fundação Esperanza' },
    'Prensa y comunicación': { en: 'Press and communication', pt: 'Imprensa e comunicação' },
    'Otra': { en: 'Other', pt: 'Outra' },
    'Mensaje': { en: 'Message', pt: 'Mensagem' },
    'Su mensaje…': { en: 'Your message…', pt: 'Sua mensagem…' },
    'Enviar mensaje': { en: 'Send message', pt: 'Enviar mensagem' },
    'Patrimonio Histórico del Paraguay desde 2018. Visitas guiadas con cita previa.':
      { en: 'Historic Heritage of Paraguay since 2018. Guided visits by appointment.',
        pt: 'Patrimônio Histórico do Paraguai desde 2018. Visitas guiadas com agendamento prévio.' },
    'Lunes a Viernes · 09:00 — 17:00 hs': { en: 'Monday to Friday · 09:00 — 17:00', pt: 'Segunda a Sexta · 09:00 — 17:00' },
    'Visitas al museo y templo: con cita previa': { en: 'Museum and temple visits: by appointment', pt: 'Visitas ao museu e templo: com agendamento prévio' },

    // Miembros
    'Área de ': { en: 'Brethren ', pt: 'Área dos ' },
    'Hermanos': { en: 'Area', pt: 'Irmãos' },
    'Portal interno de la Gran Logia Simbólica del Paraguay.':
      { en: 'Internal portal of the Grand Symbolic Lodge of Paraguay.',
        pt: 'Portal interno da Grande Loja Simbólica do Paraguai.' },
    'Usuario o correo electrónico': { en: 'Username or email', pt: 'Usuário ou e-mail' },
    'Contraseña': { en: 'Password', pt: 'Senha' },
    'Recordar sesión': { en: 'Remember me', pt: 'Lembrar sessão' },
    '¿Olvidó la contraseña?': { en: 'Forgot password?', pt: 'Esqueceu a senha?' },
    'Iniciar sesión': { en: 'Sign in', pt: 'Entrar' },
    'Zona protegida — Sólo hermanos en regularidad': { en: 'Protected area — Brethren in regularity only', pt: 'Zona protegida — Apenas irmãos em regularidade' },

    // Artículos
    'Artículos ': { en: 'Masonic ', pt: 'Artigos ' },
    'Masónicos': { en: 'Articles', pt: 'Maçônicos' },
    'Una biblioteca pública de pensamiento masónico paraguayo en formación — ensayos sobre filosofía, simbolismo, historia y ética desde la tradición de la Orden.':
      { en: 'A public library of Paraguayan Masonic thought in formation — essays on philosophy, symbolism, history and ethics from the tradition of the Order.',
        pt: 'Uma biblioteca pública de pensamento maçônico paraguaio em formação — ensaios sobre filosofia, simbolismo, história e ética desde a tradição da Ordem.' },
    'Filosofía · Destacado': { en: 'Philosophy · Featured', pt: 'Filosofia · Destaque' },
    'El simbolismo del Compás y la Escuadra en la tradición masónica':
      { en: 'The symbolism of the Compass and Square in the Masonic tradition',
        pt: 'O simbolismo do Compasso e do Esquadro na tradição maçônica' },
    'Una lectura contemporánea de los símbolos fundamentales de la Orden — su origen en la masonería operativa medieval, su transición a la masonería especulativa, y su vigencia como herramientas de reflexión moral en el siglo XXI.':
      { en: 'A contemporary reading of the fundamental symbols of the Order — their origin in medieval operative masonry, their transition to speculative masonry, and their relevance as tools of moral reflection in the 21st century.',
        pt: 'Uma leitura contemporânea dos símbolos fundamentais da Ordem — sua origem na maçonaria operativa medieval, sua transição para a maçonaria especulativa e sua vigência como ferramentas de reflexão moral no século XXI.' },
    '— Por H∴ [Autor] · 24 minutos de lectura':
      { en: '— By Bro∴ [Author] · 24 min read', pt: '— Por Ir∴ [Autor] · 24 minutos de leitura' },
    'Leer ensayo completo': { en: 'Read full essay', pt: 'Ler ensaio completo' },
    'Todos': { en: 'All', pt: 'Todos' },
    'Filosofía': { en: 'Philosophy', pt: 'Filosofia' },
    'Ética': { en: 'Ethics', pt: 'Ética' },
    'Ritual': { en: 'Ritual', pt: 'Ritual' },
    'Masonería paraguaya': { en: 'Paraguayan Freemasonry', pt: 'Maçonaria paraguaia' },
    'Los masones paraguayos en la reconstrucción nacional post-guerra de la Triple Alianza':
      { en: 'Paraguayan Masons in the national reconstruction after the Triple Alliance War',
        pt: 'Os maçons paraguaios na reconstrução nacional pós-guerra da Tríplice Aliança' },
    'Libertad de conciencia y tolerancia: pilares del pensamiento masónico universal':
      { en: 'Freedom of conscience and tolerance: pillars of universal Masonic thought',
        pt: 'Liberdade de consciência e tolerância: pilares do pensamento maçônico universal' },
    'El Templo interior — arquitectura simbólica del trabajo masónico':
      { en: 'The inner Temple — symbolic architecture of Masonic work',
        pt: 'O Templo interior — arquitetura simbólica do trabalho maçônico' },
    'Bernardino Caballero y el resurgimiento de la masonería paraguaya en 1887':
      { en: 'Bernardino Caballero and the resurgence of Paraguayan Freemasonry in 1887',
        pt: 'Bernardino Caballero e o ressurgimento da maçonaria paraguaia em 1887' },
    'Razón y tradición — la Masonería ante la modernidad':
      { en: 'Reason and tradition — Freemasonry facing modernity',
        pt: 'Razão e tradição — a Maçonaria diante da modernidade' },
    'El Rito Escocés Antiguo y Aceptado en el Paraguay':
      { en: 'The Ancient and Accepted Scottish Rite in Paraguay',
        pt: 'O Rito Escocês Antigo e Aceito no Paraguai' },
    'Los oficios del Cuadro Logial — una lectura ritual y administrativa':
      { en: 'The offices of the Lodge Board — a ritual and administrative reading',
        pt: 'Os ofícios do Quadro Logial — uma leitura ritual e administrativa' },
    'La Letra G — Geometría, Gnosis, Gran Arquitecto':
      { en: 'The Letter G — Geometry, Gnosis, Great Architect',
        pt: 'A Letra G — Geometria, Gnose, Grande Arquiteto' },
    'El Templo de Palma como espacio cívico — más allá del ritual masónico':
      { en: 'The Palma Temple as a civic space — beyond Masonic ritual',
        pt: 'O Templo de Palma como espaço cívico — além do ritual maçônico' },

    // Tour autoguiado
    'Esta experiencia se encuentra en desarrollo · Vista previa':
      { en: 'This experience is under development · Preview',
        pt: 'Esta experiência encontra-se em desenvolvimento · Pré-visualização' },
    'Tour Autoguiado': { en: 'Self-Guided Tour', pt: 'Tour Autoguiado' },
    'Tour autoguiado': { en: 'Self-guided tour', pt: 'Tour autoguiado' },
    'Recorré el Museo ': { en: 'Tour the Museum ', pt: 'Percorra o Museu ' },
    'en tu propio ritmo': { en: 'at your own pace', pt: 'no seu próprio ritmo' },
    'Una playlist de audio diseñada como compañera del visitante presencial. Escaneá el código QR de cada sala y dejate guiar por la voz de la propia institución — sala por sala, vitrina por vitrina, objeto por objeto.':
      { en: 'An audio playlist designed as a companion for the in-person visitor. Scan the QR code in each hall and let yourself be guided by the institution\'s own voice — hall by hall, display case by display case, object by object.',
        pt: 'Uma playlist de áudio desenhada como companheira do visitante presencial. Escaneie o código QR de cada sala e deixe-se guiar pela voz da própria instituição — sala por sala, vitrine por vitrine, objeto por objeto.' },
    'Volver al Centro Cultural': { en: 'Back to the Cultural Center', pt: 'Voltar ao Centro Cultural' },
    'Vista previa': { en: 'Preview', pt: 'Pré-visualização' },
    'Los códigos QR estarán': { en: 'QR codes will be', pt: 'Os códigos QR estarão' },
    'distribuidos por todo el museo': { en: 'distributed throughout the museum', pt: 'distribuídos por todo o museu' },
    'Vista previa ': { en: 'Tour ', pt: 'Pré-visualização ' },
    'del recorrido': { en: 'preview', pt: 'do percurso' },
    'Pista 01 / 12': { en: 'Track 01 / 12', pt: 'Faixa 01 / 12' },
    'Bienvenida al Museo de la Francmasonería Paraguaya':
      { en: 'Welcome to the Museum of Paraguayan Freemasonry', pt: 'Bem-vindo ao Museu da Maçonaria Paraguaia' },
    '3:24 · Voz institucional': { en: '3:24 · Institutional voice', pt: '3:24 · Voz institucional' },
    'Playlist completa': { en: 'Full playlist', pt: 'Playlist completa' },
    '12 pistas · 48 min total': { en: '12 tracks · 48 min total', pt: '12 faixas · 48 min total' },
    'Introducción': { en: 'Introduction', pt: 'Introdução' },
    'Sala I — Los orígenes en Paraguay': { en: 'Hall I — The origins in Paraguay', pt: 'Sala I — As origens no Paraguai' },
    'Sala 1': { en: 'Hall 1', pt: 'Sala 1' },
    'Vitrina I.1 — Acta fundacional de la Logia Fe (1869)':
      { en: 'Display I.1 — Founding act of Lodge Fe (1869)', pt: 'Vitrine I.1 — Ata fundacional da Loja Fé (1869)' },
    'Documento': { en: 'Document', pt: 'Documento' },
    'Vitrina I.2 — Mandiles y regalia del siglo XIX':
      { en: 'Display I.2 — 19th-century aprons and regalia', pt: 'Vitrine I.2 — Aventais e regalia do século XIX' },
    'Sala II — La fundación del Gran Oriente':
      { en: 'Hall II — The founding of the Grand Orient', pt: 'Sala II — A fundação do Grande Oriente' },
    'Sala 2': { en: 'Hall 2', pt: 'Sala 2' },
    'Vitrina II.1 — Constitución del GOP de 1894':
      { en: 'Display II.1 — 1894 GOP Constitution', pt: 'Vitrine II.1 — Constituição do GOP de 1894' },
    'Sala III — El Templo Histórico de Palma':
      { en: 'Hall III — The Historic Temple of Palma', pt: 'Sala III — O Templo Histórico de Palma' },
    'Sala 3': { en: 'Hall 3', pt: 'Sala 3' },
    'Reseña histórica del Templo de Palma':
      { en: 'Historical overview of the Palma Temple', pt: 'Resenha histórica do Templo de Palma' },
    'Sala IV — Los 43 Grandes Maestros':
      { en: 'Hall IV — The 43 Grand Masters', pt: 'Sala IV — Os 43 Grão-Mestres' },
    'Sala 4': { en: 'Hall 4', pt: 'Sala 4' },
    'Sala V — La Masonería en el siglo XX':
      { en: 'Hall V — Freemasonry in the 20th century', pt: 'Sala V — A Maçonaria no século XX' },
    'Sala 5': { en: 'Hall 5', pt: 'Sala 5' },
    'Biblioteca histórica — un recorrido temático':
      { en: 'Historic library — a thematic tour', pt: 'Biblioteca histórica — um percurso temático' },
    'Cierre — La Masonería paraguaya hoy':
      { en: 'Closing — Paraguayan Freemasonry today', pt: 'Encerramento — A Maçonaria paraguaia hoje' },
    'Final': { en: 'Closing', pt: 'Final' },
    'Tres pasos ': { en: 'Three steps ', pt: 'Três passos ' },
    'para recorrer el museo': { en: 'to tour the museum', pt: 'para percorrer o museu' },
    'El tour autoguiado funcionará durante tu visita presencial al Museo Masónico. Sin descargar nada — sólo tu teléfono y curiosidad.':
      { en: 'The self-guided tour will work during your in-person visit to the Masonic Museum. No download required — only your phone and curiosity.',
        pt: 'O tour autoguiado funcionará durante sua visita presencial ao Museu Maçônico. Sem baixar nada — apenas seu telefone e curiosidade.' },
    'Visitá el museo': { en: 'Visit the museum', pt: 'Visite o museu' },
    'Agendá una visita al Museo de la Francmasonería Paraguaya en la sede del Gran Oriente, en Asunción.':
      { en: 'Book a visit to the Museum of Paraguayan Freemasonry at the headquarters of the Grand Orient in Asunción.',
        pt: 'Agende uma visita ao Museu da Maçonaria Paraguaia na sede do Grande Oriente, em Assunção.' },
    'Escaneá el código QR': { en: 'Scan the QR code', pt: 'Escaneie o código QR' },
    'En cada sala y vitrina destacada encontrarás un código QR. Escaneálo con la cámara de tu teléfono — sin descargar nada.':
      { en: 'In every hall and featured display you\'ll find a QR code. Scan it with your phone\'s camera — no download required.',
        pt: 'Em cada sala e vitrine destacada encontrará um código QR. Escaneie com a câmera do seu telefone — sem baixar nada.' },
    'Escuchá la narración': { en: 'Listen to the narration', pt: 'Ouça a narração' },
    'Cada código abre una pista de audio que explica lo que tenés delante. Recorré a tu ritmo, en silencio respetuoso.':
      { en: 'Each code opens an audio track explaining what\'s in front of you. Tour at your own pace, in respectful silence.',
        pt: 'Cada código abre uma faixa de áudio que explica o que está à sua frente. Percorra no seu ritmo, em silêncio respeitoso.' },

    // Page titles
    'Gran Logia Simbólica del Paraguay — Fundada en 1923':
      { en: 'Grand Symbolic Lodge of Paraguay — Founded in 1923', pt: 'Grande Loja Simbólica do Paraguai — Fundada em 1923' },
    'Gran Logia · GLSP': { en: 'Grand Lodge · GLSP', pt: 'Grande Loja · GLSP' },
    'Historia de la Masonería en Paraguay · GLSP':
      { en: 'History of Freemasonry in Paraguay · GLSP', pt: 'História da Maçonaria no Paraguai · GLSP' },
    'Noticias · Gran Logia Simbólica del Paraguay':
      { en: 'News · Grand Symbolic Lodge of Paraguay', pt: 'Notícias · Grande Loja Simbólica do Paraguai' },
    'Centro Cultural Masónico · Gran Logia Simbólica del Paraguay':
      { en: 'Masonic Cultural Center · Grand Symbolic Lodge of Paraguay',
        pt: 'Centro Cultural Maçônico · Grande Loja Simbólica do Paraguai' },
    'Masonería · GLSP': { en: 'Freemasonry · GLSP', pt: 'Maçonaria · GLSP' },
    'Filantropía · Fundación Esperanza · GLSP':
      { en: 'Philanthropy · Esperanza Foundation · GLSP', pt: 'Filantropia · Fundação Esperanza · GLSP' },
    'Histórico de Grandes Maestros · GLSP':
      { en: 'Past Grand Masters · GLSP', pt: 'Histórico de Grão-Mestres · GLSP' },
    'Contacto · GLSP': { en: 'Contact · GLSP', pt: 'Contato · GLSP' },
    'Área de Hermanos · GLSP': { en: 'Brethren Area · GLSP', pt: 'Área dos Irmãos · GLSP' },
    'Artículos Masónicos · GLSP': { en: 'Masonic Articles · GLSP', pt: 'Artigos Maçônicos · GLSP' },
    'Tour Autoguiado al Museo · GLSP': { en: 'Self-Guided Museum Tour · GLSP', pt: 'Tour Autoguiado ao Museu · GLSP' }
  ,
    "Levantamiento de Columnas de la Logia Fe, la primera en territorio paraguayo": { en: "Raising of Columns of Lodge Fe, the first on Paraguayan territory", pt: "Levantamento de Colunas da Loja Fé, a primeira em território paraguaio" },
    "El acta de la constitución de esta Logia primigenia dice:": { en: "The act of constitution of this earliest Lodge reads:", pt: "A ata de constituição desta Loja primigênia diz:" },
    "\"A los 18 días de la luna de Iyar de A∴ de N∴ L∴ 5869, unos HH∴ reunidos en un lugar donde reina la paz y el silencio, estando a cubierto de la vista de los profanos resuelven levantar un Templ∴ a la virtud bajo los auspicios del S∴ A∴ del U∴ y solicitar  carta constitutiva  al Gr∴ Or∴ del Brasil en el Vall∴ de los Benedictinos, siendo su primer cuadro logial:": { en: "\"On the 18th day of the moon of Iyar of A∴ of N∴ L∴ 5869, some Brn∴ gathered in a place where peace and silence reign, sheltered from the sight of the profane, resolve to raise a Templ∴ to virtue under the auspices of the G∴ A∴ of the U∴ and to request a charter of constitution from the Gr∴ Or∴ of Brazil in the Vall∴ of the Benedictines, with their first lodge board being:", pt: "\"Aos 18 dias da lua de Iyar de A∴ de N∴ L∴ 5869, uns Irm∴ reunidos em um lugar onde reina a paz e o silêncio, ao abrigo da vista dos profanos, resolvem levantar um Templ∴ à virtude sob os auspícios do G∴ A∴ do U∴ e solicitar carta constitutiva ao Gr∴ Or∴ do Brasil no Val∴ dos Beneditinos, sendo seu primeiro quadro logial:" },
    "Ven∴Maest∴             Coronel Francisco Vieira Faria Rocha\n1er. Vig∴                   Mayor Jorge Lopes da Costa Moreira\n2ndo. Vig∴                Antonio Silveira Solar...\"": { en: "Worsh∴ Master      Colonel Francisco Vieira Faria Rocha\n1st Warden          Major Jorge Lopes da Costa Moreira\n2nd Warden        Antonio Silveira Solar...\"", pt: "Ven∴ Mestre        Coronel Francisco Vieira Faria Rocha\n1º Vigil∴               Major Jorge Lopes da Costa Moreira\n2º Vigil∴               Antonio Silveira Solar...\"" },
    "La Masonería Paraguaya se independiza de la brasileña": { en: "Paraguayan Freemasonry becomes independent from the Brazilian", pt: "A Maçonaria Paraguaia se independiza da brasileira" },
    "Se produce la independencia del Gran Oriente del Brasil y el Gran Oriente y el Supremo Consejo del Rito Escoces Antiguo y Aceptado nacen en la ciudad capital de Asunción de la República del Paraguay.": { en: "Independence from the Grand Orient of Brazil takes place, and the Grand Orient and the Supreme Council of the Ancient and Accepted Scottish Rite are born in the capital city of Asunción, Republic of Paraguay.", pt: "Ocorre a independência do Grande Oriente do Brasil e o Grande Oriente e o Supremo Conselho do Rito Escocês Antigo e Aceito nascem na cidade capital de Assunção da República do Paraguai." },
    "Las fuerzas de ocupación abandonan el Paraguay": { en: "The occupation forces leave Paraguay", pt: "As forças de ocupação abandonam o Paraguai" },
    "La masonería Uruguaya en Paraguay": { en: "Uruguayan Freemasonry in Paraguay", pt: "A maçonaria Uruguaia no Paraguai" },
    "De la mano de los masones uruguayos, renace la Masonería en el Paraguay": { en: "With the hand of the Uruguayan Masons, Freemasonry is reborn in Paraguay", pt: "Pelas mãos dos maçons uruguaios, renasce a Maçonaria no Paraguai" },
    "Levanta Columnas, bajo los auspicios del Oriente del Uruguay, llevando el número de orden 66, la Logia Aurora del Paraguay.": { en: "Lodge Aurora del Paraguay raises its Columns, under the auspices of the Orient of Uruguay, bearing serial number 66.", pt: "Levanta Colunas, sob os auspícios do Oriente do Uruguai, com o número de ordem 66, a Loja Aurora del Paraguay." },
    "Fundación Logia: Aurora del Paraguay Nº 1": { en: "Founding of Lodge: Aurora del Paraguay Nº 1", pt: "Fundação da Loja: Aurora del Paraguay Nº 1" },
    "Fundación Logia: Aurora del Paraguay Nº 1 del Valle: Asunción": { en: "Founding of Lodge: Aurora del Paraguay Nº 1 · Valley of: Asunción", pt: "Fundação da Loja: Aurora del Paraguay Nº 1 · Vale de: Asunción" },
    "Fundación Logia: Sol Naciente Nº 2": { en: "Founding of Lodge: Sol Naciente Nº 2", pt: "Fundação da Loja: Sol Naciente Nº 2" },
    "Fundación Logia: Sol Naciente Nº 2 del Valle: Asunción": { en: "Founding of Lodge: Sol Naciente Nº 2 · Valley of: Asunción", pt: "Fundação da Loja: Sol Naciente Nº 2 · Vale de: Asunción" },
    "Fundación Logia: Libertad Nº 4": { en: "Founding of Lodge: Libertad Nº 4", pt: "Fundação da Loja: Libertad Nº 4" },
    "Fundación Logia: Libertad Nº 4 del Valle: Asunción": { en: "Founding of Lodge: Libertad Nº 4 · Valley of: Asunción", pt: "Fundação da Loja: Libertad Nº 4 · Vale de: Asunción" },
    "La Gran Logia Unida de Inglaterra reconoce a la Gran Logia Simbólica del Paraguay": { en: "The United Grand Lodge of England recognizes the Grand Symbolic Lodge of Paraguay", pt: "A Grande Loja Unida da Inglaterra reconhece a Grande Loja Simbólica do Paraguai" },
    "En su reunión Trimestral, la Gran Logia Unida de Inglaterra reconoce a la Gran Logia Simbólica del Paraguay como Autoridad Independiente y Soberana de la Franc-Masonería Gremial de la República.": { en: "At its Quarterly Communication, the United Grand Lodge of England recognizes the Grand Symbolic Lodge of Paraguay as the Independent and Sovereign Authority of Craft Freemasonry of the Republic.", pt: "Em sua reunião Trimestral, a Grande Loja Unida da Inglaterra reconhece a Grande Loja Simbólica do Paraguai como Autoridade Independente e Soberana da Franco-Maçonaria Gremial da República." },
    "Fundación Logia: Unión y Progreso Nº 9": { en: "Founding of Lodge: Unión y Progreso Nº 9", pt: "Fundação da Loja: Unión y Progreso Nº 9" },
    "Fundación Logia: Unión y Progreso Nº 9 del Valle: Encarnación": { en: "Founding of Lodge: Unión y Progreso Nº 9 · Valley of: Encarnación", pt: "Fundação da Loja: Unión y Progreso Nº 9 · Vale de: Encarnación" },
    "Fundación Logia: Alborada del Amambay Nº 10": { en: "Founding of Lodge: Alborada del Amambay Nº 10", pt: "Fundação da Loja: Alborada del Amambay Nº 10" },
    "Fundación Logia: Alborada del Amambay Nº 10 del Valle: P.J.C.": { en: "Founding of Lodge: Alborada del Amambay Nº 10 · Valley of: P.J.C.", pt: "Fundação da Loja: Alborada del Amambay Nº 10 · Vale de: P.J.C." },
    "Fundación Logia: Luz y Amistad Nº 11": { en: "Founding of Lodge: Luz y Amistad Nº 11", pt: "Fundação da Loja: Luz y Amistad Nº 11" },
    "Fundación Logia: Luz y Amistad Nº 11 del Valle: Ciudad del Este": { en: "Founding of Lodge: Luz y Amistad Nº 11 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Luz y Amistad Nº 11 · Vale de: Ciudad del Este" },
    "Fundación Logia: Paz y Justicia Nº 12": { en: "Founding of Lodge: Paz y Justicia Nº 12", pt: "Fundação da Loja: Paz y Justicia Nº 12" },
    "Fundación Logia: Paz y Justicia Nº 12 del Valle: Asunción": { en: "Founding of Lodge: Paz y Justicia Nº 12 · Valley of: Asunción", pt: "Fundação da Loja: Paz y Justicia Nº 12 · Vale de: Asunción" },
    "Fundación Logia: Bernardino Caballero Nº 13": { en: "Founding of Lodge: Bernardino Caballero Nº 13", pt: "Fundação da Loja: Bernardino Caballero Nº 13" },
    "Fundación Logia: Bernardino Caballero Nº 13 del Valle: Asunción": { en: "Founding of Lodge: Bernardino Caballero Nº 13 · Valley of: Asunción", pt: "Fundação da Loja: Bernardino Caballero Nº 13 · Vale de: Asunción" },
    "Fundación Logia: Luz y Progreso Nº 6": { en: "Founding of Lodge: Luz y Progreso Nº 6", pt: "Fundação da Loja: Luz y Progreso Nº 6" },
    "Fundación Logia: Luz y Progreso Nº 6 del Valle: San Lorenzo": { en: "Founding of Lodge: Luz y Progreso Nº 6 · Valley of: San Lorenzo", pt: "Fundação da Loja: Luz y Progreso Nº 6 · Vale de: San Lorenzo" },
    "Fundación Logia: Federico El Grande Nº 3": { en: "Founding of Lodge: Federico El Grande Nº 3", pt: "Fundação da Loja: Federico El Grande Nº 3" },
    "Fundación Logia: Federico El Grande Nº 3 del Valle: Asunción": { en: "Founding of Lodge: Federico El Grande Nº 3 · Valley of: Asunción", pt: "Fundação da Loja: Federico El Grande Nº 3 · Vale de: Asunción" },
    "Fundación Logia: Igualdad y Fraternidad Nº 14": { en: "Founding of Lodge: Igualdad y Fraternidad Nº 14", pt: "Fundação da Loja: Igualdad y Fraternidad Nº 14" },
    "Fundación Logia: Igualdad y Fraternidad Nº 14 del Valle: Encarnación": { en: "Founding of Lodge: Igualdad y Fraternidad Nº 14 · Valley of: Encarnación", pt: "Fundação da Loja: Igualdad y Fraternidad Nº 14 · Vale de: Encarnación" },
    "Fundación Logia: Concordia Nº 15": { en: "Founding of Lodge: Concordia Nº 15", pt: "Fundação da Loja: Concordia Nº 15" },
    "Fundación Logia: Concordia Nº 15 del Valle: Asunción": { en: "Founding of Lodge: Concordia Nº 15 · Valley of: Asunción", pt: "Fundação da Loja: Concordia Nº 15 · Vale de: Asunción" },
    "Fundación Logia: José Félix Estigarríbia Nº 16": { en: "Founding of Lodge: José Félix Estigarríbia Nº 16", pt: "Fundação da Loja: José Félix Estigarríbia Nº 16" },
    "Fundación Logia: José Félix Estigarríbia Nº 16 del Valle: Ciudad del Este": { en: "Founding of Lodge: José Félix Estigarríbia Nº 16 · Valley of: Ciudad del Este", pt: "Fundação da Loja: José Félix Estigarríbia Nº 16 · Vale de: Ciudad del Este" },
    "Fundación Logia: Pitágoras Nº 17": { en: "Founding of Lodge: Pitágoras Nº 17", pt: "Fundação da Loja: Pitágoras Nº 17" },
    "Fundación Logia: Pitágoras Nº 17 del Valle: Asunción": { en: "Founding of Lodge: Pitágoras Nº 17 · Valley of: Asunción", pt: "Fundação da Loja: Pitágoras Nº 17 · Vale de: Asunción" },
    "Fundación Logia: Acacia Nº 18": { en: "Founding of Lodge: Acacia Nº 18", pt: "Fundação da Loja: Acacia Nº 18" },
    "Fundación Logia: Acacia Nº 18 del Valle: Asunción": { en: "Founding of Lodge: Acacia Nº 18 · Valley of: Asunción", pt: "Fundação da Loja: Acacia Nº 18 · Vale de: Asunción" },
    "Fundación Logia: Arandú Nº 120": { en: "Founding of Lodge: Arandú Nº 120", pt: "Fundação da Loja: Arandú Nº 120" },
    "Fundación Logia: Arandú Nº 120 del Valle: Asunción": { en: "Founding of Lodge: Arandú Nº 120 · Valley of: Asunción", pt: "Fundação da Loja: Arandú Nº 120 · Vale de: Asunción" },
    "Fundación Logia: Fraternidad Nº 121": { en: "Founding of Lodge: Fraternidad Nº 121", pt: "Fundação da Loja: Fraternidad Nº 121" },
    "Fundación Logia: Fraternidad Nº 121 del Valle: Ciudad del Este": { en: "Founding of Lodge: Fraternidad Nº 121 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Fraternidad Nº 121 · Vale de: Ciudad del Este" },
    "Fundación Logia: Tekokatu Nº 124": { en: "Founding of Lodge: Tekokatu Nº 124", pt: "Fundação da Loja: Tekokatu Nº 124" },
    "Fundación Logia: Tekokatu Nº 124 del Valle: Kapi`ata": { en: "Founding of Lodge: Tekokatu Nº 124 · Valley of: Kapi`ata", pt: "Fundação da Loja: Tekokatu Nº 124 · Vale de: Kapi`ata" },
    "Fundación Logia: Minerva Nº 123": { en: "Founding of Lodge: Minerva Nº 123", pt: "Fundação da Loja: Minerva Nº 123" },
    "Fundación Logia: Minerva Nº 123 del Valle: Asunción": { en: "Founding of Lodge: Minerva Nº 123 · Valley of: Asunción", pt: "Fundação da Loja: Minerva Nº 123 · Vale de: Asunción" },
    "Fundación Logia: Fénix Nº 127": { en: "Founding of Lodge: Fénix Nº 127", pt: "Fundação da Loja: Fénix Nº 127" },
    "Fundación Logia: Fénix Nº 127 del Valle: Asunción": { en: "Founding of Lodge: Fénix Nº 127 · Valley of: Asunción", pt: "Fundação da Loja: Fénix Nº 127 · Vale de: Asunción" },
    "Fundación Logia: Millennium 3033 Nº 126": { en: "Founding of Lodge: Millennium 3033 Nº 126", pt: "Fundação da Loja: Millennium 3033 Nº 126" },
    "Fundación Logia: Millennium 3033 Nº 126 del Valle: Asunción": { en: "Founding of Lodge: Millennium 3033 Nº 126 · Valley of: Asunción", pt: "Fundação da Loja: Millennium 3033 Nº 126 · Vale de: Asunción" },
    "Fundación Logia: Universo Nº 5": { en: "Founding of Lodge: Universo Nº 5", pt: "Fundação da Loja: Universo Nº 5" },
    "Fundación Logia: Universo Nº 5 del Valle: Asunción": { en: "Founding of Lodge: Universo Nº 5 · Valley of: Asunción", pt: "Fundação da Loja: Universo Nº 5 · Vale de: Asunción" },
    "Fundación Logia: José Gervasio Artígas Nº 130": { en: "Founding of Lodge: José Gervasio Artígas Nº 130", pt: "Fundação da Loja: José Gervasio Artígas Nº 130" },
    "Fundación Logia: José Gervasio Artígas Nº 130 del Valle: Asunción": { en: "Founding of Lodge: José Gervasio Artígas Nº 130 · Valley of: Asunción", pt: "Fundação da Loja: José Gervasio Artígas Nº 130 · Vale de: Asunción" },
    "Fundación Logia: Cedro del Líbano Nº 128": { en: "Founding of Lodge: Cedro del Líbano Nº 128", pt: "Fundação da Loja: Cedro del Líbano Nº 128" },
    "Fundación Logia: Cedro del Líbano Nº 128 del Valle: Ciudad del Este": { en: "Founding of Lodge: Cedro del Líbano Nº 128 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Cedro del Líbano Nº 128 · Vale de: Ciudad del Este" },
    "Fundación Logia: Caballeros del Templo Nº 132": { en: "Founding of Lodge: Caballeros del Templo Nº 132", pt: "Fundação da Loja: Caballeros del Templo Nº 132" },
    "Fundación Logia: Caballeros del Templo Nº 132 del Valle: P.J.C.": { en: "Founding of Lodge: Caballeros del Templo Nº 132 · Valley of: P.J.C.", pt: "Fundação da Loja: Caballeros del Templo Nº 132 · Vale de: P.J.C." },
    "Fundación Logia: Saint Germain Nº 19": { en: "Founding of Lodge: Saint Germain Nº 19", pt: "Fundação da Loja: Saint Germain Nº 19" },
    "Fundación Logia: Saint Germain Nº 19 del Valle: Asunción": { en: "Founding of Lodge: Saint Germain Nº 19 · Valley of: Asunción", pt: "Fundação da Loja: Saint Germain Nº 19 · Vale de: Asunción" },
    "Fundación Logia: Lautaro Nº 125": { en: "Founding of Lodge: Lautaro Nº 125", pt: "Fundação da Loja: Lautaro Nº 125" },
    "Fundación Logia: Lautaro Nº 125 del Valle: Asunción": { en: "Founding of Lodge: Lautaro Nº 125 · Valley of: Asunción", pt: "Fundação da Loja: Lautaro Nº 125 · Vale de: Asunción" },
    "Fundación Logia: Wolfgang Amadeus Mozart Nº 136": { en: "Founding of Lodge: Wolfgang Amadeus Mozart Nº 136", pt: "Fundação da Loja: Wolfgang Amadeus Mozart Nº 136" },
    "Fundación Logia: Wolfgang Amadeus Mozart Nº 136 del Valle: Asunción": { en: "Founding of Lodge: Wolfgang Amadeus Mozart Nº 136 · Valley of: Asunción", pt: "Fundação da Loja: Wolfgang Amadeus Mozart Nº 136 · Vale de: Asunción" },
    "Fundación Logia: Pensamiento Activo Nº 135": { en: "Founding of Lodge: Pensamiento Activo Nº 135", pt: "Fundação da Loja: Pensamiento Activo Nº 135" },
    "Fundación Logia: Pensamiento Activo Nº 135 del Valle: Asunción": { en: "Founding of Lodge: Pensamiento Activo Nº 135 · Valley of: Asunción", pt: "Fundação da Loja: Pensamiento Activo Nº 135 · Vale de: Asunción" },
    "Fundación Logia: Igualdad Nº 133": { en: "Founding of Lodge: Igualdad Nº 133", pt: "Fundação da Loja: Igualdad Nº 133" },
    "Fundación Logia: Igualdad Nº 133 del Valle: Asunción": { en: "Founding of Lodge: Igualdad Nº 133 · Valley of: Asunción", pt: "Fundação da Loja: Igualdad Nº 133 · Vale de: Asunción" },
    "Fundación Logia: Fede e Lavoro Nº 137": { en: "Founding of Lodge: Fede e Lavoro Nº 137", pt: "Fundação da Loja: Fede e Lavoro Nº 137" },
    "Fundación Logia: Fede e Lavoro Nº 137 del Valle: Asunción": { en: "Founding of Lodge: Fede e Lavoro Nº 137 · Valley of: Asunción", pt: "Fundação da Loja: Fede e Lavoro Nº 137 · Vale de: Asunción" },
    "Fundación Logia: Reunión Americana Nº 141": { en: "Founding of Lodge: Reunión Americana Nº 141", pt: "Fundação da Loja: Reunión Americana Nº 141" },
    "Fundación Logia: Reunión Americana Nº 141 del Valle: Asunción": { en: "Founding of Lodge: Reunión Americana Nº 141 · Valley of: Asunción", pt: "Fundação da Loja: Reunión Americana Nº 141 · Vale de: Asunción" },
    "Fundación Logia: George Washington Nº 140": { en: "Founding of Lodge: George Washington Nº 140", pt: "Fundação da Loja: George Washington Nº 140" },
    "Fundación Logia: George Washington Nº 140 del Valle: Asunción": { en: "Founding of Lodge: George Washington Nº 140 · Valley of: Asunción", pt: "Fundação da Loja: George Washington Nº 140 · Vale de: Asunción" },
    "Fundación Logia: Galileo Galilei Nº 143": { en: "Founding of Lodge: Galileo Galilei Nº 143", pt: "Fundação da Loja: Galileo Galilei Nº 143" },
    "Fundación Logia: Galileo Galilei Nº 143 del Valle: Asunción": { en: "Founding of Lodge: Galileo Galilei Nº 143 · Valley of: Asunción", pt: "Fundação da Loja: Galileo Galilei Nº 143 · Vale de: Asunción" },
    "Fundación Logia: José Martí Nº 8": { en: "Founding of Lodge: José Martí Nº 8", pt: "Fundação da Loja: José Martí Nº 8" },
    "Fundación Logia: José Martí Nº 8 del Valle: Asunción": { en: "Founding of Lodge: José Martí Nº 8 · Valley of: Asunción", pt: "Fundação da Loja: José Martí Nº 8 · Vale de: Asunción" },
    "Fundación Logia: Los Templarios Nº 144": { en: "Founding of Lodge: Los Templarios Nº 144", pt: "Fundação da Loja: Los Templarios Nº 144" },
    "Fundación Logia: Los Templarios Nº 144 del Valle: Asunción": { en: "Founding of Lodge: Los Templarios Nº 144 · Valley of: Asunción", pt: "Fundação da Loja: Los Templarios Nº 144 · Vale de: Asunción" },
    "Fundación Logia: Jorge Memmel Nº 145": { en: "Founding of Lodge: Jorge Memmel Nº 145", pt: "Fundação da Loja: Jorge Memmel Nº 145" },
    "Fundación Logia: Jorge Memmel Nº 145 del Valle: Encarnación": { en: "Founding of Lodge: Jorge Memmel Nº 145 · Valley of: Encarnación", pt: "Fundação da Loja: Jorge Memmel Nº 145 · Vale de: Encarnación" },
    "Fundación Logia: Amistad y Armonía Nº 146": { en: "Founding of Lodge: Amistad y Armonía Nº 146", pt: "Fundação da Loja: Amistad y Armonía Nº 146" },
    "Fundación Logia: Amistad y Armonía Nº 146 del Valle: Asunción": { en: "Founding of Lodge: Amistad y Armonía Nº 146 · Valley of: Asunción", pt: "Fundação da Loja: Amistad y Armonía Nº 146 · Vale de: Asunción" },
    "Fundación Logia: Estela Nº 147": { en: "Founding of Lodge: Estela Nº 147", pt: "Fundação da Loja: Estela Nº 147" },
    "Fundación Logia: Estela Nº 147 del Valle: Villarrica": { en: "Founding of Lodge: Estela Nº 147 · Valley of: Villarrica", pt: "Fundação da Loja: Estela Nº 147 · Vale de: Villarrica" },
    "Fundación Logia: Cerro Corá Nº 150": { en: "Founding of Lodge: Cerro Corá Nº 150", pt: "Fundação da Loja: Cerro Corá Nº 150" },
    "Fundación Logia: Cerro Corá Nº 150 del Valle: P.J.C.": { en: "Founding of Lodge: Cerro Corá Nº 150 · Valley of: P.J.C.", pt: "Fundação da Loja: Cerro Corá Nº 150 · Vale de: P.J.C." },
    "Fundación Logia: Igualdad y Armonía Nº 148": { en: "Founding of Lodge: Igualdad y Armonía Nº 148", pt: "Fundação da Loja: Igualdad y Armonía Nº 148" },
    "Fundación Logia: Igualdad y Armonía Nº 148 del Valle: Encarnación": { en: "Founding of Lodge: Igualdad y Armonía Nº 148 · Valley of: Encarnación", pt: "Fundação da Loja: Igualdad y Armonía Nº 148 · Vale de: Encarnación" },
    "Fundación Logia: Alquimia Nº 149": { en: "Founding of Lodge: Alquimia Nº 149", pt: "Fundação da Loja: Alquimia Nº 149" },
    "Fundación Logia: Alquimia Nº 149 del Valle: Asunción": { en: "Founding of Lodge: Alquimia Nº 149 · Valley of: Asunción", pt: "Fundação da Loja: Alquimia Nº 149 · Vale de: Asunción" },
    "Fundación Logia: Unión Fraterna Nº 151": { en: "Founding of Lodge: Unión Fraterna Nº 151", pt: "Fundação da Loja: Unión Fraterna Nº 151" },
    "Fundación Logia: Unión Fraterna Nº 151 del Valle: Ciudad del Este": { en: "Founding of Lodge: Unión Fraterna Nº 151 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Unión Fraterna Nº 151 · Vale de: Ciudad del Este" },
    "Fundación Logia: Luz de Oriente Nº 152": { en: "Founding of Lodge: Luz de Oriente Nº 152", pt: "Fundação da Loja: Luz de Oriente Nº 152" },
    "Fundación Logia: Luz de Oriente Nº 152 del Valle: Ciudad del Este": { en: "Founding of Lodge: Luz de Oriente Nº 152 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Luz de Oriente Nº 152 · Vale de: Ciudad del Este" },
    "Fundación Logia: Armonía Universal Nº 153": { en: "Founding of Lodge: Armonía Universal Nº 153", pt: "Fundação da Loja: Armonía Universal Nº 153" },
    "Fundación Logia: Armonía Universal Nº 153 del Valle: Asunción": { en: "Founding of Lodge: Armonía Universal Nº 153 · Valley of: Asunción", pt: "Fundação da Loja: Armonía Universal Nº 153 · Vale de: Asunción" },
    "Fundación Logia: Fortaleza de San Juan de Escocia Nº 154": { en: "Founding of Lodge: Fortaleza de San Juan de Escocia Nº 154", pt: "Fundação da Loja: Fortaleza de San Juan de Escocia Nº 154" },
    "Fundación Logia: Fortaleza de San Juan de Escocia Nº 154 del Valle: Asunción": { en: "Founding of Lodge: Fortaleza de San Juan de Escocia Nº 154 · Valley of: Asunción", pt: "Fundação da Loja: Fortaleza de San Juan de Escocia Nº 154 · Vale de: Asunción" },
    "Fundación Logia: Reconquista Nº 155": { en: "Founding of Lodge: Reconquista Nº 155", pt: "Fundação da Loja: Reconquista Nº 155" },
    "Fundación Logia: Reconquista Nº 155 del Valle: Minga Guazu": { en: "Founding of Lodge: Reconquista Nº 155 · Valley of: Minga Guazu", pt: "Fundação da Loja: Reconquista Nº 155 · Vale de: Minga Guazu" },
    "Fundación Logia: Concordia Universal Nº 156": { en: "Founding of Lodge: Concordia Universal Nº 156", pt: "Fundação da Loja: Concordia Universal Nº 156" },
    "Fundación Logia: Concordia Universal Nº 156 del Valle: P.J.C.": { en: "Founding of Lodge: Concordia Universal Nº 156 · Valley of: P.J.C.", pt: "Fundação da Loja: Concordia Universal Nº 156 · Vale de: P.J.C." },
    "Fundación Logia: Hiram Abiff Nº 157": { en: "Founding of Lodge: Hiram Abiff Nº 157", pt: "Fundação da Loja: Hiram Abiff Nº 157" },
    "Fundación Logia: Hiram Abiff Nº 157 del Valle: Asunción": { en: "Founding of Lodge: Hiram Abiff Nº 157 · Valley of: Asunción", pt: "Fundação da Loja: Hiram Abiff Nº 157 · Vale de: Asunción" },
    "Fundación Logia: Constructores del Templo Nº 158": { en: "Founding of Lodge: Constructores del Templo Nº 158", pt: "Fundação da Loja: Constructores del Templo Nº 158" },
    "Fundación Logia: Constructores del Templo Nº 158 del Valle: Asunción": { en: "Founding of Lodge: Constructores del Templo Nº 158 · Valley of: Asunción", pt: "Fundação da Loja: Constructores del Templo Nº 158 · Vale de: Asunción" },
    "Fundación Logia: Fraternidad Masónica Nº 7": { en: "Founding of Lodge: Fraternidad Masónica Nº 7", pt: "Fundação da Loja: Fraternidad Masónica Nº 7" },
    "Fundación Logia: Fraternidad Masónica Nº 7 del Valle: Asunción": { en: "Founding of Lodge: Fraternidad Masónica Nº 7 · Valley of: Asunción", pt: "Fundação da Loja: Fraternidad Masónica Nº 7 · Vale de: Asunción" },
    "Fundación Logia: Estrella del Oriente Nº 159": { en: "Founding of Lodge: Estrella del Oriente Nº 159", pt: "Fundação da Loja: Estrella del Oriente Nº 159" },
    "Fundación Logia: Estrella del Oriente Nº 159 del Valle: Ciudad del Este": { en: "Founding of Lodge: Estrella del Oriente Nº 159 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Estrella del Oriente Nº 159 · Vale de: Ciudad del Este" },
    "Fundación Logia: Illuminati Nº 160": { en: "Founding of Lodge: Illuminati Nº 160", pt: "Fundação da Loja: Illuminati Nº 160" },
    "Fundación Logia: Illuminati Nº 160 del Valle: Asunción": { en: "Founding of Lodge: Illuminati Nº 160 · Valley of: Asunción", pt: "Fundação da Loja: Illuminati Nº 160 · Vale de: Asunción" },
    "Fundación Logia: Caballeros de la Luz Nº 161": { en: "Founding of Lodge: Caballeros de la Luz Nº 161", pt: "Fundação da Loja: Caballeros de la Luz Nº 161" },
    "Fundación Logia: Caballeros de la Luz Nº 161 del Valle: Asunción": { en: "Founding of Lodge: Caballeros de la Luz Nº 161 · Valley of: Asunción", pt: "Fundação da Loja: Caballeros de la Luz Nº 161 · Vale de: Asunción" },
    "Fundación Logia: Caballeros del Arte Real Nº 162": { en: "Founding of Lodge: Caballeros del Arte Real Nº 162", pt: "Fundação da Loja: Caballeros del Arte Real Nº 162" },
    "Fundación Logia: Caballeros del Arte Real Nº 162 del Valle: Asunción": { en: "Founding of Lodge: Caballeros del Arte Real Nº 162 · Valley of: Asunción", pt: "Fundação da Loja: Caballeros del Arte Real Nº 162 · Vale de: Asunción" },
    "Fundación Logia: Hermanos Templarios del Sur Nº 163": { en: "Founding of Lodge: Hermanos Templarios del Sur Nº 163", pt: "Fundação da Loja: Hermanos Templarios del Sur Nº 163" },
    "Fundación Logia: Hermanos Templarios del Sur Nº 163 del Valle: Encarnación": { en: "Founding of Lodge: Hermanos Templarios del Sur Nº 163 · Valley of: Encarnación", pt: "Fundação da Loja: Hermanos Templarios del Sur Nº 163 · Vale de: Encarnación" },
    "Fundación Logia: Caballeros del Rey Salomón Nº 164": { en: "Founding of Lodge: Caballeros del Rey Salomón Nº 164", pt: "Fundação da Loja: Caballeros del Rey Salomón Nº 164" },
    "Fundación Logia: Caballeros del Rey Salomón Nº 164 del Valle: Asunción": { en: "Founding of Lodge: Caballeros del Rey Salomón Nº 164 · Valley of: Asunción", pt: "Fundação da Loja: Caballeros del Rey Salomón Nº 164 · Vale de: Asunción" },
    "Fundación Logia: Kybalion 777 Nº 166": { en: "Founding of Lodge: Kybalion 777 Nº 166", pt: "Fundação da Loja: Kybalion 777 Nº 166" },
    "Fundación Logia: Kybalion 777 Nº 166 del Valle: Asunción": { en: "Founding of Lodge: Kybalion 777 Nº 166 · Valley of: Asunción", pt: "Fundação da Loja: Kybalion 777 Nº 166 · Vale de: Asunción" },
    "Fundación Logia: Bicentenario de la Ind. Nac. Nº 200": { en: "Founding of Lodge: Bicentenario de la Ind. Nac. Nº 200", pt: "Fundação da Loja: Bicentenario de la Ind. Nac. Nº 200" },
    "Fundación Logia: Bicentenario de la Ind. Nac. Nº 200 del Valle: Asunción": { en: "Founding of Lodge: Bicentenario de la Ind. Nac. Nº 200 · Valley of: Asunción", pt: "Fundação da Loja: Bicentenario de la Ind. Nac. Nº 200 · Vale de: Asunción" },
    "Fundación Logia: Alianza Nº 201": { en: "Founding of Lodge: Alianza Nº 201", pt: "Fundação da Loja: Alianza Nº 201" },
    "Fundación Logia: Alianza Nº 201 del Valle: Asunción": { en: "Founding of Lodge: Alianza Nº 201 · Valley of: Asunción", pt: "Fundação da Loja: Alianza Nº 201 · Vale de: Asunción" },
    "Fundación Logia: Caballeros del Oriente Nº 202": { en: "Founding of Lodge: Caballeros del Oriente Nº 202", pt: "Fundação da Loja: Caballeros del Oriente Nº 202" },
    "Fundación Logia: Caballeros del Oriente Nº 202 del Valle: Ciudad del Este": { en: "Founding of Lodge: Caballeros del Oriente Nº 202 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Caballeros del Oriente Nº 202 · Vale de: Ciudad del Este" },
    "Fundación Logia: Labor & Constancia Nº 203": { en: "Founding of Lodge: Labor & Constancia Nº 203", pt: "Fundação da Loja: Labor & Constancia Nº 203" },
    "Fundación Logia: Labor & Constancia Nº 203 del Valle: Concepción": { en: "Founding of Lodge: Labor & Constancia Nº 203 · Valley of: Concepción", pt: "Fundação da Loja: Labor & Constancia Nº 203 · Vale de: Concepción" },
    "Fundación Logia: Primero de Marzo Nº 204": { en: "Founding of Lodge: Primero de Marzo Nº 204", pt: "Fundação da Loja: Primero de Marzo Nº 204" },
    "Fundación Logia: Primero de Marzo Nº 204 del Valle: Pte. Franco": { en: "Founding of Lodge: Primero de Marzo Nº 204 · Valley of: Pte. Franco", pt: "Fundação da Loja: Primero de Marzo Nº 204 · Vale de: Pte. Franco" },
    "Fundación Logia: Perseverancia Nº 215": { en: "Founding of Lodge: Perseverancia Nº 215", pt: "Fundação da Loja: Perseverancia Nº 215" },
    "Fundación Logia: Perseverancia Nº 215 del Valle: Ciudad del Este": { en: "Founding of Lodge: Perseverancia Nº 215 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Perseverancia Nº 215 · Vale de: Ciudad del Este" },
    "Fundación Logia: Veritas Nº 205": { en: "Founding of Lodge: Veritas Nº 205", pt: "Fundação da Loja: Veritas Nº 205" },
    "Fundación Logia: Veritas Nº 205 del Valle: Asunción": { en: "Founding of Lodge: Veritas Nº 205 · Valley of: Asunción", pt: "Fundação da Loja: Veritas Nº 205 · Vale de: Asunción" },
    "Fundación Logia: Thomas Jeffersson Nº 207": { en: "Founding of Lodge: Thomas Jeffersson Nº 207", pt: "Fundação da Loja: Thomas Jeffersson Nº 207" },
    "Fundación Logia: Thomas Jeffersson Nº 207 del Valle: Asunción": { en: "Founding of Lodge: Thomas Jeffersson Nº 207 · Valley of: Asunción", pt: "Fundação da Loja: Thomas Jeffersson Nº 207 · Vale de: Asunción" },
    "Fundación Logia: Cecilio Baez Nº 208": { en: "Founding of Lodge: Cecilio Baez Nº 208", pt: "Fundação da Loja: Cecilio Baez Nº 208" },
    "Fundación Logia: Cecilio Baez Nº 208 del Valle: Asunción": { en: "Founding of Lodge: Cecilio Baez Nº 208 · Valley of: Asunción", pt: "Fundação da Loja: Cecilio Baez Nº 208 · Vale de: Asunción" },
    "Fundación Logia: Atenea Nº 206": { en: "Founding of Lodge: Atenea Nº 206", pt: "Fundação da Loja: Atenea Nº 206" },
    "Fundación Logia: Atenea Nº 206 del Valle: Asunción": { en: "Founding of Lodge: Atenea Nº 206 · Valley of: Asunción", pt: "Fundação da Loja: Atenea Nº 206 · Vale de: Asunción" },
    "Fundación Logia: Amanecer Nº 209": { en: "Founding of Lodge: Amanecer Nº 209", pt: "Fundação da Loja: Amanecer Nº 209" },
    "Fundación Logia: Amanecer Nº 209 del Valle: San Lorenzo": { en: "Founding of Lodge: Amanecer Nº 209 · Valley of: San Lorenzo", pt: "Fundação da Loja: Amanecer Nº 209 · Vale de: San Lorenzo" },
    "Fundación Logia: Fé Nº 210": { en: "Founding of Lodge: Fé Nº 210", pt: "Fundação da Loja: Fé Nº 210" },
    "Fundación Logia: Fé Nº 210 del Valle: Asunción": { en: "Founding of Lodge: Fé Nº 210 · Valley of: Asunción", pt: "Fundação da Loja: Fé Nº 210 · Vale de: Asunción" },
    "Fundación Logia: Lealtad Fraterna Nº 212": { en: "Founding of Lodge: Lealtad Fraterna Nº 212", pt: "Fundação da Loja: Lealtad Fraterna Nº 212" },
    "Fundación Logia: Lealtad Fraterna Nº 212 del Valle: Ciudad del Este": { en: "Founding of Lodge: Lealtad Fraterna Nº 212 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Lealtad Fraterna Nº 212 · Vale de: Ciudad del Este" },
    "Fundación Logia: Cruz de Malta Nº 211": { en: "Founding of Lodge: Cruz de Malta Nº 211", pt: "Fundação da Loja: Cruz de Malta Nº 211" },
    "Fundación Logia: Cruz de Malta Nº 211 del Valle: Asunción": { en: "Founding of Lodge: Cruz de Malta Nº 211 · Valley of: Asunción", pt: "Fundação da Loja: Cruz de Malta Nº 211 · Vale de: Asunción" },
    "Fundación Logia: Asilo de la Virtud Nº 214": { en: "Founding of Lodge: Asilo de la Virtud Nº 214", pt: "Fundação da Loja: Asilo de la Virtud Nº 214" },
    "Fundación Logia: Asilo de la Virtud Nº 214 del Valle: Asunción": { en: "Founding of Lodge: Asilo de la Virtud Nº 214 · Valley of: Asunción", pt: "Fundação da Loja: Asilo de la Virtud Nº 214 · Vale de: Asunción" },
    "Fundación Logia: Armagedon Nº 216": { en: "Founding of Lodge: Armagedon Nº 216", pt: "Fundação da Loja: Armagedon Nº 216" },
    "Fundación Logia: Armagedon Nº 216 del Valle: Asunción": { en: "Founding of Lodge: Armagedon Nº 216 · Valley of: Asunción", pt: "Fundação da Loja: Armagedon Nº 216 · Vale de: Asunción" },
    "Fundación Logia: Barones del Templo de Salomón Nº 213": { en: "Founding of Lodge: Barones del Templo de Salomón Nº 213", pt: "Fundação da Loja: Barones del Templo de Salomón Nº 213" },
    "Fundación Logia: Barones del Templo de Salomón Nº 213 del Valle: Asunción": { en: "Founding of Lodge: Barones del Templo de Salomón Nº 213 · Valley of: Asunción", pt: "Fundação da Loja: Barones del Templo de Salomón Nº 213 · Vale de: Asunción" },
    "Fundación Logia: Caballeros de San Juan de Jerusalen Nº 220": { en: "Founding of Lodge: Caballeros de San Juan de Jerusalen Nº 220", pt: "Fundação da Loja: Caballeros de San Juan de Jerusalen Nº 220" },
    "Fundación Logia: Caballeros de San Juan de Jerusalen Nº 220 del Valle: Asunción": { en: "Founding of Lodge: Caballeros de San Juan de Jerusalen Nº 220 · Valley of: Asunción", pt: "Fundação da Loja: Caballeros de San Juan de Jerusalen Nº 220 · Vale de: Asunción" },
    "Fundación Logia: Victoria Nº 218": { en: "Founding of Lodge: Victoria Nº 218", pt: "Fundação da Loja: Victoria Nº 218" },
    "Fundación Logia: Victoria Nº 218 del Valle: Asunción": { en: "Founding of Lodge: Victoria Nº 218 · Valley of: Asunción", pt: "Fundação da Loja: Victoria Nº 218 · Vale de: Asunción" },
    "Fundación Logia: Prometeo Nº 222": { en: "Founding of Lodge: Prometeo Nº 222", pt: "Fundação da Loja: Prometeo Nº 222" },
    "Fundación Logia: Prometeo Nº 222 del Valle: Asunción": { en: "Founding of Lodge: Prometeo Nº 222 · Valley of: Asunción", pt: "Fundação da Loja: Prometeo Nº 222 · Vale de: Asunción" },
    "Fundación Logia: Utopía Nº 219": { en: "Founding of Lodge: Utopía Nº 219", pt: "Fundação da Loja: Utopía Nº 219" },
    "Fundación Logia: Utopía Nº 219 del Valle: Asunción": { en: "Founding of Lodge: Utopía Nº 219 · Valley of: Asunción", pt: "Fundação da Loja: Utopía Nº 219 · Vale de: Asunción" },
    "Fundación Logia: Luces de la Independencia Nº 217": { en: "Founding of Lodge: Luces de la Independencia Nº 217", pt: "Fundação da Loja: Luces de la Independencia Nº 217" },
    "Fundación Logia: Luces de la Independencia Nº 217 del Valle: Asunción": { en: "Founding of Lodge: Luces de la Independencia Nº 217 · Valley of: Asunción", pt: "Fundação da Loja: Luces de la Independencia Nº 217 · Vale de: Asunción" },
    "Fundación Logia: Comuneros Nº 221": { en: "Founding of Lodge: Comuneros Nº 221", pt: "Fundação da Loja: Comuneros Nº 221" },
    "Fundación Logia: Comuneros Nº 221 del Valle: Asunción": { en: "Founding of Lodge: Comuneros Nº 221 · Valley of: Asunción", pt: "Fundação da Loja: Comuneros Nº 221 · Vale de: Asunción" },
    "Fundación Logia: Centinelas de Humaitá N° 224": { en: "Founding of Lodge: Centinelas de Humaitá N° 224", pt: "Fundação da Loja: Centinelas de Humaitá N° 224" },
    "Fundación Logia: Centinelas de Humaitá N° 224 del Valle: Asunción": { en: "Founding of Lodge: Centinelas de Humaitá N° 224 · Valley of: Asunción", pt: "Fundação da Loja: Centinelas de Humaitá N° 224 · Vale de: Asunción" },
    "Fundación Logia: Perfecta Fe Nº 223": { en: "Founding of Lodge: Perfecta Fe Nº 223", pt: "Fundação da Loja: Perfecta Fe Nº 223" },
    "Fundación Logia: Perfecta Fe Nº 223 del Valle: Ciudad del Este": { en: "Founding of Lodge: Perfecta Fe Nº 223 · Valley of: Ciudad del Este", pt: "Fundação da Loja: Perfecta Fe Nº 223 · Vale de: Ciudad del Este" },
    "Fundación Logia: Patricio Escobar Nº 225": { en: "Founding of Lodge: Patricio Escobar Nº 225", pt: "Fundação da Loja: Patricio Escobar Nº 225" },
    "Fundación Logia: Patricio Escobar Nº 225 del Valle: Asunción": { en: "Founding of Lodge: Patricio Escobar Nº 225 · Valley of: Asunción", pt: "Fundação da Loja: Patricio Escobar Nº 225 · Vale de: Asunción" },
    "Con la terminación de la ocupación del país las instituciones masónicas, así como las fuerzas brasileñas, dejan el país y las Logias cesan su labor, con la excepción de algunas pocas Logias que trabajaban bajo diferentes jurisdicciones.": { en: "With the end of the occupation of the country, the Masonic institutions, like the Brazilian forces, leave the country and the Lodges cease their work, with the exception of a few Lodges that operated under different jurisdictions.", pt: "Com o fim da ocupação do país, as instituições maçônicas, assim como as forças brasileiras, deixam o país e as Lojas cessam seu trabalho, com a exceção de algumas poucas Lojas que trabalhavam sob diferentes jurisdições." },
    "El movimiento de la masonería uruguaya en Paraguay se originó a partir del regreso de los trofeos de la guerra paraguaya en 1885, arreglado por el Presidente Maximo Santos y orquestado por su comisión, compuesta por el Gran Maestro Carlos de Castro, quien favoreció la concesión del Grado 33° al Hermano Bernardino Caballero, Presidente del Paraguay durante 1880-1886, quien tuvo un rol preponderante en la fundación  y desarrollo de la Masonería paraguaya.": { en: "The Uruguayan Masonic movement in Paraguay originated with the return of the Paraguayan war trophies in 1885, arranged by President Máximo Santos and orchestrated by his commission, including Grand Master Carlos de Castro, who supported granting the 33rd Degree to Brother Bernardino Caballero, President of Paraguay during 1880–1886, who played a preponderant role in the founding and development of Paraguayan Freemasonry.", pt: "O movimento da maçonaria uruguaia no Paraguai se originou a partir do regresso dos troféus da guerra paraguaia em 1885, arranjado pelo Presidente Máximo Santos e orquestrado por sua comissão, composta pelo Grão-Mestre Carlos de Castro, que favoreceu a concessão do Grau 33º ao Irmão Bernardino Caballero, Presidente do Paraguai durante 1880-1886, que teve um papel preponderante na fundação e desenvolvimento da Maçonaria paraguaia." },
    "Fueron sus fundadores los HH∴ Juan G. González, Bernardino Carballero, José Segundo Decoud, Ricardo Garcia, Francisco Regis de Oliveira, Patricio Escobar, Serafin Rivas Rodriguez, Christian Heisecke, Claudio Pinillos, Antonio L Pecci, Francisco Turro, siendo su primer Ven∴ Maest∴, el H∴ Dionisio Ramos Montero.": { en: "Its founders were the Brn∴ Juan G. González, Bernardino Carballero, José Segundo Decoud, Ricardo García, Francisco Regis de Oliveira, Patricio Escobar, Serafín Rivas Rodríguez, Christian Heisecke, Claudio Pinillos, Antonio L. Pecci, Francisco Turro — its first Worsh∴ Master being Bro∴ Dionisio Ramos Montero.", pt: "Foram seus fundadores os Irm∴ Juan G. González, Bernardino Carballero, José Segundo Decoud, Ricardo García, Francisco Regis de Oliveira, Patricio Escobar, Serafín Rivas Rodríguez, Christian Heisecke, Claudio Pinillos, Antonio L. Pecci, Francisco Turro — sendo seu primeiro Ven∴ Mestre o Irm∴ Dionisio Ramos Montero." },
    "Por Decreto del Serenísimo Gran Oriente del Uruguay, se nombra a los HH∴, Bernardino Caballero, Serafin Rivas y Ricardo García, en comisión para Instalar la Logia Simbólica Sol Naciente Segunda, denominada así por el motivo de existir otra logia en el Oriente uruguayo con el mismo nombre.": { en: "By Decree of the Most Serene Grand Orient of Uruguay, Brn∴ Bernardino Caballero, Serafín Rivas and Ricardo García are appointed in commission to install the Symbolic Lodge Sol Naciente Segunda, so named because another lodge in the Uruguayan Orient already bore the same name.", pt: "Por Decreto do Sereníssimo Grande Oriente do Uruguai, são nomeados os Irm∴ Bernardino Caballero, Serafín Rivas e Ricardo García, em comissão para instalar a Loja Simbólica Sol Naciente Segunda, assim denominada por existir outra loja no Oriente uruguaio com o mesmo nome." },
    "Queda instalada oficialmente como Logia Regular la Logia Sol Naciente Segunda con el número de orden 74, siendo los fundadores los HH∴  J.J. Mendez Sampaio, Christian Heisecke, Alfredo Boettner, Juan Carron, German Ibbecken, Antonio Castellani, Pablo Bergenmann.": { en: "Lodge Sol Naciente Segunda is officially installed as a Regular Lodge bearing serial number 74, with founders Brn∴ J.J. Méndez Sampaio, Christian Heisecke, Alfredo Boettner, Juan Carrón, Germán Ibbecken, Antonio Castellani, Pablo Bergenmann.", pt: "É oficialmente instalada como Loja Regular a Loja Sol Naciente Segunda com o número de ordem 74, sendo os fundadores os Irm∴ J.J. Méndez Sampaio, Christian Heisecke, Alfredo Boettner, Juan Carrón, Germán Ibbecken, Antonio Castellani, Pablo Bergenmann." },
    "El Serenísimo Gran Oriente del Uruguay regulariza la Logia Sol Naciente 2da. y declara también como miembros fundadores a los HH∴ Víctor Guatier, Pedro Casartelli, Juan Villanueva, José C. Meza y Otto Weltti.": { en: "The Most Serene Grand Orient of Uruguay regularizes Lodge Sol Naciente 2nd and also declares as founding members Brn∴ Víctor Guatier, Pedro Casartelli, Juan Villanueva, José C. Meza and Otto Weltti.", pt: "O Sereníssimo Grande Oriente do Uruguai regulariza a Loja Sol Naciente 2ª e declara também como membros fundadores os Irm∴ Víctor Guatier, Pedro Casartelli, Juan Villanueva, José C. Meza e Otto Weltti." },
    "Estas Logias fueron parte del cuadro fundador del Gran Oriente del Paraguay bajo los auspicios de la Gran Logia de la Masonería del Uruguay.": { en: "These Lodges were part of the founding board of the Grand Orient of Paraguay under the auspices of the Grand Lodge of Freemasonry of Uruguay.", pt: "Estas Lojas fizeram parte do quadro fundador do Grande Oriente do Paraguai sob os auspícios da Grande Loja da Maçonaria do Uruguai." },
    "El Templo Masónico de Palma, considerado uno de los más bellos de Sudamérica y de Paraguay (Adquirido, el 6 de septiembre de 1899 en Asunción, Paraguay) es templo Masónico perteneciente al Gran Oriente del Paraguay de la antigua Gran Logia Simbólica del Paraguay, ubicado sobre la calle Palma.": { en: "The Masonic Temple of Palma, considered one of the most beautiful in South America and Paraguay (acquired on September 6, 1899 in Asunción, Paraguay) is the Masonic temple belonging to the Grand Orient of Paraguay of the old Grand Symbolic Lodge of Paraguay, located on Palma Street.", pt: "O Templo Maçônico de Palma, considerado um dos mais belos da América do Sul e do Paraguai (adquirido em 6 de setembro de 1899 em Assunção, Paraguai), é o templo Maçônico pertencente ao Grande Oriente do Paraguai da antiga Grande Loja Simbólica do Paraguai, localizado na rua Palma." },
    "Adquirido bajo la gestión del Gran Maestro Dr. Cecilio Báez en 1899, y fue diseñado por Ricardo Lloret y construido por José Vilá. Fue sede de actividades filantrópicas y como centro de ayuda durante la Gripe Española de 1918, y Hospital de Sangre durante la Guerra del Chaco. Fue restaurado y reinaugurado en julio de 2018 con la presencia de autoridades masónicas y municipales, bajo la administración del Gran Maestro Benigno Villasanti.El Templo Masónico de Palma fue declarado Patrimonio Histórico del Paraguay por su historia y arquitectura.": { en: "Acquired under the leadership of Grand Master Dr. Cecilio Báez in 1899, it was designed by Ricardo Lloret and built by José Vilá. It served as a venue for philanthropic activities and as an aid center during the 1918 Spanish Flu, and a Field Hospital during the Chaco War. It was restored and reopened in July 2018 with the presence of Masonic and municipal authorities, under the administration of Grand Master Benigno Villasanti. The Masonic Temple of Palma was declared Historic Heritage of Paraguay for its history and architecture.", pt: "Adquirido sob a gestão do Grão-Mestre Dr. Cecilio Báez em 1899, foi projetado por Ricardo Lloret e construído por José Vilá. Foi sede de atividades filantrópicas e como centro de ajuda durante a Gripe Espanhola de 1918, e Hospital de Sangue durante a Guerra do Chaco. Foi restaurado e reinaugurado em julho de 2018 com a presença de autoridades maçônicas e municipais, sob a administração do Grão-Mestre Benigno Villasanti. O Templo Maçônico de Palma foi declarado Patrimônio Histórico do Paraguai por sua história e arquitetura." },
    "Con la terminación de la ocupación del país las instituciones masónicas, así como las fuerzas brasileñas, dejan el país y las Logias cesan su labor, con la excepción de algunas pocas Logias que trabajaban bajo diferencias jurisdicciones.": { en: "With the end of the occupation of the country, the Masonic institutions, like the Brazilian forces, leave the country and the Lodges cease their work, with the exception of a few Lodges that operated under different jurisdictions.", pt: "Com o fim da ocupação do país, as instituições maçônicas, assim como as forças brasileiras, deixam o país e as Lojas cessam seu trabalho, com a exceção de algumas poucas Lojas que trabalhavam sob diferentes jurisdições." },
    "El movimiento de la masonería uruguaya en Paraguay se originó a partir del regreso de los trofeos de la guerra paraguaya en 1885, arreglado por el Presidente Maximo Santos y orquestado por su comisión, compuesta por el Gran Maestro Carlos de Castro, quien favoreció la concesión del Grado 33° al Hermano Bernardino Caballero, Presidente del Paraguay durante los años 1880 y 1886, quien había sido iniciado en una Logia bajo patrocinio del Brasil y quien tuvo un rol preponderante en la fundación y desarrollo de la Masonería Paraguaya.": { en: "The Uruguayan Masonic movement in Paraguay originated with the return of the Paraguayan war trophies in 1885, arranged by President Máximo Santos and orchestrated by his commission, including Grand Master Carlos de Castro, who supported granting the 33rd Degree to Brother Bernardino Caballero, President of Paraguay between 1880 and 1886, who had been initiated in a Lodge under Brazilian sponsorship and played a preponderant role in the founding and development of Paraguayan Freemasonry.", pt: "O movimento da maçonaria uruguaia no Paraguai se originou a partir do regresso dos troféus da guerra paraguaia em 1885, arranjado pelo Presidente Máximo Santos e orquestrado por sua comissão, composta pelo Grão-Mestre Carlos de Castro, que favoreceu a concessão do Grau 33º ao Irmão Bernardino Caballero, Presidente do Paraguai entre 1880 e 1886, que havia sido iniciado em uma Loja sob patrocínio do Brasil e teve um papel preponderante na fundação e desenvolvimento da Maçonaria Paraguaia." },
    "Fueron sus fundadores los HH∴ Juan G. González, Bernardino Carballero, José Segundo Decoud, Ricardo Garcia, Francisco Regis de Oliveira, Patricio Escobar, Serafin Rivas Rodriguez, Christian Heisecke, Claudio Pinillos, Antonio L. Pecci, Francisco Turro, siendo su primer Ven∴Maest∴ el H∴ Dionisio Ramos Montero": { en: "Its founders were the Brn∴ Juan G. González, Bernardino Carballero, José Segundo Decoud, Ricardo García, Francisco Regis de Oliveira, Patricio Escobar, Serafín Rivas Rodríguez, Christian Heisecke, Claudio Pinillos, Antonio L. Pecci, Francisco Turro — its first Worsh∴ Master being Bro∴ Dionisio Ramos Montero", pt: "Foram seus fundadores os Irm∴ Juan G. González, Bernardino Carballero, José Segundo Decoud, Ricardo García, Francisco Regis de Oliveira, Patricio Escobar, Serafín Rivas Rodríguez, Christian Heisecke, Claudio Pinillos, Antonio L. Pecci, Francisco Turro — sendo seu primeiro Ven∴ Mestre o Irm∴ Dionisio Ramos Montero" },
    "Por Decreto del Serenísimo Gran Oriente del Uruguay, se nombra a los HH∴, Bernardino Caballero, Serafin Rivas y Ricardo García, en comisión para Instalar la Logia Simbólica Sol Naciente Segunda, denominada así porque existía otra logia en el Oriente uruguayo con el mismo nombre.": { en: "By Decree of the Most Serene Grand Orient of Uruguay, Brn∴ Bernardino Caballero, Serafín Rivas and Ricardo García are appointed in commission to install the Symbolic Lodge Sol Naciente Segunda, so named because another lodge already existed in the Uruguayan Orient with the same name.", pt: "Por Decreto do Sereníssimo Grande Oriente do Uruguai, são nomeados os Irm∴ Bernardino Caballero, Serafín Rivas e Ricardo García, em comissão para instalar a Loja Simbólica Sol Naciente Segunda, assim denominada porque já existia outra loja no Oriente uruguaio com o mesmo nome." },
    "Queda instalada oficialmente como Logia Regular la Logia Sol Naciente Segunda con el número de orden 74, siendo los fundadores los HH∴  J.J. Mendez Sampaio, Christian Heisecke, Alfredo Boettner, Juan Carron, German Ibbecken, Antonio Castellani y Pablo Bergenmann.": { en: "Lodge Sol Naciente Segunda is officially installed as a Regular Lodge bearing serial number 74, with founders Brn∴ J.J. Méndez Sampaio, Christian Heisecke, Alfredo Boettner, Juan Carrón, Germán Ibbecken, Antonio Castellani and Pablo Bergenmann.", pt: "É oficialmente instalada como Loja Regular a Loja Sol Naciente Segunda com o número de ordem 74, sendo os fundadores os Irm∴ J.J. Méndez Sampaio, Christian Heisecke, Alfredo Boettner, Juan Carrón, Germán Ibbecken, Antonio Castellani e Pablo Bergenmann." },
    "El Serenísimo Gran Oriente del Uruguay regulariza la Logia Sol Naciente 2da. y declara también como miembros fundadores a los HH∴ Víctor Guatier, Pedro Casartelli, Juan Villanueva, José C. Meza y Otto Weltti. El primer Ven∴ Maest∴ fue el H∴ Alfredo Boettner.-": { en: "The Most Serene Grand Orient of Uruguay regularizes Lodge Sol Naciente 2nd and also declares as founding members Brn∴ Víctor Guatier, Pedro Casartelli, Juan Villanueva, José C. Meza and Otto Weltti. The first Worsh∴ Master was Bro∴ Alfredo Boettner.-", pt: "O Sereníssimo Grande Oriente do Uruguai regulariza a Loja Sol Naciente 2ª e declara também como membros fundadores os Irm∴ Víctor Guatier, Pedro Casartelli, Juan Villanueva, José C. Meza e Otto Weltti. O primeiro Ven∴ Mestre foi o Irm∴ Alfredo Boettner.-" },
    "El Templo Masónico de Palma, considerado uno de los más bellos de Sudamérica y de Paraguay (Adquirido, el 6 de septiembre de 1899 en Asunción, Paraguay) es templo Masónico perteneciente al Gran Oriente del Paraguay de la antigua Gran Logia Simbólica del Paraguay, ubicado sobre la calle palma de la Ciudad de Asunción del Paraguay.": { en: "The Masonic Temple of Palma, considered one of the most beautiful in South America and Paraguay (acquired on September 6, 1899 in Asunción, Paraguay), is the Masonic temple belonging to the Grand Orient of Paraguay of the old Grand Symbolic Lodge of Paraguay, located on Palma Street in the city of Asunción, Paraguay.", pt: "O Templo Maçônico de Palma, considerado um dos mais belos da América do Sul e do Paraguai (adquirido em 6 de setembro de 1899 em Assunção, Paraguai), é o templo Maçônico pertencente ao Grande Oriente do Paraguai da antiga Grande Loja Simbólica do Paraguai, localizado na rua Palma, na cidade de Assunção do Paraguai." },
    "Adquirido bajo la gestión del Gran Maestro Dr. Cecilio Báez en 1899, y fue diseñado por Ricardo Lloret y construido por José Vilá. Fue sede de actividades filantrópicas y como centro de ayuda durante la Gripe Española en 1918 y Hospital de Sangre durante la Guerra del Chaco, es considerado como símbolo emblemático de la Masonería Paraguaya.                           Fue restaurado y reinaugurado en una ceremonia en el mes de julio de año 2018, con la presencia de Autoridades Masónicas y Municipales, bajo la administración del Gran Maestro Benigno Villasanti y hecho patrimonio histórico del Paraguay por su historia y arquitectura.": { en: "Acquired under the leadership of Grand Master Dr. Cecilio Báez in 1899, it was designed by Ricardo Lloret and built by José Vilá. It served as a venue for philanthropic activities and as an aid center during the 1918 Spanish Flu, and a Field Hospital during the Chaco War; it is considered an emblematic symbol of Paraguayan Freemasonry. It was restored and reopened in a ceremony in July 2018, with the presence of Masonic and Municipal Authorities, under the administration of Grand Master Benigno Villasanti, and declared Historic Heritage of Paraguay for its history and architecture.", pt: "Adquirido sob a gestão do Grão-Mestre Dr. Cecilio Báez em 1899, foi projetado por Ricardo Lloret e construído por José Vilá. Foi sede de atividades filantrópicas e como centro de ajuda durante a Gripe Espanhola em 1918 e Hospital de Sangue durante a Guerra do Chaco; é considerado símbolo emblemático da Maçonaria Paraguaia. Foi restaurado e reinaugurado em uma cerimônia no mês de julho de 2018, com a presença de Autoridades Maçônicas e Municipais, sob a administração do Grão-Mestre Benigno Villasanti, e declarado patrimônio histórico do Paraguai por sua história e arquitetura." }
  };

  // ---------------- Engine ----------------
  const STORAGE_KEY = 'glsp.lang';
  const LANGS = ['es', 'en', 'pt'];
  const ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];

  function getLang() {
    const v = localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(v) ? v : 'es';
  }
  function setLang(l) {
    if (!LANGS.includes(l)) return;
    localStorage.setItem(STORAGE_KEY, l);
    apply(l);
  }

  // Cache original Spanish on first run by writing into a WeakMap.
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  function translate(es, lang) {
    if (lang === 'es') return es;
    const trimmed = es.trim();
    if (!trimmed) return es;
    const entry = DICT[trimmed];
    if (!entry || !entry[lang]) return es;
    // preserve leading/trailing whitespace
    const lead = es.match(/^\s*/)[0];
    const tail = es.match(/\s*$/)[0];
    return lead + entry[lang] + tail;
  }

  function walkTextNodes(root, lang) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(node => {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const orig = originalText.get(node);
      node.nodeValue = translate(orig, lang);
    });
  }

  function walkAttrs(root, lang) {
    const els = root.querySelectorAll('[placeholder],[title],[alt],[aria-label]');
    els.forEach(el => {
      let cache = originalAttrs.get(el);
      if (!cache) {
        cache = {};
        ATTRS.forEach(a => { if (el.hasAttribute(a)) cache[a] = el.getAttribute(a); });
        originalAttrs.set(el, cache);
      }
      ATTRS.forEach(a => {
        if (cache[a] != null) el.setAttribute(a, translate(cache[a], lang));
      });
    });
  }

  let originalTitle = null;
  function applyTitle(lang) {
    if (originalTitle == null) originalTitle = document.title;
    document.title = translate(originalTitle, lang);
  }

  function syncSwitch(lang) {
    document.querySelectorAll('.lang span').forEach(s => {
      const code = (s.textContent || '').trim().toLowerCase();
      s.classList.toggle('active', code === lang);
    });
  }

  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);
    walkTextNodes(document.body, lang);
    walkAttrs(document.body, lang);
    applyTitle(lang);
    syncSwitch(lang);
  }

  function bindSwitch() {
    document.querySelectorAll('.lang span').forEach(s => {
      s.style.cursor = 'pointer';
      s.addEventListener('click', () => {
        const code = (s.textContent || '').trim().toLowerCase();
        if (LANGS.includes(code)) setLang(code);
      });
    });
  }

  function init() {
    bindSwitch();
    apply(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
