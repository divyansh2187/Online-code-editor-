
        document.addEventListener('DOMContentLoaded', function() {
            // Get elements
            const htmlCode = document.getElementById('html-code');
            const cssCode = document.getElementById('css-code');
            const jsCode = document.getElementById('js-code');
            const preview = document.getElementById('preview');
            const runBtn = document.getElementById('run-btn');
            const clearBtn = document.getElementById('clear-btn');
            const saveBtn = document.getElementById('save-btn');
            const loadBtn = document.getElementById('load-btn');
            
            // Initial run
            updatePreview();
            
            // Event listeners
            runBtn.addEventListener('click', updatePreview);
            
            clearBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear all code?')) {
                    htmlCode.value = '';
                    cssCode.value = '';
                    jsCode.value = '';
                    updatePreview();
                }
            });
            
            saveBtn.addEventListener('click', saveCode);
            loadBtn.addEventListener('click', loadCode);
            
            // Auto-run when typing (with debounce)
            let timeout;
            [htmlCode, cssCode, jsCode].forEach(editor => {
                editor.addEventListener('input', function() {
                    clearTimeout(timeout);
                    timeout = setTimeout(updatePreview, 800);
                });
            });
            
            // Update preview function
            function updatePreview() {
                const html = htmlCode.value;
                const css = '<style>' + cssCode.value + '</style>';
                const js = '<script>' + jsCode.value + '<\/script>';
                
                const previewDocument = preview.contentDocument || preview.contentWindow.document;
                
                previewDocument.open();
                previewDocument.write(html + css + js);
                previewDocument.close();
            }
            
            // Save code to localStorage
            function saveCode() {
                const codeData = {
                    html: htmlCode.value,
                    css: cssCode.value,
                    js: jsCode.value
                };
                
                localStorage.setItem('savedCode', JSON.stringify(codeData));
                alert('Code saved successfully!');
            }
            
            // Load code from localStorage
            function loadCode() {
                const savedCode = localStorage.getItem('savedCode');
                
                if (savedCode) {
                    const codeData = JSON.parse(savedCode);
                    htmlCode.value = codeData.html;
                    cssCode.value = codeData.css;
                    jsCode.value = codeData.js;
                    updatePreview();
                    alert('Code loaded successfully!');
                } else {
                    alert('No saved code found!');
                }
            }
        });
