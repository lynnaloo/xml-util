/**
 * HTTP trigger function for parsing cXML data to XML.
 * @param {object} request - The HTTP request object.
 * @param {object} context - The execution context object.
 */
const { app } = require('@azure/functions');
const xml2js = require('xml2js');

app.http('cxml-parser', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Parser function processed a request.');

        // Parse cXML data from the request
        const cxmlData = await request.text();
        let xmlData;

        // Convert cXML to XML
        try {
            xmlData = await xml2js.parseStringPromise(cxmlData, { mergeAttrs: true, explicitArray: false});
            context.log('cXML data parsed successfully');
        } catch (err) {
            return {
                status: 400,
                body: 'Invalid cXML data'
            };
        }   

        // Return XML data in the response
        return {
            status: 200,
            body: JSON.stringify(xmlData),
            headers: {
                'Content-Type': 'application/json'
            }
        };

    }
});
