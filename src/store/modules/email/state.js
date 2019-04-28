export default {
	config: {},
	apiName: 'awsemailapi',
	isLoading: true,
	currentFolder: 'inbox',
	lastEvaluatedKey: {},
	estimateItemsInFolder: 0,
	pageLimit: 0,
	showComposeEmail: false,
	emailHeaders: [
		{
			text: 'From',
			value: 'from',
			sortable: false
		},
		{
			text: 'Subject',
			value: 'subject',
			sortable: false
		},
		{
			text: 'Time',
			value: 'ts',
			sortable: false
		}
	],
	emailData: [],
	openEmail: {}
};
