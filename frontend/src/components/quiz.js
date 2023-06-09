import '../css/quiz.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Quiz page */
function Quiz(){
    const [messageAlert, setMessageAlert] = useState("");
    const [genre, setGenre] = useState("");
    const [answers, setAnswers] = useState({
        group1: '',
        group2: '',
        group3: '',
        group4: '',
        group5: ''
    });

    let navigate = useNavigate(); 

    const handleQuizSubmit = () => {
        // Check if any question is unanswered
        if (Object.values(answers).some(value => value === '')) {
            setMessageAlert("Please answer all the questions.");
            return;
        }

        // Determine the recommended genre based on the ratings
        const { group1, group2, group3, group4, group5 } = answers;
        
        let genreChoice;

        /* Subjective recommendation */
        if (group1 >= 4 && group2 >= 3 && group3 >= 3) {
            genreChoice = "Progressive Rock";
        } else if (group2 >= 4 && group4 >= 4) {
            genreChoice = "Rap";
        } else if (group2 <= 2 && group3 <= 2 && group4 <= 2) {
            genreChoice = "Classical Music";
        } else if (group1 >= 3 && group4 >= 3 && group5 >= 3) {
            genreChoice = "Alternative Rock";
        } else if (group1 <= 2 && group4 <= 2 && group5 <= 2) {
            genreChoice = "Jazz";
        } else {
            genreChoice = "Pop";
        }

        setGenre(genreChoice);
        setMessageAlert(`${genreChoice} could be a very good genre for you. Check these albums!`);
    };

    const storeRedirect = () => {
        navigate(`/store?genre=${encodeURIComponent(genre.toLowerCase())}`);
        window.scrollTo(0, 0);
    }

    const handleAnswerChange = (question, value) => {
        setAnswers(prevAnswers => ({...prevAnswers, [question]: value
        }));
    };

    return (
        <div className="quiz-page">
            <div class="layer">
                <div class="quiz">
                    <div class="title"> Quiz </div>
                    <div class="description"> Rate from 1 to 5 each one of the following descriptions: </div>
                    
                    <div id="question1">
                        <div class="question-text"> Your mood today </div>
                        <div class="question-options">
                            <input type="radio" name="group1" id="q1_1" value="1" onChange={(e) => handleAnswerChange('group1', parseInt(e.target.value))} />
                            <label for="q1_1">1</label>
                            <input type="radio" name="group1" id="q1_2" value="2" onChange={(e) => handleAnswerChange('group1', parseInt(e.target.value))} />
                            <label for="q1_2">2</label>
                            <input type="radio" name="group1" id="q1_3" value="3" onChange={(e) => handleAnswerChange('group1', parseInt(e.target.value))} />
                            <label for="q1_3">3</label>
                            <input type="radio" name="group1" id="q1_4" value="4" onChange={(e) => handleAnswerChange('group1', parseInt(e.target.value))} />
                            <label for="q1_4">4</label>
                            <input type="radio" name="group1" id="q1_5" value="5" onChange={(e) => handleAnswerChange('group1', parseInt(e.target.value))} />
                            <label for="q1_5">5</label>
                        </div>
                    </div>

                    <div id="question2">
                        <div class="question-text"> Importance of song's lyrics to you </div>
                        <div class="question-options">
                            <input type="radio" name="group2" id="q2_1" value="1" onChange={(e) => handleAnswerChange('group2', parseInt(e.target.value))} />
                            <label for="q2_1">1</label>
                            <input type="radio" name="group2" id="q2_2" value="2" onChange={(e) => handleAnswerChange('group2', parseInt(e.target.value))} />
                            <label for="q2_2">2</label>
                            <input type="radio" name="group2" id="q2_3" value="3" onChange={(e) => handleAnswerChange('group2', parseInt(e.target.value))} />
                            <label for="q2_3">3</label>
                            <input type="radio" name="group2" id="q2_4" value="4" onChange={(e) => handleAnswerChange('group2', parseInt(e.target.value))} />
                            <label for="q2_4">4</label>
                            <input type="radio" name="group2" id="q2_5" value="5" onChange={(e) => handleAnswerChange('group2', parseInt(e.target.value))} />
                            <label for="q2_5">5</label>
                        </div>
                    </div>

                    <div id="question3">
                        <div class="question-text"> Comfortable with long songs  </div>
                        <div class="question-options">
                            <input type="radio" name="group3" id="q3_1" value="1" onChange={(e) => handleAnswerChange('group3', parseInt(e.target.value))} />
                            <label for="q3_1">1</label>
                            <input type="radio" name="group3" id="q3_2" value="2" onChange={(e) => handleAnswerChange('group3', parseInt(e.target.value))} />
                            <label for="q3_2">2</label>
                            <input type="radio" name="group3" id="q3_3" value="3" onChange={(e) => handleAnswerChange('group3', parseInt(e.target.value))} />
                            <label for="q3_3">3</label>
                            <input type="radio" name="group3" id="q3_4" value="4" onChange={(e) => handleAnswerChange('group3', parseInt(e.target.value))} />
                            <label for="q3_4">4</label>
                            <input type="radio" name="group3" id="q3_5" value="5" onChange={(e) => handleAnswerChange('group3', parseInt(e.target.value))} />
                            <label for="q3_5">5</label>
                        </div>
                    </div>

                    <div id="question4">
                        <div class="question-text"> Constantly dancing to songs  </div>
                        <div class="question-options">
                            <input type="radio" name="group4" id="q4_1" value="1" onChange={(e) => handleAnswerChange('group4', parseInt(e.target.value))} />
                            <label for="q4_1">1</label>
                            <input type="radio" name="group4" id="q4_2" value="2" onChange={(e) => handleAnswerChange('group4', parseInt(e.target.value))} />
                            <label for="q4_2">2</label>
                            <input type="radio" name="group4" id="q4_3" value="3" onChange={(e) => handleAnswerChange('group4', parseInt(e.target.value))} />
                            <label for="q4_3">3</label>
                            <input type="radio" name="group4" id="q4_4" value="4" onChange={(e) => handleAnswerChange('group4', parseInt(e.target.value))} />
                            <label for="q4_4">4</label>
                            <input type="radio" name="group4" id="q4_5" value="5" onChange={(e) => handleAnswerChange('group4', parseInt(e.target.value))} />
                            <label for="q4_5">5</label>
                        </div>
                    </div>

                    <div id="question5">
                        <div class="question-text"> Like virtuoso artists  </div>
                        <div class="question-options">
                            <input type="radio" name="group5" id="q5_1" value="1" onChange={(e) => handleAnswerChange('group5', parseInt(e.target.value))} />
                            <label for="q5_1">1</label>
                            <input type="radio" name="group5" id="q5_2" value="2" onChange={(e) => handleAnswerChange('group5', parseInt(e.target.value))} />
                            <label for="q5_2">2</label>
                            <input type="radio" name="group5" id="q5_3" value="3" onChange={(e) => handleAnswerChange('group5', parseInt(e.target.value))} />
                            <label for="q5_3">3</label>
                            <input type="radio" name="group5" id="q5_4" value="4" onChange={(e) => handleAnswerChange('group5', parseInt(e.target.value))} />
                            <label for="q5_4">4</label>
                            <input type="radio" name="group5" id="q5_5" value="5" onChange={(e) => handleAnswerChange('group5', parseInt(e.target.value))} />
                            <label for="q5_5">5</label>
                        </div>
                    </div>

                    <button id="quiz-btn" onClick={handleQuizSubmit}>Send</button>
                </div>
            </div>
            {messageAlert && (
                <div className="overlay">
                    <div className="alert-content">
                        <div className="message">{messageAlert}</div>
                        <button onClick={() => genre ? storeRedirect() : setMessageAlert("")}> OK </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Quiz;