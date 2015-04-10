// this script is a variation of the script addTimeStamp.js that is installed with PH7

if ( documents.length > 0 )
{
	var originalDialogMode = app.displayDialogs;
	app.displayDialogs = DialogModes.ERROR;
	var originalRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;
	
	try
	{
		var docRef = activeDocument;

		// Now create a text layer at the front
		var myLayerRef = docRef.artLayers.add();
		myLayerRef.kind = LayerKind.TEXT;
		myLayerRef.name = "Filename";
		
		var myTextRef = myLayerRef.textItem;
		
		// strip the extension off
		var fileNameNoExtension = docRef.name;
		fileNameNoExtension = fileNameNoExtension.split( "." );
		if ( fileNameNoExtension.length > 1 ) {
			fileNameNoExtension.length--;
		}
		fileNameNoExtension = fileNameNoExtension.join(".");
			
		myTextRef.contents = fileNameNoExtension;
		
		// off set the text to be in the middle
		myTextRef.position = new Array( docRef.width / 2, docRef.height / 2 );
		myTextRef.size = 20;
	}
	catch( e )
	{
		// An error occurred. Restore ruler units, then propagate the error back
		// to the user
		preferences.rulerUnits = originalRulerUnits;
        app.displayDialogs = originalDialogMode;
		throw e;
	}

	// Everything went Ok. Restore ruler units
	preferences.rulerUnits = originalRulerUnits;
	app.displayDialogs = originalDialogMode;
}
else
{
	alert( "You must have a document open to add the filename!" );
}
