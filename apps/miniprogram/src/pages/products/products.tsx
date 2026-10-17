import { Navigator, ScrollView, Text, View } from '@tarojs/components'
import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { useMemo, useState } from 'react'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import { featuredProducts } from '../../data/products'

const filters = ['全部', '3岁+', '4岁+', '5岁+', '夜光', '亲子', '多人', '100件内', '130件+']
function matchFilter(item: any, filter: string) {
  if (filter === '3岁+') return Number.parseInt(item.age, 10) >= 3
  if (filter === '4岁+') return Number.parseInt(item.age, 10) >= 4
  if (filter === '5岁+') return Number.parseInt(item.age, 10) >= 5
  if (filter === '夜光') return /夜光|发光/.test(`${item.badge}${item.name}`)
  if (filter === '亲子') return item.scene.includes('亲子') || item.scene.includes('家庭')
  if (filter === '多人') return item.scene.includes('多人') || /158|168|228/.test(item.pieces)
  if (filter === '100件内') return /69|100/.test(item.pieces)
  if (filter === '130件+') return Number.parseInt(item.pieces, 10) >= 130
  return true
}

export default function Products() {
  const router = useRouter()
  const initial = typeof router.params.filter === 'string' ? decodeURIComponent(router.params.filter) : '全部'
  const [active, setActive] = useState(filters.includes(initial) ? initial : '全部')
  useDidShow(() => {
    const stored = Taro.getStorageSync('productsFilter')
    if (filters.includes(stored)) {
      setActive(stored)
      Taro.removeStorageSync('productsFilter')
    }
  })
  const list = useMemo(() => featuredProducts.filter((item) => matchFilter(item, active)), [active])
  return <View className='page'><Header subtitle='TOY CATALOG' action='怎么选？' actionUrl='/pages/faq/faq' /><View className='intro container'><View className='intro-kicker'>FIND YOUR PLAY</View><View className='intro-title'>选一套，开始搭建</View><View className='intro-text'>从官网主推套装中挑选 7 款家庭友好的搭建玩法，按年龄、夜光和多人场景快速找到合适的一套。</View></View><ScrollView className='filter-scroll' scrollX showScrollbar={false}><View className='filter-rail'>{filters.map((item) => <View key={item} className={`filter-pill ${active === item ? 'active' : ''}`} onClick={() => setActive(item)}>{item}</View>)}</View></ScrollView><View className='result-row container'><Text>找到 {list.length} 套玩法</Text><Text className='muted'>精选主推 · 可反复拆装</Text></View><View className='product-grid container'>{list.map((item) => <View className='product-grid-item' key={item.id}><ProductCard product={item} /></View>)}</View><View className='section catalog-note'><View className='catalog-note-inner card'><View className='note-icon'>✦</View><View><View className='note-title'>第一次选玩具？</View><View className='note-text'>69–100 件适合第一次尝试；130 件以上更适合多人一起搭。玩完按杆件、连接球和布艺配件分类收纳。</View></View><Navigator className='note-arrow' url='/pages/faq/faq'>›</Navigator></View></View></View>
}
