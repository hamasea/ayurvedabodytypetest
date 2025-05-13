/**
 * アーユルヴェーダ体質診断のロジック
 */

// 診断結果を保存するオブジェクト
const diagnosisResults = {
    prakriti: {
        vata: 0,
        pitta: 0,
        kapha: 0,
        total: 0,
        dominant: '',
        percentage: {
            vata: 0,
            pitta: 0,
            kapha: 0
        }
    },
    vikriti: {
        vata: 0,
        pitta: 0,
        kapha: 0,
        total: 0,
        dominant: '',
        percentage: {
            vata: 0,
            pitta: 0,
            kapha: 0
        }
    },
    completed: {
        prakriti: false,
        vikriti: false
    }
};

/**
 * プラクリティ診断の回答を処理する
 * @param {Object} answers - 質問IDと回答値のマッピング
 */
function processPrakritiAnswers(answers) {
    // スコアをリセット
    diagnosisResults.prakriti.vata = 0;
    diagnosisResults.prakriti.pitta = 0;
    diagnosisResults.prakriti.kapha = 0;
    diagnosisResults.prakriti.total = 0;
    
    // 各質問の回答を集計
    prakritiQuestions.forEach(question => {
        const answer = parseInt(answers[question.id] || 0);
        
        // ドーシャに応じてスコアを加算
        if (question.dosha === 'vata') {
            diagnosisResults.prakriti.vata += answer;
        } else if (question.dosha === 'pitta') {
            diagnosisResults.prakriti.pitta += answer;
        } else if (question.dosha === 'kapha') {
            diagnosisResults.prakriti.kapha += answer;
        }
    });
    
    // 合計スコアを計算
    diagnosisResults.prakriti.total = 
        diagnosisResults.prakriti.vata + 
        diagnosisResults.prakriti.pitta + 
        diagnosisResults.prakriti.kapha;
    
    // パーセンテージを計算
    if (diagnosisResults.prakriti.total > 0) {
        diagnosisResults.prakriti.percentage.vata = Math.round((diagnosisResults.prakriti.vata / diagnosisResults.prakriti.total) * 100);
        diagnosisResults.prakriti.percentage.pitta = Math.round((diagnosisResults.prakriti.pitta / diagnosisResults.prakriti.total) * 100);
        diagnosisResults.prakriti.percentage.kapha = Math.round((diagnosisResults.prakriti.kapha / diagnosisResults.prakriti.total) * 100);
    }
    
    // 優勢なドーシャを判定
    diagnosisResults.prakriti.dominant = getDominantDosha(
        diagnosisResults.prakriti.vata,
        diagnosisResults.prakriti.pitta,
        diagnosisResults.prakriti.kapha
    );
    
    // 診断完了フラグを設定
    diagnosisResults.completed.prakriti = true;
    
    return diagnosisResults.prakriti;
}

/**
 * ヴィクリティ診断の回答を処理する
 * @param {Object} answers - 質問IDと回答値のマッピング
 */
function processVikritiAnswers(answers) {
    // スコアをリセット
    diagnosisResults.vikriti.vata = 0;
    diagnosisResults.vikriti.pitta = 0;
    diagnosisResults.vikriti.kapha = 0;
    diagnosisResults.vikriti.total = 0;
    
    // 各質問の回答を集計
    vikritiQuestions.forEach(question => {
        const answer = parseInt(answers[question.id] || 0);
        
        // ドーシャに応じてスコアを加算
        if (question.dosha === 'vata') {
            diagnosisResults.vikriti.vata += answer;
        } else if (question.dosha === 'pitta') {
            diagnosisResults.vikriti.pitta += answer;
        } else if (question.dosha === 'kapha') {
            diagnosisResults.vikriti.kapha += answer;
        }
    });
    
    // 合計スコアを計算
    diagnosisResults.vikriti.total = 
        diagnosisResults.vikriti.vata + 
        diagnosisResults.vikriti.pitta + 
        diagnosisResults.vikriti.kapha;
    
    // パーセンテージを計算
    if (diagnosisResults.vikriti.total > 0) {
        diagnosisResults.vikriti.percentage.vata = Math.round((diagnosisResults.vikriti.vata / diagnosisResults.vikriti.total) * 100);
        diagnosisResults.vikriti.percentage.pitta = Math.round((diagnosisResults.vikriti.pitta / diagnosisResults.vikriti.total) * 100);
        diagnosisResults.vikriti.percentage.kapha = Math.round((diagnosisResults.vikriti.kapha / diagnosisResults.vikriti.total) * 100);
    }
    
    // 優勢なドーシャを判定
    diagnosisResults.vikriti.dominant = getDominantDosha(
        diagnosisResults.vikriti.vata,
        diagnosisResults.vikriti.pitta,
        diagnosisResults.vikriti.kapha
    );
    
    // 診断完了フラグを設定
    diagnosisResults.completed.vikriti = true;
    
    return diagnosisResults.vikriti;
}

