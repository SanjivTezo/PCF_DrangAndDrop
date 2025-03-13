
// import { IInputs } from "../generated/ManifestTypes";

// import FileHelper from "../helpers/FileHelper";

// let _context: ComponentFramework.Context<IInputs>;

// const notificationOptions = {
//   errorsCount: 0,
//   importedSucsessCount: 0,
//   filesCount: 0,
//   details: "",
//   message: "",
// };

// export default {
//   setContext(context: ComponentFramework.Context<IInputs>) {
//     _context = context;
//   },

//   async getEntitySetName(entityTypeName: string) {
//     const entityMetadata = await _context.utils.getEntityMetadata(
//       entityTypeName
//     );
//     return entityMetadata.EntitySetName;
//   },

//   async getEntityDisplayName() {
//     // @ts-ignore
//     const { entityTypeName } = _context.page;
//     const entityMetadata = await _context.utils.getEntityMetadata(
//       entityTypeName
//     );
//     return entityMetadata._displayName;
//   },

//   async hasNotes() {
//     // @ts-ignore
//     const contextPage = _context.page;
//     const entityMetadataResponse = await fetch(
//       `${contextPage.getClientUrl()}/api/data/v9.0/EntityDefinitions(LogicalName='` +
//         `${contextPage.entityTypeName}')`
//     );
//     const entityMetadata = await entityMetadataResponse.json();
//     return entityMetadata.HasNotes;
//   },

//   async uploadFile(file: File, filesCount: number) {
//     try {
//       notificationOptions.filesCount = filesCount;
//       const buffer: ArrayBuffer = await FileHelper.readFileAsArrayBufferAsync(
//         file
//       );
//       const body: string = FileHelper.arrayBufferToBase64(buffer);
//       // @ts-ignore
//       const { entityTypeName, entityId } = _context.page;
//       const entitySetName = await this.getEntitySetName(entityTypeName);
      


//       const data: any = {
//         //gg_issynced: false,
//         tz_demo: "First",
//         tz_filename: file.name,
//       };
//       //gg_name: file.name,
//       //gg_CaseAttachmentId@odata.bind

//       data["tz_case@odata.bind"] = `/${entitySetName}(${entityId})`;
//       console.log(data)
//       console.log("Creating attachment record...");
//       const success = await _context.webAPI.createRecord("tz_attachment", data);
//       console.log("Attachment created with ID:", success.id);
//       //gg_attachment
//       let fileContent = body;
//       console.log(getEnvironmentVariableBySchema("tz_UploadDocForDragAndDrop"));

//       const url = await getEnvironmentVariableBySchema(
//         "tz_UploadDocForDragAndDrop"
//       );
//         //gg_UploadDocForDragAndDrop


//       console.log(url);
//       const data1 = {
//         attachmentId: success.id,
//         body: fileContent,
//         fileName: file.name,
//       };

//       try {
//         console.log("Sending file to external upload API...");
        
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data1),
//         });
//         console.log(response)

//        // const responseBody = await response.text(); // Get response body
//        // console.log("Upload API Response:", responseBody);
//         // Check if the response status is 200

//         if (response.ok) {
//           console.log("File Upload successful");
//           // Proceed with further actions
//         } else {
         
//           console.error("File Upload request failed:", response.statusText);
//          // throw new Error(`File Upload failed with status ${response.status}: ${responseBody}`);
//           //console.error("File Upload request failed:", response.statusText);
//           // Handle error response
//         }
//       } catch (error) {
//         console.error("Error during File Upload", error);
//         // Handle network or other errors
//       }

//       var pageInput = {
//         pageType: "entityrecord",
//         entityName: "tz_attachment",
//         entityId: success.id, //replace with actual ID
//       };
//       var navigationOptions = {
//         target: 2,
//         height: { value: 80, unit: "%" },
//         width: { value: 70, unit: "%" },
//         position: 1,
//       };
//       // @ts-ignore
//       parent.Xrm.Navigation.navigateTo(pageInput, navigationOptions)?.then(
//         function success() {
//           // Run code on success
//         },
//         function error() {
//           // Handle errors
//         }
//       );
//       notificationOptions.importedSucsessCount += 1;
//     } catch (ex: any) {
//       console.error(ex.message);
//       notificationOptions.details += `File Name ${file.name} Error message ${ex.message}`;
//       notificationOptions.errorsCount += 1;
//     }
//   },

//   refreshTimeline() {
//     // @ts-ignore
//     parent.Xrm.Page.getControl("AttachmentsSubGrid")?.refresh();
//     //this.showNotificationPopup();
//   },

//   showNotificationPopup() {
//     if (notificationOptions.errorsCount === 0) {
//       const message =
//         notificationOptions.filesCount === 1
//           ? `${notificationOptions.importedSucsessCount} of ` +
//             `${notificationOptions.importedSucsessCount} file imported successfully`
//           : `${notificationOptions.importedSucsessCount} of ` +
//             `${notificationOptions.importedSucsessCount} files imported successfully`;

//       _context.navigation.openConfirmDialog({ text: message });
//       notificationOptions.importedSucsessCount = 0;
//     } else {
//       notificationOptions.message =
//         notificationOptions.filesCount === 1
//           ? `${notificationOptions.errorsCount} 
//         of ${notificationOptions.filesCount} file errored during import`
//           : `${notificationOptions.errorsCount} 
//         of ${notificationOptions.filesCount} files errored during import`;

