# NodeJS Developer - Exercise 1

## Install, run and test

Install:  npm install  
Run: npm start    
Test: npm test

## Endpoints

### GET /todos
#### Response:

	{
		"status": "success",
		"result": 1,
		"data": {
			"todos": [
				{
					"id": "",
					"text": "",
					"priority": 3,
					"done": false
				}
			]
		}
	}
	
### POST /todos
#### Request
####body:

	{
		"text": "", required
		"priority": number between 1 and 5. default 3 
	}
	
#### Response
	{
		"id": "",
		"text": "",
		"priority": 3,
		"done": false
	}

### GET /todos/:id

#### Response
	{
		"id": "",
		"text": "",
		"priority": 3,
		"done": false
	}

### PUT /todos/:id

#### Request
####body:

	{
		"text": "", required
		"priority": number between 1 and 5. default 3,
		"done": false
	}

#### Response
	{
		"id": "",
		"text": "",
		"priority": 3,
		"done": false
	}

### DELETE /todos/:id
#### Response
	'success' or 'Invalid ID'


