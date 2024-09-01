function createColoredParagraph(text, textColor, bgColor) {
    let paragraph = document.createElement("p");
    paragraph.textContent = text;
    paragraph.style.color = textColor;
    paragraph.style.backgroundColor = bgColor;
    document.body.appendChild(paragraph);
}


createColoredParagraph("Hello, world!", "blue", "yellow");
