const textElement = document.getElementById('text');
const optionsElement = document.getElementById('option-buttons');
let state = {};
const textNodes = [];

function startGame() {
    state = {};
    showTextNode(1);
}

function selectOption(option) {
    const next = option.next;
    state = Object.assign(state, option.setState);
    showTextNode(next);
}

function showTextNode(nodeIndex) {
    const node = textNodes.find(node => node.id === nodeIndex);
    textElement.innerHTML = parseMarkdown(node.text);
    while (optionsElement.firstChild) optionsElement.removeChild(optionsElement.firstChild);

    node.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerHTML = parseMarkdown(option.text);
            button.classList.add('btn');
            button.addEventListener('click', function () { selectOption(option); });
            optionsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

startGame();

function parseMarkdown(markdown) {
    return markdown.replace(/^\s*\n\*/gm, '<ul>\n*').replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2').replace(/^\*(.+)/gm, '<li>$1</li>').replace(/^\s*\n\d\./gm, '<ol>\n1.').replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2').replace(/^\d\.(.+)/gm, '<li>$1</li>').replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>').replace(/[\#]{6}(.+)/g, '<h6>$1</h6>').replace(/[\#]{5}(.+)/g, '<h5>$1</h5>').replace(/[\#]{4}(.+)/g, '<h4>$1</h4>').replace(/[\#]{3}(.+)/g, '<h3>$1</h3>').replace(/[\#]{2}(.+)/g, '<h2>$1</h2>').replace(/[\#]{1}(.+)/g, '<h1>$1</h1>').replace(/^(.+)\n\=+/gm, '<h1>$1</h1>').replace(/^(.+)\n\-+/gm, '<h2>$1</h2>').replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />').replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>').replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>').replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>').replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>').replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">').replace(/^\`\`\`\s*\n/gm, '</pre>\n\n').replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>').replace(/^\s*(\n)?(.+)/gm, function (m) { return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>'; }).replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
}