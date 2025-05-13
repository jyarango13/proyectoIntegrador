import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
    root: 'src',
    plugins: [
      viteStaticCopy({
        targets: [
          { src: '*.html', dest: '../dist' },
          { src: 'img/*', dest: '../dist/img' },
         // { src: 'img/*', dest: '../extra/img' }
        ]
      })
    ],
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: 'src/js/main.js', // Punto de entrada para index.html
                login: 'src/js/login.js', // Punto de entrada para about.html
                listar: 'src/js/listar.js', // Punto de entrada para about.html 
                cssLogin: 'src/css/login.css', // Punto de entrada para about.html
            },
            output: {
                entryFileNames: 'js/[name].js', // Genera main.js y about.js
                chunkFileNames: 'js/[name].js', // Genera main.js y about.js
                assetFileNames: 'css/[name].css', // Genera main.css y about.css
            },
        },
    },
};
