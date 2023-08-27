declare const searchEngineUrl: {
    IndexNow: string;
    'Microsoft Bing': string;
    Naver: string;
    'Seznam.cz': string;
    Yandex: string;
};
type SearchEngine = keyof typeof searchEngineUrl;
export declare class IndexNow {
    engine(engine: SearchEngine): string;
    generatorUuid(length: number): string;
    generatorUrl(engine: SearchEngine, url: string, key: string): string;
    request(engine: SearchEngine, url: string, key: string): Promise<{
        url: string;
        status: number;
        response: string;
        reasons: string;
        data: string;
    }>;
    private createRequestResult;
}
export {};
//# sourceMappingURL=index.d.ts.map