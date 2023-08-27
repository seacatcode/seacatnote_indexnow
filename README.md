# seacatnote_indexnow


### install
```
npm install --save git+https://github.com/seacatcode/seacatnote_indexnow
```

### example (Nodejs)
```
const { IndexNow } = require('seacatnote_indexnow');

const indexNow = new IndexNow();

const url = 'https://www.example.com/';

const key = '699507110918448b96436ca8a5912660'; // indexNow.generatorUuid(12);

indexNow.request('IndexNow', url, key).then(data => console.log({ data }));
indexNow.request('Naver', url, key).then(data => console.log({ data }));
```

### example (Typescript)
```
import { IndexNow } from 'seacatnote_indexnow';

const indexNow = new IndexNow();

const url = 'https://www.example.com/';

const key = '699507110918448b96436ca8a5912660'; // indexNow.generatorUuid(12);

indexNow.request('IndexNow', url, key).then(data => console.log({ data }));
indexNow.request('Naver', url, key).then(data => console.log({ data }));
```

### License
MIT License