export const homTabs = [
  {
    id: 1,
    title: "诗韵起名",
    desc: "精选诗经与古诗词中的经典之作，让您的名字充满诗意",
    path: "/name",
  },
];

export const getNameOptions = [
  { value: "shijing", label: "诗经" },
  { value: "chuci", label: "楚辞" },
  { value: "tangshi", label: "唐诗" },
  { value: "songci", label: "宋词" },
  { value: "yuefu", label: "乐府诗集" },
  { value: "gushi", label: "古诗三百首" },
  { value: "cifu", label: "著名辞赋" },
];

export const choose = (arr: any) => {
  const index = between(0, arr.length);
  return arr[index];
};

export const between = (min: number, max: number) =>
  // max is not included
  min + Math.floor(Math.random() * (max - min));

const formatStr = (str: string) => {
  // const res = str.replace(/[\s　 ]/g, '');
  let res = str.replace(/(\s|　|”|“){1,}|<br>|<p>|<\/p>/g, "");
  res = res.replace(/\(.+\)/g, "");
  return res;
};

export const splitSentence = (content: any) => {
  if (!content) {
    return [];
  }
  let str = formatStr(content);
  str = str.replace(/！|。|？|；/g, (s) => `${s}|`);
  str = str.replace(/\|$/g, "");
  let arr = str.split("|");
  arr = arr.filter((item) => item.length >= 2);
  return arr;
};

// 清除标点符号
export const cleanPunctuation = (str: string) => {
  const puncReg = /[<>《》！*\(\^\)\$%~!@#…&%￥—\+=、。，？；‘’“”：·`]/g;
  return str.replace(puncReg, "");
};

export const cleanBadChar = (str: string) => {
  const badChars =
    "胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱".split(
      ""
    );
  return str
    .split("")
    .filter((char) => badChars.indexOf(char) === -1)
    .join("");
};

export const getTwoChar = (arr: any) => {
  const len = arr.length;
  const first = between(0, len);
  let second = between(0, len);
  let cnt = 0;
  while (second === first) {
    second = between(0, len);
    cnt++;
    if (cnt > 100) {
      break;
    }
  }
  return first <= second
    ? `${arr[first]}${arr[second]}`
    : `${arr[second]}${arr[first]}`;
};

export const getNames = (data: any) => {
  try {
    const passage = choose(data);
    const { content, title, author, book, dynasty } = passage;
    if (!content) {
      return null;
    }

    const sentenceArr = splitSentence(content);

    if (!(Array.isArray(sentenceArr) && sentenceArr.length > 0)) {
      return null;
    }

    const sentence = choose(sentenceArr);

    const cleanSentence = cleanBadChar(cleanPunctuation(sentence));
    if (cleanSentence.length <= 2) {
      return null;
    }
    const name = getTwoChar(cleanSentence.split(""));
    const res = {
      name,
      sentence,
      content,
      title,
      author,
      book,
      dynasty,
    };

    return res;
  } catch (err) {
    console.log("err", err);
  }
};

export const getIsMobile = () => {
  var ua = window.navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
  var isMobile = isIphone || isAndroid;

  return isMobile;
};
