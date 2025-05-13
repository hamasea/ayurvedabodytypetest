/**
 * アーユルヴェーダ体質診断のメインアプリケーションロジック
 */

// グローバル変数
const app = {
    currentSection: 'home',
    questionsPerPage: 5,
    currentPage: {
        prakriti: 0,
        vikriti: 0
    },
    answers: {
        prakriti: {},
        vikriti: {}
    }
};

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // 初期化
    initApp();
});

/**
 * アプリケーションを初期化する
 */
function initApp() {
    // イベントリスナーの設定
    setupEventListeners();
    
    // 診断結果をリセット
    resetDiagnosis();
    
    // 質問をシャッフル
    shuffledPrakritiQuestions = shuffleArray(prakritiQuestions);
    shuffledVikritiQuestions = shuffleArray(vikritiQuestions);
}

/**
 * イベントリスナーを設定する
 */
function setupEventListeners() {
    // ホーム画面の「診断を始める」ボタン
    document.getElementById('start-button').addEventListener('click', function() {
        navigateTo('prakriti-test');
        setupPrakritiQuestions();
        updateProgressBar(0);
    });
    
    // プラクリティ診断の「前へ」ボタン
    document.getElementById('prakriti-prev').addEventListener('click', function() {
        if (app.currentPage.prakriti > 0) {
            app.currentPage.prakriti--;
            showPrakritiQuestions();
            updateProgressBar(calculateProgress('prakriti'));
        }
    });
    
    // プラクリティ診断の「次へ」ボタン
    document.getElementById('prakriti-next').addEventListener('click', function() {
        // 現在のページの質問に回答しているか確認
        if (validateCurrentPrakritiPage()) {
            const totalPages = Math.ceil(shuffledPrakritiQuestions.length / app.questionsPerPage);
            
            if (app.currentPage.prakriti < totalPages - 1) {
                // 次のページへ
                app.currentPage.prakriti++;
                showPrakritiQuestions();
                updateProgressBar(calculateProgress('prakriti'));
            } else {
                // 診断結果へ
                processPrakritiResults();
            }
        } else {
            alert('すべての質問に回答してください。');
        }
    });
    
    // プラクリティ結果画面の「ヴィクリティ診断を行う」ボタン
    document.getElementById('start-vikriti').addEventListener('click', function() {
        navigateTo('vikriti-test');
        setupVikritiQuestions();
        updateProgressBar(0);
    });
    
    // プラクリティ結果画面の「診断を終了する」ボタン
    document.getElementById('finish-prakriti').addEventListener('click', function() {
        navigateTo('home');
        document.getElementById('progress-container').style.display = 'none';
    });
    
    // ヴィクリティ診断の「前へ」ボタン
    document.getElementById('vikriti-prev').addEventListener('click', function() {
        if (app.currentPage.vikriti > 0) {
            app.currentPage.vikriti--;
            showVikritiQuestions();
            updateProgressBar(calculateProgress('vikriti'));
        }
    });
    
    // ヴィクリティ診断の「次へ」ボタン
    document.getElementById('vikriti-next').addEventListener('click', function() {
        // 現在のページの質問に回答しているか確認
        if (validateCurrentVikritiPage()) {
            const totalPages = Math.ceil(shuffledVikritiQuestions.length / app.questionsPerPage);
            
            if (app.currentPage.vikriti < totalPages - 1) {
                // 次のページへ
                app.currentPage.vikriti++;
                showVikritiQuestions();
                updateProgressBar(calculateProgress('vikriti'));
            } else {
                // 診断結果へ
                processVikritiResults();
            }
        } else {
            alert('すべての質問に回答してください。');
        }
    });
    
    // 総合結果画面の「もう一度診断する」ボタン
    document.getElementById('restart').addEventListener('click', function() {
        resetApp();
        navigateTo('home');
    });
}

/**
 * 指定したセクションに移動する
 * @param {string} sectionId - 移動先のセクションID
 */
