# template-tag-polyfill.js
Full functionality polyfill for template tag.

## Compatibility
For internet explorer 11+.

## How to use it?
This polyfill must be put in the head tag of html document.\

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
The same as modern browsers.

## Authors

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## License
This project is licensed under the BSD 3-Clause License - see the [LICENSE](https://github.com/erovas/template-tag-polyfill.js/blob/main/LICENSE) file for details.\


# Spanish - Español

# template-tag-polyfill.js
Polyfill con funcionalidad completa para etiqueta template.

## Compatibilidad
Para internet explorer 11+.

## ¿Cómo utilizarlo?
Este polyfill debe ser puesta en la etiqueta head del documento html.

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
La misma que los navegadores modernos.

## Authors - Autores

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## License - Licencia
Este proyecto está licenciado bajo Licencia BSD 3-Clause - ver el archivo [LICENCIA](https://github.com/erovas/template-tag-polyfill.js/blob/main/LICENSE) para mas detalles.