/**
 * 優勢なドーシャを判定する
 * @param {number} vata - ヴァータのスコア
 * @param {number} pitta - ピッタのスコア
 * @param {number} kapha - カパのスコア
 * @returns {string} 優勢なドーシャまたは複合体質
 */
function getDominantDosha(vata, pitta, kapha) {
    const scores = [
        { dosha: 'vata', score: vata },
        { dosha: 'pitta', score: pitta },
        { dosha: 'kapha', score: kapha }
    ];
    
    // スコアの降順でソート
    scores.sort((a, b) => b.score - a.score);
    
    // 45点以上のドーシャをカウント
    const highScores = scores.filter(item => item.score >= 45);
    
    if (highScores.length === 3) {
        // 全てのドーシャが45点以上ならトリドーシャ
        return 'tridosha';
    } else if (highScores.length === 2) {
        // 2つのドーシャが45点以上なら複合体質
        // ドーシャの順序を標準化（vataを常に最初に、次にpitta、最後にkapha）
        const hasVata = highScores.some(item => item.dosha === 'vata');
        const hasPitta = highScores.some(item => item.dosha === 'pitta');
        const hasKapha = highScores.some(item => item.dosha === 'kapha');
        
        if (hasVata && hasPitta) {
            return 'vata-pitta';
        } else if (hasVata && hasKapha) {
            return 'vata-kapha';
        } else if (hasPitta && hasKapha) {
            return 'pitta-kapha';
        }
    } else {
        // それ以外の場合は最高スコアのドーシャ
        return scores[0].dosha;
    }
}

/**
 * プラクリティとヴィクリティの差異を分析する
 * @returns {Object} 差異分析結果
 */
function analyzeImbalance() {
    if (!diagnosisResults.completed.prakriti || !diagnosisResults.completed.vikriti) {
        return null;
    }
    
    const imbalance = {
        vata: diagnosisResults.vikriti.percentage.vata - diagnosisResults.prakriti.percentage.vata,
        pitta: diagnosisResults.vikriti.percentage.pitta - diagnosisResults.prakriti.percentage.pitta,
        kapha: diagnosisResults.vikriti.percentage.kapha - diagnosisResults.prakriti.percentage.kapha,
        mostImbalanced: ''
    };
    
    // 最も不均衡なドーシャを特定
    const absImbalances = [
        { dosha: 'vata', value: Math.abs(imbalance.vata) },
        { dosha: 'pitta', value: Math.abs(imbalance.pitta) },
        { dosha: 'kapha', value: Math.abs(imbalance.kapha) }
    ];
    
    absImbalances.sort((a, b) => b.value - a.value);
    imbalance.mostImbalanced = absImbalances[0].dosha;
    
    return imbalance;
}

/**
 * ドーシャの説明を取得する
 * @param {string} doshaType - ドーシャタイプ
 * @returns {string} ドーシャの説明HTML
 */
