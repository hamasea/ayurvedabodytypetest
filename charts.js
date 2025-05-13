/**
 * アーユルヴェーダ体質診断のグラフ描画機能
 */

// グラフのカラー設定
const chartColors = {
    vata: '#8e44ad',  // 紫
    pitta: '#e74c3c', // 赤
    kapha: '#3498db'  // 青
};

// グラフのオプション設定
const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                font: {
                    size: 14
                }
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return `${context.label}: ${context.raw}%`;
                }
            }
        }
    }
};

/**
 * プラクリティ診断結果のグラフを描画する
 * @param {Object} results - プラクリティ診断結果
 */
function drawPrakritiChart(results) {
    const ctx = document.getElementById('prakriti-chart').getContext('2d');
    
    // 既存のチャートがあれば破棄
    if (window.prakritiChart instanceof Chart) {
        window.prakritiChart.destroy();
    }
    
    // データの準備
    const data = {
        labels: ['ヴァータ', 'ピッタ', 'カパ'],
        datasets: [{
            data: [
                results.percentage.vata,
                results.percentage.pitta,
                results.percentage.kapha
            ],
            backgroundColor: [
                chartColors.vata,
                chartColors.pitta,
                chartColors.kapha
            ],
            borderWidth: 1
        }]
    };
    
    // チャートの作成
    window.prakritiChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: chartOptions
    });
}

/**
 * プラクリティ診断結果の最終グラフを描画する（総合結果ページ用）
 * @param {Object} results - プラクリティ診断結果
 */
function drawPrakritiFinalChart(results) {
    const ctx = document.getElementById('prakriti-chart-final').getContext('2d');
    
    // 既存のチャートがあれば破棄
    if (window.prakritiFinalChart instanceof Chart) {
        window.prakritiFinalChart.destroy();
    }
    
    // データの準備
    const data = {
        labels: ['ヴァータ', 'ピッタ', 'カパ'],
        datasets: [{
            data: [
                results.percentage.vata,
                results.percentage.pitta,
                results.percentage.kapha
            ],
            backgroundColor: [
                chartColors.vata,
                chartColors.pitta,
                chartColors.kapha
            ],
            borderWidth: 1
        }]
    };
    
    // チャートの作成
    window.prakritiFinalChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: chartOptions
    });
}

/**
 * ヴィクリティ診断結果のグラフを描画する
 * @param {Object} results - ヴィクリティ診断結果
 */
function drawVikritiChart(results) {
    const ctx = document.getElementById('vikriti-chart').getContext('2d');
    
    // 既存のチャートがあれば破棄
    if (window.vikritiChart instanceof Chart) {
        window.vikritiChart.destroy();
    }
    
    // データの準備
    const data = {
        labels: ['ヴァータ', 'ピッタ', 'カパ'],
        datasets: [{
            data: [
                results.percentage.vata,
                results.percentage.pitta,
                results.percentage.kapha
            ],
            backgroundColor: [
                chartColors.vata,
                chartColors.pitta,
                chartColors.kapha
            ],
            borderWidth: 1
        }]
    };
    
    // チャートの作成
    window.vikritiChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: chartOptions
    });
}

/**
 * ドーシャタイプの日本語名を取得する
 * @param {string} doshaType - ドーシャタイプ
 * @returns {string} ドーシャタイプの日本語名
 */
function getDoshaTypeName(doshaType) {
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
    
    const doshaNames = {
        'vata': 'ヴァータ優勢',
        'pitta': 'ピッタ優勢',
        'kapha': 'カパ優勢',
        'vata-pitta': 'ヴァータ・ピッタ複合体質',
        'pitta-kapha': 'ピッタ・カパ複合体質',
        'vata-kapha': 'ヴァータ・カパ複合体質',
        'tridosha': 'トリドーシャ（三体質バランス）'
    };
    
    // デバッグ用にdoshaTypeの値をコンソールに出力
    console.log('元のドーシャタイプ:', doshaType);
    console.log('正規化されたドーシャタイプ:', normalizedType);
    
    return doshaNames[normalizedType] || `不明な体質タイプ (${doshaType})`;
}