//       _context.navigation.openErrorDialog(notificationOptions);
//       (notificationOptions.errorsCount = 0),
//         (notificationOptions.importedSucsessCount = 0);
//       notificationOptions.details = "";
//     }
//   },
// };
// async function getEnvironmentVariableBySchema(schemaName: string) {
//   var fetchXml =
//     '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">' +
//     '  <entity name="environmentvariabledefinition">' +
//     '    <attribute name="environmentvariabledefinitionid" />' +
//     '    <attribute name="schemaname" />' +
//     '    <attribute name ="defaultvalue" />' +
//     '    <attribute name="createdon" />' +
//     '    <order attribute="schemaname" descending="false" />' +
//     '    <filter type="and">' +
//     '      <condition attribute="schemaname" operator="eq" value="' +
//     schemaName +
//     '" />' +
//     "    </filter>" +
//     "  </entity>" +
//     "</fetch>";
//   // @ts-ignore
//   return Xrm.WebApi.retrieveMultipleRecords(
//     "environmentvariabledefinition",
//     "?fetchXml=" + encodeURIComponent(fetchXml)
//   )
//     .then(function success(result: any) {
//       if (result.entities.length > 0) {
//         // Retrieve the first entity found
//         var entity = result.entities[0];

//         // Extract attributes from the entity
//         var defaultvalue = entity.defaultvalue;
//         if (!defaultvalue) {
//           console.warn(`Environment variable "${schemaName}" does not have a default value.`);
//         }
//         // You can retrieve other attributes similarly

//         return defaultvalue;
//       } else {
//         console.warn(`No environment variable found for schema: ${schemaName}`);
//       return null;
//       }
//     })
//     .catch(function error(error: any) {
//       console.error("Error retrieving environment variable:", error);
//       throw error;
//     });
// }
import { IInputs } from '../generated/ManifestTypes';
import FileHelper from '../helpers/FileHelper';

let _context: ComponentFramework.Context<IInputs>;

const notificationOptions = {
  errorsCount: 0,
  importedSucsessCount: 0,
  filesCount: 0,
  details: '',
  message: '',
};

export default {
  setContext(context: ComponentFramework.Context<IInputs>) {
    _context = context;
  },

  async getEntitySetName(entityTypeName: string) {
    const entityMetadata = await _context.utils.getEntityMetadata(entityTypeName);
    return entityMetadata.EntitySetName;
  },

  async getEntityDisplayName() {
    // @ts-ignore
    const { entityTypeName } = _context.page;
    const entityMetadata = await _context.utils.getEntityMetadata(entityTypeName);
    return entityMetadata._displayName;
  },

  async hasNotes() {
    // @ts-ignore
    const contextPage = _context.page;
    const entityMetadataResponse =
     await fetch(`${contextPage.getClientUrl()}/api/data/v9.0/EntityDefinitions(LogicalName='` +
     `${contextPage.entityTypeName}')`);
    const entityMetadata = await entityMetadataResponse.json();
    console.log(entityMetadataResponse)
    console.log(entityMetadata)
    return entityMetadata.HasNotes;
  },
 
  async uploadFile(file: File, filesCount: number) {
    try {
        notificationOptions.filesCount = filesCount;

        // Get entity details
         // @ts-ignore
        const { entityTypeName, entityId } = _context.page as any;
        const entitySetName = await this.getEntitySetName(entityTypeName);

        // Create the attachment record with only the filename
        const data: any = {
            'tz_filename': file.name,
            'tz_case@odata.bind': `/${entitySetName}(${entityId})`, // Linking to parent
        };

        const response = await _context.webAPI.createRecord('tz_attachment', data);
        const recordId = response.id; // Get the new attachment record ID

        console.log("Record Created:", recordId);

        // Step 2: Upload the file content
        await this.uploadFileContent(recordId, file);

        notificationOptions.importedSucsessCount += 1;
        
    } catch (ex: any) {
        console.error(ex.message);
        notificationOptions.details += `File Name ${file.name} Error message ${ex.message}`;
        notificationOptions.errorsCount += 1;
    }
}
,
async uploadFileContent(recordId: string, file: File) {
  const requestUrl = `https://org5fdc1b86.crm8.dynamics.com//api/data/v9.0/tz_attachments(${recordId})/tz_file`;
  console.log(requestUrl)

  const response = await fetch(requestUrl, {
      method: "PATCH",
      headers: {
          "Accept": "application/json",
          "OData-Version": "4.0",
          "OData-MaxVersion": "4.0",
          "Content-Type": "application/octet-stream",
      },
      body: file, // Send the actual file
  });

  if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  console.log("File uploaded successfully:", recordId);
}

,


  refreshTimeline() {
    // @ts-ignore
    parent.Xrm.Page.getControl('tz_attachment')?.refresh();
    this.showNotificationPopup();
  },

  showNotificationPopup() {
    if (notificationOptions.errorsCount === 0) {
      const message = notificationOptions.filesCount === 1
        ? `${notificationOptions.importedSucsessCount} of ` +
        `${notificationOptions.importedSucsessCount} file imported successfully`
        : `${notificationOptions.importedSucsessCount} of ` +
        `${notificationOptions.importedSucsessCount} files imported successfully`;

      _context.navigation.openConfirmDialog({ text: message });
      notificationOptions.importedSucsessCount = 0;
    }
    else {
      notificationOptions.message = notificationOptions.filesCount === 1
        ? `${notificationOptions.errorsCount} 
        of ${notificationOptions.filesCount} file errored during import`
        : `${notificationOptions.errorsCount} 
        of ${notificationOptions.filesCount} files errored during import`;

      _context.navigation.openErrorDialog(notificationOptions);
      notificationOptions.errorsCount = 0, notificationOptions.importedSucsessCount = 0;
      notificationOptions.details = '';
    }
  },
};