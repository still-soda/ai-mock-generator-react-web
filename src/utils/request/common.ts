type Dict = { [key: string]: any };

type RequestResult<T> = Promise<{
   data: T | null;
   status: number;
}>

/**
 * 等待函数
 * @param ms 等待毫秒数
 */
function wait(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function constructURL(url: string, params?: Dict) {
   params &&
      (() => {
         const paramStr = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .join('&');

         url += `?${paramStr}`;
      })();

   return url;
}

/**
 * 发送GET请求
 * @returns \{ status: 请求状态码, data: 请求结果 }
 */
async function get<T = any>({
   url,
   params,
   header,
   retry = 10,
   interval = 1000,
   noCache = true
}: {
   url: string;
   params?: Dict;
   header?: Dict;
   retry?: number;
   interval?: number;
   noCache?: boolean;
}): RequestResult<T> {
   const constructedURL = constructURL(url, params);

   const res = await fetch(constructedURL, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         ...header
      },
      cache: noCache ? 'no-store' : 'default',
   })
      .then(async (res) => {
         return {
            data: (await res.json()) as T,
            status: res.status,
         };
      })
      .catch((err) => {
         console.log(err);
         return {
            data: null,
            status: 500,
         };
      });

   if (!res && retry > 0) {
      await wait(interval);
      return await get<T>({ url, params, retry: retry - 1, interval });
   }

   return res;
}

/**
 * 发送POST请求
 * @returns \{ status: 请求状态码, data: 请求结果 }
 */
async function post<T = any>({
   url,
   params,
   data,
   header,
   retry = 10,
   interval = 1000,
   noCache = true
}: {
   url: string;
   params?: Dict;
   data?: Dict;
   header?: Dict;
   retry?: number;
   interval?: number;
   noCache?: boolean;
}): RequestResult<T> {
   const constructedURL = constructURL(url, params);

   const res = await fetch(constructedURL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         ...header
      },
      body: JSON.stringify(data),
      cache: noCache ? 'no-store' : 'default',
   })
      .then(async (res) => {
         return {
            data: (await res.json()) as T,
            status: res.status,
         };
      })
      .catch((err) => {
         console.log(err);
         return {
            data: err,
            status: 500,
         };
      });

   if (!res && retry > 0) {
      await wait(interval);
      return await post<T>({ url, params, data, retry: retry - 1, interval });
   }

   return res;
}

/**
 * 发送PUT请求
 * @returns \{ status: 请求状态码, data: 请求结果 }
 */
async function put<T = any>({
   url,
   params,
   data,
   header,
   retry = 0,
   interval = 1000,
}: {
   url: string;
   params?: Dict;
   data?: Dict;
   header?: Dict;
   retry?: number;
   interval?: number;
}) {
   const constructedURL = constructURL(url, params);

   const res = await fetch(constructedURL, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         ...header
      },
      body: JSON.stringify(data),
      cache: 'no-store',
   })
      .then(async (res) => {
         return {
            data: (await res.json()) as T,
            status: res.status,
         };
      })
      .catch((err) => {
         console.log(err);
         return {
            data: null,
            status: 500,
         };
      });

   if (!res && retry > 0) {
      await wait(interval);
      return await put<T>({ url, params, data, retry: retry - 1, interval });
   }

   return res;
}

/**
 * 发送DELETE请求
 * @returns \{ status: 请求状态码, data: 请求结果 }
 */
async function del<T = any>({
   url,
   params,
   data,
   header,
   retry = 0,
   interval = 1000,
}: {
   url: string;
   params?: Dict;
   data?: Dict;
   header?: Dict;
   retry?: number;
   interval?: number;
}) {
   const constructedURL = constructURL(url, params);

   const res = await fetch(constructedURL, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         ...header,
      },
      body: JSON.stringify(data),
      cache: 'no-store',
   })
      .then(async (res) => {
         return {
            data: (await res.json()) as T,
            status: res.status,
         };
      })
      .catch((err) => {
         console.log(err);
         return {
            data: null,
            status: 500,
         };
      });

   if (!res && retry > 0) {
      await wait(interval);
      return await del<T>({ url, params, data, retry: retry - 1, interval });
   }

   return res;
}

export { get, post, put, del, constructURL, wait, type RequestResult };