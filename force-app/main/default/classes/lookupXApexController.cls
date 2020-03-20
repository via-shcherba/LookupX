/* created by via.shcherba */
public with sharing class lookupXApexController {

    @AuraEnabled(cacheable=true)
    public static  List<Wrapper> getReferencedFields(String objectName) {
        List<Wrapper> referancedFields = new  List<Wrapper>();
        Map<String, Schema.SObjectType> schema = Schema.getGlobalDescribe();
        Schema.SObjectType sObjectSchema = schema.get(objectName);
        Map<String, Schema.SObjectField> fields = sObjectSchema.getDescribe().fields.getMap();
        for (String field : fields.keySet()) {
            String objectType = String.valueOf(fields.get(field).getDescribe().getType());
            if (objectType == 'REFERENCE') {
                if (fields.get(field).getDescribe().isUpdateable()) {
                    String fieldName = fields.get(field).getDescribe().getName();                    
                    String referenceObjectName = String.valueOf(fields.get(field).getDescribe().getReferenceTo()[0]);
                    referancedFields.add(new Wrapper(fieldName, referenceObjectName));
                }
            }
        }
        return referancedFields;
    }

    public class Wrapper {

        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public String label {get; set;}

        public Wrapper(String name, String label) {
            this.name = name;
            this.label = label;
        }
    }

}
