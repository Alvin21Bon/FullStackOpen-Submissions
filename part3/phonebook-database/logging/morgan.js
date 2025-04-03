import Morgan from 'morgan'

Morgan.token('postData', (req) => {
	if (req.method === 'POST') return JSON.stringify(req.body);
	else return '';
});

export default Morgan(':method :url :status :res[content-length] - :response-time ms :postData');
