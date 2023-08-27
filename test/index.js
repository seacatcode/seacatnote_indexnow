const { IndexNow } = require('../dist/index');

const indexNow = new IndexNow();

const url = 'https://www.example.com/';

const key = '699507110918448b96436ca8a5912660'; // indexNow.generatorUuid(12);

indexNow.request('IndexNow', url, key).then(data => console.log({ data }));
// indexNow.request('Naver', url, key).then(data => console.log({ data }));
// indexNow.request('Seznam.cz', url, key).then(data => console.log({ data }));