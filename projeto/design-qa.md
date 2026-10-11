# Design QA — Helena Duarte

Resultado: aprovado para protótipo local. Sem problemas P0, P1 ou P2 pendentes.

## Referência e comparação
Referência: generated_images/exec-514bef4a-c27e-4c62-8c7d-8a8f1dc310eb.png, mistura escolhida da composição 1 e atmosfera 3.
Captura desktop: /workspace/scratch/helena-desktop-v2.jpg. Comparação lado a lado: /workspace/scratch/helena-comparison.jpg.
Referência 1487 × 1058 redimensionada proporcionalmente para largura 1348 e recortada na altura 926 da captura. Viewport CSS 1363 × 936, com scrollbar; nenhuma rolagem horizontal.
Comparação completa e inspeção focada: nav pill, título de três linhas, cores e CTA, enquadramento do retrato, transição e faixa de cuidados. Estrutura, peso visual e hierarquia preservados. Foto foi recriada sem interface; ícones de contorno usam Phosphor. Diferenças mínimas de enquadramento e CTA são aceitáveis.

## Ajustes verificados
P2 resolvido: topo do retrato sobreposto pela navegação. Foto deslocada 60 px e altura ajustada; rosto totalmente visível.
P2 resolvido: altura e ritmo do hero afastavam cuidados do primeiro viewport. Espaçamento e altura adaptados à referência.

## Superfícies e fluxos
Hero/nav, faixa de serviços, apresentação, consulta e FAQ/rodapé inspecionados. Textos reais e estrutura sem links vazios.
Viewport móvel em iframe 390 × 844, área CSS 375 px descontando scrollbar: scrollWidth = clientWidth. Captura /workspace/scratch/helena-mobile-full.jpg. Título, CTA e retrato legíveis sem colisões.
Menu móvel abriu e link Consulta fechou e navegou. Formulário desktop com Maria/Retorno/Tarde produziu mensagem correta. Botão Copiar confirmou cópia. Fechar diálogo funciona. Formulário móvel sem nome produziu Primeira consulta/Manhã; diálogo cabe em 339 × 570 px, viewport 844 px. FAQ abre com details nativo.
Sem erros da aplicação no console; apenas mensagens chrome-extension de metadados do ambiente, fora do app.
Build e quatro testes do worker de preview aprovados. Launcher localhost verificado servindo HTML, CSS, JS, foto e fonte.

## Limites
Protótipo frontend local, sem backend de agendamento. Médica fictícia claramente identificada, sem CRM, depoimentos ou credenciais inventados. Foto reutilizada na apresentação por consistência visual.

## Iteração — animações e copy

final result: passed

Pedido autorizado: mais animação e copy mais atrativa, preservando visual aprovado. Hero manteve headline, paleta e composição; textos de apoio, serviços, sobre, jornada, consulta e CTA final foram reescritos. Sem promessa de resultado ou prova social inventada.

Referência visual e captura final abertas e comparadas: /workspace/scratch/helena-animated-comparison.jpg. Normalização proporcional à largura 1348 px, mesma vista inicial e animações concluídas. Inspeção focada no CTA mais largo, linhas do texto e faixa de cuidados. P2 resolvido: subtítulo novo avançava sobre região clara da fotografia; frase encurtada preservando duas linhas legíveis. Nenhum P0/P1/P2 pendente.

Motion: entradas hero, retrato, reveal one-shot via IntersectionObserver, delays de serviços/etapas, linhas, efeitos hover, diálogos e FAQ. Scroll listener passivo com requestAnimationFrame e cleanup; sem nova biblioteca de animação. CSS cobre reduced-motion e visibilidade com focus-within; conteúdo é visível por padrão quando motion não inicializa.

Desktop: scrollWidth = clientWidth = 1348. CTA levou ao formulário; reveal do formulário terminou com opacity 1. Formulário com Ana e primeira consulta/manhã gerou mensagem correta; Escape fechou diálogo, FAQ abriu. Clipboard falhou quando tab estava sem foco; agora a interface explica como selecionar/copiar o texto manualmente, sem falso sucesso.

Mobile: iframe 390 × 844, CSS 375 px, sem overflow horizontal. Menu abriu e navegação Consulta fechou. Formulário abriu diálogo dentro da viewport, aproximadamente 339 × 570 px após transição. Captura /workspace/scratch/helena-animated-mobile-form.jpg. Nenhum erro da aplicação no console.

Publicação não executada: configuração estática vercel.json e .gitignore preparados para etapa futura de Git/Vercel.
