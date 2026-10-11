# Dra. Helena Duarte

Landing page responsiva em React e Vite. Médica e consultório fictícios, com fotografia gerada, paleta violeta e lavanda, copy voltada à escuta e ao cuidado individual.

## Visualizar em localhost

Com Node.js instalado, execute `ABRIR-SITE.bat` no Windows ou `node servidor-local.cjs` no terminal. Acesse `http://localhost:8000`. O pacote de distribuição contém a versão compilada e não exige instalar dependências.

## Desenvolver

```bash
npm install
npm run dev
```

## Compilar

```bash
npm run build
npm run test:sites
```

Saída do frontend: `dist/client`. O script também prepara o runtime do preview; a publicação estática usa apenas `dist/client`.

## Git e Vercel

Código preparado para um repositório Git. Não incluir `node_modules`, `dist`, `.env` nem `.vercel`. A configuração `vercel.json` define `npm run build` e `dist/client`. Não há variáveis de ambiente necessárias.

O agendamento é demonstrativo: gera uma mensagem e permite copiar, sem armazenar dados, enviar informações ou reservar horários.

## Animações

Entradas no hero, revelação de seções em scroll, linhas e cards escalonados, efeitos em botões, retrato e FAQ, transição no diálogo e indicador de leitura. A preferência `prefers-reduced-motion` desativa movimentos. Sem JavaScript, o CSS de revelação mantém conteúdo visível.
