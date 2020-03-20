import { LightningElement, track, api } from 'lwc';

export default class ObjectSeekerX extends LightningElement {

    @track searchResults;
    @track queryTerm;
    @track queryTermWithQuotes;
    @track isDisabled;
    @track value;
    @track apiObjectName;
    @api objectsDescriptions;
    @api removedObjectsNames;

    enterKey(evtent) {
        let _searchResults = [];
        this.queryTerm = evtent.target.value;
        this.queryTermWithQuotes = '"' + this.queryTerm + '"';
        let size = this.queryTerm.length;
        this.objectsDescriptions.forEach((elem) => {
            if (elem.label.length >= size) {
                if (this.queryTerm.toLowerCase() === elem.label.slice(0, size).toLowerCase()) {
                    _searchResults.push(elem);
                }
            }
        });
        this.searchResults = _searchResults;
    }

    setSelectedRecord(event) {
        let name = event.currentTarget.dataset.name;
        this.apiObjectName = name;
        this.sendObjectName(name);
        this.queryTerm = false;
        this.isDisabled = true;
        this.value = false;
    }

    @api removePill() {
        this.apiObjectName = false;
        this.sendObjectName(false);
        this.isDisabled = false;
        this.value = true;
    }

    sendObjectName(name) {
        this.dispatchEvent(
            new CustomEvent('setobjectname', { detail: name })
        );
    }

}