function getDoshaDescription(doshaType) {
    // ドーシャの順序を標準化（例：pitta-vata → vata-pitta）
    let normalizedType = doshaType;
    
    // 複合体質の場合、ドーシャの順序を標準化
    if (doshaType === 'pitta-vata') {
        normalizedType = 'vata-pitta';
    } else if (doshaType === 'kapha-vata') {
        normalizedType = 'vata-kapha';
    } else if (doshaType === 'kapha-pitta') {
        normalizedType = 'pitta-kapha';
    }
    
    const descriptions = {
        vata: `
            <p><strong>ヴァータ優勢の特徴：</strong></p>
            <ul>
                <li>創造的で活発な性質</li>
                <li>柔軟性があり、変化に適応しやすい</li>
                <li>素早く学習するが、忘れるのも早い</li>
                <li>体格は細身で、体重が増えにくい</li>
                <li>肌は乾燥しやすく、冷えやすい</li>
                <li>睡眠は浅く、不規則になりがち</li>
                <li>エネルギーは変動しやすい</li>
            </ul>
        `,
        pitta: `
            <p><strong>ピッタ優勢の特徴：</strong></p>
            <ul>
                <li>知的で鋭い判断力を持つ</li>
                <li>集中力と記憶力に優れている</li>
                <li>情熱的で目標志向</li>
                <li>体格は中肉中背で筋肉質</li>
                <li>体温が高く、暑さに弱い</li>
                <li>消化力が強く、食欲旺盛</li>
                <li>計画的で組織的</li>
            </ul>
        `,
        kapha: `
            <p><strong>カパ優勢の特徴：</strong></p>
            <ul>
                <li>安定した穏やかな性質</li>
                <li>忍耐強く、落ち着いている</li>
                <li>学習はゆっくりだが、長期記憶に優れる</li>
                <li>体格はがっしりしており、筋肉質または丸み</li>
                <li>肌はしっとりして滑らか</li>
                <li>睡眠は深く、長い</li>
                <li>体力と持久力がある</li>
            </ul>
        `,
        'vata-pitta': `
            <p><strong>ヴァータ・ピッタ複合体質の特徴：</strong></p>
            <ul>
                <li>創造的かつ知的</li>
                <li>活発で情熱的</li>
                <li>適応力があり、多才</li>
                <li>体格は細身から中肉</li>
                <li>変化に富んだエネルギーパターン</li>
                <li>消化力は変動しやすい</li>
                <li>熱と冷えの両方に敏感</li>
            </ul>
        `,
        'pitta-kapha': `
            <p><strong>ピッタ・カパ複合体質の特徴：</strong></p>
            <ul>
                <li>安定した知性と判断力</li>
                <li>忍耐強く、目標志向</li>
                <li>体格は中肉からがっしり</li>
                <li>筋肉質で力強い</li>
                <li>消化力が良好で安定</li>
                <li>感情的に安定しているが、ストレスがたまると怒りっぽくなる</li>
                <li>記憶力と集中力に優れる</li>
            </ul>
        `,
        'vata-kapha': `
            <p><strong>ヴァータ・カパ複合体質の特徴：</strong></p>
            <ul>
                <li>創造的で穏やか</li>
                <li>直感的で思いやりがある</li>
                <li>体格は変動しやすい</li>
                <li>エネルギーレベルは変動する</li>
                <li>冷えに敏感</li>
                <li>消化力は不規則だが、安定期もある</li>
                <li>感情は変動するが、基本的に穏やか</li>
            </ul>
        `,
        tridosha: `
            <p><strong>トリドーシャ（三体質バランス）の特徴：</strong></p>
            <ul>
                <li>三つのドーシャがバランスよく存在</li>
                <li>適応力があり、多面的な性質</li>
                <li>状況に応じて異なる特性を発揮できる</li>
                <li>体格は平均的</li>
                <li>健康状態が比較的安定している</li>
                <li>バランスの取れた性格</li>
                <li>環境の変化に対応しやすい</li>
            </ul>
        `
    };
    
    // デバッグ用にdoshaTypeの値をコンソールに出力
    console.log('説明取得 - 元のドーシャタイプ:', doshaType);
    console.log('説明取得 - 正規化されたドーシャタイプ:', normalizedType);
    
    return descriptions[normalizedType] || `体質タイプ「${doshaType}」の情報がありません。`;
}

/**
 * 健康アドバイスを生成する
 * @param {Object} imbalance - 不均衡分析結果
 * @returns {string} 健康アドバイスHTML
 */
