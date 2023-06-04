import '../css/quiz.css';
import React from 'react';

function Quiz(){

    return (
        <div className="quiz-page">
            <div class="layer">
                <div class="quiz">
                    <div class="title"> Quiz </div>
                    <div class="description"> Rate from 1 to 5 each one of the following descriptions: </div>
                    
                    <div id="question1">
                        <div class="question-text"> Your mood today </div>
                        <div class="question-options">
                            <input type="radio" name="group1" id="q1_1" value="1" />
                            <label for="q1_1">1</label>
                            <input type="radio" name="group1" id="q1_2" value="2" />
                            <label for="q1_2">2</label>
                            <input type="radio" name="group1" id="q1_3" value="3" />
                            <label for="q1_3">3</label>
                            <input type="radio" name="group1" id="q1_4" value="4" />
                            <label for="q1_4">4</label>
                            <input type="radio" name="group1" id="q1_5" value="5" />
                            <label for="q1_5">5</label>
                        </div>
                    </div>

                    <div id="question2">
                        <div class="question-text"> Importance of song's lyrics to you </div>
                        <div class="question-options">
                            <input type="radio" name="group2" id="q2_1" value="1" />
                            <label for="q2_1">1</label>
                            <input type="radio" name="group2" id="q2_2" value="2" />
                            <label for="q2_2">2</label>
                            <input type="radio" name="group2" id="q2_3" value="3" />
                            <label for="q2_3">3</label>
                            <input type="radio" name="group2" id="q2_4" value="4" />
                            <label for="q2_4">4</label>
                            <input type="radio" name="group2" id="q2_5" value="5" />
                            <label for="q2_5">5</label>
                        </div>
                    </div>

                    <div id="question3">
                        <div class="question-text"> Comfortable with long songs  </div>
                        <div class="question-options">
                            <input type="radio" name="group3" id="q3_1" value="1" />
                            <label for="q3_1">1</label>
                            <input type="radio" name="group3" id="q3_2" value="2" />
                            <label for="q3_2">2</label>
                            <input type="radio" name="group3" id="q3_3" value="3" />
                            <label for="q3_3">3</label>
                            <input type="radio" name="group3" id="q3_4" value="4" />
                            <label for="q3_4">4</label>
                            <input type="radio" name="group3" id="q3_5" value="5" />
                            <label for="q3_5">5</label>
                        </div>
                    </div>

                    <div id="question4">
                        <div class="question-text"> Constantly dancing to songs  </div>
                        <div class="question-options">
                            <input type="radio" name="group4" id="q4_1" value="1" />
                            <label for="q4_1">1</label>
                            <input type="radio" name="group4" id="q4_2" value="2" />
                            <label for="q4_2">2</label>
                            <input type="radio" name="group4" id="q4_3" value="3" />
                            <label for="q4_3">3</label>
                            <input type="radio" name="group4" id="q4_4" value="4" />
                            <label for="q4_4">4</label>
                            <input type="radio" name="group4" id="q4_5" value="5" />
                            <label for="q4_5">5</label>
                        </div>
                    </div>

                    <div id="question5">
                        <div class="question-text"> Like virtuoso artists  </div>
                        <div class="question-options">
                            <input type="radio" name="group5" id="q5_1" value="1" />
                            <label for="q5_1">1</label>
                            <input type="radio" name="group5" id="q5_2" value="2" />
                            <label for="q5_2">2</label>
                            <input type="radio" name="group5" id="q5_3" value="3" />
                            <label for="q5_3">3</label>
                            <input type="radio" name="group5" id="q5_4" value="4" />
                            <label for="q5_4">4</label>
                            <input type="radio" name="group5" id="q5_5" value="5" />
                            <label for="q5_5">5</label>
                        </div>
                    </div>

                    <button id="quiz-btn">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Quiz;