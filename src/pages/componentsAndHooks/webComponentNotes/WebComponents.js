class NoteElement extends HTMLElement {
    constructor() {
        super();
    }
}

class NoteCreator extends HTMLElement{
    constructor() {
        super();
    }
}


customElements.define('note-element', NoteElement);
customElements.define('note-creator', NoteCreator);
