/**
 * アーユルヴェーダ体質診断の質問データ
 */

// プラクリティ診断（生まれつきの体質）の質問
const prakritiQuestions = [
    // ヴァータに関する質問
    {
        id: 'p1',
        text: '動作が素早く早口で、歩くのも人より速い',
        dosha: 'vata'
    },
    {
        id: 'p2',
        text: '新しいことを覚えるのが早いが、忘れるのも早い',
        dosha: 'vata'
    },
    {
        id: 'p3',
        text: '好奇心が強く何事にも興味を示すが長続きしない',
        dosha: 'vata'
    },
    {
        id: 'p4',
        text: '体型はやせている。また、もともとやせ型である',
        dosha: 'vata'
    },
    {
        id: 'p5',
        text: '手足の静脈が浮きでてよく見える',
        dosha: 'vata'
    },
    {
        id: 'p6',
        text: '便秘しがちである',
        dosha: 'vata'
    },
    {
        id: 'p7',
        text: '何か決めるときに、くよくよしがちで決まらない',
        dosha: 'vata'
    },
    {
        id: 'p8',
        text: 'お腹にガスが溜まりやすく、おならが多い',
        dosha: 'vata'
    },
    {
        id: 'p9',
        text: '元来冷え性で手足が冷たい。寒さを感じやすい',
        dosha: 'vata'
    },
    {
        id: 'p10',
        text: '座っていても手足や体をいつも動かしている',
        dosha: 'vata'
    },
    {
        id: 'p11',
        text: '関節がボキボキなることが多い',
        dosha: 'vata'
    },
    {
        id: 'p12',
        text: '歯の大きさが不揃いで歯並びも良くない',
        dosha: 'vata'
    },
    {
        id: 'p13',
        text: '特に冬は、肌がかさつきやすい',
        dosha: 'vata'
    },
    {
        id: 'p14',
        text: '新しい環境にたやすくとけ込める',
        dosha: 'vata'
    },
    {
        id: 'p15',
        text: 'お金を儲けるのが早いが浪費するのも早い',
        dosha: 'vata'
    },
    
    // ピッタに関する質問
    {
        id: 'p16',
        text: '自分を主張し頭脳的、知的でリーダーに向いている',
        dosha: 'pitta'
    },
    {
        id: 'p17',
        text: '汗っかきで夏が苦手である',
        dosha: 'pitta'
    },
    {
        id: 'p18',
        text: '大食漢で、お腹がすくと機嫌が悪い',
        dosha: 'pitta'
    },
    {
        id: 'p19',
        text: '気が短いほうで、イライラしやすく怒りっぽい',
        dosha: 'pitta'
    },
    {
        id: 'p20',
        text: '話し方や行動に無駄が少なく、雄弁家と言われる',
        dosha: 'pitta'
    },
    {
        id: 'p21',
        text: '若白髪、若ハゲやシワが若い頃から目立つ',
        dosha: 'pitta'
    },
    {
        id: 'p22',
        text: '胸焼けや口内炎がよく起こる',
        dosha: 'pitta'
    },
    {
        id: 'p23',
        text: '顔色や肌の色の赤みや黄色みが強い',
        dosha: 'pitta'
    },
    {
        id: 'p24',
        text: '大便が毎日2回以上あり、便は柔らかいことが多い',
        dosha: 'pitta'
    },
    {
        id: 'p25',
        text: '冷たい飲み物や食物を好む',
        dosha: 'pitta'
    },
    {
        id: 'p26',
        text: '知的で鋭い目つきをしている',
        dosha: 'pitta'
    },
    {
        id: 'p27',
        text: '日に当たると日焼けしやすい',
        dosha: 'pitta'
    },
    {
        id: 'p28',
        text: '完璧主義者で、人にもきびしい。話し方がきつい',
        dosha: 'pitta'
    },
    {
        id: 'p29',
        text: '皮膚にホクロやそばかすが多い',
        dosha: 'pitta'
    },
    {
        id: 'p30',
        text: '目が充血しやすい',
        dosha: 'pitta'
    },
    
    // カパに関する質問
    {
        id: 'p31',
        text: '生まれつきがっしりして体型が大きく腕力が強い',
        dosha: 'kapha'
    },
    {
        id: 'p32',
        text: '肥満しやすく、腕や足の血管が見えにくい',
        dosha: 'kapha'
    },
    {
        id: 'p33',
        text: '食事を抜いても我慢できる',
        dosha: 'kapha'
    },
    {
        id: 'p34',
        text: '毛髪が黒くて年齢以上にふさふさしている',
        dosha: 'kapha'
    },
    {
        id: 'p35',
        text: 'どこでもよく眠れる',
        dosha: 'kapha'
    },
    {
        id: 'p36',
        text: '肌が柔らかくなめらかで、色白である',
        dosha: 'kapha'
    },
    {
        id: 'p37',
        text: '歯が白くて大きさが揃っており虫歯も少ない',
        dosha: 'kapha'
    },
    {
        id: 'p38',
        text: '激しい運動や労働によく耐えることができる',
        dosha: 'kapha'
    },
    {
        id: 'p39',
        text: '歩行や食べ方がゆっくりしている',
        dosha: 'kapha'
    },
    {
        id: 'p40',
        text: 'イライラすることは少なく集中力がある',
        dosha: 'kapha'
    },
    {
        id: 'p41',
        text: '覚えるのは遅いが、一旦覚えると忘れにくい',
        dosha: 'kapha'
    },
    {
        id: 'p42',
        text: 'ひっこみ思案で、恥ずかしがり屋',
        dosha: 'kapha'
    },
    {
        id: 'p43',
        text: '湿気が多くて寒い気候が苦手で、すぐに鼻水が出る',
        dosha: 'kapha'
    },
    {
        id: 'p44',
        text: '食物に興味が強く、食事によくお金を使う',
        dosha: 'kapha'
    },
    {
        id: 'p45',
        text: '心が穏やかで怒ることは少ない',
        dosha: 'kapha'
    }
];

