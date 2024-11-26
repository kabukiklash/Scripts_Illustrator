
# Documentação Tutorial: Explicação do Script Illustrator

Este tutorial irá guiá-lo pelo funcionamento do script do Adobe Illustrator, detalhando cada função utilizada para facilitar o entendimento do seu propósito e aplicação no treinamento. O script é projetado para rotular automaticamente objetos com medidas em milímetros e realizar outras operações específicas.

## Visão Geral
Este script realiza as seguintes ações:
1. Cria uma cor CMYK (Magenta 100%) a ser usada para identificar objetos.
2. Cria uma camada chamada "Text Labels" (ou reutiliza uma existente) para adicionar textos de medidas.
3. Identifica todos os objetos com traços de uma cor específica (Magenta 100%) e adiciona etiquetas com suas medidas.

Vamos detalhar cada parte do script:

## Função `createCMYKColor`
- **Objetivo:** Criar uma cor CMYK personalizada.
- **Parâmetros:** `c`, `m`, `y`, `k` (valores para ciano, magenta, amarelo e preto).
- **Uso:** Cria as cores magenta e preto para serem usadas posteriormente.

```javascript
var magentaColor = createCMYKColor(0, 100, 0, 0); // Magenta 100%
var blackColor = createCMYKColor(0, 0, 0, 100); // Preto
```

## Função `labelObject`
- **Objetivo:** Medir e rotular um objeto com suas dimensões em milímetros.
- **Parâmetros:** `obj` (o objeto a ser rotulado) e `textLayer` (a camada onde o texto será adicionado).
- **Detalhes:**
  1. Converte as medidas do objeto de pontos para milímetros (1 ponto = 0,352778 mm).
  2. Cria um rótulo de texto contendo as medidas de largura e altura.
  3. Define a fonte como "Arial Bold" e ajusta o tamanho da fonte conforme o espaço disponível acima do objeto.
  4. Posiciona o texto acima do objeto, centralizando horizontalmente.

```javascript
var labelText = width_mm.toFixed(2) + " X " + height_mm.toFixed(2) + " mm";
```

## Função `getOrCreateTextLayer`
- **Objetivo:** Garantir que a camada "Text Labels" exista para adicionar os textos de medidas.
- **Parâmetros:** `doc` (o documento ativo).
- **Detalhes:**
  1. Verifica se a camada "Text Labels" já existe; se não, cria uma nova.
  2. Desbloqueia a camada para garantir que possa ser modificada.

```javascript
if (doc.layers[i].name === "Text Labels") {
    textLayer = doc.layers[i];
}
```

## Função `processObjectsByStrokeColor`
- **Objetivo:** Processar todos os objetos no documento e rotular aqueles que possuem um traço com a cor especificada (Magenta 100%).
- **Detalhes:**
  1. Obtém ou cria a camada "Text Labels" para adicionar os textos.
  2. Itera sobre todos os objetos (`pathItems`) do documento ativo.
  3. Verifica se o objeto possui traço com a cor magenta e, caso afirmativo, chama a função `labelObject` para adicionar o texto com as medidas.

```javascript
if (obj.stroked && obj.strokeColor instanceof CMYKColor &&
    obj.strokeColor.magenta === targetStrokeColor.magenta) {
    labelObject(obj, textLayer);
}
```

## Executar o Script
- **Chamada Principal:** A função `processObjectsByStrokeColor` é chamada para iniciar o processo de identificação e rotulagem dos objetos.

```javascript
processObjectsByStrokeColor();
```

## Resumo das Funções
1. **`createCMYKColor(c, m, y, k)`**: Cria uma cor CMYK.
2. **`labelObject(obj, textLayer)`**: Adiciona um rótulo de texto com as medidas do objeto.
3. **`getOrCreateTextLayer(doc)`**: Obtém ou cria a camada "Text Labels".
4. **`processObjectsByStrokeColor()`**: Itera sobre os objetos e rotula aqueles com traço magenta.

## Considerações Finais
Este script é útil para automatizar o processo de rotulagem de objetos em documentos do Illustrator, especialmente em projetos que requerem controle preciso de medidas. Ao utilizar este script, é possível aumentar a produtividade e garantir que todos os objetos estejam devidamente rotulados de maneira consistente.

Caso tenha dúvidas sobre a implementação ou deseje fazer ajustes, sinta-se à vontade para explorar o código e adaptá-lo às suas necessidades.
