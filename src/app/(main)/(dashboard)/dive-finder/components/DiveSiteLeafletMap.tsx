"use client"
import React, { useEffect, useRef, useState } from 'react'
import { diveSiteResult } from '../../api/div-sites/fetch-dive-sites'
import { useRouter } from 'next/navigation'
import RatingModal from '../../dive-sites/components/RatingModal'

interface DiveSiteLeafletMapProps {
    diveSites: diveSiteResult[]
}

const DiveSiteLeafletMap = ({ diveSites }: DiveSiteLeafletMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<any>(null)
    const router = useRouter()
    const [ratingModalOpen, setRatingModalOpen] = useState(false)
    const [selectedDiveSite, setSelectedDiveSite] = useState<diveSiteResult | null>(null)

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current || mapInstance.current) return

            const L = (await import('leaflet')).default

            const map = L.map(mapRef.current).setView([40.73061, -73.935242], 10)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map)

            mapInstance.current = map
        }

        initMap()

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    useEffect(() => {
        (window as any).viewSite = (slug: string) => {
            router.push(`/dive-sites/${slug}`)
        }
        
        (window as any).rateSite = (siteId: string) => {
            const site = diveSites?.find(s => s.id === Number(siteId))
            if (site) {
                setSelectedDiveSite(site)
                setRatingModalOpen(true)
            }
        }

        console.log('Dive sites data:', diveSites?.length || 0, diveSites)
        
        if (!mapInstance.current || !diveSites?.length) return

        const L = require('leaflet')
        
        mapInstance.current.eachLayer((layer: any) => {
            if (layer instanceof L.Marker) {
                mapInstance.current.removeLayer(layer)
            }
        })

        const validSites = diveSites.filter(site => 
            site?.lag && site?.lon && 
            !isNaN(Number(site.lag)) && !isNaN(Number(site.lon))
        )
        
        console.log('Valid dive sites:', validSites.length, validSites)

        if (validSites.length > 0) {
            const createCustomIcon = () => {
                return L.divIcon({
                    html: `
                        <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                          <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_26_732)">
<circle cx="30.4863" cy="29.4868" r="27.4818" transform="rotate(-28.8843 30.4863 29.4868)" fill="#F7931D"/>
<circle cx="30.4863" cy="29.4868" r="26.9818" transform="rotate(-28.8843 30.4863 29.4868)" stroke="white"/>
</g>
<path d="M30.4033 22.5386C32.226 22.5674 34.0393 22.8192 35.8027 23.2886C37.4085 23.7267 38.3392 24.1098 38.8672 24.6099C39.3977 25.1124 39.5195 25.73 39.5195 26.6245C39.5195 27.7483 39.4797 28.676 39.4014 29.4019C39.3231 30.1268 39.2061 30.6534 39.0488 30.9731C38.8598 31.3494 38.6338 31.7346 38.2734 32.0249C37.9123 32.3158 37.418 32.5103 36.6953 32.5103C36.4036 32.5078 36.1124 32.4806 35.8252 32.4292C33.7885 32.0869 31.1112 30.7552 29.6543 28.1245C28.8683 29.6053 27.6319 30.7983 26.1211 31.5269C24.1696 32.4931 22.6252 32.7445 21.5391 32.2612C20.9441 31.9971 20.5027 31.515 20.25 30.8569L20.1533 30.564C19.8954 29.6543 19.7456 28.5297 19.7549 27.4878C19.7641 26.447 19.9322 25.4831 20.3145 24.8989C20.4502 24.692 20.7177 24.442 21.1357 24.1831C21.5544 23.9239 22.1261 23.6548 22.8721 23.4116C24.3642 22.9253 26.5556 22.5414 29.6221 22.5405L30.4033 22.5386ZM29.6328 23.5913C26.9345 23.5913 24.9185 23.9169 23.5293 24.3159C22.8348 24.5154 22.297 24.7333 21.9092 24.938C21.5204 25.1432 21.2852 25.3339 21.1914 25.4771C21.0655 25.6676 20.9687 25.9541 20.9033 26.3052C20.8381 26.6557 20.8043 27.0691 20.8018 27.5132C20.7966 28.4017 20.9178 29.4113 21.1641 30.2817L21.1631 30.2817C21.309 30.7906 21.5732 31.1261 21.9678 31.3042C22.5013 31.5415 23.5786 31.6179 25.6582 30.5884C28.4834 29.1903 29.1188 26.7065 29.125 26.6831C29.1518 26.5744 29.2129 26.4775 29.2988 26.4058C29.385 26.3339 29.4915 26.2905 29.6035 26.2837L29.6064 26.2837L29.6357 26.2856L29.6348 26.2856C29.7421 26.286 29.8467 26.3196 29.9346 26.3813C30.0224 26.4432 30.0894 26.5304 30.126 26.6313C31.2077 29.5979 33.9668 31.0535 36 31.3989C36.7739 31.5304 37.2245 31.4542 37.5176 31.2759C37.8109 31.0972 37.9517 30.8134 38.0996 30.5142C38.1556 30.4006 38.2069 30.224 38.252 29.9917C38.2969 29.7598 38.3357 29.4731 38.3672 29.1392C38.4301 28.4712 38.4639 27.6147 38.4639 26.6284C38.4639 26.0506 38.4632 25.6761 38.1025 25.3423C37.9207 25.1741 37.6458 25.0145 37.2305 24.8472C36.8153 24.6799 36.2607 24.5052 35.5205 24.3042C33.8461 23.8634 32.1259 23.6253 30.3965 23.5933L29.6553 23.5913L29.6328 23.5913Z" fill="white" stroke="white" stroke-width="0.05"/>
<path d="M29.1611 35.8403C29.6445 35.7444 30.1454 35.7941 30.6006 35.9829C31.0556 36.1717 31.4443 36.4912 31.7178 36.9009C31.9913 37.3107 32.138 37.7929 32.1377 38.2856C32.1368 38.9459 31.8732 39.5787 31.4062 40.0454C30.9392 40.5121 30.3058 40.7754 29.6455 40.7759C29.1529 40.7758 28.6713 40.6287 28.2617 40.355C27.8521 40.0812 27.5322 39.6921 27.3437 39.2368C27.1554 38.7816 27.1069 38.2805 27.2031 37.7974C27.2994 37.3142 27.5363 36.8702 27.8848 36.522C28.2334 36.1736 28.6778 35.9363 29.1611 35.8403ZM29.6211 36.8423C29.3443 36.8467 29.0744 36.9317 28.8437 37.0854C28.6063 37.2438 28.421 37.4693 28.3115 37.7329C28.2022 37.9963 28.1732 38.2861 28.2285 38.5659C28.284 38.846 28.4213 39.1042 28.623 39.3062C28.8248 39.5081 29.0824 39.6449 29.3623 39.7007C29.6422 39.7565 29.9325 39.7288 30.1963 39.6196C30.4601 39.5105 30.6851 39.3247 30.8437 39.0874C31.0023 38.8501 31.0869 38.5711 31.0869 38.2856C31.0864 37.9037 30.9351 37.5372 30.665 37.2671C30.3948 36.9969 30.0277 36.8447 29.6455 36.8442L29.6211 36.8442L29.6211 36.8423Z" fill="white" stroke="white" stroke-width="0.05"/>
<path d="M40.9562 19.9894C41.8144 19.9894 42.5101 19.2937 42.5101 18.4356C42.5101 17.5774 41.8144 16.8817 40.9562 16.8817C40.098 16.8817 39.4023 17.5774 39.4023 18.4356C39.4023 19.2937 40.098 19.9894 40.9562 19.9894Z" fill="white"/>
<path d="M42.5893 28.4666C43.2287 28.4666 43.747 27.9483 43.747 27.3089C43.747 26.6696 43.2287 26.1512 42.5893 26.1512C41.95 26.1512 41.4316 26.6696 41.4316 27.3089C41.4316 27.9483 41.95 28.4666 42.5893 28.4666Z" fill="white"/>
<path d="M43.3178 33.9532C43.9572 33.9532 44.4755 33.4349 44.4755 32.7955C44.4755 32.1561 43.9572 31.6378 43.3178 31.6378C42.6785 31.6378 42.1602 32.1561 42.1602 32.7955C42.1602 33.4349 42.6785 33.9532 43.3178 33.9532Z" fill="white"/>
<path d="M41.5722 23.8157C41.9843 23.8157 42.3183 23.4817 42.3183 23.0697C42.3183 22.6576 41.9843 22.3236 41.5722 22.3236C41.1602 22.3236 40.8262 22.6576 40.8262 23.0697C40.8262 23.4817 41.1602 23.8157 41.5722 23.8157Z" fill="white"/>
<path d="M44.6211 24.0384C45.0331 24.0384 45.3671 23.7044 45.3671 23.2923C45.3671 22.8803 45.0331 22.5463 44.6211 22.5463C44.209 22.5463 43.875 22.8803 43.875 23.2923C43.875 23.7044 44.209 24.0384 44.6211 24.0384Z" fill="white"/>
<path d="M40.5293 31.4441C40.9413 31.4441 41.2753 31.1101 41.2753 30.6981C41.2753 30.286 40.9413 29.952 40.5293 29.952C40.1172 29.952 39.7832 30.286 39.7832 30.6981C39.7832 31.1101 40.1172 31.4441 40.5293 31.4441Z" fill="white"/>
<path d="M34.7246 37.2155C35.1366 37.2155 35.4706 36.8815 35.4706 36.4694C35.4706 36.0574 35.1366 35.7234 34.7246 35.7234C34.3125 35.7234 33.9785 36.0574 33.9785 36.4694C33.9785 36.8815 34.3125 37.2155 34.7246 37.2155Z" fill="white"/>
<path d="M40.2313 34.3151C40.5543 34.3151 40.8162 34.0532 40.8162 33.7302C40.8162 33.4072 40.5543 33.1454 40.2313 33.1454C39.9083 33.1454 39.6465 33.4072 39.6465 33.7302C39.6465 34.0532 39.9083 34.3151 40.2313 34.3151Z" fill="white"/>
<path d="M36.7997 34.384C37.1227 34.384 37.3845 34.1222 37.3845 33.7992C37.3845 33.4762 37.1227 33.2144 36.7997 33.2144C36.4767 33.2144 36.2148 33.4762 36.2148 33.7992C36.2148 34.1222 36.4767 34.384 36.7997 34.384Z" fill="white"/>
<path d="M19.6406 25.5767C19.5429 25.9345 19.4764 26.3001 19.4424 26.6694L19.4404 26.686L19.4248 26.6909C19.1377 26.7789 18.3202 27.0597 17.5752 27.5874C16.8301 28.1152 16.1613 28.8872 16.1611 29.9565L16.1611 34.8188C16.1625 35.5996 16.4739 36.3483 17.0264 36.8999C17.5788 37.4514 18.3278 37.7611 19.1084 37.7612L27.709 37.7612L27.709 38.811L19.1084 38.811C18.5839 38.8112 18.0647 38.7078 17.5801 38.5073C17.0952 38.3067 16.6544 38.0129 16.2832 37.6421C15.9121 37.2713 15.618 36.8308 15.417 36.3462C15.216 35.8616 15.1116 35.3424 15.1113 34.8179L15.1113 29.9556C15.1113 28.3528 16.1109 27.2846 17.127 26.6138C18.1412 25.9442 19.1766 25.6665 19.2666 25.6431L19.6094 25.5454L19.6523 25.5337L19.6406 25.5767Z" fill="white" stroke="white" stroke-width="0.05"/>
<path d="M29.2471 16.937C29.3717 16.937 29.469 16.9404 29.5352 16.9438C29.568 16.9456 29.5933 16.9474 29.6104 16.9487C29.6188 16.9494 29.6255 16.9503 29.6299 16.9507L29.6387 16.9507C29.6431 16.9503 29.6497 16.9494 29.6582 16.9487C29.6753 16.9474 29.7005 16.9456 29.7334 16.9438C29.7998 16.9404 29.8979 16.937 30.0234 16.937L30.0244 16.937C32.0075 16.9747 33.937 17.5873 35.5791 18.6997C37.7415 20.1425 38.3613 22.1419 38.5332 23.8853L38.5381 23.9331L38.4961 23.9097C38.1553 23.7181 37.7983 23.5565 37.4297 23.4263L37.416 23.4214L37.4131 23.4067C37.2 22.1219 36.657 20.8074 35.2832 19.7759L34.9971 19.5728C33.6194 18.6363 32.0145 18.0942 30.3555 18.0005L30.0234 17.9868C29.9297 17.9868 29.8564 17.9896 29.8066 17.9917C29.7819 17.9928 29.7628 17.9938 29.75 17.9946C29.7436 17.995 29.7386 17.9954 29.7354 17.9956C29.7338 17.9957 29.7322 17.9955 29.7314 17.9956L29.6279 18.0063L29.623 18.0063L29.5342 17.9956C29.5326 17.9955 29.5306 17.9957 29.5293 17.9956C29.526 17.9954 29.521 17.995 29.5146 17.9946C29.5019 17.9938 29.4832 17.9928 29.459 17.9917L29.2471 17.9868C27.4707 18.0228 25.7429 18.574 24.2734 19.5728C22.6874 20.6295 22.0847 22.0377 21.8574 23.4048L21.8545 23.4185L21.8418 23.4233C21.466 23.5836 21.1058 23.7782 20.7656 24.0044L20.7227 24.0337L20.7275 23.9819C20.8908 22.2165 21.4875 20.1684 23.6914 18.6997L24.0029 18.4966C25.5752 17.5128 27.3871 16.9724 29.2461 16.937L29.2471 16.937Z" fill="white" stroke="white" stroke-width="0.05"/>
<path d="M21.1396 32.4585C21.2194 32.5043 21.303 32.5464 21.3896 32.5854C21.6388 32.6942 21.9011 32.7698 22.1699 32.8101L22.1895 32.813L22.1914 32.8325C22.3115 34.0391 22.4258 34.987 22.499 35.2798L22.5586 35.4673C22.7307 35.9274 23.1407 36.5405 23.8418 37.3677L23.877 37.4087L22.5244 37.4087L22.5166 37.3989C21.931 36.6278 21.6147 36.0426 21.4814 35.5337C21.3848 35.1455 21.2431 33.9353 21.1025 32.4819L21.0977 32.4341L21.1396 32.4585Z" fill="white" stroke="white" stroke-width="0.05"/>
<path d="M38.1387 32.5747C38.0033 33.9852 37.8644 35.154 37.7695 35.5337C37.6414 36.0462 37.3226 36.6366 36.7236 37.4146C36.1243 38.1929 35.2433 39.1617 33.9902 40.4302C32.7362 41.6997 31.8451 42.2965 31.167 42.5874C30.4889 42.8783 30.0231 42.863 29.6289 42.9106L29.623 42.9106C29.2297 42.863 28.7648 42.8783 28.0869 42.5874C27.4091 42.2965 26.5186 41.6995 25.2646 40.4302C24.8291 39.9878 24.4303 39.5827 24.0869 39.2085L24.0488 39.1665L25.4961 39.1665L25.5039 39.1733L25.5127 39.1821L25.5137 39.1841L25.5244 39.1948L25.5264 39.1958L25.5469 39.2163L25.5479 39.2183L25.5596 39.23L25.5615 39.231L25.582 39.2515L25.583 39.2534L25.5937 39.2642L25.5957 39.2651L25.6162 39.2856L25.6172 39.2876L25.6279 39.2983L25.6299 39.2993L25.6514 39.3208L25.6523 39.3228L25.6631 39.3335L25.665 39.3345L25.6855 39.355L25.6865 39.3569L25.6973 39.3677L25.6992 39.3687L25.7207 39.3901L25.7217 39.3921L25.7324 39.4028L25.7344 39.4038L25.7549 39.4243L25.7559 39.4263L25.7666 39.437L25.7686 39.438L25.7891 39.4585L25.79 39.4604L25.8018 39.4722L25.8037 39.4731L25.8242 39.4937L25.8252 39.4956L25.8359 39.5063L25.8379 39.5073L25.8584 39.5278L25.8594 39.5298L25.8701 39.5405L25.8721 39.5415L25.8936 39.563L25.8945 39.5649L25.9053 39.5757L25.9072 39.5767L25.9277 39.5972L25.9287 39.5991L25.9395 39.6099L25.9414 39.6108L25.9629 39.6323L25.9639 39.6343L25.9746 39.645L25.9766 39.646L25.9971 39.6665L25.998 39.6685L26.0088 39.6792L26.0107 39.6802L26.0186 39.688L26.3809 40.0464C27.1945 40.8296 27.7985 41.2608 28.2695 41.5034C28.8069 41.7801 29.1724 41.8119 29.4824 41.8384L29.6328 41.8511L29.7832 41.8384C30.0941 41.8119 30.4604 41.7801 30.998 41.5034C31.5367 41.2262 32.2494 40.7022 33.25 39.688C34.3807 38.5435 35.2083 37.6414 35.7783 36.9243C36.3488 36.2067 36.6589 35.6769 36.7588 35.2769C36.7825 35.1787 36.8122 35.0083 36.8447 34.7769L36.8467 34.7563L36.8672 34.7554C37.0894 34.7408 37.2995 34.6489 37.4619 34.4966C37.6243 34.3442 37.7292 34.1403 37.7578 33.9194C37.7864 33.6986 37.7373 33.4744 37.6191 33.2856C37.501 33.097 37.3205 32.955 37.1094 32.8843L37.1152 32.8364C37.4592 32.8036 37.7941 32.7061 38.1025 32.5503L38.1436 32.5298L38.1387 32.5747Z" fill="white" stroke="white" stroke-width="0.05"/>
<defs>
<filter id="filter0_dd_26_732" x="0" y="0" width="60.9727" height="60.9736" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26_732"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_26_732" result="effect2_dropShadow_26_732"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_26_732" result="shape"/>
</filter>
</defs>
</svg>

                        </div>
                    `,
                    className: 'custom-dive-icon',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                })
            }
            
            validSites.forEach((site, index) => {
                const lat = Number(site.lag)
                const lng = Number(site.lon)
                
                console.log(`Creating marker ${index} for ${site.title} at [${lat}, ${lng}]`)
                
                const marker = L.marker([lat, lng], { icon: createCustomIcon() })
                    .addTo(mapInstance.current)
                
                const rating = site.average_rating || 0
                const fullStars = Math.floor(rating)
                const hasHalfStar = rating % 1 >= 0.5
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
                
                const starDisplay = '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars)
                
                const tooltipContent = `
                    <div style="padding: 12px; min-width: 200px; font-family: Arial, sans-serif;">
                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${site.title}</h3>
                        <div style="margin: 0 0 8px 0; display: flex; align-items: center; gap: 4px;">
                            <span style="color: #fbbf24; font-size: 14px;">${starDisplay}</span>
                            <span style="font-size: 12px; color: #6b7280;">(${rating.toFixed(1)})</span>
                        </div>
                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${site.address}</p>
                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${site.description || 'No description available'}</p>
                        <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280;"><strong>Coordinates:</strong> Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}</p>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="viewSite('${site.slug}')" style="flex: 1; background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">View</button>
                            <button onclick="rateSite('${site.id}')" style="flex: 1; background: #f59e0b; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">Rate</button>
                        </div>
                    </div>
                `
                
                marker.bindPopup(tooltipContent)
            })

            const group = new L.featureGroup(
                validSites.map(site => L.marker([Number(site.lag), Number(site.lon)]))
            )
            mapInstance.current.fitBounds(group.getBounds().pad(0.1))
        }
    }, [diveSites])

    return (
        <div className="relative w-full h-[83vh] mt-[4rem]">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <style jsx global>{`
                .custom-dive-icon {
                    background: transparent !important;
                    border: none !important;
                }
            `}</style>
            <div ref={mapRef} className="w-full h-full" id={`dive-map-${Math.random().toString(36).substr(2, 9)}`} />
            
           {ratingModalOpen && selectedDiveSite && <RatingModal
                isOpen={ratingModalOpen}
                onClose={() => {
                    setRatingModalOpen(false)
                    setSelectedDiveSite(null)
                }}
                removeModal={() => {
                    setRatingModalOpen(false)
                    setSelectedDiveSite(null)
                }}
                diveSiteId={selectedDiveSite?.id || 0}
                diveSiteName={selectedDiveSite?.title || ''}
            />}
        </div>
    )
}

export default DiveSiteLeafletMap