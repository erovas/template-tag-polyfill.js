/**
 * template-tag-polyfill.js v1.0.0
 * Polyfill de <template> que intenta darle toda la funcionalidad nativa de este elemento en navegadores que NO lo soportan
 * [Back-compatibility: IE11+]
 * Copyright (c) 2021, Emanuel Rojas Vásquez
 * BSD 3-Clause License
 * https://github.com/erovas/template-tag-polyfill.js
 */
if(!('content' in document.createElement('template'))){

    //#region Estilo para ocultar contenido de los templates
    
    let style = document.createElement('style');
    style.innerHTML = 'template { display: none; }';
    document.head.appendChild(style);
    style = undefined;

    //#endregion

    //Para emular el instanceof y la interfaz del objeto nativo
    window.HTMLTemplateElement = window.HTMLElement;

    const div = document.createElement('div');
    const TemplateTagName = 'TEMPLATE';
    const innerHTMLText = '-_-innerHTMLText';
    const innerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML') || Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML');
    const outerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML') || Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'outerHTML');
    const createElement = Document.prototype.createElement;
    let templates = document.getElementsByTagName('template');


    const _renderTemplate = function(tag){

        //El template ya esta renderizado
        if(tag.content)
            return;

        //Se genera un pseudo innerHTML
        tag[innerHTMLText] = innerHTML.get.call(tag);

        const child = tag.childNodes;
        const fragment = document.createDocumentFragment();

        while(child[0])
            fragment.appendChild(child[0]);
            
        tag.content = fragment;
    }

    //#region Renderizado de los templates existentes en el documento durante el parseo del mismo

    let mutation = new MutationObserver(function(mtns){
        //Quizas hay templates dentro de los templates
        const tls = [].slice.call(templates);

        for (let i = 0; i < tls.length; i++)
            _renderTemplate(tls[i]);
    });

    mutation.observe(document.getElementsByTagName('html')[0], { childList: true, subtree: true });

    window.addEventListener('load', function(){
        mutation.disconnect();
        mutation = undefined;
        templates = undefined;
    }, { once: true });

    //#endregion

    //#region Redefinicion de innerHTML y outerHTML

    [Element.prototype, HTMLElement.prototype].forEach(function(item){
        Object.defineProperty(item, 'innerHTML', {
            get: function(){
                //Devuelve el pseudo innerHTML
                if(this.tagName === TemplateTagName)
                    return this[innerHTMLText];
                    
                return innerHTML.get.call(this);
            },
            set: function(value){

                if(this.tagName === TemplateTagName){
                    //Se generan los nodos y con ello el nuevo pseudo innerHTML
                    div.innerHTML = value;
                    this[innerHTMLText] = innerHTML.get.call(div);

                    const content = this.content;
                    const childAdd = div.childNodes;
                    const childRemove = content.childNodes;

                    //Se eliminan los nodos del content del template
                    while(childRemove[0])
                        content.removeChild(childRemove[0]);

                    //Se agregan los nuevos nodos al content del template
                    while(childAdd[0])
                        content.appendChild(childAdd[0]);
                }
                else {
                    innerHTML.set.call(this, value);

                    //Si dentro del tag donde se ha hecho el inner hay algun template, se renderiza
                    const tls = [].slice.call(this.getElementsByTagName(TemplateTagName.toLowerCase()));

                    for (let i = 0; i < tls.length; i++)
                        _renderTemplate(tls[i]);
                }
            }
        });

        Object.defineProperty(item, 'outerHTML', {
            get: function(){
                if(this.tagName !== TemplateTagName)
                    return outerHTML.get.call(this);

                const tag = TemplateTagName.toLowerCase();
                return '<' + tag + '>' + this.innerHTML + '</' + tag + '>';
            }
        });
    });

    //#endregion

    //#region Redefinicion de createElement()

    Object.defineProperty(Document.prototype, 'createElement', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function(tagName, options){

            const tag = createElement.apply(this, arguments);

            if(tag.tagName === TemplateTagName){
                tag.content = this.createDocumentFragment();
                tag[innerHTMLText] = '';
            }

            return tag;
        }
    });

    //#endregion
}