// ヴィクリティ診断（現在の状態）の質問
const vikritiQuestions = [
    // ヴァータに関する質問
    {
        id: 'v1',
        text: '肌がかさついて、乾燥している',
        dosha: 'vata'
    },
    {
        id: 'v2',
        text: 'ふけが多い',
        dosha: 'vata'
    },
    {
        id: 'v3',
        text: '眠りが浅く、睡眠不足ぎみである',
        dosha: 'vata'
    },
    {
        id: 'v4',
        text: '腸の調子が悪く、下痢と便秘が交互にくる',
        dosha: 'vata'
    },
    {
        id: 'v5',
        text: 'ガスがたまって、おならが多い',
        dosha: 'vata'
    },
    {
        id: 'v6',
        text: '便秘がちである',
        dosha: 'vata'
    },
    {
        id: 'v7',
        text: '手足が冷たく寒がり',
        dosha: 'vata'
    },
    {
        id: 'v8',
        text: '頭痛、腹痛、筋肉痛などの痛みや痙攣が起こる',
        dosha: 'vata'
    },
    {
        id: 'v9',
        text: '何でもないときに、心臓がどきどきする',
        dosha: 'vata'
    },
    {
        id: 'v10',
        text: '午後になると疲労感が強くなり気分が滅入ってくる',
        dosha: 'vata'
    },
    
    // ピッタに関する質問
    {
        id: 'v11',
        text: 'やたらに汗が出る',
        dosha: 'pitta'
    },
    {
        id: 'v12',
        text: '肌に赤いブツブツ（発疹）ができる',
        dosha: 'pitta'
    },
    {
        id: 'v13',
        text: '顔面や鼻が赤い',
        dosha: 'pitta'
    },
    {
        id: 'v14',
        text: '目の白いところが赤く充血する',
        dosha: 'pitta'
    },
    {
        id: 'v15',
        text: 'お腹が一杯になるまで大食する',
        dosha: 'pitta'
    },
    {
        id: 'v16',
        text: '冷たい飲み物や食べ物を食べずにいられない',
        dosha: 'pitta'
    },
    {
        id: 'v17',
        text: '口内炎ができている。あるいは口臭が強い',
        dosha: 'pitta'
    },
    {
        id: 'v18',
        text: '口渇が強い。あるいは口内が塩からい味がする',
        dosha: 'pitta'
    },
    {
        id: 'v19',
        text: '胸やけがしたり、肛門の灼熱感がある',
        dosha: 'pitta'
    },
    {
        id: 'v20',
        text: '大便が軟便気味で下痢しやすい',
        dosha: 'pitta'
    },
    
    // カパに関する質問
    {
        id: 'v21',
        text: '体が重く、何事もおっくうである',
        dosha: 'kapha'
    },
    {
        id: 'v22',
        text: '湿気が多くて冷たい気候になると体調が悪い',
        dosha: 'kapha'
    },
    {
        id: 'v23',
        text: '手足がだるかったり、関節の痛みがある',
        dosha: 'kapha'
    },
    {
        id: 'v24',
        text: '口内が甘い。あるいは口中がねばねばする',
        dosha: 'kapha'
    },
    {
        id: 'v25',
        text: '食事を抜いても苦にならない',
        dosha: 'kapha'
    },
    {
        id: 'v26',
        text: '風邪気味で鼻みずや鼻づまりが抜けない',
        dosha: 'kapha'
    },
    {
        id: 'v27',
        text: 'たんが出る咳が多い',
        dosha: 'kapha'
    },
    {
        id: 'v28',
        text: 'すぐに居眠りや、うつらうつらしてしまう',
        dosha: 'kapha'
    },
    {
        id: 'v29',
        text: '少なくとも8時間はぐっすり眠ってしまう',
        dosha: 'kapha'
    },
    {
        id: 'v30',
        text: 'みみずばれなどの発疹ができやすい',
        dosha: 'kapha'
    }
];

// 質問をシャッフルする関数
function shuffleQuestions(questions) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 初期化時に質問をシャッフル
let shuffledPrakritiQuestions = [];
let shuffledVikritiQuestions = [];

// アプリ起動時に質問をシャッフル
document.addEventListener('DOMContentLoaded', function() {
    shuffledPrakritiQuestions = shuffleQuestions(prakritiQuestions);
    shuffledVikritiQuestions = shuffleQuestions(vikritiQuestions);
});
