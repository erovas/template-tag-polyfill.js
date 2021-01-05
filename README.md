# template-tag-polyfill.js
(EN) Full functionality polyfill for template tag.\
(ES) Polyfill con funcionalidad completa para etiqueta template.

## Compatibility - Compatibilidad

(EN) For internet explorer 11+.\
(ES) Para internet explorer 11+.

## How to use? - ¿Cómo utilizarlo?

(EN) This polyfill must be put in the head tag of html document.\
(ES) Este polyfill debe ser puesta en la etiqueta head del documento html.

``` html
<html>
    <head>
        <title> My page - Mi página </title>
        <script src="template-tag-polyfill.js"></script>
    </head>
    <body>
        <!-- page content - contenido de la página -->
        
        <template id="template">
            <div> Hello - Hola </div>
        </template>

        <div id="target"></div>
        <div id="target-2"></div>

        <script>
            const target = document.getElementById('target');
            const target_2 = document.getElementById('target-2');

            const template = document.getElementById('template');
            const template_2 = document.createElement('template');
            template_2.innerHTML = '<p> Hello again - Hola de nuevo </p>';
            
            target.appendChild(template.content.cloneNode(true));
            target_2.appendChild(template_2.content.cloneNode(true));
        </script>
    </body>
</html>
```

## API
(EN) The same as modern browsers.\
(ES) La misma que los navegadores modernos.

## Authors - Autores

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## License - Licencia

(EN) This project is licensed under the BSD 3-Clause License - see the [LICENSE](https://github.com/erovas/template-tag-polyfill.js/blob/main/LICENSE) file for details.\
(ES) Este proyecto está licenciado bajo Licencia BSD 3-Clause - ver el archivo [LICENCIA](https://github.com/erovas/template-tag-polyfill.js/blob/main/LICENSE) para mas detalles.