@isTest
private with sharing class LookupXApexControllerTest {

    @isTest
    private static void getReferencedFieldsTest() {
        String testObject = 'Opportunity';
        test.startTest();
        List<lookupXApexController.Wrapper> data = lookupXApexController.getReferencedFields(testObject);
        test.stopTest();
        System.assert(data != null);
    }

}
