"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexNow = void 0;
const axios_1 = __importDefault(require("axios"));
const searchEngineUrl = {
    'IndexNow': 'https://api.indexnow.org/indexnow',
    'Microsoft Bing': 'https://www.bing.com/indexnow',
    'Naver': 'https://searchadvisor.naver.com/indexnow',
    'Seznam.cz': 'https://search.seznam.cz/indexnow',
    'Yandex': 'https://yandex.com/indexnow'
};
class IndexNow {
    engine(engine) {
        const url = searchEngineUrl[engine];
        if (url != null) {
            return searchEngineUrl[engine];
        }
        throw new Error('not found');
    }
    generatorUuid(length) {
        let leng = Math.min(Math.max(length, 8), 128);
        let table = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return new Array(leng).fill('').map(() => {
            return table[Math.floor(Math.random() * table.length)];
        }).join('');
    }
    generatorUrl(engine, url, key) {
        const u = new URL(this.engine(engine));
        u.searchParams.append('url', url);
        u.searchParams.append('key', key);
        return u.toString();
    }
    request(engine, url, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const _url = this.generatorUrl(engine, url, key);
            let status = -1000;
            let data = '';
            try {
                const response = yield axios_1.default.get(_url);
                status = response.status;
                data = response.data;
            }
            catch (error) {
                if (error.response) {
                    status = error.response.status;
                    data = error.response.data;
                }
                else if (error.request) {
                    status = -1000;
                }
                else {
                    status = -1001;
                }
            }
            return this.createRequestResult(engine, _url, status, data);
        });
    }
    createRequestResult(engine, request, status, data) {
        const result = { url: request, status: status, response: '', reasons: '', data: data };
        if (status > 0) {
            if (engine === 'Microsoft Bing' || engine === 'IndexNow' || engine === 'Yandex') {
                switch (status) {
                    case 200:
                        result.response = 'Ok';
                        result.reasons = 'URL submitted successfully';
                        break;
                    case 202:
                        result.response = 'Accepted';
                        result.reasons = 'URL received. IndexNow key validation pending.';
                    case 400:
                        result.response = 'Bad request';
                        result.reasons = 'Invalid format';
                        break;
                    case 403:
                        result.response = 'Forbidden';
                        result.reasons = 'In case of key not valid (e.g. key not found, file found but key not in the file)';
                        break;
                    case 422:
                        result.response = 'Unprocessable Entity';
                        result.reasons = 'In case of URLs don\'t belong to the host or the key is not matching the schema in the';
                        break;
                    case 429:
                        result.response = 'Too Many Requests';
                        result.reasons = 'Too Many Requests (potential Spam)';
                        break;
                }
            }
            if (engine === 'Seznam.cz') {
                switch (status) {
                    case 403:
                        result.response = 'Špatný klíč';
                        result.reasons = 'Klíč se nepodařilo načíst nebo neodpovídá adresám URL uvedeným v požadavku.';
                        break;
                    case 405:
                        result.response = 'Metoda není povolena';
                        result.reasons = 'Jsou podporovány metody GET a POST.';
                        break;
                    case 422:
                        result.response = 'Nevalidní parametr url';
                        result.reasons = 'Požadavek obsahuje neplatnou adresu URL, nebo předaný klíč není vhodný pro jeho zpracování.';
                        break;
                    case 429:
                        result.response = 'Příliš mnoho požadavků';
                        result.reasons = 'Byl překročen počet požadavků na jednu IP adresu.';
                        break;
                }
            }
            if (engine === 'Naver') {
                switch (status) {
                    case 200:
                        result.response = 'Success';
                        result.reasons = '전송이 성공하였습니다.';
                        break;
                    case 202:
                        result.response = 'Accepted';
                        result.reasons = 'URL 정보가 수신되었습니다. key 정보를 확인 중입니다.';
                    case 400:
                        result.response = 'Bad request';
                        result.reasons = '잘못된 형식으로 요청되었습니다.';
                        break;
                    case 403:
                        result.response = 'Forbidden';
                        result.reasons = 'key가 유효하지 않습니다.';
                        break;
                    case 422:
                        result.response = 'Unprocessable Entity';
                        result.reasons = 'URL이 key 정보와 일치하지 않습니다.';
                        break;
                    case 429:
                        result.response = 'Too Many Requests';
                        result.reasons = '과도하게 많은 요청을 보내고 있습니다.';
                        break;
                    case 500:
                        result.response = 'Server error';
                        result.reasons = '서버 에러입니다.';
                        break;
                }
            }
        }
        return result;
    }
}
exports.IndexNow = IndexNow;
