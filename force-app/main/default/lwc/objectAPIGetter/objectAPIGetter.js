import { LightningElement, api, track } from 'lwc';

export default class ObjectAPIGetter extends LightningElement {

    @api objects;
    @api label;
    @api inputValue;
    @track objectsLabels;
    
    enterKey(evtent) {
        let _searchResults = [];
        this.objects.forEach((elem) => {                      
            if (evtent.target.value.toLowerCase() === elem.label.slice(0, 1).toLowerCase()) {
                _searchResults.push(elem);
            }                           
        });
        this.objectsLabels = _searchResults;
        evtent.target.value = null;
    }

    setSelectedLabel(event) {
        let index = event.currentTarget.dataset.number;        
        this.inputValue = this.objects[index].label;    
        this.transferObjectName(this.objects[index].name);
        this.objectsLabels = null;
    }

    getObjects() {
        this.objectsLabels = this.objects;
    }

    transferObjectName(name) {
        this.dispatchEvent(
            new CustomEvent('setobjectname', { detail: name })
        );
    }

}