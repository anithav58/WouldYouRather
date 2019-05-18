import React, { Component } from 'react';

class LeaderBoardCard extends Component {
	render() {
		const { user, imgCup } = this.props;
		console.log('user:', user);
		return (
			<div className="leaderboard-card">
				<div className="cup-wrapper">
					<img src={imgCup} alt="leaderboard cup" className="cup" />
				</div>
				<div className="leaderboard-img">
					<img src={user.avatarURL} alt="User's Avatar" className="avatar" />
				</div>

				<div className="leaderboard-user-info">
					<div className="caption">{user.name}</div>
					<div className="leaderboard-user-question-info">
						Answered Questions: &nbsp; &nbsp; <span>{user.answeredQs}</span>
					</div>

					<div className="leaderboard-user-question-info">
						Created Questions: &nbsp; &nbsp; <span>{user.createdQs}</span>
					</div>
				</div>
				<div className="leaderboard-score">
					<div className="score-title">Score</div>

					<button className="user-score">{user.score}</button>
				</div>
			</div>
		);
	}
}

export default LeaderBoardCard;
