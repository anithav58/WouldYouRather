import Anitha from '../images/Anitha.jpeg';
import Brettlee from '../images/brettlee.jpeg';
import Sachin from '../images/sachin.jpeg';

let users = {
	anithavemuri: {
		id: 'anithavemuri',
		name: 'Anitha Vemuri',
		avatarURL: Anitha,
		answers: {
			'8xf0y6ziyjabvozdd253nd': 'optionOne',
			'6ni6ok3ym7mf1p33lnez': 'optionTwo',
			am8ehyc8byjqgar0jgpub9: 'optionTwo',
			loxhs1bqm25b708cmbf3g: 'optionTwo',
		},
		questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
	},
	brettlee: {
		id: 'brettlee',
		name: 'Brett Lee',
		avatarURL: Brettlee,
		answers: {
			vthrdm985a262al8qx3do: 'optionOne',
			xj352vofupe1dqz9emx13r: 'optionTwo',
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
	},
	sachinten: {
		id: 'sachinten',
		name: 'Sachin Tendulkar',
		avatarURL: Sachin,
		answers: {
			xj352vofupe1dqz9emx13r: 'optionOne',
			vthrdm985a262al8qx3do: 'optionTwo',
			'6ni6ok3ym7mf1p33lnez': 'optionTwo',
		},
		questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
	},
};

let questions = {
	'8xf0y6ziyjabvozdd253nd': {
		id: '8xf0y6ziyjabvozdd253nd',
		author: 'anithavemuri',
		timestamp: 1467166872634,

		optionOne: {
			votes: ['anithavemuri'],
			text: 'be fit',
		},
		optionTwo: {
			votes: [],
			text: 'be fat',
		},
	},
	'6ni6ok3ym7mf1p33lnez': {
		id: '6ni6ok3ym7mf1p33lnez',
		author: 'sachinten',
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: 'become a cricketer',
		},
		optionTwo: {
			votes: ['sachinten', 'anithavemuri'],
			text: 'become an actor',
		},
	},
	am8ehyc8byjqgar0jgpub9: {
		id: 'am8ehyc8byjqgar0jgpub9',
		author: 'anithavemuri',
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: 'dress classy',
		},
		optionTwo: {
			votes: ['anithavemuri'],
			text: 'dress casual',
		},
	},
	loxhs1bqm25b708cmbf3g: {
		id: 'loxhs1bqm25b708cmbf3g',
		author: 'brettlee',
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: 'be a fast-bowler',
		},
		optionTwo: {
			votes: ['anithavemuri'],
			text: 'be a guitarist',
		},
	},
	vthrdm985a262al8qx3do: {
		id: 'vthrdm985a262al8qx3do',
		author: 'brettlee',
		timestamp: 1489579767190,
		optionOne: {
			votes: ['brettlee'],
			text: 'live in India',
		},
		optionTwo: {
			votes: ['sachinten'],
			text: 'live in Australia',
		},
	},
	xj352vofupe1dqz9emx13r: {
		id: 'xj352vofupe1dqz9emx13r',
		author: 'sachinten',
		timestamp: 1493579767190,

		optionOne: {
			votes: ['sachinten'],
			text: 'be loved by all',
		},
		optionTwo: {
			votes: ['brettlee'],
			text: 'be feared by all ',
		},
	},
};

function generateUID() {
	return (
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15)
	);
}

export function _getUsers() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...users }), 1000);
	});
}

export function _getQuestions() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...questions }), 1000);
	});
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		},
	};
}

export function _saveQuestion(question) {
	return new Promise((res, rej) => {
		const authedUser = question.author;
		const formattedQuestion = formatQuestion(question);

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion,
			};

			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					questions: users[authedUser].questions.concat([formattedQuestion.id]),
				},
			};

			res(formattedQuestion);
		}, 1000);
	});
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers: {
						...users[authedUser].answers,
						[qid]: answer,
					},
				},
			};

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.concat([authedUser]),
					},
				},
			};

			res();
		}, 500);
	});
}
