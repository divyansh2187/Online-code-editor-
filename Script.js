const htmlEditor = document.getElementById("html");
const cssEditor = document.getElementById("css");
const jsEditor = document.getElementById("js");
const frame = document.getElementById("frame");
const runBtn = document.getElementById("runBtn");

function runCode() {
  const html = htmlEditor.value;
  const css = `<style>${cssEditor.value}</style>`;
  const js = `<script>${jsEditor.value}<\/script>`;
  frame.srcdoc = `${html}${css}${js}`;
}

runBtn.addEventListener("click", runCode);