function generateHealthAdvice(imbalance) {
    if (!imbalance) return '';
    
    let advice = '<p>あなたの現在の体調を改善するためのアドバイス：</p>';
    
    advice += '<h4>鎮静療法──日常生活におけるコントロール</h4>';
    
    // 各ドーシャの状態を確認
    const vataImbalance = imbalance.vata > 10;
    const pittaImbalance = imbalance.pitta > 10;
    const kaphaImbalance = imbalance.kapha > 10;
    const isBalanced = Math.abs(imbalance.vata) <= 10 && Math.abs(imbalance.pitta) <= 10 && Math.abs(imbalance.kapha) <= 10;
    
    // 乱れているドーシャがない場合のメッセージ
    if (isBalanced) {
        advice += `
            <div class="advice-section">
                <h5>現在のバランスを維持するために</h5>
                <p>現在のドーシャバランスは良好です。このバランスを維持するための習慣を続けましょう。</p>
                <ul>
                    <li>季節に合わせた生活習慣を心がける</li>
                    <li>バランスの取れた食事を摂る</li>
                    <li>適度な運動を継続する</li>
                    <li>十分な睡眠と休息を取る</li>
                    <li>ストレス管理のための瞑想や呼吸法を実践する</li>
                </ul>
            </div>
        `;
        return advice;
    }
    
    // ヴァータのアドバイス（乱れている場合のみ表示）
    if (vataImbalance) {
        advice += `
            <div class="advice-section">
                <h5>ヴァータのアンバランスを鎮めるために</h5>
                <p>ヴァータと逆の性質をもつ行動を行なうことが求められます。ヴァータの性質には、軽性・動性・冷性・乾燥性・不規則性などがありますから、適度な重性・安定性・温性・湿性・規則性などを無理なく取り入れ、心身の休息をとることや食事などの規則性を重視すること、体を冷やさないことなどがポイントとなります。</p>
                <ul>
                    <li>規則正しい生活リズムを心がける</li>
                    <li>温かい食事と飲み物を摂る</li>
                    <li>オイルマッサージで体を温める</li>
                    <li>ゆっくりとした呼吸法や瞑想を行う</li>
                    <li>過度の運動や刺激を避ける</li>
                </ul>
            </div>
        `;
    }
    
    // ピッタのアドバイス（乱れている場合のみ表示）
    if (pittaImbalance) {
        advice += `
            <div class="advice-section">
                <h5>ピッタのアンバランスを鎮めるために</h5>
                <p>ピッタのもつ性質には、熱性・鋭性・軽性・液性・微油性などがあります。バランスをとるためには、冷性・円滑性・重性・乾性などを無理なく取り入れ、心身の休息をとって冷静になることが効果的です。暴飲暴食や激辛食品の摂取など刺激の強い食事を控えること、闘争的な映像やゲームなどを避けることなどを心がけましょう。</p>
                <ul>
                    <li>冷たい食べ物や飲み物を適度に摂る</li>
                    <li>辛い食べ物や酸っぱい食べ物を控える</li>
                    <li>過度の暑さや直射日光を避ける</li>
                    <li>競争や過度のプレッシャーを減らす</li>
                    <li>自然の中でリラックスする時間を持つ</li>
                </ul>
            </div>
        `;
    }
    
    // カパのアドバイス（乱れている場合のみ表示）
    if (kaphaImbalance) {
        advice += `
            <div class="advice-section">
                <h5>カパのアンバランスを鎮めるために</h5>
                <p>重性・冷性・油性・遅性・安定性といったカパの性質とは逆の軽性・温性・乾性・軽性・動性などの性質を、生活の中に取り入れることが効果的です。動くこと、糖分や油分を減らした食事を摂ること、体を冷やさないことなどを実践しましょう。</p>
                <ul>
                    <li>定期的な運動を行う</li>
                    <li>軽い食事を心がけ、重い食べ物を控える</li>
                    <li>温かくスパイシーな食べ物を適度に摂る</li>
                    <li>新しい活動や変化を生活に取り入れる</li>
                    <li>朝早く起きる習慣をつける</li>
                </ul>
            </div>
        `;
    }
    
    // 複合したドーシャの不均衡に対するアドバイス
    if ((vataImbalance && pittaImbalance) || 
        (pittaImbalance && kaphaImbalance) || 
        (vataImbalance && kaphaImbalance) || 
        (vataImbalance && pittaImbalance && kaphaImbalance)) {
        
        advice += `
            <div class="advice-section">
                <h5>複合したドーシャのアンバランスを鎮めるために</h5>
                <p>複数のドーシャのうち、最もアンバランス度の高いドーシャを調整します。２つが同じように乱れている場合は、２つのドーシャを同時に鎮静化させる性質のものを摂ります。さらに、２つのドーシャにヴァータが含まれる場合は、まずはヴァータの鎮静から行ないます。また、それらのドーシャが乱れやすい時間帯や季節には特に、バランスを整えるような生活を心がけることです。</p>
                <p>なお、ヴァータ・ピッタ・カパの３つが同等に増悪している場合は、もっとも影響が大きいドーシャであるヴァータを優先的に鎮静しましょう。</p>
            </div>
        `;
    }
    
    // 総合アドバイス（常に表示）
    advice += `
        <div class="advice-section">
            <h5>総合的なバランスを維持するために</h5>
            <p>アーユルヴェーダでは、体質に合わせた生活習慣を取り入れることで、心身のバランスを整えることができます。以下の習慣を日常に取り入れてみましょう。</p>
            <ul>
                <li>季節に合わせた生活習慣を心がける</li>
                <li>バランスの取れた食事を摂る</li>
                <li>適度な運動を継続する</li>
                <li>十分な睡眠と休息を取る</li>
                <li>ストレス管理のための瞑想や呼吸法を実践する</li>
            </ul>
        </div>
    `;
    
    return advice;
}

