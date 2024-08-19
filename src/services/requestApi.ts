import { post, stream } from "../utils/request/common";
import { Data, DataItem } from "../view/UsageView";

let accessToken: string | null = null;

export function getApiData() {
    const apiKey = localStorage.getItem('api-key');
    const appSecret = localStorage.getItem('api-secret');
    return apiKey && appSecret ? { apiKey, appSecret } : null;
}

const SERVER_URI: string = import.meta.env.VITE_APP_SERVER_URI;
const uri = (suffix: string) => SERVER_URI + suffix;

async function getAccessToken() {
    if (accessToken) {
        return accessToken;
    }

    const apiData = getApiData();
    
    if (!apiData) {
        return null;
    }
    
    const { apiKey, appSecret } = apiData;

    const res = await post({
        url: uri('/token'),
        data: {
            apiKey,
            appSecret
        }
    });
    
    if (res.status.toString().startsWith('2')) {
        accessToken = res.data;
    } else {
        accessToken = null;
    }

    return accessToken;
}

async function requestApi({ 
    data, 
    count 
}: {
    data: Data,
    count: number
}, cb: (newStr: string) => void) {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        return '[ERR]获取AccessToken失败，请确保您的网络连接正常，' + 
                'ApiKey和SecretKey正确且未被禁用。';
    }

    const dataJSON = 
        data.filter((i: DataItem) => i.enable)
            .map((i: DataItem) => `"${i.name}"<${i.type}>(${i.desc})`)
            .join('') 

    const streamData = await post<ReadableStream<Uint8Array>>({
        url: uri('/generate'),
        data: {
            data: dataJSON,
            count
        },
        header: {
            'authorization': accessToken
        },
        stream: true
    });

    if (!streamData.data) {
        return '[ERR]获取数据失败。';
    }

    const res = await stream(streamData as any);

    while(true) {
        const { done, value } = await res.next();
        let str = value;

        if (done) {
            break;
        }

        if (value.includes('N]')) {
            str = str.substring(value.indexOf('N]') + 2);
        } 
        if (value.includes('[E')) {
            str = str.substring(0, value.indexOf('[E'));
            cb(str);
            break;
        } 

        if (value.includes('```j')) {
            str = str.substring(value.indexOf('```j') + 7);
        } 
        if (value.includes('```')) {
            str = str.substring(0, value.indexOf('```'));
            cb(str);
            break;
        }

        cb(str);
    }
}

export { requestApi };