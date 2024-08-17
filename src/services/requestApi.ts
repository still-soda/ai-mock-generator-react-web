import { post } from "../utils/request/common";
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
}) {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        return '[ERR]获取AccessToken失败，请确保您的网络连接正常，' + 
                'ApiKey和SecretKey正确且未被禁用。';
    }

    const dataJSON = 
        data.filter((i: DataItem) => i.enable)
            .map((i: DataItem) => `"${i.name}"<${i.type}>(${i.desc})`)
            .join('') 

    const { data: res } = await post<{ data: string }>({
        url: uri('/generate'),
        data: {
            data: dataJSON,
            count
        },
        header: {
            'authorization': accessToken
        }
    });
    
    function matchRegex(str: string, regex: RegExp) {
        if (!str) {
            return null;
        }
        const matches = Array.from(str.matchAll(regex));
        return matches.length > 0 ? matches[0][1] : null;
    }

    return matchRegex(res!.data, /\[BEGIN\]([\s\S]*?)\[END\]/g)
        || matchRegex(res!.data, /```json([\s\S]*?)```/g)
        || null;
}

export { requestApi };