/**
 * バランス分析の説明を生成する
 * @param {Object} imbalance - 不均衡分析結果
 * @returns {string} バランス分析の説明HTML
 */
function generateBalanceAnalysis(imbalance) {
    if (!imbalance) return '';
    
    let analysis = '<p>プラクリティ（生まれつきの体質）とヴィクリティ（現在の状態）の比較：</p>';
    
    // 各ドーシャの変化を分析
    analysis += '<ul>';
    
    if (Math.abs(imbalance.vata) > 5) {
        const direction = imbalance.vata > 0 ? '増加' : '減少';
        analysis += `<li><strong>ヴァータ：</strong> ${Math.abs(imbalance.vata)}% ${direction}しています。`;
        
        if (imbalance.vata > 10) {
            analysis += ' これはヴァータが大きく乱れている可能性を示しています。';
        } else if (imbalance.vata > 5) {
            analysis += ' これはヴァータがやや乱れている可能性を示しています。';
        }
        
        analysis += '</li>';
    }
    
    if (Math.abs(imbalance.pitta) > 5) {
        const direction = imbalance.pitta > 0 ? '増加' : '減少';
        analysis += `<li><strong>ピッタ：</strong> ${Math.abs(imbalance.pitta)}% ${direction}しています。`;
        
        if (imbalance.pitta > 10) {
            analysis += ' これはピッタが大きく乱れている可能性を示しています。';
        } else if (imbalance.pitta > 5) {
            analysis += ' これはピッタがやや乱れている可能性を示しています。';
        }
        
        analysis += '</li>';
    }
    
    if (Math.abs(imbalance.kapha) > 5) {
        const direction = imbalance.kapha > 0 ? '増加' : '減少';
        analysis += `<li><strong>カパ：</strong> ${Math.abs(imbalance.kapha)}% ${direction}しています。`;
        
        if (imbalance.kapha > 10) {
            analysis += ' これはカパが大きく乱れている可能性を示しています。';
        } else if (imbalance.kapha > 5) {
            analysis += ' これはカパがやや乱れている可能性を示しています。';
        }
        
        analysis += '</li>';
    }
    
    if (Math.abs(imbalance.vata) <= 5 && Math.abs(imbalance.pitta) <= 5 && Math.abs(imbalance.kapha) <= 5) {
        analysis += '<li>現在のドーシャバランスは生まれつきの体質とほぼ一致しています。これは良好な健康状態を示しています。</li>';
    }
    
    analysis += '</ul>';
    
    // 総合的な分析
    analysis += '<p><strong>総合分析：</strong> ';
    
    if (Math.max(Math.abs(imbalance.vata), Math.abs(imbalance.pitta), Math.abs(imbalance.kapha)) > 10) {
        analysis += `現在、${imbalance.mostImbalanced === 'vata' ? 'ヴァータ' : imbalance.mostImbalanced === 'pitta' ? 'ピッタ' : 'カパ'}のバランスが最も乱れています。`;
        analysis += '以下のアドバイスに従って、バランスを整えることをお勧めします。';
    } else if (Math.max(Math.abs(imbalance.vata), Math.abs(imbalance.pitta), Math.abs(imbalance.kapha)) > 5) {
        analysis += '軽度の不均衡が見られますが、適切なケアで簡単に改善できる範囲です。';
    } else {
        analysis += '現在のドーシャバランスは良好です。このバランスを維持するための習慣を続けましょう。';
    }
    
    analysis += '</p>';
    
    return analysis;
}

/**
 * 診断結果を取得する
 * @returns {Object} 診断結果
 */
function getDiagnosisResults() {
    return diagnosisResults;
}

/**
 * 診断結果をリセットする
 */
function resetDiagnosis() {
    diagnosisResults.prakriti = {
        vata: 0,
        pitta: 0,
        kapha: 0,
        total: 0,
        dominant: '',
        percentage: {
            vata: 0,
            pitta: 0,
            kapha: 0
        }
    };
    
    diagnosisResults.vikriti = {
        vata: 0,
        pitta: 0,
        kapha: 0,
        total: 0,
        dominant: '',
        percentage: {
            vata: 0,
            pitta: 0,
            kapha: 0
        }
    };
    
    diagnosisResults.completed = {
        prakriti: false,
        vikriti: false
    };
}
