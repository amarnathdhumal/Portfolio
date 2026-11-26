'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'
import PostHogPageView from './posthog-pageview'

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
        const isDevelopment = process.env.NODE_ENV === 'development'
        if (!key || (isDevelopment && process.env.NEXT_PUBLIC_POSTHOG_IN_DEV !== 'true')) return

        const startAnalytics = () => {
            if (!posthog.__loaded) {
                posthog.init(key, {
                    api_host: '/ingest',
                    ui_host: 'https://us.posthog.com',
                    capture_pageview: false,
                    capture_exceptions: true,
                    debug: isDevelopment,
                })
            }
            setIsReady(true)
        }

        if (document.readyState === 'complete') {
            startAnalytics()
        } else {
            window.addEventListener('load', startAnalytics, { once: true })
            return () => window.removeEventListener('load', startAnalytics)
        }
    }, [])

    return (
        <PostHogProvider client={posthog}>
            {isReady && <PostHogPageView />}
            {children}
        </PostHogProvider>
    )
}
