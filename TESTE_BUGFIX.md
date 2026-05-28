# 🐛 Teste da Correção do Bug de Imagens entre Dias

## O que foi corrigido

**Problema:** Ao navegar entre dias e usar as setas (< >) para navegar através das imagens na modal, podia aparecer imagens de outros dias.

**Causa:** Sistema global de estado compartilhado entre diferentes formações, que causava contaminação cruzada de dados.

**Solução:** 
- Substituiu variáveis globais por um mapa (`formacaoImagesMap`) que mantém imagens isoladas por formação
- Trocou JSON inline em onclick attributes por data attributes seguros
- Mudou para event delegation para abrir o modal
- Garantiu que o estado é resetado quando fecha a modal

---

## Como testar

### 1️⃣ Abra o servidor local
```bash
cd /Users/lucas/Code/acordes-arpejos-escalas
python3 -m http.server 8000
```

### 2️⃣ Abra no navegador
```
http://localhost:8000
```

### 3️⃣ Teste o cenário do bug

**Passos:**

1. Clique em **Fase 1: Acordes**
2. Scroll até **Dia 6** (tem várias formações com imagens)
3. **Clique em uma imagem** de uma das formações (ex: "Formação 1-7-3-5")
4. **Use as setas `< >`** para navegar através das imagens - DEVE permanecer na mesma formação
5. **Feche a modal** (clique fora ou ESC)
6. Scroll para **Dia 7** ou **Dia 8**
7. **Clique em uma imagem** desse dia
8. **Use as setas `< >`** novamente - DEVE navegar APENAS entre as imagens daquele dia
9. **Feche a modal**
10. Volte para **Dia 6** e clique em **outra formação** (ex: "Formação 1-5-7-3")
11. **Use as setas** - DEVE navegar APENAS entre as imagens dessa formação, NÃO da anterior

### 4️⃣ Teste o comportamento com teclado
- Use **← e →** para navegar
- Use **ESC** para fechar
- Use **mouse** para clicar nas setas da modal

### 5️⃣ Teste casos extremos
- **Múltiplos abrir/fechar:** Abra e feche a modal vários vezes
- **Alternância rápida:** Abra imagem de Dia 6, depois Dia 7, depois volte a Dia 6
- **Formações diferentes:** Clique em formações diferentes do mesmo dia

---

## ✅ Critério de Sucesso

- ✅ As setas `< >` navegam APENAS entre imagens da formação aberta
- ✅ Imagens de diferentes dias NÃO aparecem juntas na navegação
- ✅ Fechar e reabrir a modal reseta o estado corretamente
- ✅ Navegar entre dias diferentes mostra imagens corretas para cada dia
- ✅ Sem erros no console do navegador

---

## Mudanças no código

**Arquivo:** `/js/app.js`

### Antes (BUGADO):
```javascript
let allChordImages = [];  // Global compartilhado
let currentChordIndex = -1;
let currentExemploImages = [];

function openChordModal(imgSrc, title, exampleImages = null) {
  // Fallback para array global (PROBLEMA!)
  if (!exampleImages) {
    currentExemploImages = allChordImages;
  }
}

// onclick inline com JSON
onclick="openChordModal('img.png', 'Título', ${JSON.stringify(...)})"
```

### Depois (CORRIGIDO):
```javascript
let formacaoImagesMap = {};  // Mapa isolado por formação
let currentFormacaoId = null;
let currentChordIndex = -1;

function registerFormacaoImages(formacaoId, images) {
  formacaoImagesMap[formacaoId] = images;
}

function openChordModal(imgSrc, title, formacaoId) {
  currentFormacaoId = formacaoId;
  // Acessa apenas as imagens da formação específica
  if (formacaoImagesMap[formacaoId]) {
    currentChordIndex = formacaoImagesMap[formacaoId].findIndex(chord => chord.img === imgSrc);
  }
}

function closeChordModal() {
  // Reseta estado ao fechar
  currentFormacaoId = null;
  currentChordIndex = -1;
}

// Data attributes seguros
data-formacao-id="formacao-0-0"
data-img-src="path/to/img.png"
data-img-title="Título"

// Event delegation
document.addEventListener('click', function(event) {
  const img = event.target.closest('img.example-img[data-formacao-id]');
  if (img) {
    openChordModal(...);
  }
});
```

---

## Logs para debug (se precisar)

Abra o **DevTools (F12)** → **Console** e veja:
- Ao abrir imagem: `"Modal opened: formacao-0-0 Index: 1"`
- Ao navegar: verificar `currentFormacaoId` muda corretamente
- Sem erros de `undefined` ou `cannot read property of undefined`

---

## Próximos passos após teste

Se tudo funcionar:
- ✅ Confirmar que o bug foi corrigido
- ✅ Testar em diferentes navegadores se necessário
- ✅ Fazer commit com mensagem descritiva

Se encontrar problemas:
- 📝 Anotar quais testes falharam
- 📝 Descrever o comportamento inesperado
- 🔗 Compartilhar screenshot/log do console
