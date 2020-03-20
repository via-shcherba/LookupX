import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getReferencedFields from '@salesforce/apex/lookupXApexController.getReferencedFields';
import lookupLWCLbl from '@salesforce/label/c.LookupLWC';
import chooseLookupLbl from '@salesforce/label/c.Choose_lookup';
import updateBtnLbl from '@salesforce/label/c.UpdateBtn';
import cancelBtnLbl from '@salesforce/label/c.CancelBtn';
import successLbl from '@salesforce/label/c.Success';
import valueChangedMsgLbl from '@salesforce/label/c.ValueChangedMsg';

export default class LookupX extends LightningElement {
    
    @api recordId;
    @api objectApiName;  
    @track error;   
    @track fields;
    @track fieldName;
    @track labels = {
        lookupLWCLbl,
        chooseLookupLbl,
        updateBtnLbl,
        cancelBtnLbl,
        successLbl,
        valueChangedMsgLbl
    };

    @wire(getReferencedFields, {'objectName' : '$objectApiName'}) wiredObjectsNames(value) {
        const { data, error } = value
        if (data) {
            let preparedFields = [];
            data.forEach((element, index) => {
                preparedFields.push({'name' : element.name, 'label' : element.label, 'number' : index});
            });
            this.fields = preparedFields;
        }
        if (error) {
            this.error = error;
        }
    }

    getFieldName(event) {
        this.fieldName = event.detail;
    }

    toCancel() {
        this.fieldName = null;
        this.clearInput();
    }

    handleSuccess() {
        let showSuccess = new ShowToastEvent({
            title: this.labels.successLbl + '!',
            message: this.labels.valueChangedMsgLbl + '!',
            variant: 'Success',
        });
        dispatchEvent(showSuccess);
        this.fieldName = null;
        this.clearInput();
    }

    clearInput() {
        this.template.querySelector('c-object-a-p-i-getter').inputValue = null;
    }

}