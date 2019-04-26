export default {
	config: {},
	apiName: 'awsemailapi',
	isLoading: true,
	currentFolder: 'inbox',
	lastEvaluatedKey: {},
	estimateItemsInFolder: 0,
	pageLimit: 0,
	emailHeaders: [
		{
			text: 'From',
			value: 'from',
			align: 'left'
		},
		{
			text: 'Subject',
			value: 'subject'
		},
		{
			text: 'Time',
			value: 'ts'
		}
	],
	emailData: []
};