function navigateTo(sectionId) {
    // 現在のセクションを非アクティブにする
    document.getElementById(app.currentSection).classList.remove('active');
    
    // 新しいセクションをアクティブにする
    document.getElementById(sectionId).classList.add('active');
    
    // 現在のセクションを更新
    app.currentSection = sectionId;
    
    // プログレスバーの表示/非表示を切り替え
    const progressContainer = document.getElementById('progress-container');
    if (sectionId === 'prakriti-test' || sectionId === 'vikriti-test') {
        progressContainer.style.display = 'block';
    } else {
        progressContainer.style.display = 'none';
    }
    
    // ページの先頭にスクロール
    window.scrollTo(0, 0);
}

/**
 * プラクリティ診断の質問を設定する
 */
function setupPrakritiQuestions() {
    app.currentPage.prakriti = 0;
    showPrakritiQuestions();
}

/**
 * ヴィクリティ診断の質問を設定する
 */
function setupVikritiQuestions() {
    app.currentPage.vikriti = 0;
    showVikritiQuestions();
}

/**
 * プラクリティ診断の質問を表示する
 */
function showPrakritiQuestions() {
    const container = document.getElementById('prakriti-questions');
    container.innerHTML = '';
    
    const startIndex = app.currentPage.prakriti * app.questionsPerPage;
    const endIndex = Math.min(startIndex + app.questionsPerPage, shuffledPrakritiQuestions.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const question = shuffledPrakritiQuestions[i];
        const questionHtml = createQuestionHtml(question, 'prakriti', 5);
        container.innerHTML += questionHtml;
    }
    
    // 保存されている回答を復元
    restoreAnswers('prakriti');
}

/**
 * ヴィクリティ診断の質問を表示する
 */
function showVikritiQuestions() {
    const container = document.getElementById('vikriti-questions');
    container.innerHTML = '';
    
    const startIndex = app.currentPage.vikriti * app.questionsPerPage;
    const endIndex = Math.min(startIndex + app.questionsPerPage, shuffledVikritiQuestions.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const question = shuffledVikritiQuestions[i];
        const questionHtml = createQuestionHtml(question, 'vikriti', 5);
        container.innerHTML += questionHtml;
    }
    
    // 保存されている回答を復元
    restoreAnswers('vikriti');
}

/**
 * 質問のHTMLを作成する
 * @param {Object} question - 質問オブジェクト
 * @param {string} type - 診断タイプ（'prakriti'または'vikriti'）
 * @param {number} maxValue - 最大評価値
 * @returns {string} 質問のHTML
 */
