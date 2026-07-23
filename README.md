Método 1: Via GitHub (Recomendado)
Extraia o arquivo GarimpoDeOfertas_Vercel_Ready.zip que você acabou de baixar no seu computador.

Crie uma conta gratuita no GitHub (se não tiver) e crie um Novo Repositório (New Repository).

Faça o upload manual de todos os arquivos extraídos (pasta static, templates, app.py, vercel.json e requirements.txt) para esse repositório no GitHub.

Acesse o Vercel e faça login (você pode usar a conta do GitHub).

No painel principal do Vercel, clique em "Add New" > "Project".

Conecte sua conta do GitHub e selecione o repositório que você acabou de criar.

O Vercel vai reconhecer o arquivo vercel.json automaticamente. Basta clicar em Deploy! Em cerca de 1 minuto, ele te dará o link do seu site rodando.

Método 2: Via Vercel CLI (Direto pelo Computador)
Se você tem alguma experiência com terminal:

Extraia a pasta do .zip.

Abra o terminal do seu computador (Prompt de Comando ou VS Code) dentro da pasta extraída.

Instale o Vercel no computador digitando: npm i -g vercel (necessário ter o Node.js instalado).

Digite simplesmente vercel e aperte Enter.

Siga as instruções na tela (ele pedirá para você fazer login no navegador e depois fará o upload dos arquivos diretamente).
