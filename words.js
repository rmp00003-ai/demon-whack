// Word data: { en, zh, ipa }
const WORD_DATA = {
  easy: [
    {en:'CAT',zh:'貓',ipa:'/kæt/'},{en:'DOG',zh:'狗',ipa:'/dɑːɡ/'},{en:'RUN',zh:'跑',ipa:'/rʌn/'},
    {en:'FLY',zh:'飛',ipa:'/flaɪ/'},{en:'BIG',zh:'大的',ipa:'/bɪɡ/'},{en:'RED',zh:'紅色的',ipa:'/rɛd/'},
    {en:'SUN',zh:'太陽',ipa:'/sʌn/'},{en:'HOT',zh:'熱的',ipa:'/hɑːt/'},{en:'CUP',zh:'杯子',ipa:'/kʌp/'},
    {en:'BAT',zh:'球棒',ipa:'/bæt/'},{en:'MAP',zh:'地圖',ipa:'/mæp/'},{en:'HAT',zh:'帽子',ipa:'/hæt/'},
    {en:'PEN',zh:'筆',ipa:'/pɛn/'},{en:'BOX',zh:'盒子',ipa:'/bɑːks/'},{en:'BUS',zh:'公車',ipa:'/bʌs/'},
    {en:'ANT',zh:'螞蟻',ipa:'/ænt/'},{en:'OWL',zh:'貓頭鷹',ipa:'/aʊl/'},{en:'EGG',zh:'蛋',ipa:'/ɛɡ/'},
    {en:'JAM',zh:'果醬',ipa:'/dʒæm/'},{en:'WEB',zh:'網',ipa:'/wɛb/'},{en:'JUMP',zh:'跳',ipa:'/dʒʌmp/'},
    {en:'FROG',zh:'青蛙',ipa:'/frɑːɡ/'},{en:'BIRD',zh:'鳥',ipa:'/bɜːrd/'},{en:'WIND',zh:'風',ipa:'/wɪnd/'},
    {en:'RAIN',zh:'雨',ipa:'/reɪn/'},{en:'FISH',zh:'魚',ipa:'/fɪʃ/'},{en:'CAKE',zh:'蛋糕',ipa:'/keɪk/'},
    {en:'MILK',zh:'牛奶',ipa:'/mɪlk/'},{en:'BELL',zh:'鈴',ipa:'/bɛl/'},{en:'DOOR',zh:'門',ipa:'/dɔːr/'},
    {en:'FIRE',zh:'火',ipa:'/faɪər/'},{en:'COLD',zh:'冷的',ipa:'/koʊld/'},{en:'FAST',zh:'快的',ipa:'/fæst/'},
    {en:'DARK',zh:'暗的',ipa:'/dɑːrk/'},{en:'SOFT',zh:'軟的',ipa:'/sɔːft/'},{en:'HAND',zh:'手',ipa:'/hænd/'},
    {en:'TREE',zh:'樹',ipa:'/triː/'},{en:'LEAF',zh:'葉子',ipa:'/liːf/'},{en:'MOON',zh:'月亮',ipa:'/muːn/'},
    {en:'STAR',zh:'星星',ipa:'/stɑːr/'},{en:'ARM',zh:'手臂',ipa:'/ɑːrm/'},{en:'BED',zh:'床',ipa:'/bɛd/'},
    {en:'CAR',zh:'汽車',ipa:'/kɑːr/'},{en:'EAR',zh:'耳朵',ipa:'/ɪər/'},{en:'EYE',zh:'眼睛',ipa:'/aɪ/'},
    {en:'LEG',zh:'腿',ipa:'/lɛɡ/'},{en:'LIP',zh:'嘴唇',ipa:'/lɪp/'},{en:'TOE',zh:'腳趾',ipa:'/toʊ/'},
    {en:'KEY',zh:'鑰匙',ipa:'/kiː/'},{en:'SKY',zh:'天空',ipa:'/skaɪ/'},{en:'SEA',zh:'海',ipa:'/siː/'},
    {en:'ICE',zh:'冰',ipa:'/aɪs/'},{en:'ZOO',zh:'動物園',ipa:'/zuː/'},{en:'FAN',zh:'電風扇',ipa:'/fæn/'},
    {en:'NET',zh:'網子',ipa:'/nɛt/'},{en:'NUT',zh:'堅果',ipa:'/nʌt/'},{en:'PAN',zh:'平底鍋',ipa:'/pæn/'},
    {en:'POT',zh:'鍋子',ipa:'/pɑːt/'},{en:'SIT',zh:'坐',ipa:'/sɪt/'},{en:'WIN',zh:'贏',ipa:'/wɪn/'},
    {en:'BOY',zh:'男孩',ipa:'/bɔɪ/'},{en:'DAD',zh:'爸爸',ipa:'/dæd/'},{en:'MOM',zh:'媽媽',ipa:'/mɑːm/'},
    {en:'CRY',zh:'哭',ipa:'/kraɪ/'},{en:'DRY',zh:'乾的',ipa:'/draɪ/'},{en:'PIG',zh:'豬',ipa:'/pɪɡ/'},
    {en:'HOP',zh:'跳躍',ipa:'/hɑːp/'},{en:'MUD',zh:'泥巴',ipa:'/mʌd/'},{en:'PIE',zh:'派',ipa:'/paɪ/'},
    {en:'PIN',zh:'大頭針',ipa:'/pɪn/'},{en:'TOP',zh:'頂端',ipa:'/tɑːp/'},{en:'TUB',zh:'浴缸',ipa:'/tʌb/'},
    {en:'ZAP',zh:'打擊',ipa:'/zæp/'},{en:'COW',zh:'牛',ipa:'/kaʊ/'},{en:'HEN',zh:'母雞',ipa:'/hɛn/'},
    {en:'BEE',zh:'蜜蜂',ipa:'/biː/'},{en:'FOX',zh:'狐狸',ipa:'/fɑːks/'},{en:'GUM',zh:'口香糖',ipa:'/ɡʌm/'},
    {en:'HAY',zh:'乾草',ipa:'/heɪ/'},{en:'HUG',zh:'擁抱',ipa:'/hʌɡ/'},{en:'JAB',zh:'戳',ipa:'/dʒæb/'},
    {en:'LAP',zh:'大腿',ipa:'/læp/'},{en:'OAK',zh:'橡樹',ipa:'/oʊk/'},{en:'PAW',zh:'爪子',ipa:'/pɔː/'},
  ],
  medium: [
    {en:'APPLE',zh:'蘋果',ipa:'/ˈæpəl/'},{en:'CLOUD',zh:'雲',ipa:'/klaʊd/'},{en:'FLAME',zh:'火焰',ipa:'/fleɪm/'},
    {en:'GREEN',zh:'綠色的',ipa:'/ɡriːn/'},{en:'STONE',zh:'石頭',ipa:'/stoʊn/'},{en:'RIVER',zh:'河流',ipa:'/ˈrɪvər/'},
    {en:'SWORD',zh:'劍',ipa:'/sɔːrd/'},{en:'TIGER',zh:'老虎',ipa:'/ˈtaɪɡər/'},{en:'SNAKE',zh:'蛇',ipa:'/sneɪk/'},
    {en:'EAGLE',zh:'老鷹',ipa:'/ˈiːɡəl/'},{en:'BRAVE',zh:'勇敢的',ipa:'/breɪv/'},{en:'OCEAN',zh:'海洋',ipa:'/ˈoʊʃən/'},
    {en:'PLANT',zh:'植物',ipa:'/plænt/'},{en:'LUCKY',zh:'幸運的',ipa:'/ˈlʌki/'},{en:'FROST',zh:'霜',ipa:'/frɔːst/'},
    {en:'STORM',zh:'暴風雨',ipa:'/stɔːrm/'},{en:'LIGHT',zh:'光',ipa:'/laɪt/'},{en:'HEART',zh:'心',ipa:'/hɑːrt/'},
    {en:'BLOOD',zh:'血',ipa:'/blʌd/'},{en:'DANCE',zh:'跳舞',ipa:'/dæns/'},{en:'DREAM',zh:'夢想',ipa:'/driːm/'},
    {en:'NIGHT',zh:'夜晚',ipa:'/naɪt/'},{en:'POWER',zh:'力量',ipa:'/ˈpaʊər/'},{en:'SMILE',zh:'微笑',ipa:'/smaɪl/'},
    {en:'SPACE',zh:'太空',ipa:'/speɪs/'},{en:'TRACK',zh:'軌道',ipa:'/træk/'},{en:'WATER',zh:'水',ipa:'/ˈwɔːtər/'},
    {en:'YOUNG',zh:'年輕的',ipa:'/jʌŋ/'},{en:'ANGEL',zh:'天使',ipa:'/ˈeɪndʒəl/'},{en:'BLACK',zh:'黑色的',ipa:'/blæk/'},
    {en:'CRANE',zh:'鶴',ipa:'/kreɪn/'},{en:'EARTH',zh:'地球',ipa:'/ɜːrθ/'},{en:'GHOST',zh:'鬼',ipa:'/ɡoʊst/'},
    {en:'HONEY',zh:'蜂蜜',ipa:'/ˈhʌni/'},{en:'KNIFE',zh:'刀',ipa:'/naɪf/'},{en:'CLASS',zh:'班級',ipa:'/klæs/'},
    {en:'CLEAN',zh:'乾淨的',ipa:'/kliːn/'},{en:'CLOCK',zh:'時鐘',ipa:'/klɑːk/'},{en:'COLOR',zh:'顏色',ipa:'/ˈkʌlər/'},
    {en:'COUNT',zh:'計數',ipa:'/kaʊnt/'},{en:'CREAM',zh:'奶油',ipa:'/kriːm/'},{en:'DRESS',zh:'洋裝',ipa:'/drɛs/'},
    {en:'DRINK',zh:'喝',ipa:'/drɪŋk/'},{en:'DRIVE',zh:'開車',ipa:'/draɪv/'},{en:'FLOOR',zh:'地板',ipa:'/flɔːr/'},
    {en:'GRASS',zh:'草',ipa:'/ɡræs/'},{en:'GREAT',zh:'很棒的',ipa:'/ɡreɪt/'},{en:'HAPPY',zh:'快樂的',ipa:'/ˈhæpi/'},
    {en:'HOUSE',zh:'房子',ipa:'/haʊs/'},{en:'JUICE',zh:'果汁',ipa:'/dʒuːs/'},{en:'MUSIC',zh:'音樂',ipa:'/ˈmjuːzɪk/'},
    {en:'PAPER',zh:'紙',ipa:'/ˈpeɪpər/'},{en:'PEACE',zh:'和平',ipa:'/piːs/'},{en:'PHONE',zh:'電話',ipa:'/foʊn/'},
    {en:'PLACE',zh:'地方',ipa:'/pleɪs/'},{en:'PLATE',zh:'盤子',ipa:'/pleɪt/'},{en:'PRIDE',zh:'驕傲',ipa:'/praɪd/'},
    {en:'QUIET',zh:'安靜的',ipa:'/ˈkwaɪət/'},{en:'ROUND',zh:'圓的',ipa:'/raʊnd/'},{en:'SHEEP',zh:'羊',ipa:'/ʃiːp/'},
    {en:'SHIRT',zh:'襯衫',ipa:'/ʃɜːrt/'},{en:'SLEEP',zh:'睡覺',ipa:'/sliːp/'},{en:'SMELL',zh:'聞',ipa:'/smɛl/'},
    {en:'SPEED',zh:'速度',ipa:'/spiːd/'},{en:'SPELL',zh:'拼字',ipa:'/spɛl/'},{en:'SPORT',zh:'運動',ipa:'/spɔːrt/'},
    {en:'SUGAR',zh:'糖',ipa:'/ˈʃʊɡər/'},{en:'SWEET',zh:'甜的',ipa:'/swiːt/'},{en:'TABLE',zh:'桌子',ipa:'/ˈteɪbəl/'},
    {en:'TEACH',zh:'教',ipa:'/tiːtʃ/'},{en:'TEETH',zh:'牙齒',ipa:'/tiːθ/'},{en:'TOUCH',zh:'觸碰',ipa:'/tʌtʃ/'},
    {en:'TWICE',zh:'兩次',ipa:'/twaɪs/'},{en:'UNCLE',zh:'叔叔',ipa:'/ˈʌŋkəl/'},{en:'VISIT',zh:'拜訪',ipa:'/ˈvɪzɪt/'},
    {en:'VOICE',zh:'聲音',ipa:'/vɔɪs/'},{en:'WATCH',zh:'手錶',ipa:'/wɑːtʃ/'},{en:'WHOLE',zh:'整個的',ipa:'/hoʊl/'},
    {en:'WORLD',zh:'世界',ipa:'/wɜːrld/'},{en:'WORRY',zh:'擔心',ipa:'/ˈwɜːri/'},{en:'WRITE',zh:'寫',ipa:'/raɪt/'},
    {en:'BRUSH',zh:'刷子',ipa:'/brʌʃ/'},{en:'CHAIR',zh:'椅子',ipa:'/tʃɛr/'},{en:'CHEAP',zh:'便宜的',ipa:'/tʃiːp/'},
    {en:'CHEST',zh:'胸膛',ipa:'/tʃɛst/'},{en:'CHIEF',zh:'首領',ipa:'/tʃiːf/'},{en:'CHILD',zh:'小孩',ipa:'/tʃaɪld/'},
    {en:'CLIMB',zh:'攀爬',ipa:'/klaɪm/'},{en:'CLOTH',zh:'布',ipa:'/klɔːθ/'},{en:'CLOUD',zh:'雲朵',ipa:'/klaʊd/'},
    {en:'COACH',zh:'教練',ipa:'/koʊtʃ/'},{en:'COAST',zh:'海岸',ipa:'/koʊst/'},{en:'CROWN',zh:'皇冠',ipa:'/kraʊn/'},
    {en:'EQUAL',zh:'相等的',ipa:'/ˈiːkwəl/'},{en:'EVENT',zh:'事件',ipa:'/ɪˈvɛnt/'},{en:'EVERY',zh:'每個',ipa:'/ˈɛvri/'},
    {en:'EXACT',zh:'精確的',ipa:'/ɪɡˈzækt/'},{en:'EXIST',zh:'存在',ipa:'/ɪɡˈzɪst/'},{en:'EXTRA',zh:'額外的',ipa:'/ˈɛkstrə/'},
    {en:'FANCY',zh:'奇特的',ipa:'/ˈfænsi/'},{en:'FINAL',zh:'最後的',ipa:'/ˈfaɪnəl/'},{en:'FIRST',zh:'第一的',ipa:'/fɜːrst/'},
  ],
  hard: [
    {en:'CRYSTAL',zh:'水晶',ipa:'/ˈkrɪstəl/'},{en:'THUNDER',zh:'雷',ipa:'/ˈθʌndər/'},{en:'JOURNEY',zh:'旅程',ipa:'/ˈdʒɜːrni/'},
    {en:'CAPTAIN',zh:'隊長',ipa:'/ˈkæptɪn/'},{en:'DIAMOND',zh:'鑽石',ipa:'/ˈdaɪəmənd/'},{en:'FANTASY',zh:'幻想',ipa:'/ˈfæntəsi/'},
    {en:'GRAVITY',zh:'重力',ipa:'/ˈɡrævɪti/'},{en:'HORIZON',zh:'地平線',ipa:'/həˈraɪzən/'},{en:'KINGDOM',zh:'王國',ipa:'/ˈkɪŋdəm/'},
    {en:'LANTERN',zh:'燈籠',ipa:'/ˈlæntərn/'},{en:'MYSTERY',zh:'謎',ipa:'/ˈmɪstəri/'},{en:'PHANTOM',zh:'幽靈',ipa:'/ˈfæntəm/'},
    {en:'RAINBOW',zh:'彩虹',ipa:'/ˈreɪnboʊ/'},{en:'SILENCE',zh:'寂靜',ipa:'/ˈsaɪləns/'},{en:'VILLAGE',zh:'村莊',ipa:'/ˈvɪlɪdʒ/'},
    {en:'WARRIOR',zh:'戰士',ipa:'/ˈwɔːriər/'},{en:'ANCIENT',zh:'古老的',ipa:'/ˈeɪnʃənt/'},{en:'DESTINY',zh:'命運',ipa:'/ˈdɛstɪni/'},
    {en:'FORTUNE',zh:'財富',ipa:'/ˈfɔːrtʃən/'},{en:'HARVEST',zh:'收穫',ipa:'/ˈhɑːrvɪst/'},{en:'IMAGINE',zh:'想像',ipa:'/ɪˈmædʒɪn/'},
    {en:'JUSTICE',zh:'正義',ipa:'/ˈdʒʌstɪs/'},{en:'WEATHER',zh:'天氣',ipa:'/ˈwɛðər/'},{en:'VICTORY',zh:'勝利',ipa:'/ˈvɪktəri/'},
    {en:'BALANCE',zh:'平衡',ipa:'/ˈbæləns/'},{en:'COURAGE',zh:'勇氣',ipa:'/ˈkɜːrɪdʒ/'},{en:'EMPEROR',zh:'皇帝',ipa:'/ˈɛmpərər/'},
    {en:'FREEDOM',zh:'自由',ipa:'/ˈfriːdəm/'},{en:'BROTHER',zh:'兄弟',ipa:'/ˈbrʌðər/'},{en:'CAREFUL',zh:'小心的',ipa:'/ˈkɛrfəl/'},
    {en:'CHAPTER',zh:'章節',ipa:'/ˈtʃæptər/'},{en:'CLIMATE',zh:'氣候',ipa:'/ˈklaɪmɪt/'},{en:'COLLECT',zh:'收集',ipa:'/kəˈlɛkt/'},
    {en:'COMFORT',zh:'安慰',ipa:'/ˈkʌmfərt/'},{en:'CONTROL',zh:'控制',ipa:'/kənˈtroʊl/'},{en:'COUNTRY',zh:'國家',ipa:'/ˈkʌntri/'},
    {en:'CULTURE',zh:'文化',ipa:'/ˈkʌltʃər/'},{en:'CURIOUS',zh:'好奇的',ipa:'/ˈkjʊəriəs/'},{en:'DISEASE',zh:'疾病',ipa:'/dɪˈziːz/'},
    {en:'HISTORY',zh:'歷史',ipa:'/ˈhɪstəri/'},{en:'HOLIDAY',zh:'假日',ipa:'/ˈhɒlɪdeɪ/'},{en:'INCLUDE',zh:'包含',ipa:'/ɪnˈkluːd/'},
    {en:'INSPIRE',zh:'激勵',ipa:'/ɪnˈspaɪər/'},{en:'PATIENT',zh:'耐心的',ipa:'/ˈpeɪʃənt/'},{en:'PERFECT',zh:'完美的',ipa:'/ˈpɜːrfɪkt/'},
    {en:'PERFORM',zh:'表演',ipa:'/pərˈfɔːrm/'},{en:'POPULAR',zh:'流行的',ipa:'/ˈpɒpjʊlər/'},{en:'PROTECT',zh:'保護',ipa:'/prəˈtɛkt/'},
    {en:'RECEIVE',zh:'接收',ipa:'/rɪˈsiːv/'},{en:'SCIENCE',zh:'科學',ipa:'/ˈsaɪəns/'},{en:'SERVICE',zh:'服務',ipa:'/ˈsɜːrvɪs/'},
    {en:'SOCIETY',zh:'社會',ipa:'/səˈsaɪəti/'},{en:'SPECIAL',zh:'特別的',ipa:'/ˈspɛʃəl/'},{en:'STUDENT',zh:'學生',ipa:'/ˈstjuːdənt/'},
    {en:'SUCCESS',zh:'成功',ipa:'/səkˈsɛs/'},{en:'SUPPORT',zh:'支持',ipa:'/səˈpɔːrt/'},{en:'TOURIST',zh:'觀光客',ipa:'/ˈtʊərɪst/'},
    {en:'TROUBLE',zh:'麻煩',ipa:'/ˈtrʌbəl/'},{en:'VARIOUS',zh:'各種的',ipa:'/ˈvɛəriəs/'},{en:'WEBSITE',zh:'網站',ipa:'/ˈwɛbsaɪt/'},
    {en:'WESTERN',zh:'西方的',ipa:'/ˈwɛstərn/'},{en:'BETWEEN',zh:'在…之間',ipa:'/bɪˈtwiːn/'},{en:'BELIEVE',zh:'相信',ipa:'/bɪˈliːv/'},
    {en:'BECAUSE',zh:'因為',ipa:'/bɪˈkɒz/'},{en:'ALREADY',zh:'已經',ipa:'/ɔːlˈrɛdi/'},{en:'ARRANGE',zh:'安排',ipa:'/əˈreɪndʒ/'},
    {en:'ATTEMPT',zh:'嘗試',ipa:'/əˈtɛmpt/'},{en:'ATTRACT',zh:'吸引',ipa:'/əˈtrækt/'},{en:'AVERAGE',zh:'平均的',ipa:'/ˈævərɪdʒ/'},
    {en:'BARRIER',zh:'障礙',ipa:'/ˈbæriər/'},{en:'BENEFIT',zh:'好處',ipa:'/ˈbɛnɪfɪt/'},{en:'CAPABLE',zh:'有能力的',ipa:'/ˈkeɪpəbəl/'},
  ]
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class WordManager {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.pool = shuffleArray(WORD_DATA[difficulty]);
    this.index = 0;
  }

  next() {
    if (this.index >= this.pool.length) {
      this.pool = shuffleArray(WORD_DATA[this.difficulty]);
      this.index = 0;
    }
    return this.pool[this.index++];
  }

  buildLetters(word) {
    const distract = { easy: 3, medium: 4, hard: 6 }[this.difficulty];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const wordLetters = word.split('').map((ch, i) => ({ ch, index: i, isCorrect: true }));
    const used = new Set(word.split(''));
    const distractors = [];
    while (distractors.length < distract) {
      const ch = alphabet[Math.floor(Math.random() * 26)];
      if (!used.has(ch)) {
        distractors.push({ ch, index: null, isCorrect: false });
        used.add(ch);
      }
    }
    return shuffleArray([...wordLetters, ...distractors]);
  }
}
