// Função para criar uma nova cor CMYK, criada uma única vez
var magentaColor = createCMYKColor(0, 100, 0, 0); // Magenta 100%
var blackColor = createCMYKColor(0, 0, 0, 100); // Preto

function createCMYKColor(c, m, y, k) {
    var color = new CMYKColor();
    color.cyan = c;
    color.magenta = m;
    color.yellow = y;
    color.black = k;
    return color;
}

// Função para medir e rotular o objeto em milímetros, centralizando o texto
function labelObject(obj, textLayer) {
    // Obter as medidas do objeto em milímetros (1 ponto = 0.352778 mm)
    var width_mm = obj.width * 0.352778;
    var height_mm = obj.height * 0.352778;

    // Criar o conteúdo do texto com as medidas no formato desejado
    var labelText = width_mm.toFixed(2) + " X " + height_mm.toFixed(2) + " mm";

    // Criar o quadro de texto na camada específica
    var text = textLayer.textFrames.add();
    text.contents = labelText;

    // Definir o estilo da fonte (Arial Bold)
    text.textRange.characterAttributes.textFont = app.textFonts.getByName("Arial-BoldMT");

    // Ajustar o tamanho da fonte conforme o espaço disponível
    var spaceAbove = obj.top + obj.height;  // Considera o espaço acima do objeto
    var optimalFontSize = 12; // Tamanho de fonte padrão
    if (spaceAbove < 50) { // Se o espaço é muito pequeno, reduz o tamanho da fonte
        optimalFontSize = Math.max(6, spaceAbove / 4);
    }
    text.textRange.characterAttributes.size = optimalFontSize;

    // Definir a cor do texto como preto
    text.textRange.fillColor = blackColor;

    // Centralizar o texto horizontalmente em relação ao objeto
    var textWidth = text.width;
    text.left = obj.left + (obj.width / 2) - (textWidth / 2);

    // Posicionar o texto acima do objeto, ajustando a distância (ajustado para 5)
    text.top = obj.top + 5 + (optimalFontSize / 2);  // Ajuste de 5 unidades para diminuir a distância
}

// Função para verificar se a camada "Text Labels" existe
function getOrCreateTextLayer(doc) {
    var textLayer = null;
    
    // Verificar se já existe uma camada chamada "Text Labels"
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name === "Text Labels") {
            textLayer = doc.layers[i];
            break;
        }
    }
    
    // Se a camada não existir, cria uma nova
    if (!textLayer) {
        textLayer = doc.layers.add();
        textLayer.name = "Text Labels";
    }
    
    // Desbloquear a camada para garantir que ela possa ser modificada
    textLayer.locked = false;
    
    return textLayer;
}

// Função principal
function processObjectsByStrokeColor() {
    var doc = app.activeDocument;
    
    // Obter ou criar a camada para os textos
    var textLayer = getOrCreateTextLayer(doc);
    
    // Definir a cor que queremos identificar no traçado (Magenta 100%)
    var targetStrokeColor = magentaColor; // Reutilizando a cor definida uma vez

    // Iterar sobre todos os objetos no documento
    for (var i = 0; i < doc.pathItems.length; i++) {
        var obj = doc.pathItems[i];
        
        // Verificar se o objeto tem um traçado com a cor alvo (Magenta 100%)
        if (obj.stroked && obj.strokeColor instanceof CMYKColor &&
            obj.strokeColor.cyan === targetStrokeColor.cyan &&
            obj.strokeColor.magenta === targetStrokeColor.magenta &&
            obj.strokeColor.yellow === targetStrokeColor.yellow &&
            obj.strokeColor.black === targetStrokeColor.black) {
            
            // Adicionar o texto com as medidas, centralizado acima do objeto
            labelObject(obj, textLayer);
        }
    }
}

// Executar o script
processObjectsByStrokeColor();
