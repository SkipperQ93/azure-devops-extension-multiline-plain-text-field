function updateFieldValue (workItemServices) {
    workItemServices.WorkItemFormService.getService().then(function (service) {
        var fieldName = VSS.getConfiguration().witInputs.Field;
        var rows = VSS.getConfiguration().witInputs.Rows;

        var multilinePlainTextField = document.getElementById('multilineHtmlField');
        multilinePlainTextField.rows = rows;

        service.getFieldValue(fieldName).then(function (value) {
            multilinePlainTextField.innerHTML = value;
            VSS.resize("auto", multilinePlainTextField.scrollHeight);
        });

    });
};

VSS.require(["TFS/WorkItemTracking/Services"], function(workItemServices) {
    VSS.register(VSS.getContribution().id, () => {
        return {
            onLoaded: () => {
                updateFieldValue(workItemServices);
            },
            onRefreshed: () => {
                updateFieldValue(workItemServices);
            },
        }
    });
    VSS.notifyLoadSucceeded();
});