function createQuestionHtml(question, type, maxValue) {
    let html = `
        <div class="question-item">
            <div class="question-text">${question.text}</div>
            <div class="options">
    `;
    
    // 評価オプションを生成（逆順に表示）
    const optionTexts = type === 'prakriti' 
        ? ['当てはまる', 'まあまあ当てはまる', 'どちらともいえない', 'あまり当てはまらない', '当てはまらない']
        : ['当てはまる', 'まあまあ当てはまる', 'どちらともいえない', 'あまり当てはまらない', '当てはまらない'];
    
    // 値も逆順に設定
    for (let i = 0; i < maxValue; i++) {
        const value = type === 'prakriti' 
            ? maxValue - i  // 5,4,3,2,1
            : maxValue - i;  // 4,3,2,1,0
        
        const optionText = optionTexts[i] || '';
        const intensityClass = `intensity-${i}`;
        
        html += `
            <label class="option-label ${intensityClass}">
                <input type="radio" name="${question.id}" value="${value}" data-type="${type}">
                <span class="option-text">${optionText}</span>
            </label>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

/**
 * 保存されている回答を復元する
 * @param {string} type - 診断タイプ（'prakriti'または'vikriti'）
 */
function restoreAnswers(type) {
    const answers = app.answers[type];
    
    for (const questionId in answers) {
        const value = answers[questionId];
        const radioButton = document.querySelector(`input[name="${questionId}"][value="${value}"]`);
        
        if (radioButton) {
            radioButton.checked = true;
        }
    }
    
    // ラジオボタンの変更イベントを設定
    const radioButtons = document.querySelectorAll(`input[type="radio"][data-type="${type}"]`);
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const questionId = this.name;
            const value = this.value;
            
            app.answers[type][questionId] = value;
        });
    });
}

/**
 * 現在のプラクリティページの回答を検証する
 * @returns {boolean} すべての質問に回答されているかどうか
 */
function validateCurrentPrakritiPage() {
    const startIndex = app.currentPage.prakriti * app.questionsPerPage;
    const endIndex = Math.min(startIndex + app.questionsPerPage, shuffledPrakritiQuestions.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const question = shuffledPrakritiQuestions[i];
        
        if (!app.answers.prakriti[question.id]) {
            return false;
        }
    }
    
    return true;
}

/**
 * 現在のヴィクリティページの回答を検証する
 * @returns {boolean} すべての質問に回答されているかどうか
 */
function validateCurrentVikritiPage() {
    const startIndex = app.currentPage.vikriti * app.questionsPerPage;
    const endIndex = Math.min(startIndex + app.questionsPerPage, shuffledVikritiQuestions.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const question = shuffledVikritiQuestions[i];
        
        if (!app.answers.vikriti[question.id]) {
            return false;
        }
    }
    
    return true;
}

/**
 * 進行状況を計算する
 * @param {string} type - 診断タイプ（'prakriti'または'vikriti'）
 * @returns {number} 進行状況（0〜100）
 */
function calculateProgress(type) {
    const questions = type === 'prakriti' ? shuffledPrakritiQuestions : shuffledVikritiQuestions;
    const currentPage = app.currentPage[type];
    const totalPages = Math.ceil(questions.length / app.questionsPerPage);
    
    return Math.round((currentPage / (totalPages - 1)) * 100);
}

/**
 * 進行状況バーを更新する
 * @param {number} progress - 進行状況（0〜100）
 */
function updateProgressBar(progress) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
}

/**
 * プラクリティ診断結果を処理する
 */
function processPrakritiResults() {
    // 診断結果を計算
    const results = processPrakritiAnswers(app.answers.prakriti);
    
    // 結果を表示
    displayPrakritiResults(results);
    
    // 結果ページに移動
    navigateTo('prakriti-result');
}

/**
 * ヴィクリティ診断結果を処理する
 */
function processVikritiResults() {
    // 診断結果を計算
    const results = processVikritiAnswers(app.answers.vikriti);
    
    // 結果を表示
    displayFinalResults();
    
    // 結果ページに移動
    navigateTo('final-result');
}

/**
 * プラクリティ診断結果を表示する
 * @param {Object} results - プラクリティ診断結果
 */
function displayPrakritiResults(results) {
    // ドーシャタイプを表示
    const doshaTypeName = getDoshaTypeName(results.dominant);
    document.getElementById('prakriti-dosha-type').textContent = `あなたの体質タイプ: ${doshaTypeName}`;
    
    // ドーシャの説明を表示
    const descriptionElement = document.getElementById('prakriti-description');
    
    // ドーシャのバランスを％で表示
    const balanceHtml = `
        <div class="dosha-balance">
            <p><strong>ドーシャバランス:</strong></p>
            <ul>
                <li><span class="vata-color">■</span> ヴァータ: ${results.percentage.vata}%</li>
                <li><span class="pitta-color">■</span> ピッタ: ${results.percentage.pitta}%</li>
                <li><span class="kapha-color">■</span> カパ: ${results.percentage.kapha}%</li>
            </ul>
        </div>
    `;
    
    descriptionElement.innerHTML = balanceHtml + getDoshaDescription(results.dominant);
    
    // ドーシャタイプに応じたクラスを追加
    const resultTextElement = document.querySelector('#prakriti-result .result-text');
    
    // 既存のドーシャタイプクラスを削除
    resultTextElement.classList.remove('vata-type', 'pitta-type', 'kapha-type', 'vata-pitta-type', 'pitta-kapha-type', 'vata-kapha-type', 'tridosha-type');
    
    // 新しいドーシャタイプクラスを追加
    switch(results.dominant) {
        case 'vata':
            resultTextElement.classList.add('vata-type');
            break;
        case 'pitta':
            resultTextElement.classList.add('pitta-type');
            break;
        case 'kapha':
            resultTextElement.classList.add('kapha-type');
            break;
        case 'vata-pitta':
            resultTextElement.classList.add('vata-pitta-type');
            break;
        case 'pitta-kapha':
            resultTextElement.classList.add('pitta-kapha-type');
            break;
        case 'vata-kapha':
            resultTextElement.classList.add('vata-kapha-type');
            break;
        case 'tridosha':
            resultTextElement.classList.add('tridosha-type');
            break;
    }
    
    // グラフを描画
    drawPrakritiChart(results);
}

/**
 * 総合診断結果を表示する
 */
function displayFinalResults() {
    const diagnosisResults = getDiagnosisResults();
    const prakritiResults = diagnosisResults.prakriti;
    const vikritiResults = diagnosisResults.vikriti;
    
    // ドーシャタイプを表示
    const doshaTypeName = getDoshaTypeName(vikritiResults.dominant);
    document.getElementById('vikriti-dosha-type').textContent = `現在の体質タイプ: ${doshaTypeName}`;
    
    // ドーシャの説明を表示
    const descriptionElement = document.getElementById('vikriti-description');
    
    // ドーシャのバランスを％で表示
    const balanceHtml = `
        <div class="dosha-balance">
            <p><strong>現在のドーシャバランス:</strong></p>
            <ul>
                <li><span class="vata-color">■</span> ヴァータ: ${vikritiResults.percentage.vata}%</li>
                <li><span class="pitta-color">■</span> ピッタ: ${vikritiResults.percentage.pitta}%</li>
                <li><span class="kapha-color">■</span> カパ: ${vikritiResults.percentage.kapha}%</li>
            </ul>
        </div>
    `;
    
    descriptionElement.innerHTML = balanceHtml + getDoshaDescription(vikritiResults.dominant);
    
    // ドーシャタイプに応じたクラスを追加
    const resultTextElement = document.querySelector('#final-result .result-text');
    
    // 既存のドーシャタイプクラスを削除
    resultTextElement.classList.remove('vata-type', 'pitta-type', 'kapha-type', 'vata-pitta-type', 'pitta-kapha-type', 'vata-kapha-type', 'tridosha-type');
    
    // 新しいドーシャタイプクラスを追加
    switch(vikritiResults.dominant) {
        case 'vata':
            resultTextElement.classList.add('vata-type');
            break;
        case 'pitta':
            resultTextElement.classList.add('pitta-type');
            break;
        case 'kapha':
            resultTextElement.classList.add('kapha-type');
            break;
        case 'vata-pitta':
            resultTextElement.classList.add('vata-pitta-type');
            break;
        case 'pitta-kapha':
            resultTextElement.classList.add('pitta-kapha-type');
            break;
        case 'vata-kapha':
            resultTextElement.classList.add('vata-kapha-type');
            break;
        case 'tridosha':
            resultTextElement.classList.add('tridosha-type');
            break;
    }
    
    // バランス分析を表示
    const imbalance = analyzeImbalance();
    document.getElementById('balance-analysis').innerHTML = generateBalanceAnalysis(imbalance);
    
    // 健康アドバイスを表示
    document.getElementById('health-advice').innerHTML = generateHealthAdvice(imbalance);
    
    // グラフを描画
    drawPrakritiFinalChart(prakritiResults);
    drawVikritiChart(vikritiResults);
}

/**
 * アプリケーションをリセットする
 */
function resetApp() {
    // 診断結果をリセット
    resetDiagnosis();
    
    // 回答をリセット
    app.answers = {
        prakriti: {},
        vikriti: {}
    };
    
    // ページをリセット
    app.currentPage = {
        prakriti: 0,
        vikriti: 0
    };
    
    // 質問を再シャッフル
    shuffledPrakritiQuestions = shuffleArray(prakritiQuestions);
    shuffledVikritiQuestions = shuffleArray(vikritiQuestions);
}

/**
 * 配列をシャッフルする
 * @param {Array} array - シャッフルする配列
 * @returns {Array} シャッフルされた配列
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
