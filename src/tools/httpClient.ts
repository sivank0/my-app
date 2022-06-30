export class HttpClient {

    public static async downloadFile(url: string, data?: any, host: string = ''): Promise<string> {
        const fullUrl = `${host}${url}${HttpClient.toQueryString(data)}`
        const headers = await HttpClient.getHeaders()
        headers.append('Content-Type', 'application/json')
        const result = await fetch(fullUrl, { method: 'GET', headers: headers })
        const blob = await result.blob()
        return window.URL.createObjectURL(new Blob([blob]))
    }


    private static toQueryString(obj: any) {
        if (obj == null) return ''

        const parameters = []

        for (const key of Object.keys(obj)) {
            const value = obj[key]
            if (value == null) continue

            if (Array.isArray(value)) {
                const values = value as any[]
                if (values.length === 0) continue

                for (const v of values) parameters.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
            }
            else if (value instanceof Date)
                parameters.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`)
            else
                parameters.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }

        if (parameters.length === 0) return ''

        return '?' + parameters.join('&')
    }

    static getHeaders = async (): Promise<Headers> => {
        const headers: Headers = new Headers()

        return headers
    }

    public static async getJsonAsync(url: string, data?: any, host: string = ''): Promise<any> {
        const fullUrl = `${host}${url}${HttpClient.toQueryString(data)}`

        const headers = await HttpClient.getHeaders()
        headers.append('Content-Type', 'application/json')

        const resp = await fetch(fullUrl, { method: 'GET', headers: headers })

        const response = await HttpClient.httpHandler(resp)
        if (response.status === 204) return null

        return await response.json()
    }


    public static async postJsonAsync(url: string, body: any, params: any = null, host: string = ''): Promise<any> {
        const fullUrl = `${host}${url}${params != null ? HttpClient.toQueryString(params) : ''}`

        const headers: Headers = await HttpClient.getHeaders()
        headers.append('Content-Type', 'application/json')

        const response = await HttpClient.httpHandler(
            await fetch(fullUrl,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                }))

        if (response.status === 204) return null

        return await response.json()
    }


    private static httpHandler(response: Response): Promise<Response> {
        switch (response.status) {
            case 401:
            
                return Promise.reject(new Error('Unauthorized'))
            case 403:
               
                return Promise.reject(new Error('Forbidden'))
            case 423:
             
                return Promise.reject(new Error('User blocked'))
            // case 404:
            // 	window.location.href = InfrastructureLinks.notFound
            // 	return Promise.reject(new Error('Not Found'))
            // case 500:
            // return Promise.reject(new Error('Server Error'))
        }

        if (response.status !== 200)
            console.log(response)


        return Promise.resolve(response)
    }
}

export default HttpClient
