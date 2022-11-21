let kcg = {
    ekimae: {
        name: '京都駅前校',
    },
    rakuhoku: {
        name: '洛北校',
    },
    shimogamo: {
        name: '鴨川校',
    },
};
let deep = JSON.parse(JSON.stringify(kcg));
let shallow = {
    ...kcg,
};

deep.ekimae.name = 'Kyoto Ekimae Campus';
console.dir(kcg);
console.dir(deep); // こちらのみ更新
shallow.ekimae.name = 'Kyoto Ekimae Campus';
console.dir(kcg); // 元のオブジェクトも更新
console.dir(shallow);
